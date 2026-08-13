"use client";
import { useEffect, useRef } from "react";

/**
 * Cube3D — Nudot-style rotating 3D cube (CSS preserve-3d).
 * Cube rotates slowly toward the cursor; accelerates into full spin
 * when scrolled into view. Pure CSS 3D, no libs.
 * Desktop hover only, reduced-motion safe.
 */
export default function Cube3D({
  faces = ["45 CFR", "180.50", "MRF", "AUDIT", "CMS", "COMPLY"],
  size = 130,
  className = "",
  autoSpin = true,
}) {
  const ref = useRef(null);
  const half = size / 2;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "rotateX(-24deg) rotateY(35deg)";
      return;
    }
    if (!window.matchMedia("(hover: hover)").matches) return;

    let raf = 0;
    let rx = -24, ry = 35; // current angles
    let tx = 0, ty = 0;    // target from cursor
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      tx = ((e.clientY - cy) / r.height) * 22; // rotateX target
      ty = ((e.clientX - cx) / r.width) * 40;  // rotateY target
    };
    const loop = () => {
      rx += (tx - rx) * 0.08;
      ry += (ty - ry) * 0.08;
      el.style.transform = `rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    el.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  const faceStyle = (i) => ({
    position: "absolute",
    width: size,
    height: size,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: Math.max(11, size * 0.11),
    fontWeight: 800,
    letterSpacing: "0.08em",
    color: "#f5f5f0",
    background: "rgba(10, 10, 20, 0.82)",
    border: "1px solid rgba(255, 81, 74, 0.45)",
    borderRadius: 12,
    boxShadow: "inset 0 0 30px rgba(255,81,74,0.08)",
    backfaceVisibility: "hidden",
  });

  const transforms = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(270deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  return (
    <div className={`cube3d-wrap ${className}`.trim()} style={{ width: size, height: size, perspective: size * 4 }}>
      <div ref={ref} className="cube3d" style={{ width: size, height: size, transformStyle: "preserve-3d" }}>
        {faces.map((f, i) => (
          <div key={i} style={{ ...faceStyle(i), transform: transforms[i] }}>{f}</div>
        ))}
      </div>
    </div>
  );
}
