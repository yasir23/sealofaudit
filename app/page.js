import Link from "next/link";
import IrisHero3D from "@/components/IrisHero3D";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Parallax4D from "@/components/Parallax4D";
import Tilt4D from "@/components/Tilt4D";
import ScrubMotion from "@/components/ScrubMotion";
import Cube3D from "@/components/Cube3D";
import Magnetic from "@/components/Magnetic";
import ScrollProgress from "@/components/ScrollProgress";
import StaggerText from "@/components/StaggerText";

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
    stat: "24hr turnaround",
    link: "/how-it-works",
    cta: "How it works →",
  },
  {
    icon: "📋",
    title: "Compliance Audit",
    desc: "5-page detailed compliance report. Line-item remediation guide, payer-by-payer gap analysis, and a 30-day follow-up re-check to prove you're clean.",
    stat: "$3,500 one-time",
    link: "/pricing",
    cta: "Pricing →",
  },
  {
    icon: "🛠️",
    title: "Full Remediation",
    desc: "We rebuild or repair your MRF, verify hosting and CMS-crawler access, and provide direct support during CMS audits. Quarterly monitoring included.",
    stat: "CMS audit support",
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

const marquee = [
  "45 CFR §180.50",
  "CMS AUDITED",
  "24HR TURNAROUND",
  "$5,500/DAY EXPOSURE",
  "519+ HOSPITALS WARNED",
  "FREE RISK CHECK",
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

      {/* HERO — Nudot-style dark cinematic, conversion-first */}
      <ScrollProgress />
      <header className="hero">
        <div className="hero-3d">
          <IrisHero3D />
        </div>
        <div className="hero-4d-scene" aria-hidden="true">
          <Parallax4D speed={0.15} maxShift={36}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/4d/compliance-hero.svg" alt="" width={720} height={480} />
          </Parallax4D>
        </div>
        <div className="container">
          <div className="hero-eyebrow">⚠ 45 CFR §180.50 — CMS ENFORCEMENT ACTIVE</div>
          <h1>
            <StaggerText text="Is Your MRF CMS-Compliant?" split={[4]} />
          </h1>
          <p className="sub">
            Every US hospital must publish payer-specific negotiated rates in a machine-readable file.
            Industry studies show 30–55% of hospitals still fail audits. One flagged month = $165,000 in exposure.
          </p>
          <div className="hero-btns">
            <Magnetic strength={0.3}>
              <Link className="btn btn-primary btn-hero" href="/contact">Get Your Free MRF Risk Check</Link>
            </Magnetic>
            <Link className="hero-text-link" href="/how-it-works">See what we check →</Link>
          </div>
        </div>
      </header>

      {/* STAT STRIP — oversized numerals, count-up on scroll */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <Reveal>
              <div className="stat-figure"><CountUp prefix="$" end={5500} /><small>/day</small></div>
              <div className="stat-desc">CMS fine per violation</div>
            </Reveal>
            <Reveal delay={80}>
              <div className="stat-figure"><CountUp prefix="$" end={165} suffix="K" /></div>
              <div className="stat-desc">Exposure for one flagged month</div>
            </Reveal>
            <Reveal delay={160}>
              <div className="stat-figure"><CountUp end={1000} suffix="+" /></div>
              <div className="stat-desc">Penalty actions already issued</div>
            </Reveal>
            <Reveal delay={240}>
              <div className="stat-figure"><CountUp end={24} /><small>hrs</small></div>
              <div className="stat-desc">From file URL to full report</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MARQUEE — ambient trust-signal belt */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="marquee-item">{t}<em>·</em></span>
          ))}
        </div>
      </div>

      {/* SERVICES — hover-swap cards */}
      <section id="services">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <h2>Compliance Services Built for Hospitals</h2>
              <p>From a free risk check to full file remediation — every service maps to exactly what CMS auditors check under 45 CFR §180.50.</p>
            </div>
          </Reveal>
          <div className="services-grid">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <Tilt4D max={8}>
                  <div className="svc-card">
                    <div className="svc-icon"><span className="emoji">{s.icon}</span><span className="svc-stat">{s.stat}</span></div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <Link className="svc-link" href={s.link}>{s.cta}</Link>
                  </div>
                </Tilt4D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CUBE SHOWCASE — Nudot-style 3D rotating work cubes */}
      <section className="cube-section">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <h2>Built Like a 3D Compliance Engine</h2>
              <p>Every audit runs through the same 6-sided checks — format, payers, cash prices, shoppable services, accessibility, and CMS rules.</p>
            </div>
          </Reveal>
          <div className="cube-grid">
            <Reveal delay={0}>
              <ScrubMotion y={60} rotate={4}>
                <div className="cube-cell">
                  <Cube3D faces={["45 CFR", "180.50", "MRF", "AUDIT", "CMS", "COMPLY"]} size={140} />
                  <div className="cube-label">THE 6-FACED CHECK</div>
                </div>
              </ScrubMotion>
            </Reveal>
            <Reveal delay={100}>
              <ScrubMotion y={-50} rotate={-3}>
                <div className="cube-cell">
                  <Cube3D faces={["PAYERS", "RATES", "CASH", "70 SRV", "JSON", "OK"]} size={112} />
                  <div className="cube-label">PAYER-BY-PAYER AUDIT</div>
                </div>
              </ScrubMotion>
            </Reveal>
            <Reveal delay={200}>
              <ScrubMotion y={70} rotate={5}>
                <div className="cube-cell">
                  <Cube3D faces={["24HR", "FREE", "REPORT", "FIX", "RETEST", "DONE"]} size={124} />
                  <div className="cube-label">24-HOUR TURNAROUND</div>
                </div>
              </ScrubMotion>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="gray" id="workflow">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <h2>How We Work</h2>
              <p>Four steps from &quot;send your file&quot; to &quot;fully compliant.&quot; No long contracts, no IT project — just compliance.</p>
            </div>
          </Reveal>
          <div className="workflow-grid">
            {workflow.map((w, i) => (
              <Reveal key={w.num} delay={i * 80}>
                <div className="work-card">
                  <div className="work-num">{w.num}</div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE — light, high-legibility, staggered rows + 4D depth visual */}
      <section id="sample">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <h2>What Your Report Looks Like</h2>
              <p>A real audit of a US hospital MRF. Red flags highlighted, remediation steps included.</p>
            </div>
          </Reveal>
          <div className="report-4d">
            <Reveal delay={80} className="report-4d-visual">
              <ScrubMotion y={40} rotate={-1.5} scale={1.02}>
                <Parallax4D speed={0.12} maxShift={30}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/4d/report-visual.svg" alt="4D abstract of a SealOfAudit compliance report" width={1200} height={700} />
                </Parallax4D>
              </ScrubMotion>
            </Reveal>
            <Reveal delay={120} className="report">
              <div className="flag"><span>Payer-specific negotiated charges — file contains only 2 of 5 major commercial payers</span> <span className="badge badge-red">HIGH RISK</span></div>
              <div className="flag"><span>Discounted cash price — missing on 14% of items</span> <span className="badge badge-red">HIGH RISK</span></div>
              <div className="flag"><span>File hosted behind a bot-blocking layer — CMS crawler may not access</span> <span className="badge badge-yellow">MEDIUM RISK</span></div>
              <div className="flag"><span>Shoppable services list — 61 of 70 required present</span> <span className="badge badge-yellow">MEDIUM RISK</span></div>
              <div className="flag"><span>Gross charges — complete</span> <span className="badge badge-green">OK</span></div>
            </Reveal>
          </div>
          <p style={{ marginTop: 18, fontSize: 14, color: "var(--muted)" }}>
            <Link href="/sample-report">See the full sample report →</Link>
          </p>
        </div>
      </section>

      {/* PRICING — oversized numerals */}
      <section className="gray" id="pricing">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <h2>Simple, Risk-Based Pricing</h2>
              <p>Start free. Pay only if you want the full remediation package. Every dollar is cheaper than one day of CMS fines.</p>
            </div>
          </Reveal>
          <div className="pricing-grid">
            <Reveal>
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
            </Reveal>
            <Reveal delay={80}>
              <div className="card featured">
                <div className="card-rec">RECOMMENDED</div>
                <h3>Compliance Audit</h3>
                <div className="price"><CountUp prefix="$" end={3500} /></div>
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
            </Reveal>
            <Reveal delay={160}>
              <div className="card">
                <h3>Full Remediation</h3>
                <div className="price"><CountUp prefix="$" end={15000} /></div>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section id="insights">
        <div className="container">
          <Reveal>
            <div className="sec-head">
              <h2>Explore Our Insights</h2>
              <p>Practical guidance on CMS price transparency — what changes, what auditors check, and how hospitals stay ahead of penalties.</p>
            </div>
          </Reveal>
          <div className="post-grid">
            {[
              ["/blog/cms-mrf-requirements-2026", "Compliance", "CMS Machine-Readable File Requirements: The Complete 2026 Checklist", "Every data element CMS requires in your MRF, explained in plain language — and the 5 most common reasons hospitals fail.", "6 min"],
              ["/blog/cms-fines-hospital-price-transparency", "Penalties", "How CMS Fines Hospitals: Real Penalty Amounts and What Triggers Them", "$5,500 per day adds up fast. Here's how CMS calculates penalties, real enforcement examples, and how to reduce your exposure.", "5 min"],
              ["/blog/find-hospital-mrf-file", "How-To", "How to Find Your Hospital's MRF File (And What to Do If You Can't)", "Step-by-step guide to locating your price-transparency file — and why not finding it is itself a compliance red flag.", "4 min"],
              ["/blog/payer-specific-negotiated-rates-guide", "Data", "Payer-Specific Negotiated Rates: A Practical Guide for Hospital Finance Teams", "What counts as a payer-specific negotiated rate, how to structure it in your MRF, and the mistakes CMS flags most.", "7 min"],
            ].map(([href, cat, title, desc, read], i) => (
              <Reveal key={href} delay={i * 60}>
                <Link className="post-card" href={href}>
                  <div className="cat">{cat}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="post-meta">Read time: {read}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="gray" id="faq">
        <div className="container">
          <Reveal><div className="sec-head"><h2>Frequently Asked Questions</h2></div></Reveal>
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

      {/* CONTACT — highest-intent, zero motion friction */}
      <section id="contact">
        <div className="container">
          <div className="form-wrap">
            <h2>Get Your Free MRF Risk Check</h2>
            <p>Send us your machine-readable file URL. We&apos;ll audit it and deliver your report within 24 hours — no cost, no obligation.</p>
            <form action="https://formsubmit.co/sales@sealofaudit.com" method="POST">
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
