import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, ExternalLink, Mail, X } from 'lucide-react';
import { profileData } from '../data/profile';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

const fallbackCopy = (text: string) => {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const res = document.execCommand('copy');
    document.body.removeChild(textArea);
    return res;
  } catch {
    return false;
  }
};

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  triggerElement,
}) => {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotionPreference();
  const modalRef = useRef<HTMLDivElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const copyTimerRef = useRef<number | null>(null);

  // Detect mobile viewport (<640px) for bottom-sheet presentation
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Copy email with navigator.clipboard and fallback to execCommand
  const handleCopy = useCallback(() => {
    const email = profileData.email;
    let successful = false;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          setCopied(true);
        })
        .catch(() => {
          fallbackCopy(email);
        });
      successful = true;
    } else {
      successful = fallbackCopy(email);
    }

    if (successful) {
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, []);

  // Close handlers and keyboard listeners (Esc & Focus Trap)
  useEffect(() => {
    if (!isOpen) return;

    // Focus the primary copy button upon open
    const initialTimer = setTimeout(() => {
      copyBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      // Return focus to trigger element upon closing
      triggerElement?.focus();
    };
  }, [isOpen, onClose, triggerElement]);

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    profileData.email
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-modal-title"
        >
          {/* Backdrop with 180ms fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container: Bottom sheet on mobile, centered floating popover on desktop */}
          <motion.div
            ref={modalRef}
            initial={
              reducedMotion
                ? { opacity: 0 }
                : isMobile
                ? { y: '100%', opacity: 1 }
                : { scale: 0.96, opacity: 0 }
            }
            animate={
              reducedMotion
                ? { opacity: 1 }
                : isMobile
                ? { y: 0, opacity: 1 }
                : { scale: 1, opacity: 1 }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : isMobile
                ? { y: '100%', opacity: 1 }
                : { scale: 0.96, opacity: 0 }
            }
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full max-w-md bg-white dark:bg-[#0e0e0e] border border-black/10 dark:border-white/15 p-6 sm:p-7 shadow-2xl dark:shadow-[0_24px_64px_rgba(0,0,0,0.9)] ${
              isMobile
                ? 'rounded-t-3xl border-b-0 pb-9'
                : 'rounded-2xl'
            }`}
          >
            {/* Mobile Drag Handle */}
            {isMobile && (
              <div className="w-12 h-1 bg-black/15 dark:bg-white/20 rounded-full mx-auto -mt-2 mb-5" />
            )}

            {/* Header & Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white">
                  <Mail size={16} />
                </div>
                <div>
                  <h3
                    id="email-modal-title"
                    className="text-base font-semibold text-neutral-900 dark:text-white tracking-tight"
                  >
                    Send an Email
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                    Reach out for engineering roles & collaborations
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] border border-transparent hover:border-black/10 dark:hover:border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Email Address Display (Selectable Text) */}
            <div className="mt-5 p-3.5 rounded-xl bg-neutral-100 dark:bg-black border border-black/10 dark:border-white/10 flex items-center justify-between">
              <span className="font-mono text-sm sm:text-base text-neutral-900 dark:text-white select-all break-all tracking-wide">
                {profileData.email}
              </span>
            </div>

            {/* Primary Action Buttons: Copy & Open in Gmail */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Copy Button with 2s "Copied ✓" state */}
              <button
                ref={copyBtnRef}
                type="button"
                onClick={handleCopy}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs font-mono tracking-wide transition-all duration-200 cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  copied
                    ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 active:scale-[0.98]'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={15} />
                    <span>Copied ✓</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {/* Open in Gmail Web Button */}
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-black/15 bg-black/[0.02] text-neutral-900 hover:border-black/35 hover:bg-black/[0.05] dark:border-white/20 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.1] dark:hover:border-white/40 active:scale-[0.98] font-semibold text-xs font-mono tracking-wide transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <span>Open in Gmail</span>
                <ExternalLink size={14} className="text-neutral-500 dark:text-white/60" />
              </a>
            </div>

            {/* Secondary Option: Mail app fallback */}
            <div className="mt-5 text-center">
              <a
                href={`mailto:${profileData.email}`}
                className="text-xs text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white underline underline-offset-4 transition-colors font-mono py-1 inline-block"
              >
                Open in mail app
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
