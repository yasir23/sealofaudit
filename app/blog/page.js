import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/blog/" },
  title: "CMS Price Transparency Blog — Compliance Guides for Hospitals",
  description:
    "Guides on CMS price transparency rules, machine-readable file (MRF) requirements, negotiated rates, shoppable services, fines, and enforcement. Written for hospital CFOs and compliance officers.",
};

const POSTS = [
  { slug: "cms-warns-500-hospitals-2026", title: "CMS Just Warned 500+ Hospitals in 2026 — Is Yours on the List?", desc: "The 2026 warning-letter wave: what triggered it and what to do now.", date: "2026-09-06" },
  { slug: "cms-enforcement-tracker-2026", title: "The 2026 CMS Price Transparency Enforcement Tracker", desc: "Live tracker of warning letters, CAPs, and fines since 2022.", date: "2026-09-06" },
  { slug: "no-more-grace-period-enforcement-2026", title: "No More Grace Period: The 2026 Enforcement Stance", desc: "Automated audits mean the grace period is over. Here's the new math.", date: "2026-09-06" },
  { slug: "from-warning-letter-to-fine-timeline", title: "From Warning Letter to Fine: How Long Do Hospitals Have?", desc: "The enforcement timeline — and how to use the time you have.", date: "2026-09-06" },
  { slug: "pinnacle-hospital-fined-twice", title: "How a Small Hospital Got Fined Twice in One Year", desc: "The Pinnacle case: what went wrong and how to avoid the pattern.", date: "2026-09-06" },
  { slug: "largest-cms-fine-northside", title: "$883,180: Inside the Largest CMS Price Transparency Fine", desc: "How a penalty compounds to six figures — and how to stop the clock.", date: "2026-09-06" },
  { slug: "real-cost-of-noncompliance", title: "The Real Cost of Price Transparency Noncompliance", desc: "Penalty math by hospital size, plus the hidden costs of delay.", date: "2026-09-06" },
  { slug: "28-hospitals-fined-what-they-got-wrong", title: "28 Hospitals Fined Since 2022 — What They All Got Wrong", desc: "The three failure patterns behind every CMS penalty so far.", date: "2026-09-06" },
  { slug: "fix-it-later-most-expensive-sentence", title: "'We'll Fix It Later' Is the Most Expensive Sentence in Compliance", desc: "Why deferral has cost hospitals hundreds of thousands.", date: "2026-09-06" },
  { slug: "most-warning-letters-formatting-errors", title: "Most Warning Letters Are About Formatting, Not Hidden Prices", desc: "The technical errors behind 2026 citations — and why they still fine.", date: "2026-09-06" },
  { slug: "warning-letter-vs-cap-vs-fine", title: "Warning Letter vs Corrective Action Plan vs Civil Monetary Penalty", desc: "The three enforcement stages, explained for hospital teams.", date: "2026-09-06" },
  { slug: "escalation-rate-224-percent", title: "2.24% of Warning Letters Escalate to Fines — Should That Relax You?", desc: "Why the low escalation rate is a floor, not a forecast.", date: "2026-09-06" },
  { slug: "what-is-machine-readable-file", title: "What Is a Machine-Readable File, and Why Does CMS Care?", desc: "The MRF explained: contents, format rules, and failure consequences.", date: "2026-09-06" },
  { slug: "allowed-amount-metrics-2026", title: "The 2026 Requirement Nobody's Talking About: Allowed-Amount Metrics", desc: "What tightened 2026 expectations mean for your MRF structure.", date: "2026-09-06" },
  { slug: "compliance-attestation-signer", title: "Who Has to Sign Your CMS Compliance Attestation?", desc: "What signers certify — and the risk of signing without proof.", date: "2026-09-06" },
  { slug: "shoppable-services-101", title: "Shoppable Services 101: What Patients Are Legally Entitled to See", desc: "The 70 services, the format rules, and the gaps that trigger fines.", date: "2026-09-06" },
  { slug: "5-technical-errors-trigger-warning-letters", title: "5 Technical Errors That Trigger CMS Warning Letters", desc: "The five most common MRF failures — and how to catch them.", date: "2026-09-06" },
  { slug: "diy-vs-professional-mrf-audit", title: "DIY Compliance Check vs Professional MRF Audit", desc: "What each catches — and why CMS-tool validation is different.", date: "2026-09-06" },
  { slug: "what-to-ask-before-hiring-mrf-auditor", title: "What to Ask Before Hiring an MRF Auditor", desc: "Five questions that separate real audits from generic reviews.", date: "2026-09-06" },
  { slug: "corrective-action-plan-45-days", title: "CAP Deadline Looming? What You Can Realistically Fix in 45 Days", desc: "A realistic remediation timeline — most hospitals finish in 3 weeks.", date: "2026-09-06" },
  { slug: "cms-mrf-requirements-2026", title: "CMS MRF Requirements 2026", desc: "Everything a hospital MRF must contain in 2026, per 45 CFR §180.", date: "2026-08-15" },
  { slug: "cms-fines-hospital-price-transparency", title: "CMS Fines for Hospital Price Transparency", desc: "The real penalty schedule: $300/day → $5,500/day → $2M/year cap.", date: "2026-08-14" },
  { slug: "find-hospital-mrf-file", title: "How to Find Your Hospital's MRF File", desc: "Where the machine-readable file lives and how to check it.", date: "2026-08-13" },
  { slug: "payer-specific-negotiated-rates-guide", title: "Payer-Specific Negotiated Rates — A Guide", desc: "What payer-specific negotiated rates are and why CMS checks them.", date: "2026-08-12" },
  { slug: "hospital-price-transparency-requirements", title: "Hospital Price Transparency Requirements", desc: "The full requirement set under CMS-1717-F2, simplified.", date: "2026-08-11" },
  { slug: "cms-shoppable-services-list", title: "The CMS Shoppable Services List", desc: "The 70-item shoppable services requirement, explained.", date: "2026-08-10" },
  { slug: "standard-charges-vs-negotiated-rates", title: "Standard Charges vs Negotiated Rates", desc: "The difference CMS auditors check — and what each file must contain.", date: "2026-08-09" },
  { slug: "cms-price-transparency-fines-list", title: "CMS Price Transparency Fines List", desc: "Every hospital fined so far, amounts, and what triggered them.", date: "2026-08-08" },
  { slug: "mrf-json-format-guide", title: "MRF JSON Format Guide", desc: "The required JSON schema for machine-readable files, with examples.", date: "2026-08-07" },
  { slug: "price-transparency-compliance-checklist", title: "Price Transparency Compliance Checklist", desc: "The 8 elements we audit — as a printable checklist.", date: "2026-08-06" },
  { slug: "cms-enforcement-actions-2026", title: "CMS Enforcement Actions 2026", desc: "The enforcement ramp: automated audits, warning letters, fines.", date: "2026-08-05" },
  { slug: "mrf-vs-price-estimator-tool", title: "MRF vs Price Estimator Tool", desc: "Why the machine-readable file and the consumer tool both matter.", date: "2026-08-04" },
  { slug: "hospital-price-transparency-lawsuits", title: "Hospital Price Transparency Lawsuits", desc: "The legal landscape hospitals face under the transparency rule.", date: "2026-08-03" },
];

export default function BlogIndex() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="CMS Price Transparency Blog"
        sub="Guides written for hospital CFOs and compliance officers — what CMS checks, what it costs to fail, and how to fix it."
      />

      <section>
        <div className="container">
          <div style={{ display: "grid", gap: 18, marginBottom: 32 }}>
            {POSTS.map((p) => (
              <article key={p.slug} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, background: "#fff" }}>
                <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 6 }}>{p.date} · Blog</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 19 }}>
                  <Link href={`/blog/${p.slug}`} style={{ color: "#0f172a", textDecoration: "none" }}>{p.title}</Link>
                </h3>
                <p style={{ margin: 0, color: "#475569", fontSize: 15 }}>{p.desc}</p>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <Link className="btn" href="/compliance-department">Get your free MRF risk check →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
