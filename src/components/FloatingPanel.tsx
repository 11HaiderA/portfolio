import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

interface FloatingPanelProps {
  label?: string;
  heading: string;
  description?: string;
  actionText?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  floatDuration?: number;
  floatDelay?: number;
  floatDistance?: number;
  children?: React.ReactNode;
  highlight?: boolean;
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  label,
  heading,
  description,
  actionText,
  onClick,
  icon,
  className = '',
  floatDuration = 5.5,
  floatDelay = 0,
  floatDistance = 4,
  children,
  highlight = false,
}) => {
  const reducedMotion = useReducedMotionPreference();
  const isClickable = Boolean(onClick);

  return (
    <motion.div
      animate={
        reducedMotion
          ? undefined
          : {
              y: [-floatDistance, floatDistance, -floatDistance],
            }
      }
      transition={
        reducedMotion
          ? undefined
          : {
              duration: floatDuration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: floatDelay,
            }
      }
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: isClickable ? -6 : -4,
              transition: { duration: 0.25, ease: 'easeOut' },
            }
      }
      onClick={onClick}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `${heading}. ${actionText || 'Click to view details'}` : undefined}
      className={`
        group relative overflow-hidden rounded-2xl
        border transition-all duration-300
        bg-[#0d0d0d]/85 backdrop-blur-md hover:border-white/35
        ${highlight ? 'border-white/25 shadow-[0_8px_32px_rgba(255,255,255,0.04)]' : 'border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.85)]'}
        ${isClickable ? 'cursor-pointer hover:bg-[#121212]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40' : ''}
        ${className}
      `}
    >
      {/* Subtle specular gradient sheen on hover */}
      <div 
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
        aria-hidden="true"
      />

      <div className="relative p-6 sm:p-7 z-10 flex flex-col justify-between h-full">
        <div>
          {/* Header Row: Label & Icon */}
          <div className="flex items-center justify-between gap-4 mb-4">
            {label ? (
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/50 border border-white/10 px-2.5 py-0.5 rounded-full bg-white/[0.02]">
                {label}
              </span>
            ) : <span />}

            {icon && (
              <div className="text-white/70 group-hover:text-white transition-colors">
                {icon}
              </div>
            )}
          </div>

          {/* Heading */}
          <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight leading-snug group-hover:text-white transition-colors">
            {heading}
          </h3>

          {/* Optional Description */}
          {description && (
            <p className="mt-2 text-sm text-[#808080] leading-relaxed group-hover:text-[#C8C8C8] transition-colors">
              {description}
            </p>
          )}

          {/* Custom children */}
          {children && <div className="mt-4">{children}</div>}
        </div>

        {/* Action Link / Arrow */}
        {actionText && (
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/70 group-hover:text-white transition-colors">
            <span>{actionText}</span>
            <ArrowUpRight 
              size={15} 
              className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" 
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

