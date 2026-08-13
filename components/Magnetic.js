"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Magnetic — Nudot-style magnetic button. Element is pulled toward the
 * cursor within a radius, springs back on leave. Desktop hover only,
 * reduced-motion safe.
 */
export default function Magnetic({ children, className = "", strength = 0.35 }) {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let raf = 0;

    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`.trim()} style={{ display: "inline-block", transition: "transform 0.25s cubic-bezier(.2,.8,.2,1)" }}>
      {children}
    </span>
  );
}
