import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/partners/" },

  title: "Partners: White-Label CMS MRF Audits for Consultants & Law Firms",
  description:
    "Partner with SealOfAudit: white-label CMS price transparency audits for healthcare compliance consultants and law firms. Your clients, your brand, our audit engine. 20% referral commission.",
};

export default function Partners() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Partners", path: "/partners/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="Partner Program for Compliance Consultants & Law Firms"
        sub="Your clients already need MRF compliance answers. White-label our audit engine under your brand — or send referrals for 20% commission."
      />

      <section>
        <div className="container" style={{ maxWidth: 820 }}>
          <p style={{ fontSize: 17, color: "var(--muted)", marginBottom: 24 }}>
            Healthcare compliance consultants, law firms, and hospital associations are the natural
            referral channel in this market. Your clients ask about price transparency; we do the
            mechanical MRF audit — fast, flat-fee, defensible.
          </p>

          <h2>Two ways to partner</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", margin: "24px 0" }}>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: 10 }}><strong>Referral partner</strong></td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>
                  Send us hospital MRF URLs. You get <strong>20% commission</strong> on any audit or
                  remediation that converts. Zero work, zero branding changes — we handle the audit,
                  the report, and the follow-up. You get a named commission track.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: 10 }}><strong>White-label partner</strong></td>
                <td style={{ border: "1px solid #ddd", padding: 10 }}>
                  Our audit engine, your brand. We produce the risk report under your firm's name,
                  you set your own pricing and margin. Ideal for consultants who want a
                  compliance-product line without building one.
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Why it works</h2>
          <ul>
            <li>Your clients need an answer in days, not an RFP — our 24-hour risk check fits their timeline.</li>
            <li>The free check means zero-risk introduction: they get value before any spend.</li>
            <li>We never compete with you on advisory work — we do the file, you keep the strategy.</li>
            <li>CMS's 2026 AI-audit ramp makes "is our file compliant?" a question every client will ask this year.</li>
          </ul>

          <div style={{ background: "var(--surface, #f6f6f4)", border: "1px solid #ddd", borderRadius: 12, padding: 24, margin: "32px 0" }}>
            <h3 style={{ marginTop: 0 }}>Start the partnership</h3>
            <p style={{ marginBottom: 16 }}>
              Email sales@sealofaudit.com with "Partner" in the subject, or send a client's MRF URL
              for a free check — we'll send the commission terms with the report.
            </p>
            <Link className="btn btn-primary" href="/contact">Get Your Free MRF Risk Check</Link>
          </div>

          <h2>Related</h2>
          <ul>
            <li><Link href="/compare/mrf-audit-vs-price-transparency-consultant">MRF audit vs price transparency consultant</Link></li>
            <li><Link href="/compare/sealofaudit-vs-kpmg">SealOfAudit vs KPMG</Link></li>
          </ul>
        </div>
      </section>
    </>
  );
}
