import Link from "next/link";
import Hero3D from "@/components/Hero3D";

export const metadata = {
  title: "SealOfAudit — CMS Price Transparency Compliance Audits for US Hospitals",
  description:
    "Free CMS machine-readable file (MRF) risk check for US hospitals. CMS fines $5,500/day for non-compliance. Get your price transparency compliance report in 24 hours. Audits from $3,500.",
};

const services = [
  {
    icon: "🔍",
    title: "Free MRF Risk Check",
    desc: "Full validation of your machine-readable file against the CMS spec. Red-flag summary with high/medium/low risk ratings. 24-hour turnaround. No obligation.",
    link: "/how-it-works",
    cta: "How it works →",
  },
  {
    icon: "📋",
    title: "Compliance Audit",
    desc: "5-page detailed compliance report. Line-item remediation guide, payer-by-payer gap analysis, and a 30-day follow-up re-check to prove you're clean.",
    link: "/pricing",
    cta: "Pricing →",
  },
  {
    icon: "🛠️",
    title: "Full Remediation",
    desc: "We rebuild or repair your MRF, verify hosting and CMS-crawler access, and provide direct support during CMS audits. Quarterly monitoring included.",
    link: "/pricing",
    cta: "Pricing →",
  },
];

const workflow = [
  { num: "01 — DISCOVERY", title: "Send Your File", desc: "Share your MRF URL (usually at yoursite.com/price-transparency) or just your website URL and we locate it." },
  { num: "02 — KICKOFF", title: "Automated Validation", desc: "Our validator runs every CMS-required check: payer rates, cash prices, shoppable services, format, accessibility." },
  { num: "03 — EXECUTE", title: "Expert Review", desc: "A compliance analyst reviews automated findings, confirms what CMS would actually cite, and prioritizes fixes." },
  { num: "04 — DELIVER", title: "Report & Remediation", desc: "You get a clear report — and if you want, we fix the file end-to-end with a 30-day re-check." },
];

