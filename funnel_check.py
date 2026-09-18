#!/usr/bin/env python3
"""funnel_check.py — is the SealOfAudit conversion funnel actually intact?

Run this BEFORE any outreach or spend. It answers the question that otherwise gets
re-litigated every time: which layers work, which are unverified, and which are missing.

    python3 funnel_check.py            # full check against the LIVE site
    python3 funnel_check.py --local    # check the local docs/ build instead

Exit codes: 0 = all critical layers pass · 1 = something critical is broken · 2 = warnings only.

WHY A SCRIPT AND NOT A NOTE: this funnel has 35 pages routing into ONE third-party relay,
and across this project several "fixes" were made to things that were never broken while a
real defect (the lead capture discarding every email address) sat unnoticed. A doc rots; a
probe does not. Every check below prints the evidence it used.
"""
import argparse
import json
import os
import re
import socket
import ssl
import sys
import urllib.error
import urllib.request

SITE = "https://sealofaudit.com"
LOCAL_DOCS = "/Users/ambusiness/sealofaudit/docs"
UA = {"User-Agent": "Mozilla/5.0 (compatible; SealOfAudit-funnel-check/1.0)"}

CRITICAL_PAGES = ["/", "/contact/", "/pricing/", "/services/", "/thank-you/",
                  "/sample-report/", "/how-it-works/"]

PASS, WARN, FAIL = [], [], []


def ok(name, detail=""):
    PASS.append(name)
    print("  \033[32mPASS\033[0m  %s%s" % (name, ("  -> %s" % detail) if detail else ""))


def warn(name, detail=""):
    WARN.append(name)
    print("  \033[33mWARN\033[0m  %s%s" % (name, ("  -> %s" % detail) if detail else ""))


def bad(name, detail=""):
    FAIL.append(name)
    print("  \033[31mFAIL\033[0m  %s%s" % (name, ("  -> %s" % detail) if detail else ""))


def fetch(url, timeout=20):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read().decode("utf-8", "replace")


def section(t):
    print("\n%s\n%s" % (t, "-" * len(t)))


def check_pages(local):
    section("1. PAGES SERVE")
    for p in CRITICAL_PAGES:
        if local:
            fp = os.path.join(LOCAL_DOCS, p.strip("/"), "index.html") if p != "/" \
                else os.path.join(LOCAL_DOCS, "index.html")
            if os.path.exists(fp):
                ok("%s (local build)" % p)
            else:
                bad("%s missing from the local build" % p, fp)
            continue
        try:
            status, _ = fetch(SITE + p + "?cb=%d" % os.getpid())
            (ok if status == 200 else bad)("%s HTTP %s" % (p, status))
        except Exception as e:
            bad("%s unreachable" % p, "%s: %s" % (type(e).__name__, str(e)[:60]))


def check_capture(local):
    section("2. LEAD CAPTURE — the layers that lose leads silently")
    if local:
        home = open(os.path.join(LOCAL_DOCS, "index.html"), encoding="utf-8",
                    errors="replace").read()
        contact = open(os.path.join(LOCAL_DOCS, "contact", "index.html"), encoding="utf-8",
                       errors="replace").read()
    else:
        _, home = fetch(SITE + "/?cb=%d" % os.getpid())
        _, contact = fetch(SITE + "/contact/?cb=%d" % os.getpid())

    # the defect fixed 2026-09-18: a form that collects no email address cannot be answered
    for label, html in (("homepage Instant Check", home), ("/contact", contact)):
        has_email = bool(re.search(r'<input[^>]*name="email"', html))
        (ok if has_email else bad)("%s captures an email address" % label)
        has_hardcoded = "lead@sealofaudit.com" in html
        (bad if has_hardcoded else ok)(
            "%s has no hardcoded placeholder address" % label)

    forms = re.findall(r'<form[^>]*action="([^"]*)"[^>]*>', home + contact)
    relay = [f for f in forms if "formsubmit" in f]
    if relay:
        ok("forms post to the relay", relay[0])
        warn("formsubmit.co activation is NOT externally verifiable",
             "the API rejects non-browser calls; confirm the activation mail in "
             "sales@sealofaudit.com — unconfirmed = every submission discarded")
    else:
        bad("no form with an action found", "a form with no action discards input")

    for label, html in (("homepage", home), ("/contact", contact)):
        phone = bool(re.search(r'href="tel:\+', html))
        mailto = "mailto:sales@sealofaudit.com" in html
        (ok if phone else warn)("%s offers a phone fallback" % label)
        (ok if mailto else warn)("%s offers an email fallback" % label)


