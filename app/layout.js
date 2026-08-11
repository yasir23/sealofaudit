import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://sealofaudit.com"),
  title: {
    default: "SealOfAudit — CMS Price Transparency Compliance Audits for US Hospitals",
    template: "%s | SealOfAudit",
  },
  description:
    "Free CMS machine-readable file (MRF) risk check for US hospitals. CMS fines $5,500/day for non-compliance. Get your price transparency compliance report in 24 hours. Audits from $3,500.",
  keywords: [
    "CMS price transparency", "MRF audit", "machine-readable file compliance",
    "hospital price transparency", "45 CFR 180.50", "payer-specific negotiated rates",
    "CMS fine", "hospital compliance", "seal of audit",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "SealOfAudit",
    title: "SealOfAudit — CMS Price Transparency Compliance Audits",
    description:
      "CMS fines $5,500/day for non-compliant pricing files. 30-55% of hospitals fail audits. Get your free MRF risk check in 24 hours.",
    url: "https://sealofaudit.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "SealOfAudit — CMS Price Transparency Compliance",
    description: "Free CMS MRF risk check. 24-hour turnaround.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
