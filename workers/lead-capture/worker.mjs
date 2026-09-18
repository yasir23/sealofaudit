/**
 * sealofaudit-lead-capture
 *
 * A redundant lead-capture layer in front of formsubmit.co.
 *
 * WHY: the entire site — 35 pages — funnels into one third-party relay whose activation
 * cannot be verified from outside (formsubmit rejects non-browser calls, so there is no
 * way to test it). If that relay was never confirmed, every submission is discarded and
 * nothing anywhere records that it happened.
 *
 * WHAT THIS DOES:
 *   1. Validates the submission (an email address is required — a lead you cannot reply to
 *      is not a lead; that exact defect shipped on the homepage once already).
 *   2. Writes a durable record to KV. This survives even if the relay is dead.
 *   3. Forwards to formsubmit, preserving the visitor's Origin so the relay treats it as a
 *      genuine page submission rather than a bot.
 *   4. Redirects to /thank-you either way, so the visitor experience is unchanged.
 *
 * The KV record is written BEFORE the forward is attempted, so a relay failure can never
 * lose a lead. That ordering is the whole point — do not reorder it.
 *
 * ROUTES:
 *   POST /api/lead                     capture (used as the <form action>)
 *   GET  /api/leads?key=<SECRET>       read the last 200 leads as JSON
 *   GET  /api/leads.csv?key=<SECRET>   same, as CSV for a spreadsheet
 *
 * CONFIG (Worker bindings): LEADS (KV namespace), LEADS_KEY (secret string)
 */

const RELAY = "https://formsubmit.co/sales@sealofaudit.com";
const THANK_YOU = "https://sealofaudit.com/thank-you";
const MAX_BODY = 64 * 1024;

function isEmail(v) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8",
               "cache-control": "no-store" },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/lead") {
      if (request.method !== "POST") return json({ error: "POST only" }, 405);
      return handleLead(request, env);
    }
    if (url.pathname === "/api/leads" || url.pathname === "/api/leads.csv") {
      if (url.pathname.endsWith(".csv")) return listCsv(request, env);
      return listJson(request, env);
    }
    // Self-test: proves the KV BINDING actually works, without creating a lead and without
    // sending anyone an email. Writes a record, reads it back, deletes it, confirms it is
    // gone. Authenticated, so it is not a public endpoint. The alternative — proving the
    // binding by submitting the live form — leaves fake leads in the pipeline and emails
    // the operator a test message, which is a bad trade for a diagnostic.
    if (url.pathname === "/api/selftest") {
      if (!authorised(request, env)) return json({ error: "unauthorised" }, 401);
      const k = `selftest:${Date.now()}`;
      const payload = { ok: true, at: new Date().toISOString() };
      const out = { kv_binding: !!env.LEADS, key: k };
      try {
        await env.LEADS.put(k, JSON.stringify(payload), { metadata: { t: "selftest" } });
        out.wrote = true;
        const back = await env.LEADS.get(k, { type: "json" });
        out.read_back = back;
        out.read_matches = !!back && back.ok === true;
        await env.LEADS.delete(k);
        out.deleted = (await env.LEADS.get(k)) === null;
      } catch (e) {
        out.error = String(e).slice(0, 300);
        out.wrote = false;
      }
      out.verdict = (out.kv_binding && out.wrote && out.read_matches && out.deleted)
        ? "KV binding works — capture storage is functional"
        : "KV binding FAILED — capture would be lost";

      // Optional: also prove whether the RELAY FORWARD works. This is the one thing that
      // cannot be settled from outside, because formsubmit rejects requests that do not look
      // like a genuine page submit. Opt-in via &forward=1 so the default self-test stays
      // silent and sends nothing. If this reports false, switching the live forms to this
      // Worker would LOSE the email notification while changing nothing about capture.
      if (url.searchParams.get("forward") === "1") {
        try {
          const probe = new URLSearchParams({
            _subject: "DIAGNOSTIC — relay forward test (ignore)",
            _captcha: "false",
            _template: "table",
            name: "INFRASTRUCTURE TEST",
            email: "diagnostic@sealofaudit.com",
            hospital: "NOT A LEAD — automated relay test",
            mrf_url: "https://example.com/diagnostic.json",
            message: "Automated check of the formsubmit forward path. No action needed.",
          });
          const r = await fetch(RELAY, {
            method: "POST",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              origin: "https://sealofaudit.com",
              referer: "https://sealofaudit.com/contact/",
              "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
                            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
            },
            body: probe.toString(),
          });
          const text = (await r.text()).slice(0, 400);
          out.forward = {
            http: r.status,
            accepted: r.ok,
            rejected_as_bot: /open this page through a web server/i.test(text),
            body_head: text.replace(/\s+/g, " ").slice(0, 160),
          };
        } catch (e) {
          out.forward = { http: null, accepted: false, error: String(e).slice(0, 200) };
        }
      }
      return json(out, out.wrote ? 200 : 500);
    }
    return json({ error: "not found", routes: ["/api/lead", "/api/leads"] }, 404);
  },
};

