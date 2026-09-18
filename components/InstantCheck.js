/**
 * InstantCheck — homepage MRF risk-check capture.
 *
 * REWRITTEN 2026-09-18. The previous version was a "use client" component that POSTed to
 * formsubmit.co with `fetch`. It had three real defects:
 *
 *   1. THE VISITOR'S EMAIL WAS NEVER CAPTURED. It appended a hardcoded
 *      `email = "lead@sealofaudit.com"`, and the form had no email input — yet the success
 *      message told the user "your risk report is on the way to the email you provide
 *      below", referring to a field that did not exist. The lead arrived with a fake
 *      reply-to, so it could not be answered.
 *   2. A FAILED SUBMISSION REPORTED SUCCESS. The catch block set done=true, so a network
 *      error, a formsubmit outage, or an unconfirmed activation looked identical to a
 *      delivered lead — and the lead was lost with no trace.
 *   3. `fetch` to a cross-origin endpoint invites CORS rejection, which is what almost
 *      certainly motivated the catch-and-lie in the first place.
 *
 * Now it is a plain HTML form POST — no hooks, no JS required — exactly like the /contact
 * form that already works. Consequences: no CORS, the submission survives a JS failure,
 * and there is no client-side path that can claim success without the browser actually
 * having submitted.
 *
 * NOTE: this file has NO "use client" directive on purpose. Do not add one.
 */
export default function InstantCheck() {
  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 16, padding: 28, background: "#fff", maxWidth: 680, margin: "32px auto" }}>
      <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Instant MRF Check</div>
      <div style={{ color: "#64748b", fontSize: 15, marginBottom: 16 }}>
        Paste your hospital&apos;s machine-readable file URL and your email — we audit it against
        the CMS checks and email your risk score within 24 hours. Free, no obligation.
      </div>

      <form
        action="https://formsubmit.co/sales@sealofaudit.com"
        method="POST"
        style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        <input type="hidden" name="_subject" value="SealOfAudit — Instant MRF Check" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://sealofaudit.com/thank-you" />
        <input type="hidden" name="name" value="Instant MRF Check (unattended)" />
        <input type="hidden" name="hospital" value="Not captured — triage from MRF URL" />

        <input
          type="url"
          name="mrf_url"
          placeholder="https://yourhospital.org/standardcharges.json"
          required
          style={{ flex: 1, minWidth: 240, padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 15 }}
        />
        <input
          type="email"
          name="email"
          placeholder="you@hospital.org"
          required
          style={{ flex: 1, minWidth: 200, padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 15 }}
        />
        <button
          type="submit"
          style={{ background: "#0a7a4a", color: "#fff", padding: "12px 22px", borderRadius: 8, fontWeight: 700, border: 0, cursor: "pointer" }}
        >
          Check my file
        </button>
      </form>

      <div style={{ marginTop: 10, fontSize: 13, color: "#94a3b8" }}>
        We need your email to send the report — it is never shared or added to a list.
      </div>
      <div style={{ marginTop: 8, fontSize: 13, color: "#94a3b8" }}>
        Prefer to talk? <a href="tel:+13159532456" style={{ color: "#dc2626", fontWeight: 700 }}>Call +1 315 953 2456</a> — we&apos;ll run it while you&apos;re on the line.
      </div>
    </div>
  );
}
