import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 30;
const REDUCED_COUNT = 12;

const DustParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = reducedMotion ? REDUCED_COUNT : PARTICLE_COUNT;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();

    // Pre-compute particles as flat typed arrays for speed
    const x = new Float32Array(count);
    const y = new Float32Array(count);
    const size = new Float32Array(count);
    const sx = new Float32Array(count);
    const sy = new Float32Array(count);
    const op = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      x[i] = Math.random() * w;
      y[i] = Math.random() * h;
      const depth = Math.random();
      size[i] = 1 + depth * 2.5;
      sx[i] = (Math.random() - 0.5) * 0.2;
      sy[i] = -(0.08 + Math.random() * 0.25);
      op[i] = 0.06 + depth * 0.14;
    }

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    let lastTime = 0;
    const interval = reducedMotion ? 66 : 33; // ~30fps or ~15fps

    const animate = (time: number) => {
      rafRef.current = requestAnimationFrame(animate);
      if (time - lastTime < interval) return;
      lastTime = time;

      ctx.clearRect(0, 0, w, h);

      const mx = (mouseRef.current.x / w - 0.5) * 0.3;
      const my = (mouseRef.current.y / h - 0.5) * 0.2;

      for (let i = 0; i < count; i++) {
        x[i] += sx[i] + mx;
        y[i] += sy[i] + my;

        if (y[i] < -5) { y[i] = h + 5; x[i] = Math.random() * w; }
        if (x[i] < -5) x[i] = w + 5;
        else if (x[i] > w + 5) x[i] = -5;

        ctx.globalAlpha = op[i];
        ctx.beginPath();
        ctx.arc(x[i], y[i], size[i], 0, 6.2832);
        ctx.fillStyle = "#c8c0b0";
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

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