def check_conversion(local):
    section("3. CONVERSION PATHS — can a buyer actually give you money?")
    if local:
        pricing = open(os.path.join(LOCAL_DOCS, "pricing", "index.html"), encoding="utf-8",
                       errors="replace").read()
    else:
        _, pricing = fetch(SITE + "/pricing/?cb=%d" % os.getpid())
    ctas = re.findall(r'<a[^>]*btn btn-primary[^>]*>[^<]*</a>', pricing)
    external = [c for c in ctas if 'data-cta="external"' in c]
    if external:
        ok("pricing CTAs are live buy/book buttons", "%d external" % len(external))
    else:
        warn("no payment or booking link is configured",
             "all %d CTAs fall back to the contact form — set "
             "NEXT_PUBLIC_PAYMENT_LINK / NEXT_PUBLIC_BOOKING_LINK and rebuild" % len(ctas))
    for c in ctas:
        href = re.search(r'href="([^"]*)"', c)
        label = re.sub(r"<[^>]+>", "", c).strip()
        print("        %-34s -> %s" % (label[:34], href.group(1) if href else "?"))


def check_mail():
    section("4. MAIL PATH — can the domain receive at all?")
    try:
        import subprocess
        mx = subprocess.run(["dig", "+short", "MX", "sealofaudit.com"],
                            capture_output=True, text=True, timeout=15).stdout.strip()
        (ok if mx else bad)("sealofaudit.com has MX records",
                            ", ".join(mx.splitlines()[:2]) if mx else "NO MX — cannot receive")
        txt = subprocess.run(["dig", "+short", "TXT", "sealofaudit.com"],
                             capture_output=True, text=True, timeout=15).stdout
        (ok if "v=spf1" in txt else warn)("SPF record present")
        dmarc = subprocess.run(["dig", "+short", "TXT", "_dmarc.sealofaudit.com"],
                               capture_output=True, text=True, timeout=15).stdout
        (ok if "v=DMARC1" in dmarc else warn)("DMARC record present",
                                              dmarc.strip()[:70] if dmarc else "")
    except Exception as e:
        warn("DNS checks could not run", "%s: %s" % (type(e).__name__, str(e)[:60]))


def check_hygiene():
    section("5. BUILD HYGIENE — stale artifacts shipping to production")
    chunks = os.path.join(LOCAL_DOCS, "_next", "static", "chunks", "app")
    if not os.path.isdir(chunks):
        warn("no local docs build to inspect", chunks)
        return
    index = os.path.join(LOCAL_DOCS, "index.html")
    # NOTE: the HTML names chunks as "app/page-XXXX.js"; the directory listing gives bare
    # filenames. Comparing the two without normalising made EVERY chunk look orphaned —
    # a probe that flags everything is the same as no probe. Basename both sides.
    live_chunks = set()
    if os.path.exists(index):
        html = open(index, encoding="utf-8", errors="replace").read()
        live_chunks = {os.path.basename(m) for m in re.findall(r"app/page-[a-z0-9]+\.js", html)}
    present = set(f for f in os.listdir(chunks) if re.match(r"page-[a-z0-9]+\.js$", f))
    orphans = present - live_chunks
    if orphans:
        warn("%d orphaned page chunk(s) in docs/" % len(orphans),
             "from cp without rm — unreferenced but still deployed; delete manually")
        for o in sorted(orphans):
            print("        %s" % os.path.join(chunks, o))
    else:
        ok("no orphaned page chunks")
    cname = os.path.join(LOCAL_DOCS, "CNAME")
    (ok if os.path.exists(cname) else bad)(
        "CNAME present in docs/",
        open(cname).read().strip() if os.path.exists(cname) else "GH Pages will lose the domain")
    leaked = 0
    for root, _, files in os.walk(LOCAL_DOCS):
        for f in files:
            if f.endswith(".html"):
                try:
                    if "test_abc123" in open(os.path.join(root, f), encoding="utf-8",
                                             errors="replace").read():
                        leaked += 1
                except Exception:
                    pass
    (bad if leaked else ok)("no test payment URLs in the deployed build",
                            "%d file(s) contain a test URL" % leaked if leaked else "")


