import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata = {
  title: "Sample Report",
  description:
    "See a real SealOfAudit CMS price transparency audit report. Sample findings: missing payer-specific rates, absent cash prices, bot-blocked files. See what CMS would flag.",
};

export default function SampleReport() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="Sample CMS MRF Audit Report"
        sub="Real findings from a US hospital machine-readable file. This is the format you receive — anonymized, prioritized, actionable."
      />

      <section>
        <div className="container">
          <div className="sec-head"><h2>Executive Summary</h2><p>Hospital: [Anonymized US Medical Center] · File reviewed: 2026-08-10 · Auditor: SealOfAudit</p></div>
          <div className="tbl-wrap" style={{ marginBottom: 24 }}>
            <table>
              <thead><tr><th>Risk Level</th><th>Findings</th><th>Est. Daily Exposure</th></tr></thead>
              <tbody>
                <tr><td><span className="badge badge-red">HIGH</span></td><td>2 of 5 major payers missing negotiated rates</td><td>$5,500</td></tr>
                <tr><td><span className="badge badge-red">HIGH</span></td><td>Discounted cash price missing on 14% of items</td><td>$5,500</td></tr>
                <tr><td><span className="badge badge-yellow">MEDIUM</span></td><td>Bot-blocking layer may block CMS crawler</td><td>Contingent</td></tr>
                <tr><td><span className="badge badge-yellow">MEDIUM</span></td><td>61 of 70 shoppable services present</td><td>Contingent</td></tr>
                <tr><td><span className="badge badge-green">OK</span></td><td>Gross charges complete</td><td>—</td></tr>
              </tbody>
            </table>
          </div>

          <div className="report">
            <h3 style={{ marginBottom: 14 }}>Finding #1 — Missing Payer-Specific Negotiated Charges</h3>
            <div className="flag"><span><strong>Risk:</strong> HIGH — CMS requires negotiated rates for all plans offered</span> <span className="badge badge-red">HIGH RISK</span></div>
            <p style={{ fontSize: 14, color: "var(--muted)", padding: "10px 0" }}>The file lists negotiated rates for UnitedHealthcare, Aetna and Cigna but is missing Blue Cross Blue Shield and Humana — both major commercial payers at this facility. CMS auditors compare your payer list against the plans you contract with. Missing rates = non-compliance.</p>
            <h3 style={{ margin: "18px 0 14px" }}>Finding #2 — Discounted Cash Price Gaps</h3>
            <div className="flag"><span><strong>Risk:</strong> HIGH — required on all items and services</span> <span className="badge badge-red">HIGH RISK</span></div>
            <p style={{ fontSize: 14, color: "var(--muted)", padding: "10px 0" }}>14% of items (mostly laboratory and imaging services) have no discounted cash price. CMS requires this field on every item.</p>
            <h3 style={{ margin: "18px 0 14px" }}>Finding #3 — CMS Crawler Access</h3>
            <div className="flag"><span><strong>Risk:</strong> MEDIUM — file hosted behind bot detection</span> <span className="badge badge-yellow">MEDIUM RISK</span></div>
            <p style={{ fontSize: 14, color: "var(--muted)", padding: "10px 0" }}>The file loads in a browser but returns HTTP 403 to automated crawlers — including CMS&apos;s own file-checking systems. If CMS&apos;s system can&apos;t read your file, it treats it as non-published.</p>
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <p style={{ marginBottom: 18, fontSize: 17, color: "var(--muted)" }}>Want this analysis for YOUR hospital&apos;s file?</p>
            <Link className="btn btn-primary" href="/contact">Get Your Free Risk Check →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
