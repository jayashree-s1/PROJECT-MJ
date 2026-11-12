import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import { EditableText } from './EditableText';

interface ReasonsFlipDeckProps {
  reasons: string[];
  partnerName?: string;
  onClose?: () => void;
}

export const ReasonsFlipDeck: React.FC<ReasonsFlipDeckProps> = ({
  reasons,
  partnerName = 'Baby',
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % reasons.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
  };

  const currentReason = reasons[currentIndex] || "Because you are you, Baby 💕";

  return (
    <div className="w-full max-w-md mx-auto p-4 select-none">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-rose-500 animate-spin-slow" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-rose-900">
            10 Reasons I Love You, {partnerName}
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
          {currentIndex + 1} / {reasons.length}
        </span>
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="w-full h-64 sm:h-72 cursor-pointer [perspective:1000px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="relative w-full h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d] shadow-xl"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Front of Card */}
          <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-gradient-to-br from-rose-500 via-rose-600 to-deepRed text-white flex flex-col items-center justify-between border-2 border-rose-300/40 [backface-visibility:hidden]">
            <div className="w-full flex justify-between items-center text-xs text-rose-200">
              <span>Card #{currentIndex + 1}</span>
              <span>Tap to reveal 💕</span>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                <Heart className="w-9 h-9 text-white fill-white animate-heartbeat" />
              </div>
              <p className="font-script text-3xl text-rose-100">
                Reason #{currentIndex + 1}
              </p>
            </div>

            <p className="text-xs text-rose-200/90 tracking-wide font-sans">
              Click or tap to flip card
            </p>
          </div>

          {/* Back of Card (The Reason) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-white flex flex-col items-center justify-between border-2 border-rose-200 text-rose-950 [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-xl">
            <div className="w-full flex justify-between items-center text-xs text-rose-400">
              <span className="font-semibold">Reason #{currentIndex + 1}</span>
              <RotateCcw className="w-4 h-4 text-rose-400" />
            </div>

            <div className="my-auto px-2 text-center w-full">
              <p className="font-serif text-lg sm:text-xl font-medium leading-relaxed text-gray-800">
                "<EditableText
                  fieldKey={`reason_${currentIndex}`}
                  defaultText={currentReason}
                  multiline
                />"
              </p>
            </div>

            <div className="flex items-center space-x-1 text-xs text-rose-500 font-medium">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>For my Baby with all my love</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-5 px-2">
        <button
          type="button"
          onClick={handlePrev}
          className="flex items-center space-x-1 px-4 py-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 text-sm font-semibold transition-colors active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="text-xs text-rose-600 font-medium underline underline-offset-4 hover:text-rose-800"
        >
          {isFlipped ? "Flip back" : "Flip card"}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="flex items-center space-x-1 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-md transition-colors active:scale-95"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

