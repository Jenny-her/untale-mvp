"use client";

import { useEffect, useRef } from "react";

// Define the type for a petal
interface Petal {
  x: number;
  y: number;
  sz: number;
  vx: number;
  vy: number;
  rot: number;
  rotV: number;
  swing: number;
  swingS: number;
  swingA: number;
  alpha: number;
  ox: number;
  oy: number;
  dvx: number;
  dvy: number;
  r: number;
  w: number;
}

export default function LeafCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const dimensionsRef = useRef<{ W: number; H: number }>({ W: 0, H: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rand = (a: number, b: number) => Math.random() * (b - a) + a;

    const resize = () => {
      dimensionsRef.current.W = window.innerWidth;
      dimensionsRef.current.H = window.innerHeight;
      canvas.width = dimensionsRef.current.W;
      canvas.height = dimensionsRef.current.H;
    };

    const createPetal = (): Petal => {
      const sz = rand(3, 10);
      return {
        x: rand(0, dimensionsRef.current.W),
        y: rand(-dimensionsRef.current.H, dimensionsRef.current.H),
        sz: sz,
        vx: rand(-0.5, 0.5),
        vy: rand(0.3, 1.0),
        rot: rand(0, Math.PI * 2),
        rotV: rand(-0.04, 0.04),
        swing: rand(0, Math.PI * 2),
        swingS: rand(0.007, 0.022),
        swingA: rand(0.4, 1.4),
        alpha: rand(0.14, 0.42),
        ox: 0,
        oy: 0,
        dvx: 0,
        dvy: 0,
        r: rand(50, 110),
        w: sz / 12
      };
    };

    const initPetals = () => {
      const N = 70;
      petalsRef.current = Array.from({ length: N }, createPetal);
    };

    const drawPetal = (p: Petal) => {
      ctx.save();
      const px = p.x + p.ox;
      const py = p.y + p.oy;
      ctx.translate(px, py);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;

      const g = ctx.createRadialGradient(0, -p.sz * 0.15, 0, 0, 0, p.sz * 1.05);
      g.addColorStop(0, "#f0e6ff");
      g.addColorStop(0.4, "#d9a8e8");
      g.addColorStop(0.75, "#c084c8");
      g.addColorStop(1, "rgba(160,80,200,0)");
      ctx.fillStyle = g;

      ctx.beginPath();
      ctx.moveTo(0, -p.sz);
      ctx.bezierCurveTo(
        p.sz * 0.55,
        -p.sz * 0.85,
        p.sz * 0.9,
        -p.sz * 0.05,
        0,
        p.sz * 0.32
      );
      ctx.bezierCurveTo(
        -p.sz * 0.9,
        -p.sz * 0.05,
        -p.sz * 0.55,
        -p.sz * 0.85,
        0,
        -p.sz
      );
      ctx.fill();

      ctx.strokeStyle = "rgba(200,100,220,0.10)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -p.sz * 0.8);
      ctx.quadraticCurveTo(p.sz * 0.08, 0, 0, p.sz * 0.28);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, dimensionsRef.current.W, dimensionsRef.current.H);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      petalsRef.current.forEach((p) => {
        p.swing += p.swingS;
        p.x += p.vx + Math.sin(p.swing) * p.swingA;
        p.y += p.vy;
        p.rot += p.rotV;

        const ex = p.x + p.ox - mx;
        const ey = p.y + p.oy - my;
        const dist = Math.sqrt(ex * ex + ey * ey);

        if (dist < p.r && dist > 1) {
          const norm = 1 - dist / p.r;
          const force = norm * norm * (2.0 / p.w);
          const ang = Math.atan2(ey, ex);
          p.dvx += Math.cos(ang) * force * 1.6;
          p.dvy += Math.sin(ang) * force * 1.6;
          p.rotV += norm * 0.003 * (Math.random() - 0.5 > 0 ? 1 : -1);
        }

        p.ox += p.dvx;
        p.oy += p.dvy;
        p.ox *= 0.9;
        p.oy *= 0.9;
        p.dvx *= 0.82;
        p.dvy *= 0.82;
        p.rotV *= 0.995;

        if (p.y + p.oy > dimensionsRef.current.H + 25) {
          p.y = -18;
          p.x = rand(0, dimensionsRef.current.W);
          p.ox = 0;
          p.oy = 0;
          p.dvx = 0;
          p.dvy = 0;
          p.vx = rand(-0.5, 0.5);
          p.vy = rand(0.3, 1.0);
        }
        if (p.x < -40) p.x = dimensionsRef.current.W + 20;
        if (p.x > dimensionsRef.current.W + 40) p.x = -20;

        drawPetal(p);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    resize();
    initPetals();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas id="leaf-canvas" ref={canvasRef} />;
}
