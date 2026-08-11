import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata = {
  title: "Insights",
  description:
    "Expert insights on CMS price transparency: MRF requirements, penalty enforcement, hospital compliance guides, payer-specific negotiated rates. Updated regularly.",
};

const posts = [
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
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="CMS Price Transparency Insights"
        sub="Practical guidance on machine-readable files, CMS penalties, and hospital compliance — written for finance and compliance teams."
      />

      <section>
        <div className="container">
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
