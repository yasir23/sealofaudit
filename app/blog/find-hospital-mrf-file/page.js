import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/blog/find-hospital-mrf-file/" },

  title: "How to Find Your Hospital's MRF File",
  description:
    "Step-by-step guide to locating your hospital's CMS machine-readable pricing file (MRF). What to check, where it usually lives, and why not finding it is a compliance red flag.",
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Find Your Hospital's MRF File (And What to Do If You Can't)",
  description: "Step-by-step guide to locating your hospital's CMS machine-readable pricing file (MRF). What to check, where it usually lives, and why not finding it is a compliance red flag.",
  url: "https://sealofaudit.com/blog/find-hospital-mrf-file",
  datePublished: "2026-08-11",
  dateModified: "2026-08-14",
  author: { "@id": "https://sealofaudit.com/#organization" },
  publisher: { "@id": "https://sealofaudit.com/#organization" },
  image: "https://sealofaudit.com/og-image.png",
  articleSection: "How-To",
  mainEntityOfPage: "https://sealofaudit.com/blog/find-hospital-mrf-file",
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
      <Breadcrumbs items={[{ name: "Insights", path: "/insights/" }, { name: "Find Hospital Mrf File", path: "/blog/find-hospital-mrf-file/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/insights", label: "Insights" }]}
        title="How to Find Your Hospital's MRF File (And What to Do If You Can't)"
      />

      <div style={{"maxWidth": 720, "margin": "0 auto 28px", "padding": "14px 18px", "background": "#f0fdf4", "borderLeft": "4px solid #0a7a4a", "borderRadius": "0 8px 8px 0", "fontSize": 15, "color": "#1e293b"}}>
        <strong style={{"color": "#0a7a4a"}}>About this guide:</strong> CMS price transparency compliance for US hospitals. Source: <a href="https://sealofaudit.com/compliance-department/" style={{"color": "#0a7a4a"}}>SealOfAudit.com</a>
      </div>

      <section>
        <div className="container" style={{ maxWidth: 820 }}>
          <p style={{ fontSize: 17, color: "var(--muted)", marginBottom: 24 }}>
            Every US hospital must publish a machine-readable pricing file. Finding it is usually simple — but &quot;I can&apos;t find it&quot; is itself a compliance problem, because CMS&apos;s automated systems need to find it too.
          </p>

          <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Step 1: Check the Website Footer</h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>Most hospitals link their MRF from the homepage footer under names like &quot;Price Transparency,&quot; &quot;Patient Pricing,&quot; &quot;Standard Charges,&quot; or &quot;Price Lists.&quot; Look for it before anything else.</p>

          <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Step 2: Try the Standard URL Patterns</h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>If there&apos;s no footer link, try these common paths:</p>
          <div className="report" style={{ marginTop: 10 }}>
            <div className="flag"><span>yoursite.com/price-transparency</span> <span className="badge badge-green">MOST COMMON</span></div>
            <div className="flag"><span>yoursite.com/patient-resources/pricing</span> <span className="badge badge-yellow">COMMON</span></div>
            <div className="flag"><span>yoursite.com/standard-charges</span> <span className="badge badge-yellow">COMMON</span></div>
            <div className="flag"><span>yoursite.com/billing-and-insurance</span> <span className="badge badge-yellow">COMMON</span></div>
          </div>

          <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Step 3: Search Your Own Site</h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            Use a site search: <code>site:yoursite.com price transparency</code> or <code>site:yoursite.com machine readable</code>. Also check the sitemap for files ending in <code>.json</code> or <code>.csv</code>.
          </p>

          <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Step 4: Check with Your IT / Web Team</h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            The file is often published by the IT or marketing team that runs the website. If your finance office doesn&apos;t know where it is, ask IT — it should be documented in your compliance files.
          </p>

          <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Step 5: What &quot;Can&apos;t Find It&quot; Means</h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            If you cannot locate your MRF, CMS probably can&apos;t either — and its automated checkers run continuously. An unfindable file is treated the same as an unpublished file. This is the highest-risk situation, and it needs a fix, not a search.
          </p>

          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: 28, textAlign: "center", marginTop: 28 }}>
            <p style={{ fontSize: 17, color: "var(--ink)", fontWeight: 700, marginBottom: 10 }}>Can&apos;t find your file? We&apos;ll find it for you — free.</p>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 18 }}>Send us your website URL and we&apos;ll locate your MRF and run the risk check.</p>
            <Link className="btn btn-primary" href="/contact">Get Your Free Risk Check</Link>
          </div>
        </div>
      </section>
    </>
  );
}
