import Link from "next/link";

export const metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <section style={{ padding: "120px 0", textAlign: "center" }}>
      <div className="container">
        <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
        <h1 style={{ fontSize: 36, color: "var(--ink)", marginBottom: 14 }}>Request Received</h1>
        <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 520, margin: "0 auto 30px" }}>
          Thank you. Your free MRF risk check is queued. You&apos;ll receive your compliance report within 24 hours at the email you provided.
        </p>
        <Link className="btn btn-primary" href="/">Back to Home</Link>
      </div>
    </section>
  );
}
