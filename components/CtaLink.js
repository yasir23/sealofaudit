/**
 * CtaLink — a call-to-action that becomes a REAL buy/book button when a link is
 * configured, and falls back to the contact form when it is not.
 *
 * WHY THIS EXISTS
 * Every CTA on this site used to point at /contact, so a CFO who said yes had nothing to
 * click. There was no way to take money and no way to book a call. This component removes
 * that blocker without needing the accounts to exist yet: paste a link into an env var,
 * rebuild, and the same button starts taking money.
 *
 * STATIC EXPORT CAVEAT (important, and it bites people)
 * This site is `output: 'export'`. `process.env.NEXT_PUBLIC_*` is INLINED AT BUILD TIME,
 * not read at runtime. So setting the env var is not enough — you must rebuild and
 * redeploy. A missing rebuild is the most likely reason a configured link "does nothing".
 *
 * CONFIGURATION (any, all, or none may be set)
 *   NEXT_PUBLIC_PAYMENT_LINK   e.g. a Stripe payment link or a Xero online-invoice URL
 *   NEXT_PUBLIC_BOOKING_LINK   e.g. a Cal.com / Calendly / Tally scheduling URL
 *
 * UNSET IS SAFE: the button keeps its current behaviour (goes to /contact), so deploying
 * this changes nothing until a link is supplied.
 */

import Link from "next/link";

const PAYMENT_LINK = process.env.NEXT_PUBLIC_PAYMENT_LINK || "";
const BOOKING_LINK = process.env.NEXT_PUBLIC_BOOKING_LINK || "";

function isUsable(url) {
  return typeof url === "string" && /^https?:\/\//i.test(url.trim());
}

export default function CtaLink({
  href = "/contact",
  prefer = "booking", // "payment" | "booking" | "none"
  className = "btn btn-primary",
  label,
  children,
}) {
  let target = href;
  let external = false;

  if (prefer === "payment" && isUsable(PAYMENT_LINK)) {
    target = PAYMENT_LINK.trim();
    external = true;
  } else if (prefer !== "none" && isUsable(BOOKING_LINK)) {
    target = BOOKING_LINK.trim();
    external = true;
  }

  if (external) {
    return (
      <a
        className={className}
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="external"
      >
        {label || children}
      </a>
    );
  }

  return (
    <Link className={className} href={target} data-cta="internal">
      {label || children}
    </Link>
  );
}

/**
 * Which paths are actually live right now. Exported so a build-time check (or a test) can
 * assert what a given build will do, instead of guessing from the deployed HTML.
 */
export function conversionPaths() {
  return {
    payment: isUsable(PAYMENT_LINK) ? PAYMENT_LINK.trim() : null,
    booking: isUsable(BOOKING_LINK) ? BOOKING_LINK.trim() : null,
    contactFormFallback: true,
    canTakeMoney: isUsable(PAYMENT_LINK),
    canBookCall: isUsable(BOOKING_LINK),
  };
}
