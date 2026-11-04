import React from 'react';
import { ArrowUp } from 'lucide-react';
import { profileData } from '../data/profile';

const CURRENT_YEAR = new Date().getFullYear();

interface FooterProps {
  onOpenEmail?: (triggerEl?: HTMLElement) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEmail }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-neutral-200 dark:border-white/10 bg-white dark:bg-black/90 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-600 dark:text-[#a0a0a0]">
        {/* Left */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
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

        {/* Right */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={(e) => onOpenEmail?.(e.currentTarget)}
            className="text-[11px] text-neutral-600 hover:text-neutral-950 dark:text-white/60 dark:hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>

          <button
            type="button"
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 text-neutral-700 hover:text-neutral-950 dark:text-white/60 dark:hover:text-white transition-colors p-2 rounded-lg border border-neutral-200 hover:border-neutral-300 bg-neutral-100 hover:bg-neutral-200 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/30 cursor-pointer min-h-[44px] min-w-[44px] justify-center"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
