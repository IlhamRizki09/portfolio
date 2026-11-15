import { useEffect, useRef, type CSSProperties } from 'react';

interface SpaceBackgroundProps {
  isDark: boolean;
}

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
  tint: string;
}

export default function SpaceBackground({ isDark }: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isDark) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    let stars: Star[] = [];

    const tints = ['#dbeafe', '#bfdbfe', '#e0f2fe', '#c7d2fe'];

    const buildStars = () => {
      const count = Math.round((width * height) / 11000);
      stars = Array.from({ length: Math.max(70, Math.min(count, 190)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.25 + 0.35,
        alpha: Math.random() * 0.5 + 0.25,
        speed: Math.random() * 0.0012 + 0.0004,
        phase: Math.random() * Math.PI * 2,
        tint: tints[Math.floor(Math.random() * tints.length)],
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = reducedMotion
          ? 1
          : 0.55 + 0.45 * Math.sin(time * star.speed + star.phase);
        ctx.globalAlpha = star.alpha * twinkle;
        ctx.fillStyle = star.tint;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Nebula orbs */}
      <div
        className={`absolute -left-[12%] top-[6%] h-[clamp(260px,36vw,540px)] w-[clamp(260px,36vw,540px)] rounded-full blur-[90px] ${
          isDark ? 'opacity-60' : 'opacity-40'
        } animate-float-slower`}
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(37,99,235,0.42), rgba(37,99,235,0) 70%)'
            : 'radial-gradient(circle, rgba(147,197,253,0.5), rgba(147,197,253,0) 70%)',
        }}
      />
      <div
        className={`absolute -right-[14%] top-[26%] h-[clamp(240px,32vw,500px)] w-[clamp(240px,32vw,500px)] rounded-full blur-[90px] ${
          isDark ? 'opacity-50' : 'opacity-35'
        } animate-float-slow`}
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(14,165,233,0.3), rgba(14,165,233,0) 70%)'
            : 'radial-gradient(circle, rgba(186,230,253,0.55), rgba(186,230,253,0) 70%)',
        }}
      />
      <div
        className={`absolute bottom-[-18%] left-[26%] h-[clamp(220px,28vw,460px)] w-[clamp(220px,28vw,460px)] rounded-full blur-[90px] ${
          isDark ? 'opacity-40' : 'opacity-30'
        } animate-float-slower`}
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(99,102,241,0.28), rgba(99,102,241,0) 70%)'
            : 'radial-gradient(circle, rgba(199,210,254,0.55), rgba(199,210,254,0) 70%)',
        }}
      />

      {/* Twinkling stars */}
      {isDark && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />}

      {/* Shooting stars */}
      {isDark && (
        <>
          <span
            className="meteor"
            style={
              {
                top: '12%',
                left: '58%',
                '--meteor-duration': '9s',
                '--meteor-delay': '1.5s',
              } as CSSProperties
            }
          />
          <span
            className="meteor"
            style={
              {
                top: '38%',
                left: '8%',
                '--meteor-duration': '13s',
                '--meteor-delay': '6s',
              } as CSSProperties
            }
          />
          <span
            className="meteor"
            style={
              {
                top: '68%',
                left: '62%',
                '--meteor-duration': '16s',
                '--meteor-delay': '10s',
              } as CSSProperties
            }
          />
        </>
      )}

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(5,5,16,0.35) 55%, rgba(5,5,16,0.85) 100%)'
            : 'radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(244,247,255,0.4) 60%, rgba(244,247,255,0.85) 100%)',
        }}
      />
    </div>
  );
}

