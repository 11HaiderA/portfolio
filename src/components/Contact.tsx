import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowUpRight, ArrowUp } from 'lucide-react';
import { GithubIcon, WhatsappIcon } from './BrandIcons';
import { profileData } from '../data/profile';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

const CURRENT_YEAR = new Date().getFullYear();

interface ContactProps {
  onOpenEmail?: (triggerEl?: HTMLElement) => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenEmail }) => {
  const reducedMotion = useReducedMotionPreference();

  const handleOpenEmailModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (onOpenEmail) {
      onOpenEmail(e.currentTarget);
    } else {
      window.location.href = `mailto:${profileData.email}`;
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="relative min-h-[100dvh] flex flex-col justify-between pt-16 sm:pt-20 pb-4 px-4 sm:px-6 md:px-8"
    >
      {/* Central Contact Card Area */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto w-full my-auto py-4">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {/* Section Tag */}
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-[11px] font-mono tracking-widest uppercase text-violet-700 border border-violet-200 bg-violet-50/80 dark:text-violet-300 dark:border-white/10 dark:bg-white/[0.02] px-3 py-0.5 rounded-full backdrop-blur-sm font-semibold">
              GET IN TOUCH
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
            {profileData.contactHeading}
          </h2>

          {/* Short, professional supporting text */}
          <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-600 dark:text-[#C8C8C8] max-w-xl mx-auto leading-relaxed">
            {profileData.contactSubheading}
          </p>

          {/* Action Buttons: Send Email & Chat on WhatsApp */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3">
            {/* Send Email Action Button -> Opens Email Modal */}
            <button
              type="button"
              onClick={handleOpenEmailModal}
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 dark:hover:bg-[#F0F0F0] hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg dark:shadow-[0_4px_20px_rgba(255,255,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 cursor-pointer min-h-[44px]"
            >
              <Mail size={15} />
              <span>Send Email</span>
              <ArrowUpRight
                size={14}
                className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            {/* WhatsApp Action Button */}
            <a
              href={profileData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm hover:shadow dark:border-white/20 dark:bg-white/[0.05] dark:text-white font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 dark:hover:border-white/50 dark:hover:bg-white/[0.1] hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 min-h-[44px]"
            >
              <WhatsappIcon size={15} className="text-neutral-900 dark:text-white" />
              <span>Chat on WhatsApp</span>
              <ArrowUpRight
                size={14}
                className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Social Channels (GitHub) */}
          <div className="mt-5 flex items-center justify-center">
            {profileData.githubUrl && (
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-950 dark:text-[#808080] dark:hover:text-white transition-colors text-xs font-mono p-1.5"
                aria-label="GitHub profile"
              >
                <GithubIcon size={15} className="text-neutral-600 dark:text-white/60 group-hover:text-black dark:group-hover:text-white" />
                <span>GitHub Repository</span>
                <span className="text-[10px] text-neutral-400 group-hover:text-neutral-700 dark:text-white/30 dark:group-hover:text-white/60">↗</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Integrated Bottom Footer (always visible on screen when viewing Contact) */}
      <footer className="w-full max-w-6xl mx-auto border-t border-neutral-200 dark:border-white/10 pt-4 pb-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-600 dark:text-[#a0a0a0]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-neutral-900 dark:text-white/90 font-medium">{profileData.name}</span>
            <span className="hidden sm:inline text-neutral-300 dark:text-white/20">|</span>
            <button
              type="button"
              onClick={(e) => onOpenEmail?.(e.currentTarget)}
              className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer underline underline-offset-4"
            >
              {profileData.email}
            </button>
            <span className="hidden sm:inline text-neutral-300 dark:text-white/20">|</span>
            <span>© {CURRENT_YEAR} — Built with care.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 text-neutral-700 hover:text-neutral-950 dark:text-white/60 dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 bg-neutral-100 hover:bg-neutral-200 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/30 cursor-pointer min-h-[36px] justify-center"
              aria-label="Back to top of page"
            >
              <span>Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
};
