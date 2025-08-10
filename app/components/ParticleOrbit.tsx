// app/components/ParticleOrbit.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  /** Canvas box size in px (square). If omitted, it will stretch to parent width with a smart height. */
  size?: number;
  /** Approx number of particles */
  particles?: number;
  /** Extra classes for the wrapper */
  className?: string;
  /** Show centered logo overlay */
  showLogo?: boolean;
};

type P = {
  bx: number; // base (drifting) x
  by: number; // base (drifting) y
  x: number; // current x
  y: number; // current y
  vx: number;
  vy: number;
  r: number; // radius
  oR: number; // orbit radius
  oA: number; // orbit angle
  oS: number; // orbit speed
};

export default function ParticleOrbit({
  size = 320,
  particles = 160,
  className,
  showLogo = true,
}: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const mouseRef = React.useRef({ x: 0, y: 0, inside: false });
  const partsRef = React.useRef<P[]>([]);
  const dimsRef = React.useRef({ w: 0, h: 0, dpr: 1 });

  // Scroll-driven niceties
  const { scrollYProgress } = useScroll();
  const lineAlpha = useTransform(scrollYProgress, [0, 1], [0.6, 0.2]); // lines fade slightly on scroll
  const driftBoost = useTransform(scrollYProgress, [0, 1], [1, 1.6]);   // particles drift a bit more as you scroll
  const logoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.06]); // logo breathes
  const logoGlowOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.4]);

  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const rand = (a: number, b: number) => Math.random() * (b - a) + a;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      dimsRef.current.dpr = dpr;

      // If a fixed size is passed, use it; otherwise, use the element’s client box
      const cssW = size || canvas.clientWidth || 320;
      const cssH =
        size || // square when size provided
        Math.max(260, Math.floor((canvas.parentElement?.clientWidth || 360) * 0.6));

      dimsRef.current.w = cssW;
      dimsRef.current.h = cssH;

      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // (Re)spawn particles density-based
      const target = Math.max(particles, Math.floor((cssW * cssH) / 14000));
      const arr: P[] = [];
      for (let i = 0; i < target; i++) {
        const bx = rand(0, cssW);
        const by = rand(0, cssH);
        arr.push({
          bx,
          by,
          x: bx,
          y: by,
          vx: rand(-0.2, 0.2),
          vy: rand(-0.2, 0.2),
          r: rand(0.8, 2.1),
          oR: rand(8, 34),
          oA: rand(0, Math.PI * 2),
          oS: rand(0.002, 0.012) * (Math.random() < 0.5 ? -1 : 1),
        });
      }
      partsRef.current = arr;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.inside =
        mouseRef.current.x >= 0 &&
        mouseRef.current.x <= rect.width &&
        mouseRef.current.y >= 0 &&
        mouseRef.current.y <= rect.height;
    };

    const onMouseLeave = () => {
      mouseRef.current.inside = false;
    };

    const tick = () => {
      const { w, h } = dimsRef.current;
      ctx.clearRect(0, 0, w, h);

      // Subtle gradient bg (dark ink)
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(11,18,32,0.92)");
      g.addColorStop(1, "rgba(11,18,32,0.78)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const ps = partsRef.current;
      const m = mouseRef.current;

      // Update and draw particles
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        // drift (amplified slightly by scroll)
        const boost = (getLatest(driftBoost) ?? 1) as number;
        p.bx += p.vx * boost * 0.8;
        p.by += p.vy * boost * 0.8;

        // wrap
        if (p.bx < -40) p.bx = w + 40;
        if (p.bx > w + 40) p.bx = -40;
        if (p.by < -40) p.by = h + 40;
        if (p.by > h + 40) p.by = -40;

        // orbit
        p.oA += p.oS;
        const ox = Math.cos(p.oA) * p.oR;
        const oy = Math.sin(p.oA) * p.oR;

        // mouse influence (repel)
        let mx = 0,
          my = 0;
        if (m.inside) {
          const dx = p.bx - m.x;
          const dy = p.by - m.y;
          const d2 = dx * dx + dy * dy;
          const R = 170;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = (R - d) / R; // 0..1
            mx += (dx / d) * f * 5;
            my += (dy / d) * f * 5;
          }
        }

        p.x = p.bx + ox + mx;
        p.y = p.by + oy + my;

        // Draw particle (Neon Mint)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,255,195,0.9)";
        ctx.fill();
      }

      // connective lines
      const maxDist = 140;
      ctx.lineWidth = 1;
      const alphaBase = (getLatest(lineAlpha) ?? 0.5) as number;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const alpha = (1 - d2 / (maxDist * maxDist)) * alphaBase;
            ctx.strokeStyle = `rgba(221,226,234,${alpha})`; // Slate
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const getLatest = <T,>(v: any): T => {
      // Small helper because MotionValue could be a number or function
      return typeof v === "function" ? v() : (v as T);
    };

    resize();
    tick();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [size, particles, driftBoost, lineAlpha]);

  // Wrapper: if size is provided, use fixed square; otherwise fluid
  const style: React.CSSProperties = size
    ? { width: size, height: size }
    : { width: "100%", height: 320 };

  return (
    <div
      className={`relative mx-auto overflow-hidden rounded-2xl border border-zinc-800/40 shadow-sm ${className ?? ""}`}
      style={style}
      aria-label="Animated particle field"
      role="img"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />

      {/* Center logo with soft glow */}
      {showLogo && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* glow */}
          <motion.div
            className="absolute h-40 w-40 rounded-full blur-3xl"
            style={{
              opacity: logoGlowOpacity,
              background:
                "radial-gradient(closest-side, rgba(56,255,195,0.6), rgba(56,255,195,0) 70%)",
            }}
          />
          {/* logo */}
          <motion.div style={{ scale: logoScale }}>
            <Image
              src="/logo.png" // Put your file at /public/logo.png
              alt="Logo"
              width={80}
              height={80}
              priority
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
