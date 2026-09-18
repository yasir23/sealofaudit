"use client";

/**
 * DualSubmit — keeps the email notification while making capture independent of the relay.
 *
 * THE PROBLEM
 * Every form posts to formsubmit.co. Two things are wrong with that as the only path:
 *   * the relay's activation cannot be verified from outside, so if it was never confirmed
 *     the submission is discarded and nothing records that it happened;
 *   * a server-side forward cannot replace it either — Cloudflare Workers egress from SHARED
 *     IPs and formsubmit rate-limits them (measured: HTTP 429, not a bot rejection).
 *
 * THE FIX
 * The form's native action is /api/lead (the Worker), which stores the lead in KV. That path
 * is proven and does not depend on the relay or on JavaScript.
 *
 * This component ADDITIONALLY fires the submission straight at formsubmit FROM THE BROWSER,
 * where the IP is the visitor's rather than a shared Cloudflare one — the same request shape
 * that works today. `mode: "no-cors"` is deliberate: formsubmit sends no CORS headers, so a
 * normal fetch would be blocked from reading the response. We do not need to read it; we only
 * need the request to be sent, which no-cors permits.
 *
 * ORDERING AND SAFETY
 * The listener is registered in the CAPTURE phase and never calls preventDefault(), so the
 * native submission to /api/lead always proceeds regardless of what this does. If this
 * component never runs — JavaScript blocked, hydration failed, an error thrown — capture
 * still works. This layer can only ADD an email attempt; it cannot break capture.
 *
 * Net effect: capture becomes guaranteed, and the email path is exactly as reliable as it is
 * today. Both, rather than choosing.
 */

import { useEffect } from "react";

const RELAY = "https://formsubmit.co/sales@sealofaudit.com";

export default function DualSubmit() {
  useEffect(() => {
    function onSubmit(e) {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (!form.hasAttribute("data-dual-submit")) return;

      try {
        const fd = new FormData(form);
        if (!String(fd.get("email") || "").includes("@")) return; // same rule the Worker enforces
        if (!fd.get("_subject")) fd.set("_subject", "SealOfAudit — new lead");
        // fire-and-forget; never awaited, never allowed to affect the native submit
        fetch(RELAY, { method: "POST", mode: "no-cors", body: fd }).catch(() => {});
      } catch (err) {
        /* never let the email attempt interfere with capture */
      }
    }
    document.addEventListener("submit", onSubmit, true);
    return () => document.removeEventListener("submit", onSubmit, true);
  }, []);

  return null;
}
