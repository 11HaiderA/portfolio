import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Layers } from 'lucide-react';
import { profileData } from '../data/profile';
import { FloatingPanel } from './FloatingPanel';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export const About: React.FC = () => {
  const reducedMotion = useReducedMotionPreference();

  const pillarIcons = [
    <Terminal size={18} key="term" />,
    <Layers size={18} key="layers" />,
    <Cpu size={18} key="cpu" />,
  ];

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/60 mb-2">
            BACKGROUND & IDENTITY
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            About Me
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#C8C8C8] leading-relaxed">
            {profileData.aboutIntro}
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/80">
              Mobile Game Development
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/80">
              Matrix Collision Mathematics
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/80">
              Self-Directed Software Engineering
            </span>
          </div>
        </motion.div>

        {/* 3 Core Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profileData.aboutPillars.map((pillar, idx) => (
            <FloatingPanel
              key={pillar.title}
              heading={pillar.title}
              description={pillar.description}
              icon={pillarIcons[idx % pillarIcons.length]}
              floatDuration={5.5 + idx * 0.7}
              floatDelay={idx * 0.25}
              floatDistance={3}
            >
              <div className="pt-2">
                <span className="text-xs font-mono text-white/80 border-b border-white/20 pb-0.5">
                  {pillar.highlight}
                </span>
              </div>
            </FloatingPanel>
          ))}
        </div>
      </div>
    </section>
  );
};
