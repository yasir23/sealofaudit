"use client";
import { useEffect, useRef } from "react";

/**
 * Tilt4D — 3D tilt-on-hover card (Nudot cube treatment).
 * Card rotates toward the cursor in 3D (rotateX/rotateY + perspective),
 * with a depth "shine" layer. Desktop hover only; no-op on touch/reduced-motion.
 */
export default function Tilt4D({ children, className = "", max = 10 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;   // -0.5..0.5
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${(px * max).toFixed(2)}deg) rotateX(${(-py * max).toFixed(2)}deg) translateZ(8px)`;
        el.style.setProperty("--tilt-x", `${((px + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--tilt-y", `${((py + 0.5) * 100).toFixed(1)}%`);
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
  }, [max]);

  return (
    <div ref={ref} className={`tilt4d ${className}`.trim()}>
      {children}
      <div className="tilt4d-shine" aria-hidden="true" />
    </div>
  );
}