def check_lead_endpoint():
    section("6. LEAD-CAPTURE ENDPOINT (Cloudflare Worker)")
    KEY_FILE = "/Users/ambusiness/.sealofaudit-leads-key"
    # A GET on the POST-only capture route must 405 if the Worker is live. A GitHub Pages
    # 404 here means the route is not firing — check for x-github-request-id in headers.
    try:
        req = urllib.request.Request(SITE + "/api/lead", headers=UA)
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                code, hdrs = r.status, dict(r.headers)
        except urllib.error.HTTPError as e:
            code, hdrs = e.code, dict(e.headers)
        if code == 405:
            ok("Worker is live (GET /api/lead -> 405)")
        elif "x-github-request-id" in {k.lower() for k in hdrs}:
            bad("route is NOT firing", "GitHub Pages answered — the Worker route is not active")
        else:
            warn("GET /api/lead returned %s" % code, "expected 405 from the Worker")
    except Exception as e:
        warn("lead endpoint unreachable", "%s: %s" % (type(e).__name__, str(e)[:60]))

    if not os.path.exists(KEY_FILE):
        warn("no read key file", "%s absent — cannot verify KV" % KEY_FILE)
        return
    try:
        key = open(KEY_FILE).read().strip()
        req = urllib.request.Request(SITE + "/api/selftest?key=%s" % key, headers=UA)
        with urllib.request.urlopen(req, timeout=25) as r:
            data = json.loads(r.read().decode())
        good = bool(data.get("kv_binding") and data.get("wrote")
                    and data.get("read_matches") and data.get("deleted"))
        (ok if good else bad)("KV capture storage works", data.get("verdict", ""))
        # the probes must leave nothing behind
        req = urllib.request.Request(SITE + "/api/leads?key=%s" % key, headers=UA)
        with urllib.request.urlopen(req, timeout=25) as r:
            leads = json.loads(r.read().decode())
        total = leads.get("total", 0)
        if total == 0:
            ok("lead feed is empty (no probe residue)")
        else:
            print("        lead feed holds %d record(s) — real captures" % total)
        req = urllib.request.Request(SITE + "/api/leads?key=definitely-wrong", headers=UA)
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                bad("unauthenticated read was NOT refused", "HTTP %s" % r.status)
        except urllib.error.HTTPError as e:
            (ok if e.code == 401 else warn)("unauthenticated read refused", "HTTP %s" % e.code)
    except Exception as e:
        warn("KV self-test inconclusive", "%s: %s" % (type(e).__name__, str(e)[:70]))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--local", action="store_true", help="check the local docs/ build")
    a = ap.parse_args()
    print("SEALOFAUDIT FUNNEL CHECK — %s" % ("local docs/ build" if a.local else SITE))
    check_pages(a.local)
    check_capture(a.local)
    check_conversion(a.local)
    check_mail()
    check_hygiene()
    check_lead_endpoint()
    print("\n%s" % ("=" * 60))
    print("RESULT: %d passed, %d warnings, %d failed" % (len(PASS), len(WARN), len(FAIL)))
    if FAIL:
        print("FAILED: %s" % ", ".join(FAIL))
    if WARN:
        print("WARNINGS: %s" % ", ".join(WARN))
    print("=" * 60)
    return 1 if FAIL else (2 if WARN else 0)


if __name__ == "__main__":
    sys.exit(main())
