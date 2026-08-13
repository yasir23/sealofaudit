"use client";
import { useEffect, useRef } from "react";

/**
 * ScrubMotion — GSAP ScrollTrigger-style scrubbed animation, zero deps.
 * Element transform is LINKED to scroll progress (scrub): moves, rotates
 * and scales as it crosses the viewport. Richer than Parallax4D:
 * multi-axis drift + rotation + scale, still passive (never blocks scroll).
 */
export default function ScrubMotion({
  children,
  className = "",
  y = 80,        // max translateY px
  x = 0,         // max translateX px
  rotate = 3,    // max rotation deg
  scale = 1.04,  // base scale (>=1 to hide edges)
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = vh + r.height;
      const progress = (r.top + r.height / 2 - vh / 2) / total; // -0.5..0.5
      const p = Math.max(-0.5, Math.min(0.5, progress));
      // p: negative = below viewport, positive = above
      const ty = -p * y * 2;
      const tx = -p * x * 2;
      const rot = -p * rotate * 2;
      el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale})`;
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
  }, [y, x, rotate, scale]);

  return (
    <div ref={ref} className={`scrub-motion ${className}`.trim()}>
      {children}
    </div>
  );
}
