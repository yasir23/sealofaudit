import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/for-small-hospitals/" },
  title: "Price Transparency Compliance for Small, Rural & Critical Access Hospitals",
  description:
    "CMS price transparency compliance for facilities without a compliance department — critical access hospitals, rural hospitals, ASCs, imaging and urgent care. Machine-readable file audit and fix. Audits from $3,500.",
};

const svcSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "MRF compliance audit for small and rural hospitals",
  serviceType: "CMS hospital price transparency compliance",
  provider: { "@id": "https://sealofaudit.com/#organization" },
  areaServed: "US",
  description:
    "Machine-readable file audit, remediation and monitoring for critical access hospitals, rural hospitals, ambulatory surgery centers, imaging centers and urgent care — facilities that have no compliance department of their own.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "3500",
    description: "MRF compliance audit, from $3,500. Free 8-point risk check first.",
  },
};

const FAQ = [
  {
    q: "We are a 25-bed critical access hospital. Is a machine-readable file really required?",
    a: "Yes. The requirement in 45 CFR §180.50 applies to each hospital operating in the United States. Bed count affects the maximum daily penalty under §180.90, not whether your file must be published and machine-readable.",
  },
  {
    q: "We published the file. Doesn't that make us compliant?",
    a: "Publishing a file and publishing a valid file are different things. CMS's automated review reads the file itself — schema, required elements, in-network file references. A file that is present but malformed is treated the same as a missing one.",
  },
  {
    q: "Nobody here has time to maintain this.",
    a: "That is the actual problem we solve, and it is why this page exists separately from our system-level offering. The work is small but it is real, and it recurs every time your rates change.",
  },
  {
    q: "What does it cost?",
    a: "Audits start at $3,500. We run the free 8-point check first, so you see whether there is anything to fix before you spend anything.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(svcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={[{ name: "For Small & Rural Hospitals", path: "/for-small-hospitals/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="Price Transparency Compliance for Small, Rural & Critical Access Hospitals"
      />

      <div style={{"maxWidth": 860, "margin": "0 auto 28px", "padding": "14px 18px", "background": "#f0fdf4", "borderLeft": "4px solid #0a7a4a", "borderRadius": "0 8px 8px 0", "fontSize": 15, "color": "#1e293b"}}>
        <strong style={{"color": "#0a7a4a"}}>SealOfAudit.com</strong> audits and fixes hospital machine-readable files under 45 CFR §180.50 — for single facilities and small systems, not just large health systems.{" "}
        <a href="/contact/" style={{"color": "#0a7a4a"}}>free 8-point risk check</a> ·{" "}
        <a href="/penalty-calculator/" style={{"color": "#0a7a4a"}}>penalty exposure</a>
      </div>

      <section>
        <div className="container" style={{"maxWidth": 860}}>
          <p style={{"fontSize": 17, "color": "var(--muted)", "marginBottom": 22}}>
            If your facility runs without a compliance department, you are in a specific and
            difficult position: the obligation is real and automated, but the work does not
            justify a hire and does not fit the engagement shape of a large advisory firm.
            That is the gap this page is about.
          </p>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>Why this is your problem specifically</h2>
          <p style={{"color": "var(--muted)", "marginBottom": 12}}>
            CMS has scaled automated comprehensive compliance reviews from 30-40 per month to
            <strong> over 200 per month</strong> (CMS enforcement fact sheet). An automated
            reviewer does not need a complaint before it looks at your file, and it does not
            get tired.
          </p>
          <p style={{"color": "var(--muted)", "marginBottom": 12}}>
            Enforcement of the new and updated requirements in the CY 2026 OPPS/ASC final rule
            began <strong>April 1, 2026</strong>. As of our last count, CMS has posted
            <strong> 28 civil monetary penalties</strong>. The penalties we see are not
            concentrated among the largest systems — small and specialty facilities appear on
            that list precisely because nobody was maintaining the file.
          </p>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>Who we work with</h2>
          <ul style={{"color": "var(--muted)", "paddingLeft": 22, "lineHeight": 2}}>
            <li>Critical access hospitals and rural hospitals</li>
            <li>Single-site and small multi-site community hospitals</li>
            <li>Ambulatory surgery centers (ASCs)</li>
            <li>Imaging and diagnostic centers</li>
            <li>Urgent care and specialty facilities</li>
          </ul>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>What you actually get</h2>
          <ol style={{"color": "var(--muted)", "paddingLeft": 22, "lineHeight": 2}}>
            <li><strong>Free 8-point MRF risk check</strong> — you see whether your file passes before you pay anything.</li>
            <li><strong>Full audit</strong> — schema, required elements, in-network file references, negotiated rates, cash prices, shoppable services.</li>
            <li><strong>Remediation</strong> — we fix the file, not just describe it. A report you cannot act on is worth nothing.</li>
            <li><strong>Monitoring</strong> — rates change, files break. Ongoing checks so you are not re-discovered by the crawler.</li>
          </ol>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>Cost</h2>
          <p style={{"color": "var(--muted)", "marginBottom": 12}}>
            Audits start at <strong>$3,500</strong>, and the risk check that tells you whether
            you need one is free. Monitoring and annual coverage for a single facility are
            quoted per facility — see <Link href="/pricing/" style={{"color": "#0a7a4a"}}>pricing</Link> and{" "}
            <Link href="/compliance-department/" style={{"color": "#0a7a4a"}}>the compliance department</Link> for the
            system-level structure.
          </p>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>Questions we get from small facilities</h2>
          {FAQ.map((f, i) => (
            <div key={i} style={{"marginBottom": 18}}>
              <h3 style={{"fontSize": 18, "color": "var(--ink)", "marginBottom": 6}}>{f.q}</h3>
              <p style={{"color": "var(--muted)", "marginBottom": 0}}>{f.a}</p>
            </div>
          ))}

          <div style={{"marginTop": 30, "padding": 20, "background": "#f8fafc", "borderRadius": 10, "border": "1px solid #e2e8f0"}}>
            <h3 style={{"marginTop": 0}}>Start with the free check</h3>
            <p style={{"color": "var(--muted)", "marginBottom": 12}}>
              Send us your hospital&apos;s MRF link, or call and we will run it while you are on
              the line.
            </p>
            <Link className="btn" href="/contact/">Get the free MRF risk check</Link>{" "}
            <a className="btn" href="tel:+13159532456" style={{"background": "#dc2626"}}>Call now: +1 315 953 2456</a>
          </div>
        </div>
      </section>
    </>
  );
}
