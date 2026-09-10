// app/price-transparency-file-guide/page.js
// Definitive field-by-field guide to the CMS machine-readable file (45 CFR §180.50).
// Written from real hospital MRF files we downloaded and parsed.
export const metadata = {
  title: "How to Read a Hospital Price-Transparency File (CMS MRF v3.0.0) | SealOfAudit",
  description:
    "Field-by-field guide to the machine-readable file every US hospital must publish under 45 CFR §180.50 — the required elements, the real JSON structure, and the five failures we see most. By SealOfAudit.",
  alternates: { canonical: "https://sealofaudit.com/price-transparency-file-guide/" },
};

const S = {
  wrap: { maxWidth: 820, margin: "0 auto", padding: "48px 20px 80px", lineHeight: 1.65 },
  h1: { fontSize: 32, lineHeight: 1.25, margin: "0 0 12px" },
  h2: { fontSize: 22, margin: "36px 0 10px" },
  h3: { fontSize: 17, margin: "24px 0 8px" },
  p: { margin: "0 0 14px" },
  code: { background: "#f4f4f5", padding: "2px 6px", borderRadius: 4, fontSize: 14 },
  pre: { background: "#0f172a", color: "#e2e8f0", padding: 16, borderRadius: 8, overflowX: "auto", fontSize: 13 },
  table: { width: "100%", borderCollapse: "collapse", margin: "12px 0 20px", fontSize: 15 },
  th: { textAlign: "left", borderBottom: "2px solid #e4e4e7", padding: "8px 10px", background: "#fafafa" },
  td: { borderBottom: "1px solid #f0f0f2", padding: "8px 10px", verticalAlign: "top" },
  note: { background: "#f8fafc", borderLeft: "3px solid #111", padding: "12px 16px", margin: "18px 0" },
};

