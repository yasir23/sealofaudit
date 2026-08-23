import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/compliance-department/" },

  title: "Hospital CMS Compliance Department — Audit, Remediation, Monitoring & Penalty Defense | SealOfAudit",
  description:
    "SealOfAudit runs your hospital's CMS price-transparency compliance function end-to-end: automated audit, MRF remediation, continuous monitoring, and CMS warning-letter defense. $8K-$250K/yr, outcome-based options.",
};

const depts = [
  {
    n: "01",
    title: "COMPLIANCE AUDIT",
    items: [
      "Automated 8-element CMS file scan",
      "Line-item findings with penalty-exposure math",
      "Free scan for every facility — no obligation",
    ],
  },
  {
    n: "02",
    title: "REMEDIATION",
    items: [
      "MRF restructure to the required CMS schema",
      "Plan + rate reconciliation across payer files",
      "Validation re-run — done in ~3 weeks",
    ],
  },
  {
    n: "03",
    title: "CONTINUOUS MONITORING",
    items: [
      "Weekly re-scans, all 8 elements",
      "Schema-change alerts before CMS notices",
      "Compliance-officer dashboard + quarterly score",
    ],
  },
  {
    n: "04",
    title: "PENALTY DEFENSE",
    items: [
      "CMS warning-letter response, filed for you",
      "Corrective-action documentation + evidence file",
      "Escalation per your policy — to resolution",
    ],
  },
];

const steps = [
  ["1", "Inquire", "Facility count, current file, vendor"],
  ["2", "We learn your business", "Vendor, plans, rates, accountability"],
  ["3", "We build the playbook", "Your compliance runbook"],
  ["4", "We go live", "Audit, remediate, monitor, defend"],
  ["5", "We track & improve", "Quarterly compliance score"],
];

export default function ComplianceDepartment() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Compliance Department", path: "/compliance-department/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="The Compliance Department for Hospitals"
        sub="We handle your CMS price-transparency audit, remediation, monitoring and penalty defense — so your team can focus on patient care, not machine-readable files."
      />

      <section style={{ textAlign: "center", padding: "20px 0 0" }}>
        <div className="container">
          <a className="btn" href="tel:+13159532456" style={{ background: "#dc2626", fontSize: 18, padding: "14px 34px" }}>
            📞 Call now: +1 315 953 2456
          </a>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 880 }}>
          <h2>You built a hospital. Not a job answering CMS.</h2>
          <p style={{ fontSize: 17, color: "var(--muted)", marginBottom: 24 }}>
            As enforcement ramps in 2026, the CFO shouldn't be the one chasing MRF schemas,
            plan lists, and enforcement letters. Building an internal compliance team is
            expensive — and managing it becomes another job. SealOfAudit operates your
            compliance function as an extension of your team.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, margin: "32px 0" }}>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 22 }}>
              <h3 style={{ marginBottom: 8 }}>You're the closer</h3>
              <p style={{ color: "var(--muted)", fontSize: 15 }}>The CFO or compliance officer stuck on every vendor file while the penalty clock runs.</p>
            </div>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 22 }}>
              <h3 style={{ marginBottom: 8 }}>Compliance leaks</h3>
              <p style={{ color: "var(--muted)", fontSize: 15 }}>Your file gets checked once a year, then forgotten. CMS checks automatically — and remembers.</p>
            </div>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 22 }}>
              <h3 style={{ marginBottom: 8 }}>Warnings pile up</h3>
              <p style={{ color: "var(--muted)", fontSize: 15 }}>Enforcement letters land on the desk with nobody owning the response.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg,#f8fafc)", padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <h2 style={{ marginBottom: 8 }}>One partner. Four departments.</h2>
          <p style={{ fontSize: 17, color: "var(--muted)", marginBottom: 32 }}>
            Audit · Remediation · Monitoring · Penalty Defense — operating as an extension of your hospital.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24 }}>
            {depts.map((d) => (
              <div key={d.n} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 26, background: "#fff" }}>
                <div style={{ color: "#0a7a4a", fontWeight: 800, letterSpacing: 1, fontSize: 14 }}>{d.n}</div>
                <h3 style={{ margin: "6px 0 12px" }}>{d.title}</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {d.items.map((it) => (
                    <li key={it} style={{ padding: "5px 0 5px 20px", position: "relative", color: "#334155" }}>
                      <span style={{ color: "#0a7a4a", position: "absolute", left: 0, fontWeight: 700 }}>✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 880 }}>
          <h2 style={{ marginBottom: 8 }}>How we work</h2>
          <p style={{ fontSize: 17, color: "var(--muted)", marginBottom: 32 }}>
            Your hospital. Our compliance engine behind it. We learn your file, your vendor, your plans — then operate as an extension of your team.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16 }}>
            {steps.map(([n, t, s]) => (
              <div key={n} style={{ textAlign: "center", padding: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#0a7a4a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, margin: "0 auto 10px" }}>{n}</div>
                <h4 style={{ marginBottom: 4 }}>{t}</h4>
                <p style={{ color: "var(--muted)", fontSize: 13 }}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg,#f8fafc)", padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <h2 style={{ marginBottom: 8 }}>Pricing — outcome-based options</h2>
          <p style={{ fontSize: 17, color: "var(--muted)", marginBottom: 24 }}>
            No long-term contracts. For applicable engagements we only get paid if you stay out of fines.
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
            <tbody>
              <tr><td style={{ border: "1px solid #ddd", padding: 12 }}><strong>Single facility</strong></td><td style={{ border: "1px solid #ddd", padding: 12 }}>$8K-$12K/yr (or $12K one-time)</td></tr>
              <tr><td style={{ border: "1px solid #ddd", padding: 12 }}><strong>Health system (5-20 sites)</strong></td><td style={{ border: "1px solid #ddd", padding: 12 }}>$40K-$75K/yr</td></tr>
              <tr><td style={{ border: "1px solid #ddd", padding: 12 }}><strong>Enterprise / payer-grade (20+ sites)</strong></td><td style={{ border: "1px solid #ddd", padding: 12 }}>$100K-$250K/yr</td></tr>
              <tr><td style={{ border: "1px solid #ddd", padding: 12 }}><strong>Penalty-share option</strong></td><td style={{ border: "1px solid #ddd", padding: 12 }}>We only get paid if you stay out of fines</td></tr>
            </tbody>
          </table>
          <p style={{ margin: "24px 0" }}>
            <Link className="btn" href="/contact">Get your free compliance scan</Link>
            {" "}
            <a className="btn" href="tel:+13159532456" style={{ background: "#dc2626" }}>Call now: +1 315 953 2456</a>
          </p>
        </div>
      </section>
    </>
  );
}
