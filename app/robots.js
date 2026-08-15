export default function robots() {
  const allowCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "PerplexityBot",
    "ClaudeBot",
    "Claude-Web",
    "Google-Extended",
    "Googlebot",
    "Bingbot",
  ];
  return {
    rules: [
      // Explicitly ALLOW AI answer engines — being cited by ChatGPT/Perplexity
      // is a core GEO goal; never block them.
      ...allowCrawlers.map((ua) => ({ userAgent: ua, allow: "/" })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you"],
      },
    ],
    sitemap: "https://sealofaudit.com/sitemap.xml",
  };
}
