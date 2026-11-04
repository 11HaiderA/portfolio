import type { ExperienceItem } from '../types/portfolio';

/**
 * Centralized independent development & hands-on engineering history for Haider Ali.
 */
export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-game-dev',
    organization: 'Independent Project Development',
    role: 'Game & Systems Developer',
    period: '2024 - Present',
    location: 'Self-Directed',
    type: 'Development Project',
    summary:
      'Engineered interactive mobile puzzle games and applications, specializing in collision math, state persistence, and touch controls.',
    responsibilities: [
      'Architected game loops, finite state machines, and move-tracking engines for Free Block, Pair Up, and Matchsticks.',
      'Developed 2D grid matrix collision mathematics with constrained one-dimensional axis sliding.',
      'Designed card-flip animations, feedback micro-interactions, and undo state history.',
      'Optimized touch gesture listeners and memory footprint for smooth 60fps performance.',
    ],
    technologies: ['Android / Kotlin', 'Touch Gesture Handling', 'Matrix Math', 'State Management'],
    keyOutcomes: [
      'Shipped playable puzzle engines with level progressions, hints, and move counters.',
      'Implemented responsive drag clamping with sub-pixel release snapping.',
    ],
  },
  {
    id: 'exp-web-systems',
    organization: 'Self-Directed Software Engineering',
    role: 'Frontend & Logic Engineer',
    period: '2024 - 2025',
    location: 'Self-Directed',
    type: 'Development Project',
    summary:
      'Built algorithmic puzzle evaluators, mathematical parse trees, and performant interactive web environments.',
    responsibilities: [
      'Constructed arithmetic syntax trees capable of evaluating mathematical equations dynamically.',
      'Engineered lightweight HTML5 Canvas rendering loops with DPR scaling and tab visibility optimization.',
      'Authored accessible modal architectures, focus management, and reduced-motion layers.',
      'Maintained Git version control, semantic commits, and clean component structures.',
    ],
    technologies: ['TypeScript', 'React', 'HTML Canvas', 'Algorithmic Logic', 'Antigravity IDE', 'Git'],
    keyOutcomes: [
      'Created open-ended mathematical logic engines evaluating equivalence dynamically.',
      'Delivered clean, modular frontend systems with strict monochrome aesthetics and zero bloat.',
    ],
  },
];
