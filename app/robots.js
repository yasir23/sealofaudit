export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you"],
      },
    ],
    sitemap: "https://sealofaudit.com/sitemap.xml",
  };
}
