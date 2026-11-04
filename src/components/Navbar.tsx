import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { profileData } from '../data/profile';

interface NavItem {
  label: string;
  href: string;
}

// Order matches page layout: Work -> Skills -> Contact
const navItems: NavItem[] = [
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenEmail?: (triggerEl?: HTMLElement) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEmail,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('projects');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer to update active section indicator with zero jitter
  useEffect(() => {
    const sectionIds = ['projects', 'skills', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-20% 0px -55% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navOffset);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-black/85 backdrop-blur-md border-b border-neutral-200/80 dark:border-white/10 py-3.5 shadow-xs dark:shadow-[0_4px_24px_rgba(0,0,0,0.85)]'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Identity Branding */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="group flex items-center gap-2.5 text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500"
          >
            <span aria-hidden="true" className="font-mono text-xs tracking-wider px-2 py-1 border border-neutral-200 bg-neutral-100 text-neutral-900 group-hover:border-neutral-300 dark:border-white/20 dark:bg-white/[0.04] dark:text-white dark:group-hover:border-white/50 rounded transition-all">
              {profileData.monogram}
            </span>
            <span className="text-sm font-semibold tracking-tight text-neutral-900 group-hover:text-black dark:text-[#E0E0E0] dark:group-hover:text-white transition-colors">
              {profileData.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wide transition-colors ${
                    isActive
                      ? 'text-neutral-950 dark:text-white font-medium'
                      : 'text-neutral-600 hover:text-neutral-950 dark:text-[#808080] dark:hover:text-[#C8C8C8]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-neutral-900 dark:bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Quick Actions: Theme Toggle, Email, WhatsApp */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-full border border-neutral-200 hover:border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-black dark:border-white/15 dark:hover:border-white/40 dark:bg-white/[0.04] dark:text-neutral-300 dark:hover:text-white transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun size={15} className="text-amber-300 transition-transform duration-200 hover:rotate-45" />
              ) : (
                <Moon size={15} className="text-neutral-700 transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>

            <button
              type="button"
              onClick={(e) => onOpenEmail?.(e.currentTarget)}
              className="text-xs font-mono text-neutral-700 hover:text-black hover:bg-neutral-100 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/[0.05] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer min-h-[44px] flex items-center"
            >
              Email
            </button>
            <a
              href={profileData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-neutral-900 hover:text-black border border-neutral-200 hover:border-neutral-300 px-3.5 py-1.5 rounded-full bg-white hover:bg-neutral-50 shadow-xs dark:text-white/90 dark:hover:text-white dark:border-white/15 dark:hover:border-white/40 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] transition-all min-h-[44px] flex items-center"
            >
              WhatsApp ↗
            </a>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.03] text-neutral-700 dark:text-neutral-300 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun size={16} className="text-amber-300" />
              ) : (
                <Moon size={16} className="text-neutral-700" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-700 hover:text-black dark:text-white/70 dark:hover:text-white p-2 rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.03] hover:border-neutral-300 dark:hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 md:hidden bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-black/10 dark:border-white/10 px-6 py-6 shadow-2xl"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center justify-between py-2 text-sm font-mono text-neutral-700 hover:text-black dark:text-[#C8C8C8] dark:hover:text-white border-b border-black/5 dark:border-white/5 transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] text-neutral-400 dark:text-white/30">→</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
