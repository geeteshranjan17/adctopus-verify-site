'use client';
import React from 'react';

type Props = { size?: number; particles?: number; className?: string; };

export default function ParticleOrbit({ size = 280, particles = 260, className }: Props) {
  const ref = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const center = { x: size / 2, y: size / 2 };
    const rings = 6;

    const pts = Array.from({ length: particles }, (_, i) => {
      const ring = i % rings;
      const radius = (size * 0.38) * ((ring + 1) / (rings + 1));
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.002 + ring * 0.0009) * (Math.random() > 0.5 ? 1 : -1);
      const r = 1.2 + (ring / rings) * 1.3;
      return { radius, angle, speed, r };
    });

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(center.x, center.y);
      for (const p of pts) {
        p.angle += p.speed;
        const x = Math.cos(p.angle) * p.radius;
        const y = Math.sin(p.angle) * p.radius;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.78)';
        ctx.fill();
      }
      ctx.restore();
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [size, particles]);

  return (
    <canvas ref={ref} className={`mx-auto rounded-full border border-zinc-200 shadow-sm ${className ?? ''}`} aria-label="Animated particle orbit" role="img" />
  );
}