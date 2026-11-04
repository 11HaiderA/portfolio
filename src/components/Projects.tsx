import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Boxes,
  Layers,
  Flame,
  Activity,
  Sparkles,
  Play,
  Download,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Eye,
} from 'lucide-react';
import { projectsData } from '../data/projects';
import type { ProjectItem } from '../types/portfolio';
import { ProjectDetails } from './ProjectDetails';
import { ScreenshotLightbox } from './ScreenshotLightbox';
import { GithubIcon } from './BrandIcons';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

// Curated 3-line breakdown for the tabbed card
const GAME_DETAILS: Record<
  string,
  {
    icon: React.ReactNode;
    categoryTag: string;
    lines: string[];
  }
> = {
  freeblock: {
    icon: <Boxes size={15} />,
    categoryTag: 'PUZZLE · REACT NATIVE',
    lines: [
      'Constrained 1D sliding block puzzle with smooth touch dragging and zero overlap glitches.',
      'Custom 2D matrix collision math with optimal step-count benchmarking.',
      'Handcrafted level layouts with full state undo and history rollback.',
    ],
  },
  pairup: {
    icon: <Layers size={15} />,
    categoryTag: 'MEMORY · MOBILE',
    lines: [
      'Fast-paced memory-matching mobile puzzle with progressive grid dimensions and timers.',
      'Architected state-machine game loop, card matching algorithm, and tactile flip physics.',
      'Input buffer state eliminates accidental double-taps during card reveals.',
    ],
  },
  matchsticks: {
    icon: <Flame size={15} />,
    categoryTag: 'LOGIC PUZZLE · MOBILE',
    lines: [
      'Arithmetic equation puzzle engine requiring players to correct statements by moving matchsticks.',
      'Interactive matchstick pickup, rotation, and placement collision buffers.',
      'Abstract syntax tree parser evaluates mathematical truth on drop instead of hardcoded strings.',
    ],
  },
  errordna: {
    icon: <Activity size={15} />,
    categoryTag: 'DIAGNOSTIC APP · MOBILE',
    lines: [
      'Diagnostic study tool that isolates mistake patterns and tracks conceptual error recovery.',
      'Dark-mode dashboard with real-time recovery analytics and knowledge health metrics.',
      'Structured quiz diagnosis workflow with clear single-action recovery prompts.',
    ],
  },
};

