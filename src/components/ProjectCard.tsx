import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem, SchematicType } from '../types/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
  onClick: () => void;
  featured?: boolean;
}

/**
 * High-fidelity monochrome SVG schematic representations of project mechanics.
 * Serves as architectural graphic fallback when screenshots are not yet provided.
 */
const ProjectSchematic: React.FC<{ type: SchematicType }> = ({ type }) => {
  switch (type) {
    case 'pairup':
      return (
        <svg
          viewBox="0 0 280 180"
          className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="280" height="180" fill="#080808" />
          <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
            <line x1="20" y1="20" x2="260" y2="20" />
            <line x1="20" y1="160" x2="260" y2="160" />
            <line x1="20" y1="20" x2="20" y2="160" />
            <line x1="260" y1="20" x2="260" y2="160" />
          </g>
          <rect x="36" y="34" width="48" height="50" rx="6" fill="#121212" stroke="rgba(255,255,255,0.2)" />
          <text x="60" y="64" fill="white" fontSize="16" fontFamily="monospace" textAnchor="middle">★</text>
          <rect x="94" y="34" width="48" height="50" rx="6" fill="#121212" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
          <rect x="152" y="34" width="48" height="50" rx="6" fill="#121212" stroke="rgba(255,255,255,0.2)" />
          <text x="176" y="64" fill="white" fontSize="16" fontFamily="monospace" textAnchor="middle">★</text>
          <rect x="210" y="34" width="48" height="50" rx="6" fill="#121212" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
          <rect x="36" y="96" width="48" height="50" rx="6" fill="#121212" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
          <rect x="94" y="96" width="48" height="50" rx="6" fill="#181818" stroke="rgba(255,255,255,0.3)" />
          <circle cx="118" cy="121" r="8" stroke="white" strokeWidth="1.5" />
          <rect x="152" y="96" width="48" height="50" rx="6" fill="#121212" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
          <rect x="210" y="96" width="48" height="50" rx="6" fill="#181818" stroke="rgba(255,255,255,0.3)" />
          <circle cx="234" cy="121" r="8" stroke="white" strokeWidth="1.5" />
          <path d="M 60 40 Q 118 16 176 40" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );

    case 'freeblock':
      return (
        <svg
          viewBox="0 0 280 180"
          className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="280" height="180" fill="#080808" />
          <rect x="40" y="20" width="200" height="140" rx="8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="#101010" />
          <rect x="238" y="70" width="4" height="40" fill="white" />
          <path d="M 230 90 L 250 90 M 245 85 L 250 90 L 245 95" stroke="white" strokeWidth="1.5" />
          <rect x="55" y="32" width="50" height="26" rx="4" fill="#1c1c1c" stroke="rgba(255,255,255,0.2)" />
          <rect x="115" y="32" width="26" height="54" rx="4" fill="#1c1c1c" stroke="rgba(255,255,255,0.2)" />
          <rect x="150" y="32" width="75" height="26" rx="4" fill="#1c1c1c" stroke="rgba(255,255,255,0.2)" />
          <rect x="90" y="77" width="55" height="26" rx="4" fill="#282828" stroke="white" strokeWidth="1.5" />
          <text x="117" y="94" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">KEY BLOCK</text>
          <rect x="55" y="115" width="80" height="26" rx="4" fill="#1c1c1c" stroke="rgba(255,255,255,0.2)" />
          <rect x="150" y="100" width="26" height="45" rx="4" fill="#1c1c1c" stroke="rgba(255,255,255,0.2)" />
        </svg>
      );

    case 'matchsticks':
      return (
        <svg
          viewBox="0 0 280 180"
          className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="280" height="180" fill="#080808" />
          <rect x="45" y="45" width="6" height="85" rx="2" fill="#d0d0d0" />
          <circle cx="48" cy="45" r="5" fill="#ffffff" />
          <g stroke="white" strokeWidth="3" strokeLinecap="round">
            <line x1="80" y1="87" x2="104" y2="87" />
            <line x1="92" y1="75" x2="92" y2="99" />
          </g>
          <rect x="130" y="45" width="6" height="85" rx="2" fill="#d0d0d0" />
          <circle cx="133" cy="45" r="5" fill="#ffffff" />
          <rect x="150" y="45" width="6" height="85" rx="2" fill="#d0d0d0" />
          <circle cx="153" cy="45" r="5" fill="#ffffff" />
          <g stroke="white" strokeWidth="3" strokeLinecap="round">
            <line x1="180" y1="82" x2="204" y2="82" />
            <line x1="180" y1="92" x2="204" y2="92" />
          </g>
          <path d="M 220 50 L 250 120" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <circle cx="220" cy="50" r="5" fill="white" />
          <path d="M 205 40 Q 235 25 240 60" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2 3" />
        </svg>
      );

    case 'errordna':
    default:
      return (
        <svg
          viewBox="0 0 280 180"
          className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="280" height="180" fill="#080808" />
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="1">
            <line x1="50" y1="90" x2="100" y2="50" />
            <line x1="50" y1="90" x2="100" y2="130" />
            <line x1="100" y1="50" x2="170" y2="40" />
            <line x1="100" y1="50" x2="170" y2="70" />
            <line x1="100" y1="130" x2="170" y2="115" />
            <line x1="100" y1="130" x2="170" y2="145" />
          </g>
          <circle cx="50" cy="90" r="10" fill="#141414" stroke="white" strokeWidth="1.5" />
          <text x="50" y="93" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle">DNA</text>
        </svg>
      );
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  featured = false,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${project.title}. ${project.category}. Click to view project details.`}
      className={`
        group relative flex flex-col justify-between overflow-hidden rounded-2xl
        border border-white/10 hover:border-white/35 bg-[#0d0d0d]/85 backdrop-blur-md
        transition-colors duration-300 cursor-pointer
        shadow-[0_8px_32px_rgba(0,0,0,0.85)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.95)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
        ${featured ? 'md:col-span-2' : 'col-span-1'}
      `}
    >
      {/* Specular gradient shine */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Screenshot Showcase Container */}
      <div className="relative overflow-hidden bg-[#070707] border-b border-white/10 h-64 sm:h-72 flex items-center justify-center p-4">
        {project.image && !imageFailed ? (
          <>
            {/* Ambient monochrome background glow */}
            <img
              src={project.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-15 filter blur-xl scale-125 pointer-events-none grayscale transition-opacity duration-700 group-hover:opacity-25"
            />
            {/* Centered mobile phone frame showcase */}
            <div className="relative z-10 h-full max-w-[210px] aspect-[9/18] rounded-xl overflow-hidden border border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.95)] bg-black transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:border-white/40">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                loading="lazy"
                onError={() => setImageFailed(true)}
                className="w-full h-full object-cover object-top transform transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </>
        ) : (
          <div className="w-full h-full p-4 flex items-center justify-center">
            <ProjectSchematic type={project.schematicType} />
          </div>
        )}

        {/* Status Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border bg-black/80 border-white/30 text-white backdrop-blur-sm">
            {project.status}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
        <div>
          {/* Category */}
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2">
            <span>{project.category}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm text-[#808080] group-hover:text-[#C8C8C8] transition-colors leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Technology badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-white/70"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 text-white/40">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/70 group-hover:text-white transition-colors">
          <span>View Project Details</span>
          <ArrowUpRight
            size={15}
            className="transform transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
          />
        </div>
      </div>
    </motion.div>
  );
};
