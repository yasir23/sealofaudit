import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/blog/cms-mrf-requirements-2026/" },

  title: "CMS Machine-Readable File Requirements: Complete 2026 Checklist",
  description:
    "The complete 2026 CMS machine-readable file (MRF) requirements checklist. Every data element hospitals must publish under 45 CFR 180.50, plus the 5 most common reasons hospitals fail audits.",
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CMS Machine-Readable File Requirements: Complete 2026 Checklist",
  description: "The complete 2026 CMS machine-readable file (MRF) requirements checklist. Every data element hospitals must publish under 45 CFR 180.50, plus the 5 most common reasons hospitals fail audits.",
  url: "https://sealofaudit.com/blog/cms-mrf-requirements-2026",
  datePublished: "2026-08-11",
  dateModified: "2026-08-14",
  author: { "@id": "https://sealofaudit.com/#organization" },
  publisher: { "@id": "https://sealofaudit.com/#organization" },
  image: "https://sealofaudit.com/og-image.png",
  articleSection: "Compliance",
  mainEntityOfPage: "https://sealofaudit.com/blog/cms-mrf-requirements-2026",
  citation: [
    {
      "@type": "CreativeWork",
      name: "45 CFR Part 180 — Hospital Price Transparency Requirements",
      url: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-B/part-180",
    },
    {
      "@type": "CreativeWork",
      name: "CMS Price Transparency Enforcement Actions",
      url: "https://www.cms.gov/hospital-price-transparency/enforcement",
    },
  ],
};

const checks = [
  ["Payer-specific negotiated charges", "the rate each plan agrees to pay, for every item/service, for every plan the hospital contracts with."],
  ["Discounted cash price", "the price for cash-paying patients, on every item and service."],
  ["Gross charges", "the full undiscounted charge for every item and service."],
  ["De-identified minimum & maximum negotiated rates", "the low and high negotiated rates across all payers."],
  ["All 70 shoppable services", "CMS publishes a specific list of 70 services that must appear by name."],
  ["Additional required data elements", "30+ fields including billing codes, drug details, and plan identifiers."],
  ["Machine-readable format", "JSON or CSV, structured so software can parse it without human reading."],
  ["Public accessibility", "no login, no paywall, no bot-blocking; CMS's automated checkers must reach it."],
];

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Breadcrumbs items={[{ name: "Insights", path: "/insights/" }, { name: "Cms Mrf Requirements 2026", path: "/blog/cms-mrf-requirements-2026/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/insights", label: "Insights" }]}
        title="CMS Machine-Readable File Requirements: The Complete 2026 Checklist"
      />

      <section>
        <div className="container" style={{ maxWidth: 820 }}>
          <p style={{ fontSize: 17, color: "var(--muted)", marginBottom: 24 }}>
            Under 45 CFR §180.50, every US hospital must publish a machine-readable file (MRF) listing prices for all items and services. CMS has issued 1,000+ penalty actions since enforcement began — and industry studies still find 30–55% of files deficient. Here&apos;s exactly what the file must contain.
          </p>

          <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>The 8 Required Data Categories</h2>
          <div className="checks" style={{ gridTemplateColumns: "1fr" }}>
            {checks.map(([k, v]) => (
              <div className="check" key={k}><span className="x">✗</span><div><strong>{k}</strong> — {v}</div></div>
            ))}
          </div>

          <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>The 5 Most Common Reasons Hospitals Fail</h2>
          <div className="report" style={{ marginTop: 10 }}>
            <div className="flag"><span>1. Missing payers — file covers only 2-3 of 5+ major commercial payers</span> <span className="badge badge-red">COMMON</span></div>
            <div className="flag"><span>2. Cash price gaps — discounted cash price absent on lab/imaging items</span> <span className="badge badge-red">COMMON</span></div>
            <div className="flag"><span>3. Shoppable services — under 70, or named differently than CMS expects</span> <span className="badge badge-yellow">COMMON</span></div>
            <div className="flag"><span>4. Bot-blocking — file loads in browser but 403s automated crawlers</span> <span className="badge badge-yellow">COMMON</span></div>
            <div className="flag"><span>5. Stale file — published once, never updated after contract changes</span> <span className="badge badge-yellow">COMMON</span></div>
          </div>

          <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>What Non-Compliance Costs</h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            CMS fines <strong>$5,500 per day per violation</strong>. One missing payer rate, left unfixed for a month, is $165,000. Multiple violations across months can reach seven figures. The fine is per <em>day</em> — it accrues while you work on the fix.
          </p>

          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: 28, textAlign: "center", marginTop: 28 }}>
            <p style={{ fontSize: 17, color: "var(--ink)", fontWeight: 700, marginBottom: 10 }}>Not sure your file passes every check above?</p>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 18 }}>Get a free MRF risk check — 24-hour turnaround, no obligation.</p>
            <Link className="btn btn-primary" href="/contact">Get Your Free Risk Check</Link>
          </div>
        </div>
      </section>
    </>
  );
}