const faq = [
  { q: "Is the MRF risk check really free?", a: "Yes. The risk check is free and you keep the report. We make money only if you decide to fix what we find." },
  { q: "How do I find my hospital's MRF URL?", a: "Most hospitals link it from their website footer or a /price-transparency page. If you can't find it, that's already a flag — send us your website URL and we'll locate it." },
  { q: "What happens if CMS audits my hospital?", a: "CMS can fine $5,500 per day per violation. With multiple violations across months, exposure can reach hundreds of thousands. Our Full Remediation package includes direct support during CMS audits." },
  { q: "How fast can you audit my MRF?", a: "Risk Check: 24 hours from URL submission. Full Compliance Audit: 3-5 business days. Full Remediation: 1-2 weeks depending on file complexity." },
  { q: "What is a machine-readable file (MRF)?", a: "An MRF is a JSON or CSV file every US hospital must publish listing gross charges, discounted cash prices, and payer-specific negotiated rates for all items and services. It must be publicly accessible without login." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SealOfAudit",
  description: "CMS price transparency compliance audits for US hospitals. Machine-readable file (MRF) validation against 45 CFR 180.50.",
  url: "https://sealofaudit.com",
  areaServed: "US",
  provider: { "@type": "Organization", name: "AgentTrac.ai" },
  offers: [
    { "@type": "Offer", name: "Free MRF Risk Check", price: "0", priceCurrency: "USD" },
    { "@type": "Offer", name: "Compliance Audit", price: "3500", priceCurrency: "USD" },
    { "@type": "Offer", name: "Full Remediation", price: "15000", priceCurrency: "USD" },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <header className="hero">
        <div className="container">
          <div className="fine-badge">⚠ CMS FINES $5,500 PER DAY FOR NON-COMPLIANT PRICING FILES — 45 CFR §180.50</div>
          <h1>Is Your Hospital&apos;s Machine-Readable File <em>CMS-Compliant?</em></h1>
          <p className="sub">
            Every US hospital must publish payer-specific negotiated rates in a machine-readable file (MRF).
            Industry studies show 30–55% of hospitals still fail audits. One flagged month = $165,000 in exposure.
            We&apos;ll check yours free — 24-hour turnaround.
          </p>
          <div className="hero-btns">
            <Link className="btn btn-primary" href="/contact">Get Your Free MRF Risk Check</Link>
            <Link className="btn btn-ghost" href="/how-it-works">See What We Check</Link>
          </div>
        </div>
        <div className="hero-3d">
          <Hero3D />
        </div>
      </header>

      {/* STATS */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div><div className="stat-figure">$5,500<small>/day</small></div><div className="stat-desc">CMS fine per violation</div></div>
            <div><div className="stat-figure">$165K</div><div className="stat-desc">Exposure for one flagged month</div></div>
            <div><div className="stat-figure">1,000+</div><div className="stat-desc">Penalty actions already issued</div></div>
            <div><div className="stat-figure">24<small>hrs</small></div><div className="stat-desc">From file URL to full report</div></div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="sec-head">
            <h2>Compliance Services Built for Hospitals</h2>
            <p>From a free risk check to full file remediation — every service maps to exactly what CMS auditors check under 45 CFR §180.50.</p>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <div className="svc-card" key={s.title}>
                <div className="svc-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link className="svc-link" href={s.link}>{s.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="gray" id="workflow">
        <div className="container">
          <div className="sec-head">
            <h2>How We Work</h2>
            <p>Four steps from &quot;send your file&quot; to &quot;fully compliant.&quot; No long contracts, no IT project — just compliance.</p>
          </div>
          <div className="workflow-grid">
            {workflow.map((w) => (
              <div className="work-card" key={w.num}>
                <div className="work-num">{w.num}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE */}
      <section id="sample">
        <div className="container">
          <div className="sec-head">
            <h2>What Your Report Looks Like</h2>
            <p>A real audit of a US hospital MRF. Red flags highlighted, remediation steps included.</p>
          </div>
          <div className="report">
            <div className="flag"><span>Payer-specific negotiated charges — file contains only 2 of 5 major commercial payers</span> <span className="badge badge-red">HIGH RISK</span></div>
            <div className="flag"><span>Discounted cash price — missing on 14% of items</span> <span className="badge badge-red">HIGH RISK</span></div>
            <div className="flag"><span>File hosted behind a bot-blocking layer — CMS crawler may not access</span> <span className="badge badge-yellow">MEDIUM RISK</span></div>
            <div className="flag"><span>Shoppable services list — 61 of 70 required present</span> <span className="badge badge-yellow">MEDIUM RISK</span></div>
            <div className="flag"><span>Gross charges — complete</span> <span className="badge badge-green">OK</span></div>
          </div>
          <p style={{ marginTop: 18, fontSize: 14, color: "var(--muted)" }}>
            <Link href="/sample-report">See the full sample report →</Link>
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="gray" id="pricing">
        <div className="container">
          <div className="sec-head">
            <h2>Simple, Risk-Based Pricing</h2>
            <p>Start free. Pay only if you want the full remediation package. Every dollar is cheaper than one day of CMS fines.</p>
          </div>
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
              <div className="per">one-time</div>
              <ul>
                <li>Everything in Risk Check</li>
                <li>5-page detailed compliance report</li>
                <li>Line-item remediation guide</li>
                <li>Payer-by-payer gap analysis</li>
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
              </ul>
              <Link className="btn btn-primary" href="/contact">Talk to Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section id="insights">
        <div className="container">
          <div className="sec-head">
            <h2>Explore Our Insights</h2>
            <p>Practical guidance on CMS price transparency — what changes, what auditors check, and how hospitals stay ahead of penalties.</p>
          </div>
          <div className="post-grid">
            <Link className="post-card" href="/blog/cms-mrf-requirements-2026">
              <div className="cat">Compliance</div>
              <h3>CMS Machine-Readable File Requirements: The Complete 2026 Checklist</h3>
              <p>Every data element CMS requires in your MRF, explained in plain language — and the 5 most common reasons hospitals fail.</p>
              <div className="post-meta">Read time: 6 min</div>
            </Link>
            <Link className="post-card" href="/blog/cms-fines-hospital-price-transparency">
              <div className="cat">Penalties</div>
              <h3>How CMS Fines Hospitals: Real Penalty Amounts and What Triggers Them</h3>
              <p>$5,500 per day adds up fast. Here&apos;s how CMS calculates penalties, real enforcement examples, and how to reduce your exposure.</p>
              <div className="post-meta">Read time: 5 min</div>
            </Link>
            <Link className="post-card" href="/blog/find-hospital-mrf-file">
              <div className="cat">How-To</div>
              <h3>How to Find Your Hospital&apos;s MRF File (And What to Do If You Can&apos;t)</h3>
              <p>Step-by-step guide to locating your price-transparency file — and why not finding it is itself a compliance red flag.</p>
              <div className="post-meta">Read time: 4 min</div>
            </Link>
            <Link className="post-card" href="/blog/payer-specific-negotiated-rates-guide">
              <div className="cat">Data</div>
              <h3>Payer-Specific Negotiated Rates: A Practical Guide for Hospital Finance Teams</h3>
              <p>What counts as a payer-specific negotiated rate, how to structure it in your MRF, and the mistakes CMS flags most.</p>
              <div className="post-meta">Read time: 7 min</div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="gray" id="faq">
        <div className="container">
          <div className="sec-head"><h2>Frequently Asked Questions</h2></div>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="form-wrap">
            <h2>Get Your Free MRF Risk Check</h2>
            <p>Send us your machine-readable file URL. We&apos;ll audit it and deliver your report within 24 hours — no cost, no obligation.</p>
            <form action="https://formsubmit.co/yasir@nayaflow.com" method="POST">
              <input type="hidden" name="_subject" value="SealOfAudit — Free Risk Check Request" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://sealofaudit.com/thank-you" />
              <div className="row2">
                <div><label>Full Name</label><input type="text" name="name" placeholder="Jane Smith" required /></div>
                <div><label>Work Email</label><input type="email" name="email" placeholder="jane@hospital.org" required /></div>
              </div>
              <div className="row2">
                <div><label>Hospital / Health System</label><input type="text" name="hospital" placeholder="Mercy General Hospital" required /></div>
                <div><label>Your Title</label><input type="text" name="title" placeholder="CFO / VP Revenue Cycle / Compliance Officer" /></div>
              </div>
              <div><label>MRF File URL (usually at yoursite.com/price-transparency)</label><input type="url" name="mrf_url" placeholder="https://yourhospital.org/price-transparency.json" /></div>
              <button type="submit">Get My Free Risk Check →</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
