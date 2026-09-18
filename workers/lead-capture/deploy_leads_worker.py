#!/usr/bin/env python3
"""Deploy the SealOfAudit lead-capture Worker.

Idempotent: re-running reuses the KV namespace, the key file and the route rather than
creating duplicates. Prints NO secret values — the read key is written to a local file
owned by the operator.

    python3 deploy_leads_worker.py            # deploy + verify
    python3 deploy_leads_worker.py --status   # show what exists, deploy nothing
"""
import argparse
import json
import os
import secrets
import stat
import sys
import urllib.error
import urllib.parse
import urllib.request

TOKEN = os.environ.get("CLOUDFLARE_API_TOKEN", "")
ZONE_NAME = "sealofaudit.com"
WORKER = "sealofaudit-lead-capture"
ROUTE = "sealofaudit.com/api/*"
KEY_FILE = "/Users/ambusiness/.sealofaudit-leads-key"
SRC = "/Users/ambusiness/sealofaudit/workers/lead-capture/worker.mjs"
COMPAT = "2024-09-23"


def cf(method, path, body=None, ctype="application/json"):
    if body is None:
        data = None
    elif ctype == "application/json":
        data = json.dumps(body).encode()
    else:
        data = body
    req = urllib.request.Request(
        "https://api.cloudflare.com/client/v4" + path, data=data, method=method,
        headers={"Authorization": "Bearer %s" % TOKEN, "Content-Type": ctype})
    try:
        with urllib.request.urlopen(req, timeout=45) as r:
            raw = r.read().decode() or "{}"
            return r.status, json.loads(raw)
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode() or "{}")
        except Exception:
            return e.code, {}
    except Exception as e:
        return None, {"errors": [{"message": "%s: %s" % (type(e).__name__, str(e)[:80])}]}


def errs(data):
    return "; ".join("%s: %s" % (e.get("code"), str(e.get("message"))[:90])
                     for e in (data.get("errors") or [])[:3])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--status", action="store_true")
    a = ap.parse_args()

    if not TOKEN:
        print("CLOUDFLARE_API_TOKEN not set"); return 1

    _, accs = cf("GET", "/accounts")
    acct = accs["result"][0]["id"]
    _, zones = cf("GET", "/zones?per_page=50")
    zone = next((z for z in zones.get("result", []) if z["name"] == ZONE_NAME), None)
    if not zone:
        print("zone %s not found on this account" % ZONE_NAME); return 1
    zid = zone["id"]
    print("account %s…  zone %s (%s)" % (acct[:12], ZONE_NAME, zid[:12]))

    # --- KV namespace -----------------------------------------------------
    _, ns = cf("GET", "/accounts/%s/storage/kv/namespaces" % acct)
    existing = [n for n in ns.get("result", []) if n["title"] == "LEADS"]
    if existing:
        kv_id = existing[0]["id"]
        print("KV namespace LEADS: reusing %s…" % kv_id[:12])
    elif a.status:
        kv_id = None
        print("KV namespace LEADS: would be created")
    else:
        st, data = cf("POST", "/accounts/%s/storage/kv/namespaces" % acct,
                      {"title": "LEADS"})
        if not data.get("success"):
            print("KV create failed: %s" % errs(data)); return 1
        kv_id = (data.get("result") or {}).get("id", "")
        if not kv_id:
            print("KV create returned no id: %s" % str(data)[:200]); return 1
        print("KV namespace LEADS: created %s…" % kv_id[:12])

    # --- read key ---------------------------------------------------------
    if os.path.exists(KEY_FILE):
        key = open(KEY_FILE).read().strip()
        print("read key: reusing %s (mode %s)" % (KEY_FILE,
              oct(stat.S_IMODE(os.stat(KEY_FILE).st_mode))))
    else:
        key = secrets.token_urlsafe(24)
        fd = os.open(KEY_FILE, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
        os.write(fd, key.encode()); os.close(fd)
        print("read key: generated -> %s (mode 0600, value NOT printed)" % KEY_FILE)

    if a.status:
        _, scripts = cf("GET", "/accounts/%s/workers/scripts" % acct)
        names = [s["id"] for s in scripts.get("result", [])]
        _, routes = cf("GET", "/zones/%s/workers/routes" % zid)
        pats = [r.get("pattern") for r in routes.get("result", [])]
        print("\nworkers: %s" % (names or "(none)"))
        print("routes : %s" % (pats or "(none)"))
        return 0

    # --- deploy -----------------------------------------------------------
    src = open(SRC, encoding="utf-8").read()
    metadata = {
        "main_module": "worker.mjs",
        "compatibility_date": COMPAT,
        "bindings": [
            {"type": "kv_namespace", "name": "LEADS", "namespace_id": kv_id},
            {"type": "secret_text", "name": "LEADS_KEY", "text": key},
        ],
    }
    B = "----sealofaudit"
    body = "\r\n".join([
        "--%s" % B,
        'Content-Disposition: form-data; name="metadata"', "",
        json.dumps(metadata),
        "--%s" % B,
        'Content-Disposition: form-data; name="worker.mjs"; filename="worker.mjs"',
        "Content-Type: application/javascript+module", "", src,
        "--%s--" % B, "",
    ]).encode()
    st, data = cf("PUT", "/accounts/%s/workers/scripts/%s" % (acct, WORKER),
                  body=body, ctype="multipart/form-data; boundary=%s" % B)
    print("deploy -> HTTP %s success=%s" % (st, bool(data.get("success"))))
    if not data.get("success"):
        print("  %s" % errs(data)); return 1

    # --- route ------------------------------------------------------------
    _, routes = cf("GET", "/zones/%s/workers/routes" % zid)
    have = [r for r in routes.get("result", []) if r.get("pattern") == ROUTE]
    if have:
        print("route %s: already present" % ROUTE)
    else:
        st, data = cf("POST", "/zones/%s/workers/routes" % zid,
                      {"pattern": ROUTE, "script": WORKER})
        print("route -> HTTP %s success=%s" % (st, bool(data.get("success"))))
        if not data.get("success"):
            print("  %s" % errs(data))

    # --- verify -----------------------------------------------------------
    print("\n--- verifying the live endpoint ---")
    st, data = cf("GET", "/accounts/%s/workers/subdomain" % acct)
    sub = (data.get("result") or {}).get("subdomain")
    print("workers.dev subdomain: %s" % sub)

    def post_lead(url, email):
        f = urllib.parse.urlencode({"email": email, "name": "DEPLOY VERIFICATION",
                                    "hospital": "NOT A LEAD",
                                    "mrf_url": "https://example.com/x.json"})
        req = urllib.request.Request(url, data=f.encode(), method="POST",
                                     headers={"Content-Type":
                                              "application/x-www-form-urlencoded",
                                              "Origin": "https://sealofaudit.com"})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.status, r.headers.get("location", "")
        except urllib.error.HTTPError as e:
            return e.code, ""
        except Exception as e:
            return None, str(e)[:60]

    for url, label in ((("https://%s.%s.workers.dev/api/lead" % (WORKER, sub))
                        if sub else None, "workers.dev"),
                       ("https://sealofaudit.com/api/lead", "public route")):
        if not url:
            continue
        code, loc = post_lead(url, "verify@example.com")
        print("  POST %-34s -> %s %s" % (label, code, ("-> " + loc[:40]) if loc else ""))

    print("\nread your leads with:")
    print("  curl -s 'https://sealofaudit.com/api/leads?key=$(cat %s)' | head -40" % KEY_FILE)
    return 0


if __name__ == "__main__":
    import urllib.parse  # noqa: E402  (used inside post_lead)
    sys.exit(main())
