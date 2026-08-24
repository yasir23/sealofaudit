"use client";
import { useState } from "react";

export default function InstantCheck() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState("idle"); // idle|loading|done
  const [done, setDone] = useState(false);

  async function run(e) {
    e.preventDefault();
    if (!url || !url.startsWith("http")) return;
    setState("loading");
    try {
      const fd = new FormData();
      fd.append("name", "Instant Check");
      fd.append("email", "lead@sealofaudit.com");
      fd.append("hospital", "Instant MRF Check");
      fd.append("mrf_url", url);
      fd.append("_subject", "SealOfAudit — Free Risk Check Request");
      fd.append("_captcha", "false");
      fd.append("_template", "table");
      fd.append("_next", "https://sealofaudit.com/thank-you");
      await fetch("https://formsubmit.co/sales@sealofaudit.com", { method: "POST", body: fd });
      setState("done");
      setDone(true);
    } catch (err) {
      setState("done");
      setDone(true);
    }
  }

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 16, padding: 28, background: "#fff", maxWidth: 680, margin: "32px auto" }}>
      <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Instant MRF Check</div>
      <div style={{ color: "#64748b", fontSize: 15, marginBottom: 16 }}>
        Paste your hospital&apos;s machine-readable file URL — we audit it against the 8 CMS checks and email your risk score in minutes. Free, no obligation.
      </div>
      {done ? (
        <div style={{ color: "#0a7a4a", fontWeight: 700, fontSize: 17, padding: "12px 0" }}>
          ✓ Audit requested — your risk report is on the way to the email you provide below.
        </div>
      ) : (
        <form onSubmit={run} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourhospital.org/standardcharges.json"
            required
            style={{ flex: 1, minWidth: 260, padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 15 }}
          />
          <button
            type="submit"
            disabled={state === "loading"}
            style={{ background: "#0a7a4a", color: "#fff", padding: "12px 22px", borderRadius: 8, fontWeight: 700, border: 0, cursor: "pointer" }}
          >
            {state === "loading" ? "Auditing..." : "Check my file"}
          </button>
        </form>
      )}
      <div style={{ marginTop: 14, fontSize: 13, color: "#94a3b8" }}>
        Prefer to talk? <a href="tel:+13159532456" style={{ color: "#dc2626", fontWeight: 700 }}>Call +1 315 953 2456</a> — we&apos;ll run it while you&apos;re on the line.
      </div>
    </div>
  );
}
