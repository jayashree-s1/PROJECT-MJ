import React from 'react';

interface SectionDividerProps {
  fillColor?: string;
  variant?: 'wave1' | 'wave2' | 'curve' | 'hills';
  inverted?: boolean;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  fillColor = '#FFE4E8',
  variant = 'wave1',
  inverted = false,
  className = '',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${
        inverted ? 'rotate-180 -scale-x-100' : ''
      } ${className}`}
    >
      {variant === 'wave1' ? (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-16 md:h-20"
        >
          <path
            d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"
            fill={fillColor}
          />
        </svg>
      ) : variant === 'wave2' ? (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-16 md:h-20"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.31,200,105,241.6,95.19,282.88,73.57,321.39,56.44Z"
            fill={fillColor}
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-14 md:h-18"
        >
          <path
            d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z"
            fill={fillColor}
          />
        </svg>
      )}
    </div>
  );
};

