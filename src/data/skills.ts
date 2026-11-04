import type { SkillCategory } from '../types/portfolio';

/**
 * Streamlined, categorized skills and technologies for Haider Ali.
 * Structured into 3 clear technical columns for effortless recruiter scanning.
 */
export const skillsData: SkillCategory[] = [
  {
    title: 'Game & Mobile Engineering',
    description: 'Core logic, touchscreen algorithms, and mobile game engines.',
    skills: [
      { name: 'Android / Java & Kotlin', focus: 'Activity lifecycle, views & native mobile logic' },
      { name: 'Touch Gesture Handling', focus: 'Drag constraints, sub-pixel snapping & collision math' },
      { name: 'Puzzle State Engines', focus: 'Finite state machines, move tracking & undo history' },
      { name: 'Mathematical Logic Trees', focus: 'Arithmetic evaluation & equation parse trees' },
    ],
  },
  {
    title: 'Frontend & Interactive Web',
    description: 'Modern component systems, web performance, and procedural graphics.',
    skills: [
      { name: 'TypeScript & JavaScript (ES6+)', focus: 'Type-safe architectures & application logic' },
      { name: 'React', focus: 'Modern component hierarchies & declarative state' },
      { name: 'HTML5 Canvas', focus: '2D particle systems & frame-independent rendering' },
      { name: 'Tailwind CSS & Motion', focus: 'Fluid typography, responsive layouts & micro-interactions' },
    ],
  },
  {
    title: 'Tools & Development Practices',
    description: 'Engineering workflows, debugging environments, and version control.',
    skills: [
      { name: 'Antigravity IDE & JetBrains', focus: 'AI-assisted development, refactoring & profiling' },
      { name: 'Git & GitHub', focus: 'Branch management, semantic commits & release tagging' },
      { name: 'Chrome DevTools', focus: 'Frame rate performance, memory audits & layout inspection' },
      { name: 'Interface Ergonomics', focus: 'Touch target sizing, contrast ratios & accessibility' },
    ],
  },
];
