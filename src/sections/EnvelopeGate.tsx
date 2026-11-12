import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BearGraphics } from '../bears/BearGraphics';

interface EnvelopeGateProps {
  partnerName: string;
  onOpen: () => void;
}

export const EnvelopeGate: React.FC<EnvelopeGateProps> = ({
  partnerName,
  onOpen,
}) => {
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);
  const [sealCracked, setSealCracked] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);

  const handleOpen = () => {
    if (isOpenAnimation) return;

    setSealCracked(true);

    // Burst confetti and hearts
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#E63B60', '#FFE4E8', '#E8B35A', '#FFB3C6'],
    });

    setTimeout(() => {
      setIsOpenAnimation(true);
    }, 350);

    // Show full readable letter modal after envelope opens
    setTimeout(() => {
      setShowFullLetter(true);
    }, 1100);
  };

  const handleEnterSite = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E63B60', '#FFE4E8', '#E8B35A'],
    });
    onOpen();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gingham-red p-4 select-none overflow-hidden">
      {/* Soft romantic vignette overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />

      {/* Floating sparkles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 text-white/40 text-2xl animate-pulse">✦</div>
        <div className="absolute top-1/3 right-1/5 text-rose-200/50 text-xl animate-pulse">♥</div>
        <div className="absolute bottom-1/4 left-1/4 text-yellow-100/50 text-3xl animate-pulse">✦</div>
        <div className="absolute bottom-1/3 right-1/4 text-white/40 text-xl animate-pulse">♥</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 sm:mb-8 z-10"
      >
        <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-medium border border-white/30 shadow-md mb-3">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>A Surprise Anniversary Gift</span>
        </span>
        <h1 className="font-script text-4xl sm:text-6xl md:text-7xl text-white drop-shadow-lg tracking-wide">
          Happy 1st Anniversary, {partnerName}
        </h1>
        <p className="text-rose-100/90 text-sm sm:text-base font-sans mt-2 tracking-wide font-light">
          A magical love letter created just for you
        </p>
      </motion.div>

      {/* 3D Envelope Container */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative w-80 sm:w-96 h-52 sm:h-60 z-10 [perspective:1000px]"
      >
        {/* Envelope Body */}
        <div className="relative w-full h-full bg-[#FFF9F3] rounded-2xl shadow-2xl border border-rose-200/60 overflow-visible flex flex-col justify-end items-center pb-6">
          {/* Envelope Pocket Lines */}
          <div className="absolute inset-0 bg-[#FFF3EB] rounded-2xl border-t border-rose-200/50 [clip-path:polygon(0_0,50%_45%,100%_0,100%_100%,0_100%)] z-10" />

          {/* Letter sliding out */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isOpenAnimation ? -130 : 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute top-2 w-[88%] h-44 bg-white rounded-xl shadow-lg border border-rose-100 p-4 flex flex-col items-center justify-center text-center z-5"
          >
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500 mb-2 animate-heartbeat" />
            <p className="font-serif text-base sm:text-lg font-bold text-rose-950">
              For My {partnerName}
            </p>
            <p className="text-xs text-rose-700/80 mt-1 font-script text-xl">
              Our 1 Year Together
            </p>
          </motion.div>

          {/* Envelope Triangular Flap */}
          <motion.div
            animate={{
              rotateX: isOpenAnimation ? -170 : 0,
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top center' }}
            className="absolute top-0 left-0 w-full h-28 bg-[#FFF9F3] border-b border-rose-200 [clip-path:polygon(0_0,50%_100%,100%_0)] shadow-sm z-20"
          />

          {/* Red Wax Seal with Heart Emblem - Mathematically Centered */}
          <motion.div
            animate={{
              y: isOpenAnimation ? -100 : 0,
              scale: sealCracked ? [1, 1.25, 0.2] : 1,
              opacity: sealCracked ? [1, 1, 0] : 1,
            }}
            transition={{ duration: 0.45 }}
            className="absolute top-[44%] left-1/2 -ml-8 -mt-8 w-16 h-16 rounded-full wax-seal flex items-center justify-center z-30 cursor-pointer group shadow-xl"
            onClick={handleOpen}
          >
            <div className="w-12 h-12 rounded-full border border-rose-200/40 flex items-center justify-center">
              <Heart className="w-7 h-7 text-white fill-white drop-shadow-md group-hover:scale-110 transition-transform" />
            </div>
          </motion.div>

          {/* Open Button Pill */}
          {!isOpenAnimation && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="relative z-30 px-8 py-3 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white font-semibold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:shadow-rose-500/50 border border-white/40 flex items-center space-x-2 transition-all mt-auto cursor-pointer"
            >
              <span>Open Letter</span>
              <Heart className="w-4 h-4 fill-white animate-pulse" />
            </motion.button>
          )}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-rose-100/80 mt-6 z-10 flex items-center space-x-1 font-sans"
      >
        <span>♪ Tap to begin with background music</span>
      </motion.p>

      {/* Down-right corner companion bears on the gate */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-2 right-2 sm:bottom-4 sm:right-5 z-20 flex flex-col items-end pointer-events-none"
      >
        <div className="bg-white/95 text-rose-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md border border-rose-200 mb-1">
          Tap to open, Baby! 💕
        </div>
        <div className="flex items-end -space-x-2">
          <div className="w-14 h-16 sm:w-16 sm:h-18">
            <BearGraphics type="white" pose="wave" className="w-full h-full drop-shadow-md" />
          </div>
          <div className="w-14 h-16 sm:w-16 sm:h-18">
            <BearGraphics type="brown" pose="heart" direction="left" className="w-full h-full drop-shadow-md" />
          </div>
        </div>
      </motion.div>

      {/* Readable Letter Modal when envelope opens */}
      <AnimatePresence>
        {showFullLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overscroll-contain"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg paper-texture rounded-3xl p-6 sm:p-9 shadow-2xl border border-amber-200/80 max-h-[85vh] overflow-y-auto text-gray-800 touch-pan-y overscroll-contain"
            >
              {/* Header */}
              <div className="text-center pb-4 mb-4 border-b border-rose-200/60">
                <div className="w-12 h-12 rounded-full wax-seal mx-auto flex items-center justify-center shadow-md mb-2">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950">
                  To My Beloved {partnerName} 💕
                </h2>
                <p className="font-script text-xl sm:text-2xl text-rose-600 mt-1">
                  Happy 1st Anniversary, My Love!
                </p>
              </div>

              {/* Letter Content */}
              <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-gray-800">
                <p>
                  Today marks <strong>365 days of us</strong> — 365 days of endless smiles, warm hugs, overcoming misunderstandings, and realizing more and more every day how much you mean to me.
                </p>
                <p>
                  From the moment our story started at college, you brought a warmth and happiness into my life that I never knew existed. Thank you for always loving me, understanding me, making efforts for us, and being my favorite person in the entire world.
                </p>
                <p>
                  I created this special website just for you, filled with our memories, milestones, love letters, and keepsakes.
                </p>
                <p className="font-medium text-rose-900">
                  Are you ready to explore our magical journey together? ❤️
                </p>
              </div>

              {/* Signature & Enter Button */}
              <div className="mt-6 pt-4 border-t border-rose-200/60 flex flex-col items-center">
                <p className="font-script text-2xl text-rose-600 mb-4">
                  Forever and always yours, Baby 💕
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnterSite}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white font-bold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-rose-500/50 flex items-center justify-center space-x-2 cursor-pointer heart-glow"
                >
                  <span>Explore Our Journey Together</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
