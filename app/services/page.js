import PageHero from "@/components/PageHero";
import Tilt4D from "@/components/Tilt4D";
import Link from "next/link";

export const metadata = {
  title: "Services",
  description:
    "SealOfAudit services: free CMS MRF risk check, $3,500 compliance audit, $15,000 full remediation. Every service validated against 45 CFR 180.50 price transparency rules.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CMS Price Transparency Compliance Audit",
  provider: { "@id": "https://sealofaudit.com/#organization" },
  areaServed: { "@type": "Country", name: "United States" },
  serviceType: "CMS Price Transparency Compliance Audit",
  description: "Machine-readable file validation against 45 CFR 180.50",
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
    { "@type": "ListItem", position: 2, name: "Services", item: "https://sealofaudit.com/services/" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the $3,500 compliance audit include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 5-page detailed compliance report with a line-item remediation guide, payer-by-payer gap analysis, board-ready executive summary, and a 30-day follow-up re-check of your file.",
      },
    },
    {
      "@type": "Question",
      name: "Does the $3,500 audit include remediation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — the audit identifies and documents every gap. Fixing the file is a separate Full Remediation engagement ($15,000). Many hospitals use the audit report to get internal budget approval for remediation.",
      },
    },
    {
      "@type": "Question",
      name: "Which CMS checks do you validate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every requirement under 45 CFR 180.50: file accessibility, reporting structure, plan identification, in-network file links, payer-specific negotiated rates, cash prices, the 70-item shoppable services list, and file size/schema sanity.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can you audit my MRF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Risk Check: 24 hours from URL submission. Full Compliance Audit: 3-5 business days. Full Remediation: 1-2 weeks depending on file complexity.",
      },
    },
  ],
};

export default function Services() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="Compliance Services Built for Hospitals"
        sub="Three service tiers — every one maps directly to what CMS auditors check under 45 CFR §180.50."
      />

      <section>
        <div className="container">
          <div className="services-grid">
            <Tilt4D max={7}>
              <div className="svc-card">
                <div className="svc-icon">🔍</div>
                <h3>Free MRF Risk Check</h3>
                <p><strong>FREE · 24-hour turnaround</strong></p>
                <p>Full validation of your machine-readable file against the CMS spec. Automated checks cover payer-specific negotiated charges, discounted cash prices, all 70 shoppable services, gross charges, and file format &amp; public accessibility.</p>
                <p style={{ marginTop: 12 }}>You get a red-flag summary with high/medium/low risk ratings and exactly what CMS would cite. No obligation.</p>
                <Link className="svc-link" href="/contact">Start free →</Link>
              </div>
            </Tilt4D>
            <Tilt4D max={7}>
              <div className="svc-card">
                <div className="svc-icon">📋</div>
                <h3>Compliance Audit</h3>
                <p><strong>$3,500 · one-time · 3-5 days</strong></p>
                <p>Everything in the Risk Check, plus a 5-page detailed compliance report, line-item remediation guide, payer-by-payer gap analysis, board-ready executive summary, and a 30-day follow-up re-check.</p>
                <p style={{ marginTop: 12 }}>The report documents your compliance posture — useful if CMS asks questions later.</p>
                <Link className="svc-link" href="/pricing">See pricing →</Link>
              </div>
            </Tilt4D>
            <Tilt4D max={7}>
              <div className="svc-card">
                <div className="svc-icon">🛠️</div>
                <h3>Full Remediation</h3>
                <p><strong>$15,000 · one-time + optional retainer</strong></p>
                <p>Everything in the Compliance Audit, plus we rebuild or repair your MRF, verify hosting &amp; CMS-crawler access, quarterly compliance monitoring, direct support during CMS audits, and staff training on file maintenance.</p>
                <p style={{ marginTop: 12 }}>End-to-end: from non-compliant to audit-ready, with ongoing protection.</p>
                <Link className="svc-link" href="/contact">Talk to us →</Link>
              </div>
            </Tilt4D>
          </div>
        </div>
      </section>

      <section className="gray">
        <div className="container">
          <div className="sec-head"><h2>Which Service Do You Need?</h2><p>A quick decision guide for hospital finance and compliance teams.</p></div>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Your Situation</th><th>Recommended Service</th><th>Why</th></tr></thead>
              <tbody>
                <tr><td>&quot;We think we&apos;re compliant but aren&apos;t sure&quot;</td><td>Free Risk Check</td><td>Zero cost, 24 hours, tells you exactly where you stand</td></tr>
                <tr><td>&quot;CMS asked questions / we got a warning&quot;</td><td>Compliance Audit</td><td>Documented report + remediation guide for your response</td></tr>
                <tr><td>&quot;Our file is missing data / wrong format&quot;</td><td>Full Remediation</td><td>We rebuild the file and verify CMS-crawler access</td></tr>
                <tr><td>&quot;We&apos;ve been cited / under investigation&quot;</td><td>Full Remediation + Support</td><td>Direct support during CMS audit, file fixed and verified</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
