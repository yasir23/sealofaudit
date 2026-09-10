"use client";
import { useState } from "react";

// CMS Penalty Exposure Calculator — interactive, link-magnet, GEO asset.
//
// The correct rule is 45 CFR §180.90(c)(2)(ii): the maximum DAILY penalty is set
// by the hospital's BED COUNT, not by how many notices it has received.
//   up to 30 beds        -> $300/day
//   31 to 550 beds       -> beds x $10/day
//   more than 550 beds   -> $5,500/day
// These are the statutory base amounts set for 2022; §180.90(c)(3) requires CMS
// to adjust them annually by the OMB civil-monetary-penalty multiplier, so
// current amounts run above these figures.
// §180.90(c)(4): the penalty is reduced 35% if the hospital waives its right to
// a hearing within 30 days of the notice.
export default function PenaltyCalculator() {
  const [beds, setBeds] = useState(250);
  const [days, setDays] = useState(90);
  const [waived, setWaived] = useState(false);

  const dailyBase = beds <= 30 ? 300 : beds <= 550 ? beds * 10 : 5500;
  const daily = waived ? dailyBase * 0.65 : dailyBase;
  const total = daily * days;
  const annual = daily * 365;

  const tier = beds <= 30 ? "up to 30 beds" : beds <= 550 ? "31-550 beds" : "over 550 beds";
  const risk = dailyBase >= 3000 ? "HIGH" : dailyBase >= 1000 ? "MEDIUM" : "LOW";

  const money = (n) => "$" + Math.round(n).toLocaleString();

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 16, padding: 28, background: "#fff", maxWidth: 720, margin: "32px auto" }}>
      <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>CMS Penalty Exposure Calculator</div>
      <div style={{ color: "#64748b", fontSize: 15, marginBottom: 20 }}>
        The real formula, per 45 CFR §180.90(c)(2)(ii): the maximum daily penalty is set by your
        hospital&apos;s bed count. Enter your size to see the exposure.
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, fontSize: 14 }} htmlFor="beds">Licensed beds: {beds}</label>
        <input id="beds" type="range" min={5} max={1000} step={5} value={beds}
               onChange={(e) => setBeds(Number(e.target.value))} style={{ width: "100%" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8" }}>
          <span>5</span><span>30 beds</span><span>550 beds</span><span>1000+</span>
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, fontSize: 14 }} htmlFor="days">Days out of compliance: {days}</label>
        <input id="days" type="range" min={15} max={365} value={days}
               onChange={(e) => setDays(Number(e.target.value))} style={{ width: "100%" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8" }}>
          <span>15 days</span><span>90</span><span>180</span><span>365 days</span>
        </div>
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "#334155", marginBottom: 20, cursor: "pointer" }}>
        <input type="checkbox" checked={waived} onChange={(e) => setWaived(e.target.checked)} style={{ marginTop: 3 }} />
        <span>
          We would waive our right to a hearing within 30 days
          <span style={{ color: "#64748b" }}> — reduces the penalty 35% (§180.90(c)(4))</span>
        </span>
      </label>

      <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, marginBottom: 18 }}>
        <div style={{ fontSize: 14, color: "#475569" }}>Maximum penalty per day ({tier})</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: risk === "HIGH" ? "#dc2626" : risk === "MEDIUM" ? "#b45309" : "#0a7a4a" }}>
          {money(daily)}
        </div>
        <div style={{ fontSize: 14, color: "#334155", marginTop: 8 }}>
          Over <strong>{days} days</strong>: <strong>{money(total)}</strong>
        </div>
        <div style={{ fontSize: 14, color: "#334155", marginTop: 2 }}>
          If it ran a full year: <strong>{money(annual)}</strong>
        </div>
        {waived && (
          <div style={{ fontSize: 13, color: "#0a7a4a", marginTop: 6 }}>
            35% hearing-waiver reduction applied ({money(dailyBase)} → {money(daily)}/day).
          </div>
        )}
      </div>

      <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 14 }}>
        Statutory base amounts under 45 CFR §180.90(c)(2)(ii). CMS adjusts these annually for
        inflation under §180.90(c)(3), so the current maximums run above the figures shown.
        Penalties run per day of continuing non-compliance. This is an estimate, not legal advice.
      </div>

      <a href="/contact" style={{ display: "inline-block", background: "#dc2626", color: "#fff", padding: "12px 22px", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}>
        Find your real exposure — free MRF check →
      </a>
    </div>
  );
}
