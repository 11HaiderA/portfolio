import React, { useEffect, useRef } from 'react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotionPreference();
  const coordsRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    if (reducedMotion) return;

    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      coordsRef.current.targetX = e.clientX;
      coordsRef.current.targetY = e.clientY;
    };

    const animate = () => {
      // Smooth lerp interpolation for silky motion
      const current = coordsRef.current;
      current.x += (current.targetX - current.x) * 0.08;
      current.y += (current.targetY - current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${current.x - 350}px, ${current.y - 350}px, 0)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 w-[700px] h-[700px] rounded-full z-[2] opacity-60 cursor-glow-element transition-opacity duration-500 will-change-transform"
      style={{
        transform: 'translate3d(-1000px, -1000px, 0)',
      }}
    />
  );
};

