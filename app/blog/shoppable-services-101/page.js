import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/blog/shoppable-services-101/" },
  title: "Shoppable Services 101: What Patients Are Legally Entitled to See",
  description: "The CMS shoppable services rule explained: the 70 required services, what patients can see, how to publish them correctly, and common gaps that trigger fines.",
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Shoppable Services 101: What Patients Are Legally Entitled to See",
  description: "The CMS shoppable services rule explained: the 70 required services, what patients can see, how to publish them correctly, and common gaps that trigger fines.",
  url: "https://sealofaudit.com/blog/shoppable-services-101",
  datePublished: "2026-09-06",
  dateModified: "2026-09-06",
  author: { "@id": "https://sealofaudit.com/#organization" },
  publisher: { "@id": "https://sealofaudit.com/#organization" },
  image: "https://sealofaudit.com/og-image.png",
  articleSection: "CMS Price Transparency",
  mainEntityOfPage: "https://sealofaudit.com/blog/shoppable-services-101",
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Breadcrumbs items={[{ name: "Insights", path: "/insights/" }, { name: "Shoppable Services 101: What Patients Are Legally Entitled to See", path: "/blog/shoppable-services-101/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/insights", label: "Insights" }]}
        title="Shoppable Services 101: What Patients Are Legally Entitled to See"
      />

      <div style={{"maxWidth": 720, "margin": "0 auto 28px", "padding": "14px 18px", "background": "#f0fdf4", "borderLeft": "4px solid #0a7a4a", "borderRadius": "0 8px 8px 0", "fontSize": 15, "color": "#1e293b"}}>
        <strong style={{"color": "#0a7a4a"}}>SealOfAudit.com</strong> is a CMS price transparency compliance auditor for US hospitals — free 8-point MRF risk check, remediation, and penalty defense.{" "}
        <a href="/services/mrf-remediation/" style={{"color": "#0a7a4a"}}>MRF remediation</a> ·{" "}
        <a href="/services/cms-warning-letter-response/" style={{"color": "#0a7a4a"}}>warning letter response</a> ·{" "}
        <a href="/contact/" style={{"color": "#0a7a4a"}}>contact</a>
      </div>

      <section>
        <div className="container" style={{ maxWidth: 820 }}>
          <div>
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>What shoppable services are</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>CMS selected 70 items and services that patients commonly shop for before care — imaging, lab tests, office visits, and common procedures. Hospitals must publish standard charges for each in a consumer-friendly format.</p>
          </div>
          <div>
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>What patients can see</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>Patients are entitled to the gross charge, the discounted cash price, and payer-specific negotiated rates for each shoppable service — presented so they can compare before choosing a provider.</p>
          </div>
          <div>
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>The format requirement</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>The consumer-friendly list must be searchable and understandable — not a giant undifferentiated table. Each service needs a plain-language description and its billing code.</p>
          </div>
          <div>
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>The machine-file connection</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>The same 70 services must also appear in the machine-readable file with correct codes. Hospitals that pass the consumer list but fail the MRF are still non-compliant.</p>
          </div>
          <div>
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Common shoppable-service gaps</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>Missing services from the 70, non-standard descriptions, absent cash prices, and codes that do not match CMS's list. Each gap is a potential $5,500/day violation.</p>
          </div>
          <div>
            <h2 style={{ fontSize: 24, color: "var(--ink)", margin: "32px 0 14px" }}>Verify your list</h2>
            <p style={{ color: "var(--muted)", marginBottom: 12 }}>A free 8-point check validates all 70 services — presence, codes, descriptions, and prices — in both the consumer list and the MRF.</p>
          </div>

          <div style={{ background: "var(--surface, #f6f6f4)", border: "1px solid #ddd", borderRadius: 12, padding: 24, margin: "32px 0" }}>
            <h3 style={{ marginTop: 0 }}>All 70 services present and correct? Free check validates both files.</h3>
            <p style={{ marginBottom: 16 }}>
              Free 8-point CMS check · 24-hour report · Call +1 315 953 2456 ·{" "}
              <a href="https://calendar.app.google/oL6r8JZmxCiAuRJY7">Book a time</a>
            </p>
            <Link className="btn btn-primary" href="/contact">Get Your Free MRF Risk Check</Link>
          </div>

          <h2>Related reading</h2>
          <ul>
            <li><Link href="/blog/cms-mrf-requirements-2026">Cms Mrf Requirements 2026</Link></li>
            <li><Link href="/blog/what-is-machine-readable-file">What Is Machine Readable File</Link></li>
            <li><Link href="/blog/hospital-price-transparency-requirements">Hospital Price Transparency Requirements</Link></li>
            <li><Link href="/services/mrf-remediation">MRF Remediation Service</Link></li>
            <li><Link href="/services/cms-warning-letter-response">CMS Warning Letter Response</Link></li>
            <li><Link href="/penalty-calculator">CMS Penalty Calculator</Link></li>
          </ul>
        </div>
      </section>
    </>
  );
}
