import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/blog/mrf-json-format-guide/" },

  title: "MRF JSON Format Guide: How to Structure Your Machine-Readable File Correctly",
  description:
    "The MRF JSON format explained: required structure, data fields, payer/plan grouping, code mapping, and validation — how to make your machine-readable file parse cleanly.",
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "MRF JSON Format Guide: How to Structure Your Machine-Readable File Correctly",
  description: "The MRF JSON format explained: required structure, data fields, payer/plan grouping, code mapping, and validation — how to make your machine-readable file parse cleanly.",
  url: "https://sealofaudit.com/blog/mrf-json-format-guide",
  datePublished: "2026-08-11",
  dateModified: "2026-08-14",
  author: { "@id": "https://sealofaudit.com/#organization" },
  publisher: { "@id": "https://sealofaudit.com/#organization" },
  image: "https://sealofaudit.com/og-image.png",
  articleSection: "Data",
  mainEntityOfPage: "https://sealofaudit.com/blog/mrf-json-format-guide",
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
      <Breadcrumbs items={[{ name: "Insights", path: "/insights/" }, { name: "Mrf Json Format Guide", path: "/blog/mrf-json-format-guide/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/insights", label: "Insights" }]}
        title="MRF JSON Format Guide: How to Structure Your Machine-Readable File Correctly"
      />

      <section>
        <div className="container" style={{ maxWidth: 820 }}>
          <div key="Why Format Matters">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Why Format Matters</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>CMS requires a machine-readable format — JSON or CSV that software can parse automatically. If your file doesn't parse cleanly, CMS treats the data as not published. Format errors trigger the same $5,500/day fine as missing data.</p>
          </div>
          <div key="The Core JSON Structure">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>The Core JSON Structure</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>A compliant MRF groups data by payer, then by plan, then by item or service. Each entry includes: billing code, description, gross charge, discounted cash price, and negotiated rate. The JSON must be valid, complete, and consistent.</p>
          </div>
          <div key="Required Data Fields">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Required Data Fields</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>At minimum: item name, billing code (CPT/HCPCS), gross charge, discounted cash price, minimum and maximum negotiated rates, and per-payer negotiated rates with clear plan identifiers.</p>
          </div>
          <div key="Common JSON Errors">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Common JSON Errors</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>The most frequent issues: malformed JSON (missing brackets, trailing commas), inconsistent code formats, duplicate entries, empty price fields, and files that exceed CMS size limits or time out.</p>
          </div>
          <div key="Testing Your File">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Testing Your File</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>Before publishing, validate the JSON with a parser, verify all fields are populated, and confirm an automated crawler (not just a browser) can download it.</p>
          </div>
          <div key="The Validator Advantage">
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>The Validator Advantage</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>A compliance validator parses your file exactly the way CMS's systems do — catching format errors, missing fields, and structural problems before they become fines.</p>
          </div>

          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: 28, textAlign: "center", marginTop: 28 }}>
            <p style={{ fontSize: 17, color: "var(--ink)", fontWeight: 700, marginBottom: 10 }}>Not sure your JSON parses cleanly? Free MRF risk check catches format errors too.</p>
            <Link className="btn btn-primary" href="/contact">Get Your Free Risk Check</Link>
          </div>
        </div>
      </section>
    </>
  );
}
