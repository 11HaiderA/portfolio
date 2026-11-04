import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Layout, Wrench } from 'lucide-react';
import { skillsData } from '../data/skills';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

const categoryIcons: Record<string, React.ReactNode> = {
  'Game & Mobile Engineering': <Smartphone size={18} />,
  'Frontend & Interactive Web': <Layout size={18} />,
  'Tools & Development Practices': <Wrench size={18} />,
};

export const Skills: React.FC = () => {
  const reducedMotion = useReducedMotionPreference();

  return (
    <section id="skills" className="relative min-h-[100dvh] flex flex-col justify-center py-12 md:py-0 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl mb-6 sm:mb-8"
        >
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-white/60 mb-1">
            Technical Stack
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Skills & Capabilities
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 dark:text-[#C8C8C8]">
            Core technologies and engineering methods applied across my projects.
          </p>
        </motion.div>

        {/* Streamlined 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {skillsData.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : catIdx * 0.1 }}
              whileHover={{ y: reducedMotion ? 0 : -4, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
              className="group rounded-2xl border border-neutral-200/90 hover:border-neutral-300 dark:border-white/10 dark:hover:border-white/35 bg-white dark:bg-[#0d0d0d]/85 backdrop-blur-md p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.9)] transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100 dark:border-white/10">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-neutral-950 dark:text-white tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-[11px] text-neutral-500 dark:text-[#808080] mt-0.5 line-clamp-1">
                    {category.description}
                  </p>
                </div>
                <div className="text-violet-600 dark:text-violet-300 p-2 rounded-xl bg-violet-50 border border-violet-100/80 dark:bg-white/[0.04] dark:border-white/10 ml-3 flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                  {categoryIcons[category.title] || <Wrench size={16} />}
                </div>
              </div>

              {/* Skills List */}
              <ul className="space-y-2.5 sm:space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="flex flex-col text-xs font-mono">
                    <span className="text-neutral-900 dark:text-white font-medium tracking-wide">
                      {skill.name}
                    </span>
                    <span className="text-neutral-500 dark:text-[#808080] text-[11px] font-sans mt-0.5 leading-snug">
                      {skill.focus}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
