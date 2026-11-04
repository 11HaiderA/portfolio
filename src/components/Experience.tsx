import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, ArrowUpRight, Layers } from 'lucide-react';
import { experienceData } from '../data/experience';
import { ExperienceModal } from './ExperienceModal';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export const Experience: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const reducedMotion = useReducedMotionPreference();

  return (
    <section id="experience" className="relative scroll-mt-20 sm:scroll-mt-24 py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl mb-12"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/60 mb-2">
            Hands-on Engineering
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Independent Development
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#C8C8C8] leading-relaxed">
            Self-directed engineering across game architecture, state engines, and interactive mechanics.
          </p>
        </motion.div>

        {/* Prominent Floating Interactive Panel */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            animate={
              reducedMotion
                ? undefined
                : {
                    y: [-4, 4, -4],
                  }
            }
            transition={
              reducedMotion
                ? undefined
                : {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
            whileHover={
              reducedMotion
                ? undefined
                : {
                    y: -6,
                    transition: { duration: 0.25, ease: 'easeOut' },
                  }
            }
            onClick={() => setModalOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setModalOpen(true);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Independent Development panel. Where I've built and learned. Click to explore hands-on engineering."
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/15 hover:border-white/40 bg-[#0d0d0d]/90 backdrop-blur-xl p-8 sm:p-12 shadow-[0_16px_48px_rgba(0,0,0,0.9)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {/* Subtle specular sheen */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col justify-between">
              <div>
                {/* Top Row */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-white/70 border border-white/15 px-3 py-1 rounded-full bg-white/[0.03]">
                    PROJECT MILESTONES
                  </span>

                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-white/70 group-hover:text-white group-hover:border-white/30 transition-all">
                    <Terminal size={18} />
                  </div>
                </div>

                {/* Main Heading */}
                <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug group-hover:text-white transition-colors">
                  Where I've built and learned.
                </h3>

                {/* Description */}
                <p className="mt-4 text-base sm:text-lg text-[#808080] group-hover:text-[#C8C8C8] transition-colors leading-relaxed max-w-xl">
                  A closer look at the games, logic engines, and systems I have built independently.
                </p>

                {/* Sneak peek summary of areas */}
                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experienceData.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/15 transition-colors"
                    >
                      <div className="text-xs font-mono text-white/40 mb-1 flex items-center gap-1.5">
                        <Layers size={12} />
                        <span>{item.organization}</span>
                      </div>
                      <div className="text-sm font-medium text-white/90 truncate">
                        {item.role}
                      </div>
                      <div className="text-xs text-[#808080] truncate mt-0.5">
                        {item.technologies.slice(0, 3).join(' · ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm font-mono text-white/80 group-hover:text-white transition-colors">
                  Explore Independent Work
                </span>
                <div className="flex items-center gap-2 text-sm font-mono text-white">
                  <span className="text-xs text-[#808080] group-hover:text-white/60 transition-colors hidden sm:inline">
                    Click to inspect projects & methods
                  </span>
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black transition-all">
                    <ArrowUpRight
                      size={16}
                      className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Detail Modal */}
      <ExperienceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        experiences={experienceData}
      />
    </section>
  );
};
