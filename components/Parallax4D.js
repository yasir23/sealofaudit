"use client";
import { useEffect, useRef } from "react";

/**
 * Parallax4D — Nudot-style depth-layer image treatment.
 * Layers move at different speeds on scroll (translateZ illusion via scale/translate),
 * creating a 4D depth effect. Zero deps (rAF + scroll listener), reduced-motion safe,
 * and it never blocks scroll or clicks.
 *
 * Usage:
 *   <Parallax4D speed={0.25}>
 *     <img src="/4d/hero.jpg" />
 *   </Parallax4D>
 */
export default function Parallax4D({
  children,
  speed = 0.2,
  className = "",
  maxShift = 60,
}) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress -1 (below viewport) .. 0 (center) .. 1 (above)
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh + rect.height);
      const shift = Math.max(-maxShift, Math.min(maxShift, progress * speed * 500));
      inner.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(1.06)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, maxShift]);

  return (
    <div ref={wrapRef} className={`p4d-wrap ${className}`.trim()}>
      <div ref={innerRef} className="p4d-inner">
        {children}
      </div>
    </div>
  );
}
