import Link from "next/link";

export default function PageHero({ crumbs, title, sub }) {
  return (
    <header className="page-hero">
      <div className="container">
        {crumbs && (
          <div className="breadcrumb">
            {crumbs.map((c, i) =>
              i === crumbs.length - 1 ? (
                <span key={i}> / {c.label}</span>
              ) : (
                <span key={i}>
                  {i > 0 && " / "}
                  <Link href={c.href}>{c.label}</Link>
                </span>
              )
            )}
          </div>
        )}
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </header>
  );
}
