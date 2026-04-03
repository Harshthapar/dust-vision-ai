import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  blur: number;
  depth: number;
}

const PARTICLE_COUNT = 60;
const REDUCED_COUNT = 25;

const DustParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const prefersReducedMotion = useRef(false);

  const createParticle = useCallback((w: number, h: number): Particle => {
    const depth = Math.random();
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: 1 + depth * 3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(0.1 + Math.random() * 0.4),
      opacity: 0.08 + depth * 0.18,
      blur: (1 - depth) * 2,
      depth,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = prefersReducedMotion.current ? REDUCED_COUNT : PARTICLE_COUNT;
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(window.innerWidth, window.innerHeight)
    );

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x / w - 0.5;
      const my = mouseRef.current.y / h - 0.5;

      for (const p of particlesRef.current) {
        p.x += p.speedX + mx * p.depth * 0.5;
        p.y += p.speedY + my * p.depth * 0.3;

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.save();
        if (p.blur > 0.5) ctx.filter = `blur(${p.blur}px)`;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(40, 15%, ${70 + p.depth * 20}%)`;
        ctx.shadowColor = `hsla(40, 20%, 80%, ${p.opacity * 0.6})`;
        ctx.shadowBlur = 6 * p.depth;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default DustParticles;
