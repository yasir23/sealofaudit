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
