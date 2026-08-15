import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  title: "How It Works",
  description:
    "How SealOfAudit audits your hospital's CMS price transparency file in 4 steps: send your file, automated validation, expert review, report and remediation. 24-hour risk check.",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "CMS MRF Compliance Audit Process",
  step: [
    { "@type": "HowToStep", position: 1, name: "Discovery", text: "Share your MRF URL or website URL." },
    { "@type": "HowToStep", position: 2, name: "Kickoff", text: "Automated validation against every CMS-required check." },
    { "@type": "HowToStep", position: 3, name: "Execute", text: "Compliance analyst reviews findings and prioritizes fixes." },
    { "@type": "HowToStep", position: 4, name: "Deliver", text: "Report delivered with remediation options." },
  ],
};

const checks = [
  "Payer-specific negotiated charges for all plan types",
  "Discounted cash prices for all items & services",
  "All 70 CMS-required \"shoppable services\"",
  "Gross charges for every item & service",
  "De-identified minimum & maximum negotiated rates",
  "Proper format (JSON/CSV, machine-readable)",
  "File publicly accessible without login or paywall",
  "30+ additional required data elements per CMS spec",
];

export default function HowItWorks() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Breadcrumbs items={[{ name: "How It Works", path: "/how-it-works/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title={'From "Send Your File" to "Fully Compliant" in 4 Steps'}
        sub="No long contracts. No IT project. Just compliance — fast."
      />

      <section>
        <div className="container">
          <div className="workflow-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div className="work-card"><div className="work-num">01 — DISCOVERY</div><h3>Send Your File</h3><p>Share your MRF URL (usually at yoursite.com/price-transparency) or just your website URL — we&apos;ll locate the file for you. If you can&apos;t find it, that&apos;s already a compliance flag we document.</p></div>
            <div className="work-card"><div className="work-num">02 — KICKOFF</div><h3>Automated Validation</h3><p>Our validator runs every CMS-required check: payer-specific negotiated charges, discounted cash prices, all 70 shoppable services, gross charges, file format, and public accessibility without login or paywall.</p></div>
            <div className="work-card"><div className="work-num">03 — EXECUTE</div><h3>Expert Review</h3><p>A compliance analyst reviews the automated findings, confirms what CMS would actually cite, and prioritizes fixes by risk level. This is where machine speed meets human judgment.</p></div>
            <div className="work-card"><div className="work-num">04 — DELIVER</div><h3>Report &amp; Remediation</h3><p>You get a clear report with red flags and a remediation guide. If you want, we fix the file end-to-end and verify CMS-crawler access — with a 30-day re-check to prove you&apos;re clean.</p></div>
          </div>
        </div>
      </section>

      <section className="gray">
        <div className="container">
          <div className="sec-head"><h2>What the Validator Checks</h2><p>Every check maps to a CMS requirement under 45 CFR §180.50. Missing any one is a potential $5,500/day violation.</p></div>
          <div className="checks">
            {checks.map((c) => (
              <div className="check" key={c}><span className="x">✗</span> {c}</div>
            ))}
          </div>
          <p style={{ marginTop: 22 }}><Link className="btn btn-primary" href="/contact">Get Your Free Risk Check</Link></p>
        </div>
      </section>
    </>
  );
}
