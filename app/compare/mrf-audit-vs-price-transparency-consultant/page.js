import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  title: "MRF Audit vs Price Transparency Consultant",
  description:
    "MRF compliance audit vs hiring a price transparency consultant: what each covers, what they cost, and which one gets you CMS-compliant fastest.",
};

export default function CompareConsultant() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Compare", path: "/compare/" }, { name: "Audit vs Consultant", path: "/compare/mrf-audit-vs-price-transparency-consultant/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/compare", label: "Compare" }]}
        title="MRF Audit vs Price Transparency Consultant"
        sub="A general compliance consultant knows a lot about a lot. An MRF audit is one thing, done fast and done right."
      />

      <section>
        <div className="container" style={{ maxWidth: 820 }}>
          <p style={{ fontSize: 17, color: "var(--muted)", marginBottom: 24 }}>
            Price transparency consultants and law firms are the natural referral partners in this
            space — and they're excellent at strategy and legal exposure analysis. But the MRF file
            itself is a technical artifact: JSON structure, negotiated-rate tables, crawler
            access, the 70-item shoppable services list. A specialized audit checks the file; a
            general consultant advises around it.
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse", margin: "24px 0" }}>
            <tbody>
              <tr><td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Scope</strong></td><td style={{ border: "1px solid #ddd", padding: 10 }}>The MRF file itself, every CMS check</td><td style={{ border: "1px solid #ddd", padding: 10 }}>Broader compliance posture, strategy</td></tr>
              <tr><td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Turnaround</strong></td><td style={{ border: "1px solid #ddd", padding: 10 }}>24 hours (free check)</td><td style={{ border: "1px solid #ddd", padding: 10 }}>Weeks</td></tr>
              <tr><td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Cost</strong></td><td style={{ border: "1px solid #ddd", padding: 10 }}>$3,500 flat</td><td style={{ border: "1px solid #ddd", padding: 10 }}>$10k-$40k typical</td></tr>
              <tr><td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Output</strong></td><td style={{ border: "1px solid #ddd", padding: 10 }}>Line-item fix list for the file</td><td style={{ border: "1px solid #ddd", padding: 10 }}>Advisory report, policy guidance</td></tr>
            </tbody>
          </table>

          <p>
            The honest advice: if you already work with a compliance consultant, keep them — and ask
            them to send us your MRF URL. The free risk check is a second opinion they'll usually
            welcome, and if the file is clean, we charge nothing and you never hear from us.
          </p>

          <div style={{ background: "var(--surface, #f6f6f4)", border: "1px solid #ddd", borderRadius: 12, padding: 24, margin: "32px 0" }}>
            <h3 style={{ marginTop: 0 }}>Get the second opinion</h3>
            <p style={{ marginBottom: 16 }}>Free MRF risk check, report in 24 hours, you keep it either way.</p>
            <Link className="btn btn-primary" href="/contact">Get Your Free MRF Risk Check</Link>
          </div>

          <h2>Related</h2>
          <ul>
            <li><Link href="/compare/sealofaudit-vs-kpmg">SealOfAudit vs KPMG</Link></li>
            <li><Link href="/blog/price-transparency-compliance-checklist">Hospital Price Transparency Compliance Checklist</Link></li>
          </ul>
        </div>
      </section>
    </>
  );
}
