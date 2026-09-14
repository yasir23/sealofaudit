import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/adjacent-mandates/" },
  title: "Other Price Transparency Mandates: Good Faith Estimates, Payer Files, 340B",
  description:
    "Beyond the hospital machine-readable file: No Surprises Act good faith estimates, payer Transparency in Coverage files, state price transparency statutes and 340B. The same validation engine, the mandates nobody publishes operational guidance for.",
};

const svcSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Price transparency compliance beyond the hospital MRF",
  serviceType: "Healthcare price transparency compliance",
  provider: { "@id": "https://sealofaudit.com/#organization" },
  areaServed: "US",
  description:
    "Validation and remediation for price transparency mandates adjacent to the hospital machine-readable file: No Surprises Act good faith estimates, payer Transparency in Coverage files, state price transparency statutes, and 340B.",
};

const MANDATES = [
  {
    name: "Hospital machine-readable file (the core one)",
    cite: "45 CFR §180.50",
    status: "What we do today.",
    body: "Schema, required elements, in-network file references, payer-specific negotiated rates, discounted cash prices and the shoppable services file. If your file is malformed, a present file is treated the same as a missing one.",
  },
  {
    name: "Good faith estimates",
    cite: "No Surprises Act",
    status: "Adjacent — same file discipline, different output.",
    body: "Uninsured and self-pay patients must receive a good faith estimate of expected charges, built from the same underlying rate data. The failure mode is familiar: the data exists but the workflow producing the document is manual.",
  },
  {
    name: "Payer Transparency in Coverage files",
    cite: "Transparency in Coverage final rule",
    status: "Adjacent — the other side of the same negotiation.",
    body: "Health plans publish their own machine-readable files of negotiated rates and allowed amounts. Providers are increasingly asked to reconcile against them, and the file formats share DNA with the hospital MRF.",
  },
  {
    name: "State price transparency statutes",
    cite: "state law, varies",
    status: "Adjacent — overlapping, not identical.",
    body: "Several states impose their own reporting duties on top of the federal rule. A file that satisfies CMS does not automatically satisfy a state requirement, and the delta is usually small and specific.",
  },
  {
    name: "340B",
    cite: "42 U.S.C. §256b",
    status: "Adjacent — same data, different audit.",
    body: "Covered entities face their own pricing and reporting scrutiny. The overlap with price transparency is in the same rate and charge data being asked for in a second context.",
  },
];

const FAQ = [
  {
    q: "Why have I never seen operational guidance on these?",
    a: "Because the firms that publish on price transparency publish strategy, payer-negotiation and arbitration analysis instead. When we enumerated what the major US healthcare consultancies have published on price transparency, the operational layer — how to make the file pass, what the daily exposure is — was almost entirely absent. We publish it and we do it.",
  },
  {
    q: "Do you handle all of these already?",
    a: "The hospital machine-readable file under 45 CFR §180.50 is our core, daily work. For the others, the validation engine is the same and the schema is the variable — ask us about your specific mandate and we will tell you plainly whether it is in scope.",
  },
  {
    q: "Can you work alongside our auditor or counsel?",
    a: "Yes, and we prefer it. We produce structured findings with the source for each one, so your counsel or accounting firm can review the technical layer without doing the file parsing themselves.",
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
      <Breadcrumbs items={[{ name: "Other Price Transparency Mandates", path: "/adjacent-mandates/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="Other Price Transparency Mandates"
      />

      <div style={{"maxWidth": 860, "margin": "0 auto 28px", "padding": "14px 18px", "background": "#f0fdf4", "borderLeft": "4px solid #0a7a4a", "borderRadius": "0 8px 8px 0", "fontSize": 15, "color": "#1e293b"}}>
        <strong style={{"color": "#0a7a4a"}}>SealOfAudit.com</strong> validates hospital price transparency files and the adjacent mandates that share their data.{" "}
        <a href="/enforcement-tracker/" style={{"color": "#0a7a4a"}}>enforcement tracker</a> ·{" "}
        <a href="/contact/" style={{"color": "#0a7a4a"}}>free 8-point risk check</a>
      </div>

      <section>
        <div className="container" style={{"maxWidth": 860}}>
          <p style={{"fontSize": 17, "color": "var(--muted)", "marginBottom": 22}}>
            Price transparency is not one rule. It is a family of mandates that all draw on the
            same underlying charge and rate data, and the hard part in every case is the same:
            parsing a very large structured file correctly and knowing whether it passes.
          </p>
          <p style={{"color": "var(--muted)", "marginBottom": 22}}>
            We built that parser for the hospital machine-readable file. Here is where else it
            applies, and where the market has published essentially nothing.
          </p>

          {MANDATES.map((m, i) => (
            <div className="card" key={i} style={{"padding": 18, "marginBottom": 16}}>
              <h2 style={{"fontSize": 21, "color": "var(--ink)", "margin": "0 0 6px"}}>{m.name}</h2>
              <p style={{"fontSize": 13, "color": "var(--muted)", "marginBottom": 8}}>
                {m.cite} · <strong>{m.status}</strong>
              </p>
              <p style={{"color": "var(--muted)", "marginBottom": 0}}>{m.body}</p>
            </div>
          ))}

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>The gap we keep finding</h2>
          <p style={{"color": "var(--muted)", "marginBottom": 12}}>
            We enumerated what the largest US healthcare consultancies have published on price
            transparency across their own sites and archives. In 2025, only four firms published
            anything, and their output is strategy, payer negotiation and arbitration commentary.
            On the operational mandates — good faith estimates, payer files, state deltas — there
            is effectively nothing published at all.
          </p>
          <p style={{"color": "var(--muted)", "marginBottom": 12}}>
            That is not a content problem, it is a delivery problem. Buyers need the file to pass,
            not another outlook piece.
          </p>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>Questions</h2>
          {FAQ.map((f, i) => (
            <div key={i} style={{"marginBottom": 18}}>
              <h3 style={{"fontSize": 18, "color": "var(--ink)", "marginBottom": 6}}>{f.q}</h3>
              <p style={{"color": "var(--muted)", "marginBottom": 0}}>{f.a}</p>
            </div>
          ))}

          <div style={{"marginTop": 30, "padding": 20, "background": "#f8fafc", "borderRadius": 10, "border": "1px solid #e2e8f0"}}>
            <h3 style={{"marginTop": 0}}>Tell us which mandate you are facing</h3>
            <p style={{"color": "var(--muted)", "marginBottom": 12}}>
              We will tell you straight away whether it is something we can take, and what the
              file check would tell you.
            </p>
            <Link className="btn" href="/contact/">Get the free MRF risk check</Link>{" "}
            <a className="btn" href="tel:+13159532456" style={{"background": "#dc2626"}}>Call now: +1 315 953 2456</a>
          </div>
        </div>
      </section>
    </>
  );
}
