import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/insights/" },

  title: "Insights",
  description:
    "Expert insights on CMS price transparency: MRF requirements, penalty enforcement, hospital compliance guides, payer-specific negotiated rates. Updated regularly.",
};

const posts = [
  { cat: "Penalties", title: "CMS Price Transparency Enforcement: 28 Fines, 1,249 Warnings, and Why 2026 Changes the Math", desc: "The real CMS enforcement data — 28 civil monetary penalties vs 1,249+ warning letters — and what the new AI-enabled audit capability means for escalation rates.", href: "/blog/cms-enforcement-actions-2026", time: "5 min" },
  { cat: "Penalties", title: "Hospital Price Transparency Lawsuits: The ERISA/Fiduciary Angle", desc: "Beyond CMS fines: ERISA fiduciary suits over hidden negotiated rates. How a clean MRF is litigation defense.", href: "/blog/hospital-price-transparency-lawsuits", time: "5 min" },
  { cat: "Data", title: "MRF vs Price Estimator Tool: What CMS Actually Requires", desc: "An estimator is not a machine-readable file. CMS requires both — here's the difference and why it's a common fine trigger.", href: "/blog/mrf-vs-price-estimator-tool", time: "4 min" },
  { cat: "Compliance", title: "CMS Machine-Readable File Requirements: The Complete 2026 Checklist", desc: "Every data element CMS requires in your MRF, explained in plain language — and the 5 most common reasons hospitals fail.", href: "/blog/cms-mrf-requirements-2026", time: "6 min" },
  { cat: "Compliance", title: "Hospital Price Transparency Requirements: What Every US Hospital Must Publish", desc: "Complete guide to the CMS price transparency rule: machine-readable files, shoppable services, standard charges, and deadlines.", href: "/blog/hospital-price-transparency-requirements", time: "7 min" },
  { cat: "Penalties", title: "How CMS Fines Hospitals: Real Penalty Amounts and What Triggers Them", desc: "$5,500 per day adds up fast. Here's how CMS calculates penalties, real enforcement examples, and how to reduce your exposure.", href: "/blog/cms-fines-hospital-price-transparency", time: "5 min" },
  { cat: "Penalties", title: "CMS Price Transparency Fines: Hospitals Cited, Amounts, and Lessons", desc: "Real CMS enforcement actions: what triggered them, what they cost, and how to avoid becoming the next example.", href: "/blog/cms-price-transparency-fines-list", time: "6 min" },
  { cat: "Data", title: "The CMS Shoppable Services List: All 70 Services and How to Publish Them", desc: "All 70 required shoppable services, how to structure them, and common mistakes that trigger $5,500/day fines.", href: "/blog/cms-shoppable-services-list", time: "7 min" },
  { cat: "Data", title: "Standard Charges vs Negotiated Rates: The Difference That Determines Compliance", desc: "Gross charges, cash prices, and negotiated rates — what each means, where they go, and why getting them wrong triggers fines.", href: "/blog/standard-charges-vs-negotiated-rates", time: "6 min" },
  { cat: "Technical", title: "MRF JSON Format Guide: How to Structure Your Machine-Readable File Correctly", desc: "Required structure, data fields, payer/plan grouping, and validation — how to make your MRF parse cleanly.", href: "/blog/mrf-json-format-guide", time: "6 min" },
  { cat: "How-To", title: "How to Find Your Hospital's MRF File (And What to Do If You Can't)", desc: "Step-by-step guide to locating your price-transparency file — and why not finding it is itself a compliance red flag.", href: "/blog/find-hospital-mrf-file", time: "4 min" },
  { cat: "Checklist", title: "The Hospital Price Transparency Compliance Checklist: 15 Points Before CMS Audits You", desc: "A 15-point checklist: MRF completeness, crawler access, shoppable services, cash prices, negotiated rates, and maintenance.", href: "/blog/price-transparency-compliance-checklist", time: "5 min" },
  { cat: "Data", title: "Payer-Specific Negotiated Rates: A Practical Guide for Hospital Finance Teams", desc: "What counts as a payer-specific negotiated rate, how to structure it in your MRF, and the mistakes CMS flags most.", href: "/blog/payer-specific-negotiated-rates-guide", time: "7 min" },
];

export default function Insights() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Insights", path: "/insights/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="CMS Price Transparency Insights"
        sub="Practical guidance on machine-readable files, CMS penalties, and hospital compliance — written for finance and compliance teams."
      />

      <section>
        <div className="container">
          <h2 style={{ fontSize: 22, color: "var(--ink)", marginBottom: 12 }}>State Requirements</h2>
          <p style={{ color: "var(--muted)", marginBottom: 18 }}>
            States with their own price-transparency rules layered on the federal baseline:
          </p>
          <div className="post-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 32 }}>
            {[
              ["Colorado", "/insights/state/colorado-hospital-price-transparency-requirements"],
              ["Texas", "/insights/state/texas-hospital-price-transparency-requirements"],
              ["California", "/insights/state/california-hospital-price-transparency-requirements"],
              ["Oregon", "/insights/state/oregon-hospital-price-transparency-requirements"],
              ["Massachusetts", "/insights/state/massachusetts-hospital-price-transparency-requirements"],
              ["Maryland", "/insights/state/maryland-hospital-price-transparency-requirements"],
              ["Washington", "/insights/state/washington-hospital-price-transparency-requirements"],
              ["Nevada", "/insights/state/nevada-hospital-price-transparency-requirements"],
            ].map(([name, href]) => (
              <Link className="post-card" key={href} href={href} style={{ padding: 14 }}>
                <h3 style={{ fontSize: 16, margin: 0 }}>{name}</h3>
              </Link>
            ))}
          </div>
          <div className="post-grid">
            {posts.map((p) => (
              <Link className="post-card" key={p.href} href={p.href}>
                <div className="cat">{p.cat}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="post-meta">Read time: {p.time}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="gray" style={{ textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: 26, color: "var(--ink)", marginBottom: 12 }}>Not sure if your file is compliant?</h2>
          <p style={{ color: "var(--muted)", marginBottom: 22 }}>Get your free MRF risk check — 24-hour turnaround, no obligation.</p>
          <Link className="btn btn-primary" href="/contact">Get Free Risk Check</Link>
        </div>
      </section>
    </>
  );
}
