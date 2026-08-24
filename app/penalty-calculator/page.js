import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import PenaltyCalculator from "@/components/PenaltyCalculator";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/penalty-calculator/" },
  title: "CMS Price Transparency Penalty Calculator — Estimate Your Fine Exposure",
  description:
    "Calculate your hospital's CMS price-transparency fine exposure: $300/day escalating to $5,500/day, capped at ~$2.08M per year. The answer: compliance is cheaper than a fine.",
};

export default function PenaltyCalculatorPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Penalty Calculator", path: "/penalty-calculator/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="CMS Penalty Exposure Calculator"
        sub="The answer: a non-compliant hospital faces $300/day escalating to $5,500/day — up to ~$2.08M per year. See your number."
      />

      <section>
        <div className="container">
          <PenaltyCalculator />

          <div style={{ maxWidth: 720, margin: "32px auto", color: "#334155", fontSize: 15, lineHeight: 1.7 }}>
            <h2 style={{ fontSize: 20 }}>How the CMS fine schedule works</h2>
            <p>
              Under 45 CFR §180.30, CMS can fine a hospital <strong>$300 per day</strong> for a missing or
              non-compliant machine-readable file. After a second notice, the penalty rises to{" "}
              <strong>$5,500 per day</strong>. The annual cap for 2024 was approximately <strong>$2,077,733</strong>,
              adjusted for inflation each year.
            </p>
            <p>
              The most common triggers: no MRF published, a file that fails the required JSON schema, missing
              payer-specific negotiated rates, absent cash prices, or no 70-item shoppable services display.
            </p>
            <p>
              The good news: the fix is mechanical. A full audit identifies exactly which elements fail, and
              remediation typically takes about three weeks. <Link href="/compliance-department" style={{ color: "#dc2626", fontWeight: 600 }}>See how we run it →</Link>
            </p>

            <h2 style={{ fontSize: 20, marginTop: 28 }}>Not sure if you're compliant?</h2>
            <p>
              Get a free 8-element MRF risk check — we scan your actual file and tell you your score and
              exposure. No form-filling marathon; paste your file URL and get a report.
            </p>
            <div style={{ marginTop: 16 }}>
              <Link className="btn" href="/contact">Get your free MRF risk check</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
