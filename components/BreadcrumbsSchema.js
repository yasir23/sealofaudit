// BreadcrumbList schema helper — shared by inner pages.
// Usage: import Breadcrumbs from "@/components/BreadcrumbsSchema";
//        <Breadcrumbs items={[{name:"Services", path:"/services/"}]} />
export default function Breadcrumbs({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://sealofaudit.com/" },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.name,
        item: `https://sealofaudit.com${it.path}`,
      })),
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
