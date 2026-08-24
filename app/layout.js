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
    images: [{ url: "/og-image.png", width: 1200, height: 628, alt: "SealOfAudit — CMS Price Transparency Compliance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SealOfAudit — CMS Price Transparency Compliance",
    description: "Free CMS MRF risk check. 24-hour turnaround.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://sealofaudit.com/#organization",
    name: "SealOfAudit",
    alternateName: "Seal of Audit",
    url: "https://sealofaudit.com/",
    logo: "https://sealofaudit.com/og-image.png",
    image: "https://sealofaudit.com/og-image.png",
    description:
      "CMS price transparency compliance audits for US hospitals. Machine-readable file (MRF) risk checks, compliance audits, and full remediation under 45 CFR 180.50.",
    email: "sales@sealofaudit.com",
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: "CMS Price Transparency Compliance Audit",
    knowsAbout: [
      "45 CFR 180.50",
      "CMS price transparency",
      "Hospital machine-readable files",
      "Payer-specific negotiated rates",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "SealOfAudit.com",
      url: "https://sealofaudit.com",
    },
    priceRange: "$0-$15000",
    offers: [
      {
        "@type": "Offer",
        name: "Free MRF Risk Check",
        price: "0",
        priceCurrency: "USD",
        url: "https://sealofaudit.com/contact/",
      },
      {
        "@type": "Offer",
        name: "Compliance Audit",
        price: "3500",
        priceCurrency: "USD",
        url: "https://sealofaudit.com/pricing/",
      },
      {
        "@type": "Offer",
        name: "Full Remediation",
        price: "15000",
        priceCurrency: "USD",
        url: "https://sealofaudit.com/pricing/",
      },
    ],
    sameAs: [],
  };
  const webSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://sealofaudit.com/#website",
    url: "https://sealofaudit.com/",
    name: "SealOfAudit",
    description: "CMS price transparency compliance audits for US hospitals.",
    publisher: { "@id": "https://sealofaudit.com/#organization" },
    inLanguage: "en-US",
  };
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSchema) }}
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
