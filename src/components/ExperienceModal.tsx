import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Terminal, ExternalLink, ChevronRight } from 'lucide-react';
import type { ExperienceItem } from '../types/portfolio';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experiences: ExperienceItem[];
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  experiences,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const activeExp = experiences[selectedIndex] || experiences[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0a0a0a] border border-white/20 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0e0e0e]/90">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/70 border border-white/10 px-2.5 py-0.5 rounded">
                  INDEPENDENT ENGINEERING & PROJECTS
                </span>
                <span className="text-xs text-[#808080]">
                  {selectedIndex + 1} of {experiences.length}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-[#808080] hover:text-white p-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {/* Left Selector Column (Desktop) */}
              <div className="md:col-span-4 p-4 sm:p-5 flex flex-col gap-2 bg-[#080808]">
                <p className="text-[11px] font-mono uppercase tracking-wider text-white/40 px-2 mb-1">
                  Focus Areas & Projects
                </p>
                {experiences.map((exp, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={`text-left p-3.5 rounded-xl border transition-all text-xs font-mono flex items-center justify-between ${
                        isSelected
                          ? 'border-white/30 bg-white/[0.08] text-white shadow-sm'
                          : 'border-white/5 bg-transparent text-[#808080] hover:border-white/15 hover:text-[#C8C8C8]'
                      }`}
                    >
                      <div className="truncate">
                        <div className="font-sans font-medium text-sm text-white truncate">
                          {exp.role}
                        </div>
                        <div className="text-[11px] text-[#808080] truncate mt-0.5">
                          {exp.organization}
                        </div>
                      </div>
                      <ChevronRight
                        size={14}
                        className={`transition-transform flex-shrink-0 ml-2 ${
                          isSelected ? 'text-white translate-x-0.5' : 'text-white/20'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Detail Panel */}
              <div className="md:col-span-8 p-6 sm:p-8 space-y-6">
                {activeExp && (
                  <div>
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-white/60 bg-white/[0.04] border border-white/10 px-2.5 py-0.5 rounded-full inline-block mb-2">
                          {activeExp.type}
                        </span>
                        <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {activeExp.role}
                        </h3>
                        <p className="text-base text-[#C8C8C8] font-medium mt-0.5">
                          {activeExp.organization}
                        </p>
                      </div>

                      {activeExp.link && (
                        <a
                          href={activeExp.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-white/80 hover:text-white px-3 py-1.5 rounded-lg border border-white/15 bg-white/[0.03] hover:border-white/35 transition-colors"
                        >
                          <span>{activeExp.link.label}</span>
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>

                    {/* Metadata Badges */}
                    <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-[#808080] pb-4 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-white/50" />
                        <span>{activeExp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-white/50" />
                        <span>{activeExp.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Terminal size={13} className="text-white/50" />
                        <span>Independent Work</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="mt-6">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2">
                        OVERVIEW & APPROACH
                      </h4>
                      <p className="text-sm text-[#C8C8C8] leading-relaxed">
                        {activeExp.summary}
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <div className="mt-6">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                        HANDS-ON CONTRIBUTIONS & PROBLEM SOLVING
                      </h4>
                      <ul className="space-y-2.5">
                        {activeExp.responsibilities.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-[#C8C8C8]">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Outcomes */}
                    {activeExp.keyOutcomes && activeExp.keyOutcomes.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                          KEY DELIVERABLES & OUTCOMES
                        </h4>
                        <ul className="space-y-2">
                          {activeExp.keyOutcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-white/90">
                              <span className="text-white/60 font-mono text-xs">→</span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                        TECHNOLOGIES & TOOLS
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeExp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-white/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#0a0a0a] border-t border-white/10 flex justify-between items-center text-xs text-[#808080]">
              <span>Press <kbd className="px-1.5 py-0.5 border border-white/20 rounded bg-white/5 font-mono text-[10px] text-white">Esc</kbd> to close</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-mono text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
