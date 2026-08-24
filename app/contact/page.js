import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";
export const metadata = {
  alternates: { canonical: "/contact/" },

  title: "Contact",
  description:
    "Request your free CMS price transparency risk check. Send your MRF URL and get a compliance report in 24 hours. No cost, no obligation.",
};

export default function Contact() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="Get Your Free MRF Risk Check"
        sub="Send us your machine-readable file URL. We'll audit it and deliver your report within 24 hours — no cost, no obligation."
      />

      <section>
        <div className="container" style={{ textAlign: "center", paddingBottom: 12 }}>
          <p style={{ fontSize: 17, marginBottom: 12 }}>Prefer to talk? Call us — we'll scan your file while you're on the line.</p>
          <a className="btn" href="tel:+13159532456" style={{ background: "#dc2626", fontSize: 18, padding: "14px 34px" }}>📞 Call now: +1 315 953 2456</a>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="form-wrap">
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
              <div>
                <label>How did you hear about us?</label>
                <select name="source">
                  <option value="">Select…</option>
                  <option>Email from SealOfAudit</option>
                  <option>Google search</option>
                  <option>LinkedIn</option>
                  <option>Referral</option>
                  <option>Other</option>
                </select>
              </div>
              <button type="submit">Get My Free Risk Check →</button>
            </form>
          </div>
          <p style={{ marginTop: 20, fontSize: 14, color: "var(--muted)", textAlign: "center" }}>
            Prefer email? Write to <a href="mailto:sales@sealofaudit.com">sales@sealofaudit.com</a> with your MRF URL and we&apos;ll start the audit.
          </p>
        </div>
      </section>
    </>
  );
}
