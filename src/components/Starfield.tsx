import React, { useEffect, useRef } from 'react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  speedY: number;
  speedX: number;
  layer: number;
  hasSpikes?: boolean;
}

interface StarfieldProps {
  theme?: 'light' | 'dark';
}

export const Starfield: React.FC<StarfieldProps> = ({ theme = 'dark' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotionPreference();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let isTabVisible = true;

    // Generate stars across 3 distinct depth layers
    const initStars = (w: number, h: number) => {
      const isMobile = w < 768;
      const count = isMobile ? 40 : 160;
      const newStars: Star[] = [];

      for (let i = 0; i < count; i++) {
        const layerRoll = Math.random();
        let layer = 0;
        let radius = 0.5 + Math.random() * 0.4;
        let speedY = 0.03 + Math.random() * 0.05;
        let speedX = (Math.random() - 0.5) * 0.02;
        let baseAlpha = 0.2 + Math.random() * 0.3;
        let twinkleSpeed = 0.008 + Math.random() * 0.015;
        let hasSpikes = false;

        if (layerRoll > 0.65 && layerRoll <= 0.92) {
          // Midground layer
          layer = 1;
          radius = 0.8 + Math.random() * 0.5;
          speedY = 0.06 + Math.random() * 0.07;
          baseAlpha = 0.45 + Math.random() * 0.3;
          twinkleSpeed = 0.012 + Math.random() * 0.02;
        } else if (layerRoll > 0.92) {
          // Foreground bright anchor stars
          layer = 2;
          radius = 1.3 + Math.random() * 0.7;
          speedY = 0.1 + Math.random() * 0.09;
          baseAlpha = 0.7 + Math.random() * 0.3;
          twinkleSpeed = 0.016 + Math.random() * 0.025;
          hasSpikes = Math.random() > 0.45;
        }

        newStars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed,
          twinklePhase: Math.random() * Math.PI * 2,
          speedY,
          speedX,
          layer,
          hasSpikes,
        });
      }

      stars = newStars;
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initStars(width, height);

      if (reducedMotion) {
        renderStatic();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      // Normalize mouse to [-1, 1]
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    };

    const renderStatic = () => {
      const isLight = themeRef.current === 'light';
      ctx.fillStyle = isLight ? '#fbfbfd' : '#000000';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        ctx.fillStyle = isLight
          ? `rgba(148, 163, 184, ${star.baseAlpha * 0.18})`
          : `rgba(255, 255, 255, ${star.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, isLight ? Math.min(star.radius, 1.0) : star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isTabVisible || reducedMotion) return;

      const isLight = themeRef.current === 'light';
      const delta = Math.min((time - lastTime) / 16.666, 2.0);
      lastTime = time;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      ctx.fillStyle = isLight ? '#fbfbfd' : '#000000';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Harmonic sinusoidal twinkling
        star.twinklePhase += star.twinkleSpeed * delta;
        const sineWave = Math.sin(star.twinklePhase);
        const dynamicAlpha = Math.max(
          0.06,
          Math.min(1, star.baseAlpha + sineWave * (star.layer === 2 ? 0.35 : 0.2))
        );

        // Constant gentle drifting upward
        star.y -= star.speedY * delta;
        star.x += star.speedX * delta;

        // Wrap around boundaries
        if (star.y < -5) {
          star.y = height + 5;
          star.x = Math.random() * width;
        } else if (star.y > height + 5) {
          star.y = -5;
          star.x = Math.random() * width;
        }

        if (star.x < -5) {
          star.x = width + 5;
        } else if (star.x > width + 5) {
          star.x = -5;
        }

        // Depth parallax offset from smooth mouse
        const parallaxX = mouseRef.current.x * (star.layer + 0.5) * 6;
        const parallaxY = mouseRef.current.y * (star.layer + 0.5) * 6;

        const posX = star.x + parallaxX;
        const posY = star.y + parallaxY;

        // Render Star Core (subtle silver glimmer in light mode, brilliant star in dark mode)
        ctx.fillStyle = isLight
          ? `rgba(148, 163, 184, ${dynamicAlpha * 0.18})`
          : `rgba(255, 255, 255, ${dynamicAlpha})`;
        ctx.beginPath();
        ctx.arc(posX, posY, isLight ? Math.min(star.radius, 1.0) : star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle specular diffraction spikes for anchor stars (dark mode only)
        if (!isLight && star.hasSpikes && dynamicAlpha > 0.6) {
          const spikeLen = star.radius * 3.5;
          ctx.strokeStyle = `rgba(255, 255, 255, ${dynamicAlpha * 0.35})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(posX - spikeLen, posY);
          ctx.lineTo(posX + spikeLen, posY);
          ctx.moveTo(posX, posY - spikeLen);
          ctx.lineTo(posX, posY + spikeLen);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !reducedMotion) {
        lastTime = performance.now();
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let startTimer: number;
    if (!reducedMotion) {
      renderStatic();
      startTimer = window.setTimeout(() => {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }, 200);
    } else {
      renderStatic();
    }

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
