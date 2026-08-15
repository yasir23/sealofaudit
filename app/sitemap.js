export default function sitemap() {
  const base = "https://sealofaudit.com";
  const routes = [
    "", "/services", "/how-it-works", "/pricing", "/sample-report", "/insights", "/contact",
    "/blog/cms-mrf-requirements-2026", "/blog/cms-fines-hospital-price-transparency",
    "/blog/find-hospital-mrf-file", "/blog/payer-specific-negotiated-rates-guide",
    "/blog/hospital-price-transparency-requirements", "/blog/cms-shoppable-services-list",
    "/blog/standard-charges-vs-negotiated-rates", "/blog/cms-price-transparency-fines-list",
    "/blog/mrf-json-format-guide", "/blog/price-transparency-compliance-checklist",
    "/blog/cms-enforcement-actions-2026",
    "/compare", "/compare/sealofaudit-vs-kpmg",
    "/compare/sealofaudit-vs-doing-it-yourself",
    "/compare/mrf-audit-vs-price-transparency-consultant",
  ];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
