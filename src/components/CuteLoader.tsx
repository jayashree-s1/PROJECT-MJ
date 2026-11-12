import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { BearGraphics } from '../bears/BearGraphics';

export const CuteLoader: React.FC<{ progress?: number }> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-[#FFF0F3] via-[#FFE4E8] to-[#FFF6F0] flex flex-col items-center justify-center p-6 select-none">
      {/* Background soft glow */}
      <div className="absolute w-72 h-72 rounded-full bg-rose-300/30 blur-3xl pointer-events-none" />

      {/* Walking Bear with Heart */}
      <div className="relative flex flex-col items-center">
        {/* Little floating heart bobbing above */}
        <motion.div
          animate={{
            y: [-3, -14, -3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-rose-500 mb-2"
        >
          <Heart className="w-8 h-8 fill-rose-500 heart-glow" />
        </motion.div>

        {/* Animated Walking Bear */}
        <motion.div
          animate={{
            x: [-20, 20, -20],
            rotate: [-4, 4, -4],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-24 h-28"
        >
          <BearGraphics type="white" pose="walk" className="w-full h-full" />
        </motion.div>

        {/* Text */}
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-rose-950 mt-4 tracking-wide text-center">
          Preparing Something Magical For Baby...
        </h2>
        <p className="font-sans text-xs sm:text-sm text-rose-700/80 mt-1 font-medium">
          Wrapping our 1st Anniversary memories with love 💕
        </p>

        {/* Progress Bar */}
        <div className="w-48 sm:w-60 h-2 bg-rose-200/70 rounded-full mt-5 overflow-hidden p-0.5 border border-rose-300/40">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-400 rounded-full"
            initial={{ width: '10%' }}
            animate={{ width: progress !== undefined ? `${progress}%` : ['15%', '85%', '95%'] }}
            transition={{
              duration: 2.5,
              repeat: progress !== undefined ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
};

