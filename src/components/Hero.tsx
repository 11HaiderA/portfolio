import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

interface HeroProps {
  onContactClick?: (triggerEl?: HTMLElement) => void;
}

const headlineWords = [
  { text: 'I', isAccent: false, sweepClass: '' },
  { text: 'build', isAccent: false, sweepClass: '' },
  { text: 'games', isAccent: false, sweepClass: '' },
  { text: 'people', isAccent: false, sweepClass: '' },
  { text: "can't", isAccent: true, sweepClass: 'accent-sweep-1' },
  { text: 'put', isAccent: true, sweepClass: 'accent-sweep-2' },
  { text: 'down.', isAccent: true, sweepClass: 'accent-sweep-3' },
];

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const reducedMotion = useReducedMotionPreference();

  const handleViewWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects') || document.getElementById('games');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onContactClick) {
      onContactClick(e.currentTarget);
    } else {
      const el = document.getElementById('contact');
      if (el) {
        const navOffset = 76;
        const y = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden"
    >
      {/* Drift Accent Glow behind headline (transform-only, 20s loop, WCAG AA compliant) */}
      <div className="hero-glow" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Step 1: Name fades in (300ms) */}
        <motion.p
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            reducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }
          }
          className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-violet-700/90 dark:text-violet-300/80 mb-3 sm:mb-4 select-none font-semibold"
        >
          Haider Ali
        </motion.p>

        {/* Step 2: Headline reveals word by word (40ms stagger) with Accent Sweep */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            letterSpacing: '-0.02em',
          }}
          className="font-bold text-neutral-950 dark:text-white max-w-4xl mx-auto leading-[1.08] text-center"
        >
          {headlineWords.map((word, idx) => (
            <span
              key={`${word.text}-${idx}`}
              className="inline-block overflow-hidden align-top pb-1 mr-[0.24em] last:mr-0"
            >
              <motion.span
                initial={
                  reducedMotion ? { y: 0 } : { y: '100%' }
                }
                animate={{ y: 0 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.38,
                        delay: 0.08 + idx * 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className={`inline-block ${
                  word.isAccent
                    ? word.sweepClass
                    : 'text-neutral-950 dark:text-white'
                }`}
              >
                {word.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Step 4: Supporting line fades up (translateY 12px -> 0) */}
        <motion.p
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.4, delay: 0.48, ease: 'easeOut' }
          }
          className="mt-4 sm:mt-5 max-w-[560px] mx-auto text-[1.0625rem] sm:text-[1.125rem] text-neutral-600 dark:text-[#a3a3a3] leading-[1.6] font-normal"
        >
          Mobile puzzle games crafted in React Native, from the first mechanic to
          the final frame. Designed to feel effortless, engineered to run smooth.
        </motion.p>

        {/* Step 5: Buttons fade up last */}
        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.35, delay: 0.72, ease: 'easeOut' }
          }
          className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
        >
          <a
            href="#projects"
            onClick={handleViewWork}
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 dark:hover:bg-[#e8e8e8] hover:scale-[1.02] active:scale-[0.98] shadow-sm dark:shadow-[0_4px_24px_rgba(255,255,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 cursor-pointer min-h-[44px]"
          >
            <span>View work</span>
            <ArrowDown
              size={14}
              className="transform transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>

          <button
            type="button"
            onClick={handleContact}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm hover:shadow dark:border-white/20 dark:bg-white/[0.04] dark:text-white font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 dark:hover:border-white/50 dark:hover:bg-white/[0.08] hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 cursor-pointer min-h-[44px]"
          >
            <span>Contact</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
