import { useState, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import { Starfield } from './components/Starfield';
import { CursorGlow } from './components/CursorGlow';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { EmailModal } from './components/EmailModal';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  const handleOpenEmail = useCallback((trigger?: HTMLElement) => {
    if (trigger) setTriggerEl(trigger);
    setIsEmailModalOpen(true);
  }, []);

  const handleCloseEmail = useCallback(() => {
    setIsEmailModalOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] text-[var(--text-secondary)] selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black antialiased font-sans">
      {/* HTML5 Canvas Animated Starfield with multi-layer depth & parallax */}
      <Starfield theme={theme} />

      {/* Smooth Ambient Cursor Glow following pointer */}
      <CursorGlow />

      {/* Fixed Minimalist Navbar */}
      <Navbar onOpenEmail={handleOpenEmail} theme={theme} onToggleTheme={toggleTheme} />

      {/* Story Flow:
          1. Hero: First impression & intro text (above the fold)
          2. Projects: Tabbed game showcase (typewriter, image zoom-settle)
          3. Skills: Technical Stack
          4. Contact: Immediate Actions & Integrated Footer
      */}
      <main className="relative z-10 flex flex-col">
        <Hero onContactClick={handleOpenEmail} />
        <Projects />
        <Skills />
        <Contact onOpenEmail={handleOpenEmail} />
      </main>

      {/* Universal Email Modal / Bottom Sheet */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={handleCloseEmail}
        triggerElement={triggerEl}
      />
    </div>
  );
}

export default App;
