// app/unsubscribe/page.js — static unsubscribe page (GH Pages export).
// No searchParams (static export cannot render them). Suppression is handled by
// unsub_processor.py scanning the monitored inbox for STOP / unsubscribe replies.
export const metadata = {
  title: "Unsubscribe — SealOfAudit",
  description: "Stop receiving emails from SealOfAudit.",
};

const MAILTO =
  "mailto:info@sealofaudit.com?subject=unsubscribe&body=Please%20unsubscribe%20me%20from%20all%20SealOfAudit%20emails.";

export default function UnsubscribePage() {
  return (
    <main style={{ maxWidth: 640, margin: "80px auto", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 26, marginBottom: 8 }}>Unsubscribe</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        We will remove you from all SealOfAudit outreach immediately.
      </p>
      <p style={{ marginBottom: 12 }}>
        <strong>Fastest:</strong> reply STOP to any email we sent you — it is
        processed automatically and permanently.
      </p>
      <p style={{ marginBottom: 24 }}>Or use the button below:</p>
      <p>
        <a
          href={MAILTO}
          style={{
            display: "inline-block", padding: "12px 20px", fontSize: 16,
            background: "#111", color: "#fff", borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Unsubscribe me
        </a>
      </p>
      <p style={{ color: "#888", fontSize: 13, marginTop: 32 }}>
        Questions? info@sealofaudit.com | SealOfAudit.com
      </p>
    </main>
  );
}
