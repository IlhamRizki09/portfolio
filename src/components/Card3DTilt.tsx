import React, { useRef, useState } from 'react';

interface Card3DTiltProps {
  children: React.ReactNode;
  isDark: boolean;
  className?: string;
  glow?: boolean;
}

export default function Card3DTilt({
  children,
  isDark,
  className = '',
  glow = true,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotX(rotateX);
    setRotY(rotateY);
    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
        className={`relative h-full rounded-2xl overflow-hidden border transition-shadow duration-300 backdrop-blur-xl ${
          isDark
            ? 'bg-[#0E162B]/80 border-[#386BFF]/20 text-[#F5F7FF] shadow-lg shadow-black/40 hover:border-[#28D6E8]/40 hover:shadow-[0_12px_36px_-6px_rgba(56,107,255,0.22)]'
            : 'bg-white/90 border-[#386BFF]/25 text-[#080D1C] shadow-md shadow-blue-500/5 hover:border-[#386BFF]/50 hover:shadow-xl'
        } ${className}`}
      >
        {/* Dynamic Spotlight Glow */}
        {glow && isHovered && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 z-0"
            style={{
              background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, ${
                isDark ? 'rgba(56, 107, 255, 0.18)' : 'rgba(56, 107, 255, 0.12)'
              }, transparent 60%)`,
            }}
          />
        )}

        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
}
