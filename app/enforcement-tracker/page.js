import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/BreadcrumbsSchema";
import Link from "next/link";
import {
  FETCHED, SOURCES, COUNTS, PROCESS, CHANGE_2026, CMPS, CMPS_BY_YEAR,
} from "@/lib/enforcementData";

export const metadata = {
  alternates: { canonical: "/enforcement-tracker/" },
  title: "CMS Price Transparency Enforcement Tracker — Every Penalty To Date",
  description:
    "Every civil monetary penalty CMS has imposed for hospital price transparency noncompliance, with source links. 28 penalties posted to date, counted directly from cms.gov. No estimated figures.",
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "CMS hospital price transparency civil monetary penalties",
  description:
    "Every civil monetary penalty CMS has posted for hospital price transparency noncompliance, with notice date, effective date and a link to CMS's source PDF, plus CMS's published warning-notice and CAP-request counts.",
  url: "https://sealofaudit.com/enforcement-tracker/",
  creator: { "@id": "https://sealofaudit.com/#organization" },
  isAccessibleForFree: true,
  license: "https://www.cms.gov/",
  dateModified: FETCHED,
  keywords: ["hospital price transparency", "CMS", "civil monetary penalty", "MRF", "compliance"],
};

const blogSchema = datasetSchema;

export default function Page() {
  const years = Object.keys(CMPS_BY_YEAR).sort();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Breadcrumbs items={[{ name: "Enforcement Tracker", path: "/enforcement-tracker/" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }]}
        title="CMS Price Transparency Enforcement Tracker"
      />

      <div style={{"maxWidth": 860, "margin": "0 auto 28px", "padding": "14px 18px", "background": "#f0fdf4", "borderLeft": "4px solid #0a7a4a", "borderRadius": "0 8px 8px 0", "fontSize": 15, "color": "#1e293b"}}>
        <strong style={{"color": "#0a7a4a"}}>SealOfAudit.com</strong> is a CMS price transparency compliance auditor for US hospitals — free 8-point MRF risk check, remediation, and penalty defense.{" "}
        <a href="/services/mrf-remediation/" style={{"color": "#0a7a4a"}}>MRF remediation</a> ·{" "}
        <a href="/services/cms-warning-letter-response/" style={{"color": "#0a7a4a"}}>warning letter response</a> ·{" "}
        <a href="/penalty-calculator/" style={{"color": "#0a7a4a"}}>penalty exposure calculator</a> ·{" "}
        <a href="/for-small-hospitals/" style={{"color": "#0a7a4a"}}>small &amp; rural hospitals</a> ·{" "}
        <a href="/adjacent-mandates/" style={{"color": "#0a7a4a"}}>other transparency mandates</a>
      </div>

      <section>
        <div className="container" style={{"maxWidth": 860}}>
          <p style={{"fontSize": 17, "color": "var(--muted)", "marginBottom": 22}}>
            Every number on this page is counted directly from a live cms.gov page and dated.
            We publish no estimated enforcement figures, and we do not compute an escalation
            rate — see the methodology note below for why that number cannot honestly be given.
          </p>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>The verified numbers</h2>
          <div className="grid" style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(190px, 1fr))", "gap": 14, "marginBottom": 10}}>
            <div className="card" style={{"padding": 16}}>
              <div style={{"fontSize": 34, "fontWeight": 700, "color": "var(--ink)"}}>{CMPS.length}</div>
              <div style={{"fontSize": 14, "color": "var(--muted)"}}>civil monetary penalties posted</div>
              <div style={{"fontSize": 12, "color": "var(--muted)", "marginTop": 6}}>CMS enforcement actions list, counted {FETCHED}</div>
            </div>
            <div className="card" style={{"padding": 16}}>
              <div style={{"fontSize": 34, "fontWeight": 700, "color": "var(--ink)"}}>730+</div>
              <div style={{"fontSize": 14, "color": "var(--muted)"}}>warning notices</div>
              <div style={{"fontSize": 12, "color": "var(--muted)", "marginTop": 6}}>CMS fact sheet, April 2023 — CMS has not refreshed this count since</div>
            </div>
            <div className="card" style={{"padding": 16}}>
              <div style={{"fontSize": 34, "fontWeight": 700, "color": "var(--ink)"}}>269</div>
              <div style={{"fontSize": 14, "color": "var(--muted)"}}>corrective action plan requests</div>
              <div style={{"fontSize": 12, "color": "var(--muted)", "marginTop": 6}}>CMS fact sheet, April 2023</div>
            </div>
            <div className="card" style={{"padding": 16}}>
              <div style={{"fontSize": 34, "fontWeight": 700, "color": "var(--ink)"}}>200+</div>
              <div style={{"fontSize": 14, "color": "var(--muted)"}}>automated reviews per month</div>
              <div style={{"fontSize": 12, "color": "var(--muted)", "marginTop": 6}}>CMS scaled this up from 30-40 per month</div>
            </div>
          </div>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>Penalties by year of notice</h2>
          <p style={{"color": "var(--muted)", "marginBottom": 12}}>
            {years.map((y) => `${y}: ${CMPS_BY_YEAR[y]}`).join("  ·  ")}
          </p>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>Every CMS price transparency penalty</h2>
          <div style={{"overflowX": "auto"}}>
            <table style={{"width": "100%", "borderCollapse": "collapse", "fontSize": 15}}>
              <thead>
                <tr>
                  <th style={{"textAlign": "left", "border": "1px solid #ddd", "padding": 10}}>Notice date</th>
                  <th style={{"textAlign": "left", "border": "1px solid #ddd", "padding": 10}}>Hospital</th>
                  <th style={{"textAlign": "left", "border": "1px solid #ddd", "padding": 10}}>Effective date</th>
                  <th style={{"textAlign": "left", "border": "1px solid #ddd", "padding": 10}}>Source</th>
                </tr>
              </thead>
              <tbody>
                {CMPS.map((r, i) => (
                  <tr key={i}>
                    <td style={{"border": "1px solid #ddd", "padding": 10}}>{r.cmp_notice_date}</td>
                    <td style={{"border": "1px solid #ddd", "padding": 10}}>{r.hospital}</td>
                    <td style={{"border": "1px solid #ddd", "padding": 10}}>{r.effective_date}</td>
                    <td style={{"border": "1px solid #ddd", "padding": 10}}>
                      <a href={r.source_url} rel="noopener" style={{"color": "#0a7a4a"}}>CMS</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>How the enforcement process runs</h2>
          <ol style={{"color": "var(--muted)", "paddingLeft": 22, "lineHeight": 1.9}}>
            {PROCESS.map((s, i) => <li key={i}>{s}</li>)}
          </ol>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>What changed in 2026</h2>
          <p style={{"color": "var(--muted)", "marginBottom": 12}}>{CHANGE_2026}</p>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>Methodology, and why we publish no escalation rate</h2>
          <p style={{"color": "var(--muted)", "marginBottom": 12}}>
            The penalty list is crawled from CMS&apos;s enforcement actions page and counted row by row;
            each entry links to CMS&apos;s own notice document. The warning-notice and CAP-request
            figures are quoted from CMS&apos;s April 2023 enforcement fact sheet, which remains CMS&apos;s
            most recent published notice count.
          </p>
          <p style={{"color": "var(--muted)", "marginBottom": 12}}>
            We deliberately do not state an escalation rate. Doing so would mean dividing the
            current penalty count by a notice count last updated in April 2023 — two different
            periods. Any site quoting a precise escalation percentage, including an earlier page
            of ours, is presenting an artefact of that mismatch rather than a measurement.
          </p>

          <h2 style={{"fontSize": 26, "color": "var(--ink)", "margin": "30px 0 14px"}}>Sources</h2>
          <ul style={{"color": "var(--muted)", "paddingLeft": 22, "lineHeight": 1.9}}>
            <li><a href={SOURCES.cmp_list} rel="noopener" style={{"color": "#0a7a4a"}}>CMS enforcement actions list</a> (penalty rows)</li>
            <li><a href={SOURCES.fact_sheet} rel="noopener" style={{"color": "#0a7a4a"}}>CMS enforcement updates fact sheet</a> (notice and CAP counts)</li>
            <li>{SOURCES.regulation}</li>
          </ul>
          <p style={{"color": "var(--muted)", "marginTop": 12}}>
            Machine-readable copy for researchers and journalists:{" "}
            <a href="/data/cms-enforcement-2026.json" style={{"color": "#0a7a4a"}}>/data/cms-enforcement-2026.json</a>.
            Cite as: SealOfAudit.com, CMS price transparency enforcement tracker, retrieved {FETCHED}.
          </p>

          <div style={{"marginTop": 30, "padding": 20, "background": "#f8fafc", "borderRadius": 10, "border": "1px solid #e2e8f0"}}>
            <h3 style={{"marginTop": 0}}>Is your file on the next version of this list?</h3>
            <p style={{"color": "var(--muted)", "marginBottom": 12}}>
              CMS runs over 200 automated comprehensive reviews a month. A free 8-point MRF risk
              check tells you whether your file would pass.
            </p>
            <Link className="btn" href="/contact/">Get the free MRF risk check</Link>
          </div>
        </div>
      </section>
    </>
  );
}
