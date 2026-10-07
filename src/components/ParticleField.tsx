import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

const COLORS = ["#8B5CF6", "#06B6D4", "#F43F5E", "#FBBF24", "#10B981", "#A78BFA", "#67E8F9"];

export default function ParticleField({ count = 60, celebrate = false }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => {
      const num = celebrate ? count * 2 : count;
      while (particles.current.length < num) {
        const life = Math.random() * 200 + 100;
        particles.current.push({
          x: Math.random() * canvas.width,
          y: celebrate ? canvas.height + 20 : Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (celebrate ? 4 : 0.5),
          vy: celebrate ? -(Math.random() * 5 + 3) : -(Math.random() * 0.8 + 0.2),
          size: Math.random() * (celebrate ? 8 : 4) + 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: celebrate ? 1 : Math.random() * 0.5 + 0.1,
          life,
          maxLife: life,
        });
      }
    };

    spawn();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => p.life > 0);
      spawn();

      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (celebrate) p.vy += 0.05; // gravity

        const progress = p.life / p.maxLife;
        ctx.save();
        ctx.globalAlpha = p.alpha * progress;
        ctx.fillStyle = p.color;

        if (celebrate) {
          ctx.translate(p.x, p.y);
          ctx.rotate((1 - progress) * Math.PI * 4);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, celebrate]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
