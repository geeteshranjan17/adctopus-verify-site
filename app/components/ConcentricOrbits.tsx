"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  /** CSS class for outer wrapper */
  className?: string;
  /** Canvas CSS size in pixels (devicePixelRatio-aware internally) */
  size?: number;
  /** Number of concentric rings */
  rings?: number;
  /** Number of orbiting dots */
  dots?: number;
  /** Base angular speed (radians/sec) */
  speed?: number;
};

export default function ConcentricOrbits({
  className,
  size = 640,
  rings = 7,
  dots = 14,
  speed = 0.25,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    // Apply CSS size and high-DPI backing store
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    canvas.width = Math.floor(size * dpr);
    canvas.height = Math.floor(size * dpr);

    const center = { x: canvas.width / 2, y: canvas.height / 2 };
    const radiusMax = (Math.min(canvas.width, canvas.height) / 2) * 0.9;

    // Respect reduced-motion: render a static frame only
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Precompute ring radii
    const ringRadii = Array.from({ length: rings }, (_, i) => {
      const t = (i + 1) / (rings + 1);
      return t * radiusMax;
    });

    // Precompute dot tracks (each dot assigned to a ring index and a phase)
    const dotTracks = Array.from({ length: dots }, (_, i) => {
      const ringIndex = i % rings;
      const basePhase = (i / dots) * Math.PI * 2;
      // Slight individual speed variance for organic feel
      const omega = speed * (0.8 + (i % 5) * 0.05);
      return { ringIndex, basePhase, omega };
    });

    const drawFrame = (tSeconds: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle radial vignette
      const bgGrad = ctx.createRadialGradient(
        center.x,
        center.y,
        radiusMax * 0.1,
        center.x,
        center.y,
        radiusMax * 1.05
      );
      bgGrad.addColorStop(0, "rgba(12, 18, 32, 0.0)");
      bgGrad.addColorStop(1, "rgba(12, 18, 32, 0.15)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rings
      for (let i = 0; i < rings; i++) {
        const r = ringRadii[i];
        ctx.beginPath();
        ctx.arc(center.x, center.y, r, 0, Math.PI * 2);

        // Stroke style: subtle neon-ish hint
        const alpha = 0.18 + (i / rings) * 0.08;
        ctx.strokeStyle = `rgba(56, 255, 195, ${alpha})`;
        ctx.lineWidth = Math.max(1, 1.25 * dpr);
        ctx.stroke();
      }

      // Dots (orbiters)
      for (let i = 0; i < dots; i++) {
        const { ringIndex, basePhase, omega } = dotTracks[i];
        const r = ringRadii[ringIndex];

        // angle over time
        const angle = prefersReduced ? basePhase : basePhase + omega * tSeconds;

        const x = center.x + Math.cos(angle) * r;
        const y = center.y + Math.sin(angle) * r;

        // Dot glow
        const g = ctx.createRadialGradient(x, y, 0, x, y, 10 * dpr);
        g.addColorStop(0, "rgba(255, 59, 127, 0.85)");
        g.addColorStop(1, "rgba(255, 59, 127, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 6 * dpr, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.beginPath();
        ctx.arc(x, y, 2.2 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // One-off static render if reduced-motion
    if (prefersReduced) {
      drawFrame(0);
      return;
    }

    let start = performance.now();
    const loop = (now: number) => {
      const tSeconds = (now - start) / 1000;
      drawFrame(tSeconds);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [size, rings, dots, speed]);

  return (
    <div
      className={["relative", "flex", "justify-center", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        // hide from a11y tree since purely decorative
        role="presentation"
        tabIndex={-1}
        style={{ display: "block", filter: "drop-shadow(0 10px 40px rgba(56,255,195,0.08))" }}
      />
    </div>
  );
}
