import { useEffect, useState } from 'react';

export default function CustomCursor({ isDark }: { isDark: boolean }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch or prefers reduced motion
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Smooth trail animation
  useEffect(() => {
    if (isTouch) return;
    let animId: number;
    const follow = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [position, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Ambient background spotlight */}
      <div
        className="pointer-events-none fixed -inset-px z-30 transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${
            isDark ? 'rgba(44, 103, 237, 0.06)' : 'rgba(44, 103, 237, 0.04)'
          }, transparent 80%)`,
        }}
      />

      {/* Main cursor dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full transition-transform duration-75 ease-out"
        style={{
          width: isPointer ? 12 : 8,
          height: isPointer ? 12 : 8,
          backgroundColor: '#38bdf8',
          boxShadow: '0 0 10px #38bdf8',
          transform: `translate3d(${position.x - (isPointer ? 6 : 4)}px, ${
            position.y - (isPointer ? 6 : 4)
          }px, 0)`,
        }}
      />

      {/* Trailing follower ring */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border transition-all duration-150 ease-out"
        style={{
          width: isPointer ? 44 : 28,
          height: isPointer ? 44 : 28,
          borderColor: isPointer ? 'rgba(44, 103, 237, 0.85)' : 'rgba(56, 189, 248, 0.45)',
          backgroundColor: isPointer ? 'rgba(44, 103, 237, 0.12)' : 'transparent',
          transform: `translate3d(${trailing.x - (isPointer ? 22 : 14)}px, ${
            trailing.y - (isPointer ? 22 : 14)
          }px, 0)`,
        }}
      />
    </>
  );
}