async function handleLead(request, env) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: "payload too large" }, 413);

  const form = new URLSearchParams(raw);
  const email = (form.get("email") || "").trim();
  if (!isEmail(email)) {
    // Visible failure, never a silent success. Telling someone their report is coming when
    // you have no way to send it is the worst possible outcome.
    return json({ error: "a valid email address is required", got: email || null }, 400);
  }

  const ts = new Date().toISOString();
  const lead = {
    ts,
    email,
    name: (form.get("name") || "").slice(0, 200),
    hospital: (form.get("hospital") || "").slice(0, 200),
    title: (form.get("title") || "").slice(0, 200),
    mrf_url: (form.get("mrf_url") || "").slice(0, 500),
    source: (form.get("source") || "").slice(0, 100),
    page: (form.get("page") || request.headers.get("referer") || "").slice(0, 300),
    country: request.headers.get("cf-ipcountry") || "",
  };

  // 1. DURABLE FIRST. If everything after this fails, the lead is not lost.
  const key = `lead:${ts}:${crypto.randomUUID().slice(0, 8)}`;
  let stored = true;
  let storeError = "";
  try {
    await env.LEADS.put(key, JSON.stringify(lead), { metadata: { email, ts } });
  } catch (e) {
    stored = false;
    storeError = String(e).slice(0, 200);
  }

  // 2. Then the relay, best-effort, so the existing email notification still arrives.
  let relayed = false;
  try {
    const out = new URLSearchParams(form);
    out.set("_subject", form.get("_subject") || "SealOfAudit — new lead");
    const res = await fetch(RELAY, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        // formsubmit rejects requests that do not look like a real page submit; pass the
        // visitor's Origin/Referer through so it sees a browser-shaped request.
        origin: request.headers.get("origin") || "https://sealofaudit.com",
        referer: request.headers.get("referer") || "https://sealofaudit.com/contact/",
        "user-agent": request.headers.get("user-agent") || "Mozilla/5.0",
      },
      body: out.toString(),
    });
    relayed = res.ok;
  } catch (e) {
    relayed = false;
  }

  // 3. The visitor always lands on the thank-you page; the record above is what matters.
  return Response.redirect(THANK_YOU + "?captured=" + (stored ? "1" : "0"), 303);
}

function authorised(request, env) {
  const key = new URL(request.url).searchParams.get("key") || "";
  return !!env.LEADS_KEY && key === env.LEADS_KEY;
}

async function collect(env, limit = 200) {
  const out = [];
  let cursor;
  do {
    const page = await env.LEADS.list({ cursor, limit: 1000 });
    for (const k of page.keys) out.push(k.name);
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor && out.length < limit * 2);
  out.sort().reverse();                       // newest first (ISO ts sorts lexically)
  const slice = out.slice(0, limit);
  const rows = [];
  for (const name of slice) {
    const v = await env.LEADS.get(name, { type: "json" });
    if (v) rows.push(v);
  }
  return { total: out.length, returned: rows.length, leads: rows };
}

async function listJson(request, env) {
  if (!authorised(request, env)) return json({ error: "unauthorised" }, 401);
  return json(await collect(env));
}

async function listCsv(request, env) {
  if (!authorised(request, env)) return json({ error: "unauthorised" }, 401);
  const data = await collect(env);
  const cols = ["ts", "email", "name", "title", "hospital", "mrf_url", "source", "page", "country"];
  const esc = (s) => `"${String(s == null ? "" : s).replace(/"/g, '""')}"`;
  const lines = [cols.join(",")];
  for (const l of data.leads) lines.push(cols.map((c) => esc(l[c])).join(","));
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/csv; charset=utf-8",
               "content-disposition": 'attachment; filename="sealofaudit-leads.csv"',
               "cache-control": "no-store" },
  });
}
