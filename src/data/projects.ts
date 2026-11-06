import type { ProjectItem } from '../types/portfolio';

// Resolve asset URLs cleanly across both root domains and subpath deployments like GitHub Pages
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

/**
 * Featured projects for Haider Ali with attached production screenshots.
 */
export const projectsData: ProjectItem[] = [
  {
    id: 'freeblock',
    title: 'Free Block',
    tagline: 'Algorithmic sliding-block spatial puzzle game.',
    category: 'Puzzle Game / Mobile',
    status: 'Completed',
    shortDescription:
      'Spatial sliding-block puzzle game featuring 1D constrained piece physics, move optimization, and systematic stage design.',
    fullOverview:
      'Free Block translates the classic sliding-block challenge into a tactile mobile experience with clean physics-constrained dragging, step count optimization, and level designs that test spatial foresight.',
    problemOrGoal:
      'Design a robust collision and slide constraint system that allows smooth 1D piece movement without overlap glitches or touch coordinate desynchronization.',
    keyFeatures: [
      'Constrained one-dimensional block sliding along horizontal and vertical axes.',
      'Dynamic collision detection preventing block overlap and boundary crossing.',
      'Move-count tracking and optimal-solution benchmarking.',
      'Handcrafted level layouts with escalating topological complexity.',
      'Undo/restart state mechanics with full history rollback.',
    ],
    myContribution:
      'Engineered the 2D grid matrix collision engine, touch drag gesture handlers, level state serialization, and clean minimalist visual styling.',
    technologies: ['Android / Mobile', 'Touch Gesture Handling', 'Matrix Collision Math', 'State Management'],
    challengesAndSolutions: [
      {
        challenge: 'Ensuring swipe and drag movements lock accurately to grid bounds without jumpy snaps.',
        solution: 'Clamped drag deltas to adjacent vacant cells in real time and applied ease-out tweening to snap to discrete grid coordinates on release.',
      },
    ],
    schematicType: 'freeblock',
    image: asset('screenshots/freeblock-splash.jpg'),
    screenshots: [
      {
        url: asset('screenshots/freeblock-splash.jpg'),
        title: 'Splash Screen',
        caption: 'Branded loading screen with animated progress bar',
        type: 'splash',
      },
      {
        url: asset('screenshots/freeblock-menu.jpg'),
        title: 'Main Menu',
        caption: 'Stage tier selection, level progression, and settings',
        type: 'menu',
      },
      {
        url: asset('screenshots/freeblock-gameplay.jpg'),
        title: 'Interactive Gameplay',
        caption: 'Tactile 6x6 sliding puzzle board with optimal step benchmarking',
        type: 'gameplay',
      },
    ],
    githubUrl: 'https://github.com/11HaiderA/FreeBlock',
    featured: false,
  },
  {
    id: 'pairup',
    title: 'Pair Up',
    tagline: 'Tactile memory-matching mobile puzzle experience.',
    category: 'Memory Game / Mobile',
    status: 'Completed',
    shortDescription:
      'Fast-paced card matching game with progressive grid layouts, timer constraints, and fluid flip animations.',
    fullOverview:
      'Pair Up is an interactive memory-matching game engineered for mobile touchscreens. The gameplay centers around matching card pairs within defined time or move constraints, challenging spatial recall through clean visual feedback.',
    problemOrGoal:
      'To build a distraction-free, fluid memory game that elevates classic matching mechanics through polished state transitions, responsive card physics, and clean tactile feedback.',
    keyFeatures: [
      'Core memory-matching mechanics with progressive grid dimensions and timers.',
      'Escalating stage difficulty with star rating and health point metrics.',
      'Refined card-flip and match verification micro-animations.',
      'Touch-optimized interface with zero layout shift during card reveals.',
      'Persistent high-score and progress tracking across play sessions.',
    ],
    myContribution:
      'Architected the complete game loop, state management, card matching algorithm, UI layout, and transition animations.',
    technologies: ['Android', 'Java/Kotlin', 'UI Animation', 'Custom Views', 'Local Storage'],
    challengesAndSolutions: [
      {
        challenge: 'Preventing rapid accidental double-taps while cards are mid-animation.',
        solution: 'Implemented an input lock state that buffers user interactions until the evaluation animation concludes.',
      },
      {
        challenge: 'Maintaining uniform grid cell sizing across various screen ratios.',
        solution: 'Built an adaptive constraint-based layout calculation ensuring cards stay square and centered regardless of aspect ratio.',
      },
    ],
    schematicType: 'pairup',
    image: asset('screenshots/pairup-splash.jpg'),
    screenshots: [
      {
        url: asset('screenshots/pairup-splash.jpg'),
        title: 'Splash Screen',
        caption: 'Animated magical forest entrance featuring the fox mascot',
        type: 'splash',
      },
      {
        url: asset('screenshots/pairup-menu.jpg'),
        title: 'Main Menu',
        caption: 'Mode selection, level tiers, profile stats, and coin economy',
        type: 'menu',
      },
      {
        url: asset('screenshots/pairup-gameplay.jpg'),
        title: 'Interactive Gameplay',
        caption: 'Fast-paced card matching grid with countdown timer and lives',
        type: 'gameplay',
      },
    ],
    githubUrl: 'https://github.com/11HaiderA/PairUP',
    featured: false,
  },
  {
    id: 'matchsticks',
    title: 'Matchsticks',
    tagline: 'Interactive equation-solving and geometric puzzle.',
    category: 'Logic Puzzle / Mobile',
    status: 'Completed',
    shortDescription:
      'Arithmetic equation puzzle engine requiring players to correct mathematical statements by moving designated matchsticks.',
    fullOverview:
      'Matchsticks turns arithmetic reasoning into a tactile puzzle. Players interactively pick up, rotate, and place matchsticks to transform numerals and mathematical operators into valid statements under strict move constraints.',
    problemOrGoal:
      'Create an intuitive drag-and-drop matchstick interface paired with an arithmetic expression evaluator capable of validating multiple alternate valid solutions.',
    keyFeatures: [
      'Interactive matchstick pickup, rotation, and placement mechanics.',
      'Real-time equation parse tree that validates mathematical equivalence upon drop.',
      'Multiple valid solution detection for open-ended puzzles.',
      'Visual cues indicating active match counts, hint systems, and move counters.',
      'Crisp vector rendering of matchsticks with sulfur-head details.',
    ],
    myContribution:
      'Authored the mathematical evaluation logic, matchstick segment geometry mappings, touch placement collision buffers, and visual puzzle levels.',
    technologies: ['Logic & Arithmetic Engine', 'Interactive Vector Graphics', 'Touch Gesture Pipeline', 'UI Design'],
    challengesAndSolutions: [
      {
        challenge: 'Validating multiple valid equations dynamically without hardcoding single answers.',
        solution: 'Constructed an abstract syntax tree parser that evaluates the resulting arithmetic expression against mathematical truth rather than fixed string comparisons.',
      },
    ],
    schematicType: 'matchsticks',
    image: asset('screenshots/matchsticks-splash.jpg'),
    screenshots: [
      {
        url: asset('screenshots/matchsticks-splash.jpg'),
        title: 'Splash Screen',
        caption: 'Striking match animation with atmospheric smoke and glow',
        type: 'splash',
      },
      {
        url: asset('screenshots/matchsticks-menu.jpg'),
        title: 'Main Menu',
        caption: 'Ignite Your Mind menu with level resume and stage progression',
        type: 'menu',
      },
      {
        url: asset('screenshots/matchsticks-gameplay.jpg'),
        title: 'Interactive Gameplay',
        caption: 'Arithmetic equation puzzle with drag-and-drop match manipulation',
        type: 'gameplay',
      },
    ],
    githubUrl: 'https://github.com/11HaiderA/IGNITE',
    featured: false,
  },
  {
    id: 'errordna',
    title: 'ErrorDNA',
    tagline: 'Diagnostic study and conceptual error recovery application.',
    category: 'Learning & Diagnostic App',
    status: 'Completed',
    shortDescription:
      'Interactive study tool that isolates mistake patterns, tracks learning recovery progress, and provides personalized health metrics.',
    fullOverview:
      'ErrorDNA helps students and developers pinpoint conceptual mistakes rather than just syntax errors. The platform tracks question history, identifies root misconceptions, and monitors overall knowledge health with recovery paths.',
    problemOrGoal:
      'Bridge the gap between passive quiz taking and deep conceptual retention by visualizing error root causes and tracking recovery over time.',
    keyFeatures: [
      'Overall health dashboard with progress bars and recovery analytics.',
      'Structured quiz upload flow with automated diagnostic categorization.',
      'History logging tracking conceptual error frequency across study sessions.',
      'Dark-mode dashboard with streamlined mobile-first navigation.',
    ],
    myContribution:
      'Designed interface wireframes, built user workflows, implemented state tracking and mobile UI components.',
    technologies: ['Mobile UI/UX', 'State Analytics', 'Concept Architecture', 'Mobile Development'],
    challengesAndSolutions: [
      {
        challenge: 'Displaying complex diagnostic error metrics cleanly on mobile viewports.',
        solution: 'Created a hierarchical card dashboard with clear health indicators and single-action recovery prompts.',
      },
    ],
    schematicType: 'errordna',
    image: asset('screenshots/errordna-overview.jpg'),
    screenshots: [
      {
        url: asset('screenshots/errordna-overview.jpg'),
        title: 'Health Dashboard',
        caption: 'Diagnostic study dashboard with conceptual error metrics',
        type: 'overview',
      },
    ],
    githubUrl: 'https://github.com/11HaiderA/ErrorDNA',
    featured: false,
  },
];
