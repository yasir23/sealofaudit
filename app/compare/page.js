import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  title: "Compare SealOfAudit: KPMG, DIY, Consultants",
  description:
    "SealOfAudit vs KPMG, vs doing your MRF in-house, vs hiring a compliance consultant. Straight comparison for hospital finance teams deciding how to handle CMS price transparency.",
};

export default function Compare() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Compare", path: "/compare/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="How We Stack Up"
        sub="You have four ways to handle CMS price transparency: an enterprise consultancy, doing it yourself, a general compliance consultant, or SealOfAudit. Here's the honest comparison."
      />

      <section>
        <div className="container" style={{ maxWidth: 900 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", margin: "24px 0" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: 10, textAlign: "left" }}>Factor</th>
                <th style={{ border: "1px solid #ddd", padding: 10, textAlign: "left" }}>SealOfAudit</th>
                <th style={{ border: "1px solid #ddd", padding: 10, textAlign: "left" }}>KPMG / Big 4</th>
                <th style={{ border: "1px solid #ddd", padding: 10, textAlign: "left" }}>DIY in-house</th>
                <th style={{ border: "1px solid #ddd", padding: 10, textAlign: "left" }}>Compliance consultant</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: 10 }}><strong>First answer</strong></td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>24 hours, free</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>Weeks + RFP process</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>Depends on your team</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>Days to weeks</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Audit cost</strong></td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>$3,500 flat</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>$50k-$250k+</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>Hundreds of staff-hours</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>$10k-$40k</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Fix included</strong></td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>Yes — $15k remediation, or DIY with our guide</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>Yes — at additional enterprise pricing</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>You do all the work</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>Sometimes, at extra cost</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Built for</strong></td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>Hospitals that need a yes/no fast</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>Health systems with enterprise analytics needs</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>Hospitals with a dedicated IT build team</td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>Hospitals wanting a general compliance partner</td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, margin: "32px 0" }}>
            <div className="card">
              <h3>vs Enterprise (KPMG)</h3>
              <p>They sell analytics platforms and charge enterprise rates. You need a compliance answer, not a data product.</p>
              <Link href="/compare/sealofaudit-vs-kpmg">Read the comparison →</Link>
            </div>
            <div className="card">
              <h3>vs Doing It Yourself</h3>
              <p>If your IT team has the hours, the spec is public. But one missed data element is still a violation.</p>
              <Link href="/compare/sealofaudit-vs-doing-it-yourself">Read the comparison →</Link>
            </div>
            <div className="card">
              <h3>vs General Consultants</h3>
              <p>Generalists know compliance broadly. We do one thing: MRF compliance under 45 CFR 180.50, fast.</p>
              <Link href="/compare/mrf-audit-vs-price-transparency-consultant">Read the comparison →</Link>
            </div>
          </div>

          <div style={{ background: "var(--surface, #f6f6f4)", border: "1px solid #ddd", borderRadius: 12, padding: 24, margin: "32px 0" }}>
            <h3 style={{ marginTop: 0 }}>Start with the free check</h3>
            <p style={{ marginBottom: 16 }}>
              Whatever route you pick, the first step is knowing where you stand. Free MRF risk check,
              report in 24 hours, no obligation.
            </p>
            <Link className="btn btn-primary" href="/contact">Get Your Free MRF Risk Check</Link>
          </div>
        </div>
      </section>
    </>
  );
}
