import Link from "next/link";
import Parallax4D from "@/components/Parallax4D";
import StaggerText from "@/components/StaggerText";

/**
 * PageHero — studio-grade inner-page header (dark cinematic + 4D depth).
 * Used by services, pricing, how-it-works, sample-report, insights, contact.
 */
export default function PageHero({ crumbs, title, sub, visual = "compliance" }) {
  const visuals = {
    compliance: "/4d/compliance-hero.svg",
    report: "/4d/report-visual.svg",
  };
  const src = visuals[visual] || visuals.compliance;

  return (
    <header className="page-hero">
      <div className="page-hero-4d" aria-hidden="true">
        <Parallax4D speed={0.12} maxShift={28}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" width={640} height={420} />
        </Parallax4D>
      </div>
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
        <h1>
          <StaggerText text={title} split={[]} stagger={35} />
        </h1>
        {sub && <p>{sub}</p>}
      </div>
    </header>
  );
}
