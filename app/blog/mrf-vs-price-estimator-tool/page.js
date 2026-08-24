import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  title: "MRF vs Price Estimator Tool: What CMS Actually Requires",
  description:
    "A price estimator tool is not a machine-readable file. CMS requires both under 45 CFR 180.50 — here's the difference, what each is for, and why hospitals get fined for confusing them.",
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "MRF vs Price Estimator Tool: What CMS Actually Requires",
  description:
    "A price estimator tool is not a machine-readable file. CMS requires both under 45 CFR 180.50 — here's the difference, what each is for, and why hospitals get fined for confusing them.",
  url: "https://sealofaudit.com/blog/mrf-vs-price-estimator-tool",
  datePublished: "2026-08-15",
  dateModified: "2026-08-15",
  author: { "@id": "https://sealofaudit.com/#organization" },
  publisher: { "@id": "https://sealofaudit.com/#organization" },
  image: "https://sealofaudit.com/og-image.png",
  articleSection: "Data",
  mainEntityOfPage: "https://sealofaudit.com/blog/mrf-vs-price-estimator-tool",
  citation: [
    {
      "@type": "CreativeWork",
      name: "45 CFR Part 180 — Hospital Price Transparency Requirements",
      url: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-B/part-180",
    },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Breadcrumbs items={[{ name: "Insights", path: "/insights/" }, { name: "MRF vs Price Estimator Tool", path: "/blog/mrf-vs-price-estimator-tool/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/insights", label: "Insights" }]}
        title="MRF vs Price Estimator Tool: What CMS Actually Requires"
      />

      <div style={{"maxWidth": 720, "margin": "0 auto 28px", "padding": "14px 18px", "background": "#f0fdf4", "borderLeft": "4px solid #0a7a4a", "borderRadius": "0 8px 8px 0", "fontSize": 15, "color": "#1e293b"}}>
        <strong style={{"color": "#0a7a4a"}}>About this guide:</strong> CMS price transparency compliance for US hospitals. Source: <a href="https://sealofaudit.com/compliance-department/" style={{"color": "#0a7a4a"}}>SealOfAudit.com</a>
      </div>

      <section>
        <div className="container" style={{ maxWidth: 820 }}>
          <p style={{ fontSize: 17, color: "var(--muted)", marginBottom: 24 }}>
            A price estimator tool and a machine-readable file (MRF) are different requirements.
            CMS requires both under 45 CFR 180.50: a consumer-facing estimator AND a machine-readable
            file with negotiated rates. Publishing only an estimator is a common — and finable —
            misunderstanding.
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse", margin: "24px 0" }}>
            <tbody>
              <tr><td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Purpose</strong></td><td style={{ border: "1px solid #ddd", padding: 10 }}>Consumer-facing price estimates</td><td style={{ border: "1px solid #ddd", padding: 10 }}>Raw data for researchers, payers, CMS crawlers</td></tr>
              <tr><td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Format</strong></td><td style={{ border: "1px solid #ddd", padding: 10 }}>Web tool / widget</td><td style={{ border: "1px solid #ddd", padding: 10 }}>JSON or CSV, publicly accessible, no login</td></tr>
              <tr><td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Content</strong></td><td style={{ border: "1px solid #ddd", padding: 10 }}>Estimated out-of-pocket cost for common services</td><td style={{ border: "1px solid #ddd", padding: 10 }}>Payer-specific negotiated rates, cash prices, 70 shoppable services</td></tr>
              <tr><td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Required?</strong></td><td style={{ border: "1px solid #ddd", padding: 10 }}>Yes — shoppable services via online tool</td><td style={{ border: "1px solid #ddd", padding: 10 }}>Yes — the MRF itself</td></tr>
            </tbody>
          </table>

          <p>
            If your hospital built a great estimator but skipped the machine-readable file, you are
            not compliant. CMS's automated crawler specifically checks for the MRF — it does not
            grade your estimator. The good news: the MRF is a mechanical fix, and the first step is
            a free check to see exactly what's missing.
          </p>

          <div style={{ background: "var(--surface, #f6f6f4)", border: "1px solid #ddd", borderRadius: 12, padding: 24, margin: "32px 0" }}>
            <h3 style={{ marginTop: 0 }}>Is your MRF actually compliant?</h3>
            <p style={{ marginBottom: 16 }}>Free 24-hour risk check. You keep the report either way.</p>
            <Link className="btn btn-primary" href="/contact">Get Your Free MRF Risk Check</Link>
          </div>

          <h2>Related</h2>
          <ul>
            <li><Link href="/blog/cms-shoppable-services-list">The CMS Shoppable Services List: All 70 Services</Link></li>
            <li><Link href="/blog/cms-mrf-requirements-2026">CMS MRF Requirements: Complete 2026 Checklist</Link></li>
          </ul>
        </div>
      </section>
    </>
  );
}