function T({ head, rows }) {
  return (
    <table style={S.table}>
      <thead>
        <tr>{head.map((h) => <th key={h} style={S.th}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{r.map((c, j) => <td key={j} style={S.td}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Page() {
  return (
    <main style={S.wrap}>
      <h1 style={S.h1}>How to Read a Hospital Price-Transparency File</h1>
      <p style={{ ...S.p, color: "#52525b" }}>
        The field-by-field guide to the machine-readable file every US hospital must publish
        under 45 CFR §180.50 — written from files we downloaded and parsed ourselves.
        Last updated 10 September 2026.
      </p>

      <h2 style={S.h2}>Why this file matters</h2>
      <p style={S.p}>
        Since the CMS price-transparency rules took effect, every US hospital must publish a
        <strong> machine-readable file (MRF)</strong> containing its standard charges. It is not a PDF
        and not a web page — it is structured data at a public URL, refreshed at least annually.
      </p>
      <p style={S.p}>
        That file is the source of truth for patients comparing prices, for insurers and auditors,
        and for CMS enforcement, which now uses automated crawlers to check compliance. If your
        file is missing fields, malformed, or unreachable, that is an exposure regardless of how
        good your chargemaster is internally.
      </p>

      <h2 style={S.h2}>Where the file lives</h2>
      <p style={S.p}>There is no single mandated path. Real examples we have seen:</p>
      <pre style={S.pre}>{`https://<hospital-domain>/price-transparency
https://<hospital-domain>/patients/billing-finance/comprehensive-hospital-charges
https://<hospital-domain>/sites/.../machine-readable-files/<facility>.zip
https://<hospital-domain>/site_data/<id>_<facility>_standardcharges.json`}</pre>
      <p style={S.p}>
        What <em>is</em> required: the file must be publicly reachable without login, at no cost, and
        the hospital must post a link to it on a publicly available page. Large systems typically
        publish one file per facility, so a single system may publish dozens.
      </p>

      <h2 style={S.h2}>The structure (verified against live files)</h2>
      <pre style={S.pre}>{`{
  "hospital_name": "Example Memorial Hospital",
  "last_updated_on": "2026-01-01",
  "version": "3.0.0",
  "attestation": { "confirm_attestation": true, "attester_name": "..." },
  "standard_charge_information": [
    {
      "description": "Comprehensive metabolic panel",
      "code_information": [ { "code": "80053", "type": "CPT" } ],
      "standard_charges": [
        {
          "setting": "outpatient",
          "gross_charge": 848.80,
          "discounted_cash": 594.16,
          "minimum": 86.81,
          "maximum": 848.80,
          "methodology": "case rate",
          "payers_information": [
            {
              "payer_name": "Example Health Plan",
              "plan_name": "PPO",
              "standard_charge_dollar": 412.50,
              "median_amount": 402.10
            }
          ]
        }
      ]
    }
  ]
}`}</pre>

      <h2 style={S.h2}>File-level fields (required)</h2>
      <T head={["Field", "What it is", "Common mistake"]} rows={[
        [<code style={S.code}>hospital_name</code>, "Legal name of the facility this file covers", "Using only the parent system name — CMS expects the specific hospital"],
        [<code style={S.code}>last_updated_on</code>, "Date the charges were last updated", "Stale date; it must refresh at least annually and after mid-year changes"],
        [<code style={S.code}>version</code>, "CMS schema version (currently 3.x)", "Omitting it, or leaving an older schema in place"],
        [<code style={S.code}>attestation</code>, "Confirms the file is accurate and complete", "Missing confirm_attestation / attester_name"],
      ]} />

      <h2 style={S.h2}>Per item / service</h2>
      <T head={["Field", "What it is"]} rows={[
        [<code style={S.code}>description</code>, "Plain-language description of the item or service"],
        [<code style={S.code}>code_information</code>, "The billing code(s) and type (CPT, HCPCS, RC, DRG, NDC). Multiple codes per item are normal"],
      ]} />

      <h2 style={S.h2}>Inside standard_charges (one entry per setting)</h2>
      <T head={["Field", "What it is", "Notes"]} rows={[
        [<code style={S.code}>setting</code>, "inpatient, outpatient, or both", "A hospital may publish separate entries per setting"],
        [<code style={S.code}>gross_charge</code>, "The chargemaster (list) price", "Highest number, rarely what anyone pays"],
        [<code style={S.code}>discounted_cash</code>, "Cash price for a self-pay patient paying at time of service", "Must be an actual price, not a percentage"],
        [<code style={S.code}>minimum</code>, "De-identified minimum negotiated rate across all payers", "The field auditors look for — and the one most often missing"],
        [<code style={S.code}>maximum</code>, "De-identified maximum negotiated rate across all payers", "Same"],
        [<code style={S.code}>methodology</code>, "How the negotiated rate is derived (fee schedule, case rate, capitation, percent of billed)", "Omitting it is a completeness gap"],
      ]} />

      <h2 style={S.h2}>Inside payers_information</h2>
      <T head={["Field", "What it is"]} rows={[
        [<code style={S.code}>payer_name</code>, "The insurance company"],
        [<code style={S.code}>plan_name</code>, "The specific plan/product"],
        [<code style={S.code}>standard_charge_dollar</code>, "The negotiated dollar amount"],
        [<code style={S.code}>standard_charge_percentage</code>, "Negotiated amount as a percentage of billed"],
        [<code style={S.code}>standard_charge_algorithm</code>, "The formula, when the rate is neither fixed dollar nor percentage"],
        [<code style={S.code}>median_amount</code>, "Median allowed amount, where the item is shoppable"],
      ]} />
      <div style={S.note}>
        <strong>Key point:</strong> <code style={S.code}>minimum</code> and <code style={S.code}>maximum</code> are
        <em> de-identified</em>. You publish the low and high negotiated rates but not which payer holds
        which. The payer-by-payer detail belongs inside <code style={S.code}>payers_information</code>.
      </div>

      <h2 style={S.h2}>The five failures we see most</h2>
      <ol style={{ ...S.p, paddingLeft: 22 }}>
        <li><strong>File not published where it can be found</strong> — link buried, behind a form, or on a dead facility page.</li>
        <li><strong>Missing minimum/maximum</strong> — the de-identified negotiated range is absent or partial.</li>
        <li><strong>No attestation</strong> — the file looks complete but nobody attested to it.</li>
        <li><strong>Stale last_updated_on</strong> — a date over a year old; visible and easily checked.</li>
        <li><strong>One file for many facilities</strong> — labelled with the system name instead of each hospital's own file.</li>
      </ol>

      <h2 style={S.h2}>Check your own file in five minutes</h2>
      <ol style={{ ...S.p, paddingLeft: 22 }}>
        <li>Open the URL you publish. Confirm it loads with <strong>no login</strong> and returns the raw file.</li>
        <li>Check the top level for <code style={S.code}>hospital_name</code>, <code style={S.code}>last_updated_on</code>, <code style={S.code}>version</code>, <code style={S.code}>attestation</code>.</li>
        <li>Pick any five clinical items — confirm <code style={S.code}>gross_charge</code>, <code style={S.code}>discounted_cash</code>, <code style={S.code}>minimum</code>, <code style={S.code}>maximum</code> are all present, with at least one <code style={S.code}>payers_information</code> entry.</li>
        <li>Confirm the file covers <strong>this facility specifically</strong>, not the whole system.</li>
        <li>Note the <code style={S.code}>last_updated_on</code> date and diarise next year's update.</li>
      </ol>
      <p style={S.p}>If any step fails, you have a finding.</p>

      <h2 style={S.h2}>Frequently asked</h2>
      <p style={S.p}><strong>Is CSV acceptable instead of JSON?</strong> Yes — CMS permits machine-readable formats including CSV, provided the required elements are present and the file is posted publicly.</p>
      <p style={S.p}><strong>Can we publish one file for the whole system?</strong> The file must reflect the standard charges of the hospital. Most systems publish per-facility files because rates differ by hospital.</p>
      <p style={S.p}><strong>How big is the file?</strong> Commonly 50&nbsp;MB to several GB. That is normal — but your hosting must serve it reliably.</p>

      <div style={{ ...S.note, marginTop: 32 }}>
        SealOfAudit audits hospital price-transparency files against the required elements and
        produces a findings report.{" "}
        <a href="/contact" style={{ color: "#111", fontWeight: 600 }}>Request a free check</a> or call
        +1 315 953 2456.
      </div>
      <p style={{ fontSize: 13, color: "#71717a", marginTop: 24 }}>
        This guide is published as a reference for compliance and revenue-cycle teams. It is not legal advice.
      </p>
    </main>
  );
}
