export default function sitemap() {
  const base = "https://sealofaudit.com";
  const routes = [
    "", "/services", "/how-it-works", "/pricing", "/sample-report", "/insights", "/contact",
    "/blog/cms-mrf-requirements-2026", "/blog/cms-fines-hospital-price-transparency",
    "/blog/find-hospital-mrf-file", "/blog/payer-specific-negotiated-rates-guide",
  ];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
