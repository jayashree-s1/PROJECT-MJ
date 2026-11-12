import React from 'react';
import { Heart } from 'lucide-react';

interface EmptyFrameProps {
  id: string;
  src?: string;
  alt?: string;
  shape?: 'rect' | 'heart' | 'rounded' | 'polaroid' | 'circle';
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  className?: string;
  placeholderText?: string;
  onClick?: () => void;
  allowEditUpload?: boolean;
}

export const EmptyFrame: React.FC<EmptyFrameProps> = ({
  src,
  alt = 'Romantic Memory',
  shape = 'rect',
  aspectRatio = 'square',
  className = '',
  placeholderText = 'Our Special Memory',
  onClick,
}) => {
  const hasMedia = Boolean(src && src.trim() !== '');

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'video':
        return 'aspect-video';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'square':
        return 'aspect-square';
      default:
        return 'w-full h-full';
    }
  };

  const getShapeClass = () => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-2xl';
      case 'heart':
        return 'rounded-[32px]';
      case 'polaroid':
        return 'rounded-sm';
      default:
        return 'rounded-xl';
    }
  };

  return (
    <div
      className={`relative group overflow-hidden ${getAspectRatioClass()} ${getShapeClass()} ${className} transition-all duration-300`}
      onClick={onClick}
    >
      {hasMedia ? (
        <div className="relative w-full h-full">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        /* Soft, elegant romantic placeholder */
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-50/80 via-blush/60 to-cream/80 border-2 border-dashed border-rose-300/80 text-rose-800/70 select-none transition-all duration-300">
          <div className="relative mb-2">
            <Heart className="w-8 h-8 text-rose-400 group-hover:scale-110 group-hover:text-rose-500 transition-all duration-300 animate-pulse-slow fill-rose-100" />
            <div className="absolute -top-1 -right-1">
              <span className="flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-medium text-rose-700 text-center tracking-wide font-sans">
            {placeholderText}
          </p>

          <span className="text-[10px] text-rose-400/80 mt-1 font-sans">
            Our Love Story 💕
          </span>
        </div>
      )}
    </div>
  );
};
