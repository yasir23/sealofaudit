"use client";
import { useEffect, useState } from "react";

/**
 * StaggerText — Nudot-style word-by-word kinetic headline reveal.
 * Each word fades + rises on mount with stagger; words split into
 * thin/bold weight if `split` is set (array of word indices to bold).
 */
export default function StaggerText({ text, className = "", split = [], stagger = 40 }) {
  const words = text.split(" ");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <span className={`stagger-text ${className}`.trim()} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          className={`stagger-word ${shown ? "shown" : ""} ${split.includes(i) ? "t-bold" : "t-thin"}`}
          style={{ transitionDelay: `${i * stagger}ms` }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
