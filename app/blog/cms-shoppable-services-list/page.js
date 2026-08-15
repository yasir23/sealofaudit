import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/blog/cms-shoppable-services-list/" },

  title: "The CMS Shoppable Services List: All 70 Services and How to Publish Them",
  description:
    "The CMS shoppable services list explained: all 70 required services, how to structure them in your price transparency file, and common mistakes that trigger $5,500/day fines.",
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The CMS Shoppable Services List: All 70 Services and How to Publish Them",
  description: "The CMS shoppable services list explained: all 70 required services, how to structure them in your price transparency file, and common mistakes that trigger $5,500/day fines.",
  url: "https://sealofaudit.com/blog/cms-shoppable-services-list",
  datePublished: "2026-08-11",
  dateModified: "2026-08-14",
  author: { "@id": "https://sealofaudit.com/#organization" },
  publisher: { "@id": "https://sealofaudit.com/#organization" },
  image: "https://sealofaudit.com/og-image.png",
  articleSection: "Data",
  mainEntityOfPage: "https://sealofaudit.com/blog/cms-shoppable-services-list",
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

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Breadcrumbs items={[{ name: "Insights", path: "/insights/" }, { name: "Cms Shoppable Services List", path: "/blog/cms-shoppable-services-list/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/insights", label: "Insights" }]}
        title="The CMS Shoppable Services List: All 70 Services and How to Publish Them"
      />

      <section>
        <div className="container" style={{ maxWidth: 820 }}>
          <div key="What Are Shoppable Services?">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>What Are Shoppable Services?</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>Shoppable services are the 70 items and services CMS selected as ones patients commonly shop for before receiving care — like imaging, lab tests, and office visits. Hospitals must publish standard charges for each in a consumer-friendly format, plus negotiated rates in the machine-readable file.</p>
          </div>
          <div key="The 70 Services by Category">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>The 70 Services by Category</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>The list spans imaging (CT, MRI, ultrasound, X-ray), laboratory tests, evaluation and management visits, surgical procedures, and emergency services. Each is identified by a specific HCPCS or CPT code that must match exactly.</p>
          </div>
          <div key="Format Requirements">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Format Requirements</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>Each shoppable service entry must show: a plain-language description, the billing code, the gross charge, the discounted cash price, and payer-specific negotiated rates. The consumer-friendly format should be easily searchable — not a giant undifferentiated table.</p>
          </div>
          <div key="Common Compliance Mistakes">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Common Compliance Mistakes</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>Hospitals fail most often by: publishing fewer than 70 services, using non-standard descriptions that don't map to CMS codes, omitting cash prices, or listing services only in the machine file and not in a consumer-friendly format.</p>
          </div>
          <div key="Why It Matters">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Why It Matters</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>Each missing or mislabeled shoppable service is a potential violation. At $5,500 per day, ten gaps across one month equal $1.65M in standing exposure.</p>
          </div>
          <div key="The Audit Check">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>The Audit Check</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>A proper compliance audit verifies all 70 services exist, codes match CMS's published list, descriptions are consumer-friendly, and prices are current.</p>
          </div>

          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: 28, textAlign: "center", marginTop: 28 }}>
            <p style={{ fontSize: 17, color: "var(--ink)", fontWeight: 700, marginBottom: 10 }}>Want us to verify all 70 shoppable services in your file? Free risk check — 24-hour turnaround.</p>
            <Link className="btn btn-primary" href="/contact">Get Your Free Risk Check</Link>
          </div>
        </div>
      </section>
    </>
  );
}
