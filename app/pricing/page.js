import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata = {
  title: "Pricing",
  description:
    "SealOfAudit pricing: Free CMS MRF risk check, $3,500 compliance audit, $15,000 full remediation. Compare costs vs CMS fines of $5,500 per day.",
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "CMS Price Transparency Compliance Audit",
  provider: { "@id": "https://sealofaudit.com/#organization" },
  description: "Machine-readable file (MRF) validation and remediation under 45 CFR 180.50",
  offers: [
    {
      "@type": "Offer",
      name: "Free MRF Risk Check",
      price: "0",
      priceCurrency: "USD",
      url: "https://sealofaudit.com/contact/",
    },
    {
      "@type": "Offer",
      name: "Compliance Audit",
      price: "3500",
      priceCurrency: "USD",
      url: "https://sealofaudit.com/pricing/",
    },
    {
      "@type": "Offer",
      name: "Full Remediation",
      price: "15000",
      priceCurrency: "USD",
      url: "https://sealofaudit.com/pricing/",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://sealofaudit.com/" },
    { "@type": "ListItem", position: 2, name: "Pricing", item: "https://sealofaudit.com/pricing/" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does the $3,500 audit include remediation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — the audit documents every gap with a line-item remediation guide. Fixing the file is the separate Full Remediation package ($15,000). Most clients use the audit to get internal budget approval first.",
      },
    },
    {
      "@type": "Question",
      name: "Is the MRF risk check really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The risk check is free and you keep the report. We make money only if you decide to fix what we find.",
      },
    },
    {
      "@type": "Question",
      name: "What does Full Remediation include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "End-to-end MRF rebuild or repair, hosting and CMS-crawler access verification, quarterly compliance monitoring, staff training, and direct support during CMS audits. Flat $15,000, ~1-2 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "How does pricing compare to CMS fines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CMS fines run $5,500 per day per violation with no cap — a single 30-day gap is $165,000 in exposure. Every SealOfAudit package costs less than one week of non-compliance.",
      },
    },
  ],
};

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="Simple, Risk-Based Pricing"
        sub="Every dollar of our fee is cheaper than one day of CMS fines. Start free, pay only when you want remediation."
      />

      <section>
        <div className="container">
          <div className="pricing-grid">
            <div className="card">
              <h3>Risk Check</h3>
              <div className="price">FREE</div>
              <div className="per">24-hour turnaround</div>
              <ul>
                <li>Full MRF validation vs CMS spec</li>
                <li>Red-flag summary (high/medium/low)</li>
                <li>What CMS would cite</li>
                <li>No obligation</li>
              </ul>
              <Link className="btn btn-primary" href="/contact">Start Free</Link>
            </div>
            <div className="card featured">
              <h3>Compliance Audit</h3>
              <div className="price">$3,500</div>
              <div className="per">one-time · 3-5 days</div>
              <ul>
                <li>Everything in Risk Check</li>
                <li>5-page detailed compliance report</li>
                <li>Line-item remediation guide</li>
                <li>Payer-by-payer gap analysis</li>
                <li>Board-ready executive summary</li>
                <li>30-day follow-up re-check</li>
              </ul>
              <Link className="btn btn-primary" href="/contact">Get Audited</Link>
            </div>
            <div className="card">
              <h3>Full Remediation</h3>
              <div className="price">$15,000</div>
              <div className="per">one-time + optional retainer</div>
              <ul>
                <li>Everything in Compliance Audit</li>
                <li>We rebuild / repair your MRF</li>
                <li>Hosting &amp; CMS-crawler verification</li>
                <li>Quarterly compliance monitoring</li>
                <li>Direct support during CMS audits</li>
                <li>Staff training on file maintenance</li>
              </ul>
              <Link className="btn btn-primary" href="/contact">Talk to Us</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="gray">
        <div className="container">
          <div className="sec-head"><h2>The Cost of Doing Nothing</h2><p>CMS penalties accrue daily — here&apos;s what non-compliance actually costs.</p></div>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Scenario</th><th>Fine per day</th><th>Days</th><th>Total exposure</th><th>vs SealOfAudit audit</th></tr></thead>
              <tbody>
                <tr><td>Single violation, 1 week</td><td>$5,500</td><td>7</td><td>$38,500</td><td>Free risk check finds it day 1</td></tr>
                <tr><td>Single violation, 1 month</td><td>$5,500</td><td>30</td><td>$165,000</td><td>$3,500 audit = 2% of exposure</td></tr>
                <tr><td>Multiple violations, 3 months</td><td>$5,500 × N</td><td>90</td><td>$500K – $1.5M</td><td>$15,000 remediation = insurance</td></tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 18, fontSize: 14, color: "var(--muted)" }}>Estimates based on CMS enforcement actions under 45 CFR §180.50. Actual penalties vary by case.</p>
        </div>
      </section>
    </>
  );
}
