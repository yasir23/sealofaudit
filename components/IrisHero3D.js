"use client";

// IRIS-STYLE WEBGL EXPERIENCE — custom particle galaxy hero
// Pattern-matched from irisventure.com: full-canvas WebGL particle scene,
// GPU capability check, graceful CSS fallback. Self-diagnosing.
import { useEffect, useRef, useState } from "react";

export default function IrisHero3D() {
  const canvasRef = useRef(null);
  const [supported, setSupported] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = null;
    try {
      gl = canvas.getContext("webgl", { antialias: true, alpha: true, preserveDrawingBuffer: true })
        || canvas.getContext("experimental-webgl", { antialias: true, alpha: true, preserveDrawingBuffer: true });
      if (!gl) { setSupported(false); return; }
      // GPU check — reject software renderers (irisventure pattern)
      const dbg = gl.getExtension("WEBGL_debug_renderer_info");
      if (dbg) {
        const r = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL).toLowerCase();
        if (r.includes("swiftshader") || r.includes("llvmpipe") || r.includes("softpipe") || r.includes("software")) {
          setSupported(false); return;
        }
      }
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        setSupported(false); return;
      }
    } catch (e) {
      setSupported(false); return;
    }

    // ---- Shaders ----
    const vertSrc = `
      attribute vec2 a_pos;
      attribute vec3 a_color;
      attribute float a_size;
      attribute float a_alpha;
      varying vec3 v_color;
      varying float v_alpha;
      void main() {
        v_color = a_color;
        v_alpha = a_alpha;
        gl_Position = vec4(a_pos, 0.0, 1.0);
        gl_PointSize = a_size;
      }
    `;
    const fragSrc = `
      precision mediump float;
      varying vec3 v_color;
      varying float v_alpha;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        float glow = smoothstep(0.5, 0.0, d);
        float core = smoothstep(0.12, 0.0, d);
        vec3 col = v_color * (glow * 0.6 + core * 1.4);
        gl_FragColor = vec4(col, v_alpha * (glow * 0.5 + core));
      }
    `;

    let ok = true;
    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        ok = false;
        console.error("iris shader:", gl.getShaderInfoLog(s));
      }
      return s;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("iris link:", gl.getProgramInfoLog(prog));
      setSupported(false);
      return;
    }
    if (!ok) { setSupported(false); return; }
    gl.useProgram(prog);

    const aPos = gl.getAttribLocation(prog, "a_pos");
    const aColor = gl.getAttribLocation(prog, "a_color");
    const aSize = gl.getAttribLocation(prog, "a_size");
    const aAlpha = gl.getAttribLocation(prog, "a_alpha");

    // ---- Particle system: two-arm spiral galaxy ----
    const COUNT = 2500;
    const pos = new Float32Array(COUNT * 2);
    const col = new Float32Array(COUNT * 3);
    const size = new Float32Array(COUNT);
    const alpha = new Float32Array(COUNT);

    // Palette: coral #FF514A, light blue #C8DFF5, peach #FFB686, cream #E4ECF6
    const palette = [
      [1.0, 0.318, 0.29],
      [0.784, 0.875, 0.961],
      [1.0, 0.714, 0.525],
      [0.894, 0.925, 0.965],
    ];
    // v2 — iris experience
    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT;
      const arm = (i % 2) * Math.PI;
      const r = Math.pow(t, 0.65) * 1.05;
      const angle = arm + t * 9.0;
      pos[i*2] = Math.cos(angle) * r;
      pos[i*2+1] = Math.sin(angle) * r * 0.72;
      pos[i*2] += (Math.random()-0.5) * 0.06;
      pos[i*2+1] += (Math.random()-0.5) * 0.06;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i*3] = c[0]; col[i*3+1] = c[1]; col[i*3+2] = c[2];
      size[i] = 2.0 + Math.random() * 4.0;
      alpha[i] = 0.4 + Math.random() * 0.6;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
    const colBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
    gl.bufferData(gl.ARRAY_BUFFER, col, gl.STATIC_DRAW);
    const sizeBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
    gl.bufferData(gl.ARRAY_BUFFER, size, gl.STATIC_DRAW);
    const alphaBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuf);
    gl.bufferData(gl.ARRAY_BUFFER, alpha, gl.STATIC_DRAW);

    // Rotation offsets buffer — updated per frame
    const offBuf = gl.createBuffer();
    const off = new Float32Array(COUNT * 2);
    gl.bindBuffer(gl.ARRAY_BUFFER, offBuf);
    gl.bufferData(gl.ARRAY_BUFFER, off, gl.DYNAMIC_DRAW);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize);

    let rotation = 0;
    let raf = 0;
    function frame() {
      rotation += 0.0022;
      const pulse = 1 + Math.sin(performance.now() / 2600) * 0.05;
      for (let i = 0; i < COUNT; i++) {
        const t = i / COUNT;
        const r = Math.pow(t, 0.65) * 1.05 * pulse;
        const a = rotation + ((i % 2) * Math.PI) + t * 9.0;
        off[i*2] = Math.cos(a) * r;
        off[i*2+1] = Math.sin(a) * r * 0.72;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, offBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, off);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      // positions = rotating offsets
      gl.bindBuffer(gl.ARRAY_BUFFER, offBuf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
      gl.enableVertexAttribArray(aColor);
      gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
      gl.enableVertexAttribArray(aSize);
      gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuf);
      gl.enableVertexAttribArray(aAlpha);
      gl.vertexAttribPointer(aAlpha, 1, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, COUNT);
      raf = requestAnimationFrame(frame);
    }
    frame();
    setLoaded(true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!supported) {
    return (
      <div className="iris-fallback" aria-hidden="true">
        <div className="iris-core" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`iris-canvas ${loaded ? "iris-loaded" : ""}`}
      aria-hidden="true"
    />
  );
}
