"use client";
import { useState } from "react";

// CMS Penalty Exposure Calculator — interactive, link-magnet, GEO asset.
// Core number: $300/day → $5,500/day after second notice, annual cap ~$2.08M.
export default function PenaltyCalculator() {
  const [failedElements, setFailedElements] = useState(2);
  const [daysUnfixed, setDaysUnfixed] = useState(90);

  const daily = 300;
  const escalated = 5500;
  const cap = 2077733;

  const firstPeriod = Math.min(daysUnfixed, 30);
  const secondPeriod = Math.max(0, daysUnfixed - 30);
  const est = Math.min(firstPeriod * daily + secondPeriod * escalated * Math.max(1, failedElements), cap);

  const risk = failedElements >= 3 ? "HIGH" : failedElements === 2 ? "MEDIUM" : "LOW";

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 16, padding: 28, background: "#fff", maxWidth: 720, margin: "32px auto" }}>
      <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>CMS Penalty Exposure Calculator</div>
      <div style={{ color: "#64748b", fontSize: 15, marginBottom: 20 }}>
        The exact math behind a price-transparency fine: $300/day, escalating to $5,500/day after the second notice, capped at ~$2.08M per year.
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, fontSize: 14 }}>Failed CMS elements (from an audit): {failedElements}</label>
        <input type="range" min={1} max={5} value={failedElements} onChange={(e) => setFailedElements(Number(e.target.value))} style={{ width: "100%" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8" }}>
          <span>1 (minor)</span><span>3</span><span>5 (severe)</span>
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <label style={{ fontWeight: 600, fontSize: 14 }}>Days until fixed: {daysUnfixed}</label>
        <input type="range" min={15} max={365} value={daysUnfixed} onChange={(e) => setDaysUnfixed(Number(e.target.value))} style={{ width: "100%" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8" }}>
          <span>15 days</span><span>180</span><span>365 days</span>
        </div>
      </div>

      <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, marginBottom: 18 }}>
        <div style={{ fontSize: 14, color: "#475569" }}>Estimated exposure</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: risk === "HIGH" ? "#dc2626" : "#0a7a4a" }}>
          ${est.toLocaleString()}
        </div>
        <div style={{ fontSize: 14, color: "#334155", marginTop: 4 }}>
          Risk level: <strong>{risk}</strong> · {failedElements} failed element(s) · {daysUnfixed} days at risk
        </div>
      </div>

      <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 14 }}>
        Assumes CMS's corrective-action window (~30 days) before escalation, per 45 CFR §180.30. Actual fines vary by enforcement history.
      </div>

      <a href="/contact" style={{ display: "inline-block", background: "#dc2626", color: "#fff", padding: "12px 22px", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}>
        Find your real exposure — free MRF check →
      </a>
    </div>
  );
}
