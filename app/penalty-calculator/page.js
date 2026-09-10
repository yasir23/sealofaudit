import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import PenaltyCalculator from "@/components/PenaltyCalculator";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/penalty-calculator/" },
  title: "CMS Price Transparency Penalty Calculator — Estimate Your Fine Exposure",
  description:
    "Calculate your hospital's CMS price-transparency penalty exposure. Under 45 CFR §180.90(c)(2)(ii) the maximum daily penalty is set by bed count — up to $5,500/day for hospitals over 550 beds.",
};

export default function PenaltyCalculatorPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Penalty Calculator", path: "/penalty-calculator/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="CMS Penalty Exposure Calculator"
        sub="Under 45 CFR §180.90(c)(2)(ii) the maximum daily penalty is set by your bed count — $300/day up to 30 beds, $10 per bed up to 550, and $5,500/day above 550. See your number."
      />

      <section>
        <div className="container">
          <PenaltyCalculator />

          <div style={{ maxWidth: 720, margin: "32px auto", color: "#334155", fontSize: 15, lineHeight: 1.7 }}>
            <h2 style={{ fontSize: 20 }}>How the CMS fine schedule works</h2>
            <p>
              Under <strong>45 CFR §180.90(c)(2)(ii)</strong>, the maximum daily penalty is set by the
              hospital&apos;s <strong>bed count</strong>: <strong>$300/day</strong> for hospitals with up to 30 beds,{" "}
              <strong>$10 per bed per day</strong> for hospitals with 31 to 550 beds, and{" "}
              <strong>$5,500/day</strong> for hospitals with more than 550 beds. §180.90(c)(3) requires CMS to
              adjust these amounts annually for inflation, so current maximums run above those statutory
              base figures. The penalty is reduced by 35% if the hospital waives its right to a hearing
              within 30 days of the notice (§180.90(c)(4)).
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
