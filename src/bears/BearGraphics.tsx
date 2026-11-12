import React, { useState } from 'react';
import { motion } from 'framer-motion';

export type BearPose = 
  | 'idle' 
  | 'walk' 
  | 'hug' 
  | 'kiss' 
  | 'heart' 
  | 'cry' 
  | 'sleep' 
  | 'read' 
  | 'popcorn' 
  | 'blush' 
  | 'wave' 
  | 'dance'
  | 'spin';

interface BearGraphicsProps {
  type: 'white' | 'brown' | 'couple';
  pose: BearPose;
  direction?: 'left' | 'right';
  className?: string;
}

export const BearGraphics: React.FC<BearGraphicsProps> = ({
  type,
  pose,
  direction = 'right',
  className = '',
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  // Try loading cut-out PNG asset if available
  const assetPath = `/assets/bears/${pose}.png`;

  if (!imageFailed) {
    return (
      <div className={`relative ${className} select-none`}>
        <img
          src={assetPath}
          alt={`${type} bear ${pose}`}
          className={`w-full h-full object-contain pointer-events-auto ${direction === 'left' ? 'scale-x-[-1]' : ''}`}
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  // High-quality SVG Cartoon Bear Fallback
  return (
    <div className={`relative ${className} select-none ${direction === 'left' ? 'scale-x-[-1]' : ''}`}>
      {type === 'couple' ? (
        <CoupleBearSvg pose={pose} />
      ) : type === 'white' ? (
        <SingleBearSvg color="#FFFFFF" earColor="#FFD1DC" blushColor="#FFB3C6" pose={pose} />
      ) : (
        <SingleBearSvg color="#8D5B4C" earColor="#D7A99C" blushColor="#FF8DA1" pose={pose} isDark />
      )}
    </div>
  );
};

// SVG for single bear (White or Brown)
const SingleBearSvg: React.FC<{
  color: string;
  earColor: string;
  blushColor: string;
  pose: BearPose;
  isDark?: boolean;
}> = ({ color, earColor, blushColor, pose, isDark }) => {
  const strokeColor = isDark ? '#5C382E' : '#E0D0CC';
  const eyeColor = '#2B1810';
  const snoutColor = isDark ? '#E8CFC6' : '#FFF5F0';

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      {/* Ears */}
      <circle cx="28" cy="24" r="14" fill={color} stroke={strokeColor} strokeWidth="2.5" />
      <circle cx="28" cy="24" r="7.5" fill={earColor} />
      <circle cx="72" cy="24" r="14" fill={color} stroke={strokeColor} strokeWidth="2.5" />
      <circle cx="72" cy="24" r="7.5" fill={earColor} />

      {/* Body */}
      <ellipse cx="50" cy="68" rx="28" ry="24" fill={color} stroke={strokeColor} strokeWidth="2.5" />
      <ellipse cx="50" cy="71" rx="17" ry="14" fill={snoutColor} opacity="0.6" />

      {/* Feet / Paws */}
      <ellipse cx="34" cy="89" rx="11" ry="8" fill={color} stroke={strokeColor} strokeWidth="2" />
      <ellipse cx="66" cy="89" rx="11" ry="8" fill={color} stroke={strokeColor} strokeWidth="2" />

      {/* Head */}
      <circle cx="50" cy="42" r="30" fill={color} stroke={strokeColor} strokeWidth="2.5" />

      {/* Snout */}
      <ellipse cx="50" cy="48" rx="14" ry="10" fill={snoutColor} />
      <ellipse cx="50" cy="44" rx="4.5" ry="3" fill="#2B1810" />
      <path d="M50 47 L50 51 M46 51 Q50 54 54 51" stroke="#2B1810" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Eyes based on pose */}
      {pose === 'sleep' ? (
        <>
          <path d="M35 39 Q40 43 45 39" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M55 39 Q60 43 65 39" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : pose === 'cry' ? (
        <>
          <path d="M34 38 Q40 33 46 38" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M54 38 Q60 33 66 38" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Tears */}
          <ellipse cx="38" cy="46" rx="2.5" ry="5" fill="#64B5F6" />
          <ellipse cx="62" cy="46" rx="2.5" ry="5" fill="#64B5F6" />
        </>
      ) : pose === 'blush' || pose === 'kiss' ? (
        <>
          <path d="M35 40 Q40 35 45 40" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M55 40 Q60 35 65 40" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="39" cy="38" r="3.5" fill={eyeColor} />
          <circle cx="40" cy="37" r="1.2" fill="#FFFFFF" />
          <circle cx="61" cy="38" r="3.5" fill={eyeColor} />
          <circle cx="62" cy="37" r="1.2" fill="#FFFFFF" />
        </>
      )}

      {/* Rosy Cheeks */}
      <ellipse cx="32" cy="47" rx="6" ry="4" fill={blushColor} opacity="0.85" />
      <ellipse cx="68" cy="47" rx="6" ry="4" fill={blushColor} opacity="0.85" />

      {/* Arms / Props based on pose */}
      {pose === 'wave' ? (
        <>
          <ellipse cx="22" cy="62" rx="7" ry="12" fill={color} stroke={strokeColor} strokeWidth="2" transform="rotate(-30 22 62)" />
          {/* Waving arm */}
          <ellipse cx="78" cy="32" rx="7" ry="14" fill={color} stroke={strokeColor} strokeWidth="2" transform="rotate(40 78 32)" />
        </>
      ) : pose === 'heart' ? (
        <>
          <ellipse cx="30" cy="64" rx="7" ry="12" fill={color} stroke={strokeColor} strokeWidth="2" transform="rotate(35 30 64)" />
          <ellipse cx="70" cy="64" rx="7" ry="12" fill={color} stroke={strokeColor} strokeWidth="2" transform="rotate(-35 70 64)" />
          {/* Little red heart held in hands */}
          <path d="M50 71 C45 63 35 68 43 78 L50 84 L57 78 C65 68 55 63 50 71 Z" fill="#E63B60" />
        </>
      ) : pose === 'read' ? (
        <>
          <ellipse cx="32" cy="66" rx="7" ry="12" fill={color} stroke={strokeColor} strokeWidth="2" transform="rotate(25 32 66)" />
          <ellipse cx="68" cy="66" rx="7" ry="12" fill={color} stroke={strokeColor} strokeWidth="2" transform="rotate(-25 68 66)" />
          {/* Cute Book */}
          <rect x="38" y="66" width="24" height="16" rx="2" fill="#FFE4E8" stroke="#E63B60" strokeWidth="1.5" />
          <line x1="50" y1="66" x2="50" y2="82" stroke="#E63B60" strokeWidth="1.5" />
        </>
      ) : pose === 'popcorn' ? (
        <>
          <ellipse cx="30" cy="66" rx="7" ry="12" fill={color} stroke={strokeColor} strokeWidth="2" />
          <ellipse cx="70" cy="66" rx="7" ry="12" fill={color} stroke={strokeColor} strokeWidth="2" />
          {/* Striped Popcorn bucket */}
          <polygon points="40,68 60,68 57,86 43,86" fill="#FFF0F3" stroke="#E63B60" strokeWidth="1.5" />
          <circle cx="47" cy="66" r="3.5" fill="#FFE599" />
          <circle cx="53" cy="65" r="4" fill="#FFE599" />
          <circle cx="50" cy="62" r="3" fill="#FFE599" />
        </>
      ) : (
        <>
          {/* Normal resting / hugging arms */}
          <ellipse cx="26" cy="65" rx="7" ry="12" fill={color} stroke={strokeColor} strokeWidth="2" transform="rotate(15 26 65)" />
          <ellipse cx="74" cy="65" rx="7" ry="12" fill={color} stroke={strokeColor} strokeWidth="2" transform="rotate(-15 74 65)" />
        </>
      )}
    </svg>
  );
};

// SVG for the Couple together (hug/kiss/sleep)
const CoupleBearSvg: React.FC<{ pose: BearPose }> = ({ pose }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {pose === 'sleep' ? (
        <div className="relative w-36 h-28">
          {/* Starry blanket */}
          <div className="absolute bottom-0 w-full h-14 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-t-2xl border border-rose-300/40 shadow-lg flex items-center justify-around px-3 z-10">
            <span className="text-yellow-200 text-xs">★</span>
            <span className="text-pink-200 text-xs">♥</span>
            <span className="text-yellow-200 text-xs">★</span>
            <span className="text-pink-200 text-xs">♥</span>
          </div>
          {/* Two sleeping heads */}
          <div className="absolute top-2 left-3 w-16 h-16">
            <SingleBearSvg color="#FFFFFF" earColor="#FFD1DC" blushColor="#FFB3C6" pose="sleep" />
          </div>
          <div className="absolute top-3 right-3 w-16 h-16">
            <SingleBearSvg color="#8D5B4C" earColor="#D7A99C" blushColor="#FF8DA1" pose="sleep" isDark />
          </div>
          {/* Zzz bubbles */}
          <motion.div
            className="absolute -top-3 right-6 text-rose-500 font-bold text-sm"
            animate={{ y: [-2, -10, -2], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Zzz...
          </motion.div>
        </div>
      ) : pose === 'kiss' || pose === 'hug' ? (
        <div className="relative w-40 h-28 flex items-center justify-center">
          {/* Hugging / kissing couple */}
          <div className="w-20 h-24 -mr-3 transform -rotate-6 z-0">
            <SingleBearSvg color="#FFFFFF" earColor="#FFD1DC" blushColor="#FFB3C6" pose={pose} />
          </div>
          <div className="w-20 h-24 -ml-3 transform rotate-6 z-10">
            <SingleBearSvg color="#8D5B4C" earColor="#D7A99C" blushColor="#FF8DA1" pose={pose} isDark />
          </div>
          {/* Popping hearts between them */}
          <motion.div
            className="absolute -top-2 text-rose-500 text-xl"
            animate={{ scale: [0.8, 1.3, 0.8], y: [0, -6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            💖
          </motion.div>
        </div>
      ) : (
        <div className="relative w-36 h-28 flex items-center justify-center">
          <div className="w-18 h-24">
            <SingleBearSvg color="#FFFFFF" earColor="#FFD1DC" blushColor="#FFB3C6" pose={pose} />
          </div>
          <div className="w-18 h-24 -ml-2">
            <SingleBearSvg color="#8D5B4C" earColor="#D7A99C" blushColor="#FF8DA1" pose={pose} isDark />
          </div>
        </div>
      )}
    </div>
  );
};

