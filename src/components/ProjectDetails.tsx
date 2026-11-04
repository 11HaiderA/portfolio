import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Download, CheckCircle2, AlertCircle, Wrench } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import type { ProjectItem } from '../types/portfolio';

interface ProjectDetailsProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
  const [modalScreenshotIdx, setModalScreenshotIdx] = React.useState<number>(0);
  const [prevProjectId, setPrevProjectId] = React.useState<string | undefined>(project?.id);

  if (project?.id !== prevProjectId) {
    setPrevProjectId(project?.id);
    setModalScreenshotIdx(0);
  }

  useEffect(() => {
    if (!project) return;

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
  }, [project, onClose]);

  if (!project) return null;

  const hasAnyLink = Boolean(project.githubUrl || project.liveDemoUrl || project.apkDownloadUrl);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/20 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 transition-colors duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 dark:border-white/10 bg-[#f8f8fa] dark:bg-[#0e0e0e]/90">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono tracking-widest uppercase text-slate-500 dark:text-white/50 border border-black/10 dark:border-white/10 px-2 py-0.5 rounded">
                PROJECT SPECIFICATION
              </span>
              <span
                className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded border ${
                  project.status === 'Completed'
                    ? 'border-emerald-600/30 text-emerald-700 bg-emerald-50 dark:border-white/30 dark:text-white dark:bg-white/[0.05]'
                    : 'border-black/15 text-slate-500 bg-black/[0.02] dark:border-white/15 dark:text-[#808080] dark:bg-white/[0.02]'
                }`}
              >
                {project.status}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 hover:text-black dark:text-[#808080] dark:hover:text-white p-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] hover:border-black/30 dark:hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white"
              aria-label="Close project modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Title & Tagline */}
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-white/50 mb-1">
                {project.category}
              </p>
              <h2 id="project-title" className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-[#C8C8C8] mt-2 font-normal">
                {project.tagline}
              </p>
            </div>

            {/* Visual Screenshot Showcase */}
            {(() => {
              const modalScreenshots =
                project.screenshots && project.screenshots.length > 0
                  ? project.screenshots
                  : project.image
                  ? [
                      {
                        url: project.image,
                        title: 'Overview',
                        caption: project.shortDescription,
                        type: 'overview' as const,
                      },
                    ]
                  : [];

              const activeModalScreenshot =
                modalScreenshots[modalScreenshotIdx] || modalScreenshots[0];

              if (!activeModalScreenshot) return null;

              return (
                <div className="flex flex-col items-center">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#f3f4f6] dark:bg-[#070707] h-64 sm:h-80 flex items-center justify-center p-4">
                    <img
                      src={activeModalScreenshot.url}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover opacity-15 filter blur-xl scale-125 pointer-events-none grayscale"
                    />
                    <div className="relative z-10 h-full max-w-[200px] aspect-[702/1450] rounded-xl overflow-hidden border border-black/15 dark:border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.95)] bg-slate-950">
                      <img
                        key={activeModalScreenshot.url}
                        src={activeModalScreenshot.url}
                        alt={`${project.title} - ${activeModalScreenshot.title}`}
                        width={220}
                        height={454}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Screenshot gallery navigation buttons & caption */}
                  {modalScreenshots.length > 1 && (
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 mt-3 px-2">
                      <div className="flex items-center gap-1.5">
                        {modalScreenshots.map((s, idx) => (
                          <button
                            key={s.url}
                            type="button"
                            onClick={() => setModalScreenshotIdx(idx)}
                            className={`px-2.5 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                              modalScreenshotIdx === idx
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-semibold'
                                : 'bg-black/5 text-slate-600 hover:text-black dark:bg-white/5 dark:text-neutral-400 dark:hover:text-white'
                            }`}
                          >
                            {s.title}
                          </button>
                        ))}
                      </div>
                      {activeModalScreenshot.caption && (
                        <p className="text-xs text-slate-500 dark:text-[#808080] font-mono text-center sm:text-right">
                          {activeModalScreenshot.caption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Actions Bar (Only truthful configured links) */}
            <div className="flex flex-wrap gap-3 pt-2 pb-2">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-[#E0E0E0] font-medium text-xs font-mono tracking-wide transition-colors"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-black/15 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.04] text-slate-900 dark:text-white hover:border-black/30 dark:hover:border-white/40 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors text-xs font-mono tracking-wide"
                >
                  <GithubIcon size={14} />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.apkDownloadUrl && (
                <a
                  href={project.apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-black/15 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.04] text-slate-900 dark:text-white hover:border-black/30 dark:hover:border-white/40 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors text-xs font-mono tracking-wide"
                >
                  <Download size={14} />
                  <span>Download APK</span>
                </a>
              )}

              {!hasAnyLink && (
                <div className="text-xs font-mono text-slate-500 dark:text-[#808080] border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-white/40" />
                  <span>Direct repository / demo URLs configurable in <code>src/data/projects.ts</code></span>
                </div>
              )}
            </div>

            {/* Overview & Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-black/10 dark:border-white/10">
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-white/50">
                  PROJECT OVERVIEW
                </h3>
                <p className="text-sm text-slate-700 dark:text-[#C8C8C8] leading-relaxed">
                  {project.fullOverview}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-white/50">
                  CORE OBJECTIVE & GOAL
                </h3>
                <p className="text-sm text-slate-700 dark:text-[#C8C8C8] leading-relaxed">
                  {project.problemOrGoal}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-white/50 mb-3">
                KEY FEATURES & IMPLEMENTATION DETAILS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] flex items-start gap-3"
                  >
                    <CheckCircle2 size={16} className="text-slate-600 dark:text-white/60 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-slate-700 dark:text-[#C8C8C8] leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Contribution */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-white/50 flex items-center gap-2">
                <Wrench size={13} />
                <span>MY ENGINEERING & DESIGN CONTRIBUTION</span>
              </h3>
              <p className="text-sm text-slate-700 dark:text-[#C8C8C8] leading-relaxed">
                {project.myContribution}
              </p>
            </div>

            {/* Technical Challenges & Solutions */}
            {project.challengesAndSolutions.length > 0 && (
              <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-white/50">
                  TECHNICAL CHALLENGES & ARCHITECTURAL SOLUTIONS
                </h3>
                <div className="space-y-3">
                  {project.challengesAndSolutions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-2"
                    >
                      <div className="flex items-start gap-2 text-xs font-mono text-slate-900 dark:text-white/90">
                        <AlertCircle size={14} className="text-slate-600 dark:text-white/60 mt-0.5 flex-shrink-0" />
                        <span className="font-semibold">Challenge: {item.challenge}</span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-[#808080] pl-5 leading-relaxed">
                        <span className="text-slate-900 dark:text-white/60 font-mono">Solution:</span> {item.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-white/50 mb-3">
                TECHNOLOGIES UTILIZED
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-slate-700 dark:text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[#f8f8fa] dark:bg-[#0a0a0a] border-t border-black/10 dark:border-white/10 flex justify-between items-center text-xs text-slate-500 dark:text-[#808080]">
            <span>Press <kbd className="px-1.5 py-0.5 border border-black/15 dark:border-white/20 rounded bg-black/5 dark:bg-white/5 font-mono text-[10px] text-slate-700 dark:text-white">Esc</kbd> to close</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-mono text-slate-800 dark:text-white bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
