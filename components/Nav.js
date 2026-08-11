"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="container">
        <Link className="logo" href="/">
          Seal<span>OfAudit</span>
        </Link>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/how-it-works" onClick={() => setOpen(false)}>How It Works</Link>
          <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/sample-report" onClick={() => setOpen(false)}>Sample Report</Link>
          <Link href="/insights" onClick={() => setOpen(false)}>Insights</Link>
          <Link href="/contact" className="nav-cta" onClick={() => setOpen(false)}>Free Risk Check</Link>
        </div>
      </div>
    </nav>
  );
}
