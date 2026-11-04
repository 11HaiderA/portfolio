import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import type { ProjectScreenshot } from '../types/portfolio';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

interface ScreenshotLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  gameTitle: string;
  screenshots: ProjectScreenshot[];
  initialIndex?: number;
}

export const ScreenshotLightbox: React.FC<ScreenshotLightboxProps> = ({
  isOpen,
  onClose,
  gameTitle,
  screenshots,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const reducedMotion = useReducedMotionPreference();

  // Handle keyboard events (Left, Right, Escape)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % screenshots.length);
      }
    },
    [isOpen, onClose, screenshots.length]
  );

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen || screenshots.length === 0) return null;

  const currentScreenshot = screenshots[currentIndex] || screenshots[0];

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={`${gameTitle} screenshot gallery`}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Content */}
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 8 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[94vh] flex flex-col bg-neutral-950 border border-white/15 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-2.5">
              <span className="p-1 rounded-md bg-white/5 text-violet-400">
                <Smartphone size={15} />
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight flex items-center gap-2">
                  <span>{gameTitle}</span>
                  <span className="text-neutral-500 font-normal">·</span>
                  <span className="text-xs font-mono font-normal text-violet-300 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                    {currentScreenshot.title}
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-400">
                {currentIndex + 1} / {screenshots.length}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                aria-label="Close screenshot gallery"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Visual Display */}
          <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-neutral-950 via-black to-neutral-950 overflow-hidden min-h-[360px] sm:min-h-[460px]">
            {/* Prev Button */}
            {screenshots.length > 1 && (
              <button
                type="button"
                onClick={goToPrev}
                className="absolute left-3 sm:left-6 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 hover:border-white/35 backdrop-blur-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 hover:scale-105 active:scale-95"
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Phone Mockup Frame */}
            <div className="relative z-10 max-h-[60vh] aspect-[702/1450] rounded-2xl overflow-hidden border-2 border-white/20 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex items-center justify-center p-1">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentScreenshot.url}
                  src={currentScreenshot.url}
                  alt={`${gameTitle} - ${currentScreenshot.title}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full h-full object-cover rounded-xl"
                />
              </AnimatePresence>
            </div>

            {/* Next Button */}
            {screenshots.length > 1 && (
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-3 sm:right-6 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 hover:border-white/35 backdrop-blur-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 hover:scale-105 active:scale-95"
                aria-label="Next screenshot"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Footer: Caption & Thumbnail Strip */}
          <div className="px-4 sm:px-6 py-3.5 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Caption */}
            <p className="text-xs sm:text-sm text-neutral-300 text-center sm:text-left">
              {currentScreenshot.caption || currentScreenshot.title}
            </p>

            {/* Thumbnails */}
            {screenshots.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {screenshots.map((s, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={s.url}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        isActive
                          ? 'bg-violet-600/30 text-white border border-violet-400/60 shadow-sm'
                          : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-transparent'
                      }`}
                      aria-label={`View ${s.title}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{s.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
