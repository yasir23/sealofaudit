import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="logo" href="/" style={{ color: "#fff", fontSize: 20 }}>
              Seal<span style={{ color: "#22d3ee" }}>OfAudit</span>
            </Link>
            <p style={{ marginTop: 12, fontSize: 14 }}>
              Compliance audit services for US hospitals. SealOfAudit.com.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            <Link href="/services">MRF Risk Check</Link>
            <Link href="/services">Compliance Audit</Link>
            <Link href="/services">Full Remediation</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div>
            <h4>Resources</h4>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/sample-report">Sample Report</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/blog/cms-mrf-requirements-2026">MRF Checklist</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <Link href="/contact">Free Risk Check</Link>
            <a href="mailto:sales@sealofaudit.com">sales@sealofaudit.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SealOfAudit.com</span>
          <span>Not affiliated with CMS. For informational purposes only.</span>
        </div>
      </div>
    </footer>
  );
}