export const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [headingInView, setHeadingInView] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] =
    useState<ProjectItem | null>(null);

  const reducedMotion = useReducedMotionPreference();
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverDebounceTimer = useRef<number | null>(null);

  const activeGame = projectsData[activeIndex] || projectsData[0];
  const activeDetails = GAME_DETAILS[activeGame.id] || {
    icon: <Sparkles size={15} />,
    categoryTag: activeGame.category.toUpperCase(),
    lines: [activeGame.shortDescription],
  };

  const currentScreenshots =
    activeGame.screenshots && activeGame.screenshots.length > 0
      ? activeGame.screenshots
      : activeGame.image
      ? [
          {
            url: activeGame.image,
            title: 'Overview',
            caption: activeGame.shortDescription,
            type: 'splash' as const,
          },
        ]
      : [];

  const currentScreenshot =
    currentScreenshots[activeScreenshotIdx] || currentScreenshots[0];

  // Preload first game splash image immediately; defer others to idle time to preserve 60fps load
  useEffect(() => {
    if (projectsData[0]?.image) {
      const firstImg = new Image();
      firstImg.src = projectsData[0].image;
    }

    const timer = setTimeout(() => {
      projectsData.forEach((project, idx) => {
        if (idx === 0) return;
        if (project.image) {
          const img = new Image();
          img.src = project.image;
        }
        if (project.screenshots) {
          project.screenshots.forEach((s) => {
            const img = new Image();
            img.src = s.url;
          });
        }
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Section intersection observer to pause auto-advance & trigger heading light sweep
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHeadingInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stop auto-advance permanently upon any user interaction
  const markInteraction = useCallback(() => {
    setUserInteracted(true);
  }, []);

  // 6-second auto-advance until user hovers/clicks/focuses, paused when off-screen
  useEffect(() => {
    if (userInteracted || !isSectionVisible) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % projectsData.length;
        setActiveScreenshotIdx(0); // Reset to splash screen on auto-advance
        return next;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [userInteracted, isSectionVisible]);

  // Tab activation - always resets to splash screen (index 0)
  const activateTab = useCallback(
    (index: number) => {
      if (hoverDebounceTimer.current) {
        clearTimeout(hoverDebounceTimer.current);
        hoverDebounceTimer.current = null;
      }
      markInteraction();
      setActiveIndex(index);
      setActiveScreenshotIdx(0); // Splash screen appears first on tab selection
    },
    [markInteraction]
  );

  // Debounced hover handler (120ms) for fine pointer mouse devices
  const handleTabPointerEnter = (index: number) => {
    if (index === activeIndex) return;

    // Check if device supports hover and has fine pointer
    const hasFineHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    if (!hasFineHover) return;

    if (hoverDebounceTimer.current) {
      clearTimeout(hoverDebounceTimer.current);
    }

    hoverDebounceTimer.current = window.setTimeout(() => {
      activateTab(index);
    }, 120);
  };

  const handleTabPointerLeave = () => {
    if (hoverDebounceTimer.current) {
      clearTimeout(hoverDebounceTimer.current);
      hoverDebounceTimer.current = null;
    }
  };

  // Arrow key navigation across role="tablist"
  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    markInteraction();
    let targetIndex = index;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      targetIndex = (index + 1) % projectsData.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      targetIndex = (index - 1 + projectsData.length) % projectsData.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetIndex = projectsData.length - 1;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activateTab(index);
      return;
    } else {
      return;
    }

    activateTab(targetIndex);
    tabButtonRefs.current[targetIndex]?.focus();
  };

  // Clean Typewriter title state with blinking caret (React 19 render-adjust pattern)
  const [typingState, setTypingState] = useState({
    title: activeGame.title,
    length: activeGame.title.length,
    isTyping: false,
  });

  if (typingState.title !== activeGame.title) {
    setTypingState({
      title: activeGame.title,
      length: reducedMotion ? activeGame.title.length : 0,
      isTyping: !reducedMotion,
    });
  }

  useEffect(() => {
    if (reducedMotion || !typingState.isTyping) return;

    const timer = window.setInterval(() => {
      setTypingState((prev) => {
        const nextLen = prev.length + 1;
        const stillTyping = nextLen < prev.title.length;
        return {
          ...prev,
          length: nextLen,
          isTyping: stillTyping,
        };
      });
    }, 18);

    return () => clearInterval(timer);
  }, [typingState.title, typingState.isTyping, reducedMotion]);

  const titleText = reducedMotion
    ? activeGame.title
    : typingState.title.slice(0, typingState.length);

  const caretVisible = !reducedMotion && typingState.isTyping;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center py-12 md:py-0 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles size={13} className="text-violet-600 dark:text-[#a78bfa]" />
          <span className="text-[11px] font-mono tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400">
            SELECTED WORK
          </span>
        </div>

        {/* Section Heading with 1.2s Accent Light Sweep on in-view */}
        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4 sm:mb-5">
          <span
            className={
              headingInView ? 'heading-sweep-active inline-block' : 'inline-block'
            }
          >
            Games I've built
          </span>
        </h2>

        {/* ============================================================ */}
        {/* TABBED SHOWCASE CONTAINER (Tabs directly connected to Card) */}
        {/* ============================================================ */}
        <div className="relative">
          {/* Mobile fade edges indicator */}
          <div className="relative">
            {/* Tabs Row */}
            <div
              ref={tablistRef}
              role="tablist"
              aria-label="Games I have built"
              className="flex items-end gap-1.5 overflow-x-auto scrollbar-none snap-x snap-mandatory relative z-20 -mb-[1px] px-1 pt-1 pb-0"
            >
              {projectsData.map((project, idx) => {
                const isActive = idx === activeIndex;
                const details = GAME_DETAILS[project.id];

                return (
                  <button
                    key={project.id}
                    ref={(el) => {
                      tabButtonRefs.current[idx] = el;
                    }}
                    role="tab"
                    id={`game-tab-${project.id}`}
                    aria-selected={isActive}
                    aria-controls={`game-panel-${project.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => activateTab(idx)}
                    onPointerEnter={() => handleTabPointerEnter(idx)}
                    onPointerLeave={handleTabPointerLeave}
                    onFocus={markInteraction}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={`group relative snap-start flex-shrink-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-medium tracking-wide transition-colors duration-150 cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:z-30 ${isActive
                        ? 'text-neutral-950 dark:text-white'
                        : 'text-neutral-600 hover:text-neutral-950 hover:bg-black/[0.03] dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-[#141414]/70 border-t border-x border-transparent'
                      }`}
                  >
                    {/* Active Tab Background sharing card border and color */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGameTabBg"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute inset-0 bg-white border-t border-x border-neutral-200/90 dark:bg-[#0e0e0e] dark:border-white/15 rounded-t-xl -bottom-[1px] z-10 shadow-xs"
                      />
                    )}

                    {/* Tab icon and game name */}
                    <span className="relative z-20 flex items-center gap-2">
                      <span
                        className={`transition-colors ${isActive
                            ? 'text-violet-600 dark:text-[#a78bfa]'
                            : 'text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-300'
                          }`}
                      >
                        {details?.icon || <Boxes size={15} />}
                      </span>
                      <span className="font-semibold whitespace-nowrap">
                        {project.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* DETAIL CARD (Shares top edge with tabs, zero gap) */}
          {/* ============================================================ */}
          <div
            role="tabpanel"
            id={`game-panel-${activeGame.id}`}
            aria-labelledby={`game-tab-${activeGame.id}`}
            tabIndex={0}
            className="relative z-10 bg-white border border-neutral-200/90 dark:bg-[#0e0e0e] dark:border-white/15 rounded-b-2xl rounded-tr-2xl p-5 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.85)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500/40"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
              {/* Left Side: Game Details (on mobile stacks below image: order-2 md:order-1) */}
              <div className="order-2 md:order-1 md:col-span-7 flex flex-col justify-center">
                {/* Category Tag Pill */}
                <div className="mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border border-violet-200 bg-violet-50 text-violet-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#c084fc] font-semibold">
                    {activeDetails.categoryTag}
                  </span>
                </div>

                {/* Game Title with Typewriter Animation & Blinking Caret */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white min-h-[1.2em] flex items-center">
                  <span>{titleText}</span>
                  {caretVisible && <span className="typewriter-caret" aria-hidden="true" />}
                </h3>

                {/* 2-3 Line Description: Starts 150ms after title, staggered 60ms fade-up */}
                <div key={activeGame.id} className="space-y-1.5 mt-2.5 max-w-xl">
                  {activeDetails.lines.map((line, idx) => (
                    <motion.p
                      key={`${activeGame.id}-line-${idx}`}
                      initial={
                        reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        reducedMotion
                          ? { duration: 0.2 }
                          : {
                            duration: 0.35,
                            delay: 0.15 + idx * 0.06,
                            ease: [0.16, 1, 0.3, 1],
                          }
                      }
                      className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal"
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                {/* Tech Stack Chips: Fades in last, 40ms stagger */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {activeGame.technologies.map((tech, idx) => (
                    <motion.span
                      key={`${activeGame.id}-tech-${tech}`}
                      initial={
                        reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        reducedMotion
                          ? { duration: 0.2 }
                          : {
                            duration: 0.26,
                            delay: 0.32 + idx * 0.04,
                            ease: 'easeOut',
                          }
                      }
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-200 bg-neutral-100/80 text-neutral-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Action Links: Only the ones that exist for that game */}
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  {/* Play Game Link */}
                  {activeGame.liveDemoUrl && (
                    <motion.a
                      href={activeGame.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.48 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black font-semibold text-xs tracking-wide dark:hover:bg-neutral-200 transition-all shadow-sm min-h-[40px]"
                    >
                      <Play size={12} fill="currentColor" />
                      <span>Play</span>
                    </motion.a>
                  )}

                  {/* GitHub Repository Link */}
                  {activeGame.githubUrl && (
                    <motion.a
                      href={activeGame.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.52 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 shadow-xs dark:border-white/20 dark:bg-white/[0.04] dark:text-white font-medium text-xs tracking-wide dark:hover:border-white/50 transition-all min-h-[40px]"
                    >
                      <GithubIcon size={13} />
                      <span>GitHub</span>
                    </motion.a>
                  )}

                  {/* Download APK Link */}
                  {activeGame.apkDownloadUrl && (
                    <motion.a
                      href={activeGame.apkDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.56 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 shadow-xs dark:border-white/20 dark:bg-white/[0.04] dark:text-white font-medium text-xs tracking-wide dark:hover:border-white/50 transition-all min-h-[40px]"
                    >
                      <Download size={13} />
                      <span>Download</span>
                    </motion.a>
                  )}

                  {/* Deep Architecture & Challenges Inspection Dialog */}
                  <motion.button
                    type="button"
                    onClick={() => setSelectedProjectForModal(activeGame)}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 hover:text-black hover:border-neutral-300 hover:bg-neutral-100 dark:border-white/10 dark:bg-white/[0.02] dark:text-neutral-300 dark:hover:text-white dark:hover:border-white/30 text-xs font-mono tracking-wide transition-all min-h-[40px] cursor-pointer"
                  >
                    <span>Inspect Mechanics</span>
                    <ArrowUpRight size={13} />
                  </motion.button>
                </div>
              </div>

              {/* Right Side: Game Screenshot Mockup (on mobile stacks above text: order-1 md:order-2) */}
              <div className="order-1 md:order-2 md:col-span-5 flex flex-col justify-center items-center">
                {/* Phone Frame Mockup */}
                <div className="relative group/mockup w-full max-w-[150px] sm:max-w-[170px] md:max-w-[185px] lg:max-w-[200px] aspect-[702/1450] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-950 dark:border-white/20 dark:bg-black shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-center p-1.5 ring-1 ring-black/5 select-none">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${activeGame.id}-${currentScreenshot.url}`}
                      src={currentScreenshot.url}
                      alt={`${activeGame.title} - ${currentScreenshot.title}`}
                      width={310}
                      height={640}
                      initial={
                        reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }
                      }
                      animate={
                        reducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, scale: 1 }
                      }
                      exit={{
                        opacity: 0,
                        scale: 0.96,
                        transition: { duration: 0.15, ease: 'easeOut' },
                      }}
                      transition={
                        reducedMotion
                          ? { duration: 0.2 }
                          : {
                              duration: 0.45,
                              ease: [0.16, 1, 0.3, 1],
                            }
                      }
                      className="w-full h-full object-cover rounded-xl cursor-pointer"
                      onClick={() => setLightboxOpen(true)}
                      loading={activeIndex === 0 ? 'eager' : 'lazy'}
                    />
                  </AnimatePresence>

                  {/* Top Badge: Screenshot Type / Status */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-20">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-black/65 text-white/95 backdrop-blur-md border border-white/10 shadow-xs font-semibold">
                      {currentScreenshot.title}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxOpen(true);
                      }}
                      className="pointer-events-auto p-1 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer opacity-75 hover:opacity-100"
                      title="Expand screenshot gallery"
                      aria-label="Expand screenshot gallery"
                    >
                      <Maximize2 size={10} />
                    </button>
                  </div>

                  {/* Previous / Next Chevron Buttons on Mockup */}
                  {currentScreenshots.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          markInteraction();
                          setActiveScreenshotIdx((prev) =>
                            prev > 0 ? prev - 1 : currentScreenshots.length - 1
                          );
                        }}
                        className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/75 hover:bg-black/95 text-white border border-white/20 backdrop-blur-md transition-opacity duration-200 cursor-pointer opacity-100 sm:opacity-0 sm:group-hover/mockup:opacity-100 focus-visible:opacity-100 hover:scale-110 min-h-[32px] min-w-[32px] flex items-center justify-center"
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          markInteraction();
                          setActiveScreenshotIdx((prev) =>
                            (prev + 1) % currentScreenshots.length
                          );
                        }}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/75 hover:bg-black/95 text-white border border-white/20 backdrop-blur-md transition-opacity duration-200 cursor-pointer opacity-100 sm:opacity-0 sm:group-hover/mockup:opacity-100 focus-visible:opacity-100 hover:scale-110 min-h-[32px] min-w-[32px] flex items-center justify-center"
                        aria-label="Next screenshot"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </>
                  )}
                </div>

                {/* Screenshot Segmented Switcher Controls */}
                {currentScreenshots.length > 1 && (
                  <div className="flex items-center gap-1.5 mt-2.5 z-20">
                    {currentScreenshots.map((s, idx) => {
                      const isActive = activeScreenshotIdx === idx;
                      return (
                        <button
                          key={s.url}
                          type="button"
                          onClick={() => {
                            markInteraction();
                            setActiveScreenshotIdx(idx);
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer min-h-[36px] flex items-center justify-center ${
                            isActive
                              ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs ring-1 ring-black/10 dark:ring-white/20'
                              : 'bg-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-200 dark:bg-white/[0.08] dark:text-neutral-300 dark:hover:text-white dark:hover:bg-white/15'
                          }`}
                        >
                          {s.title.split(' ')[0]}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="px-2.5 py-1.5 rounded-full text-xs font-mono text-neutral-800 hover:text-black dark:text-neutral-200 dark:hover:text-white bg-neutral-200/90 hover:bg-neutral-300 dark:bg-white/[0.12] dark:hover:bg-white/20 transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px]"
                      title="View all screenshots in full size"
                    >
                      <Eye size={12} />
                      <span>All</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Problem-Solving & Technical Inspection Modal */}
      <ProjectDetails
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
      />

      {/* Fullscreen High-Resolution Screenshot Lightbox Gallery */}
      {lightboxOpen && (
        <ScreenshotLightbox
          key={`${activeGame.id}-${activeScreenshotIdx}`}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          gameTitle={activeGame.title}
          screenshots={currentScreenshots}
          initialIndex={activeScreenshotIdx}
        />
      )}
    </section>
  );
};
