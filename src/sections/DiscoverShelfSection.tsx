import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Camera, Sparkles, X, Heart } from 'lucide-react';
import { ReasonsFlipDeck } from '../components/ReasonsFlipDeck';

interface DiscoverShelfSectionProps {
  partnerName: string;
  reasons: string[];
  onOpenMusic: () => void;
  onOpenGallery: () => void;
}

export const DiscoverShelfSection: React.FC<DiscoverShelfSectionProps> = ({
  partnerName,
  reasons,
  onOpenMusic,
  onOpenGallery,
}) => {
  const [showReasonsModal, setShowReasonsModal] = useState(false);

  return (
    <section id="shelf" className="relative py-24 px-4 bg-gradient-to-b from-[#FFF5F7] via-[#FFF0E6] to-[#FFE8EC] overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold mb-3">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>Interactive Keepsakes</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-rose-950 mb-3">
          Our Special Keepsake Shelf
        </h2>
        <p className="font-sans text-rose-800/80 text-sm sm:text-base max-w-lg mx-auto mb-16">
          Tap each magical object on our shelf to discover something special for you, {partnerName}!
        </p>

        {/* Cozy Wooden Shelf Display */}
        <div className="relative max-w-3xl mx-auto pt-8 pb-12 px-6">
          {/* Objects placed on shelf */}
          <div className="grid grid-cols-3 gap-4 sm:gap-10 items-end justify-center pb-2 relative z-10">
            {/* 1. Vinyl Record */}
            <motion.div
              whileHover={{ scale: 1.1, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenMusic}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#1A0A10] p-2 shadow-2xl border-2 border-rose-300/40 vinyl-grooves animate-float flex items-center justify-center">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-rose-500 border border-white/60 flex items-center justify-center shadow-inner group-hover:rotate-45 transition-transform duration-700">
                  <Disc className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-spin-slow" />
                </div>
                {/* Glowing ring */}
                <div className="absolute inset-0 rounded-full border border-rose-400/60 animate-ping opacity-25" />
              </div>
              <span className="mt-3 text-xs sm:text-sm font-bold text-rose-900 group-hover:text-rose-600 transition-colors">
                Vinyl Record 🎵
              </span>
              <span className="text-[10px] text-rose-600/70 font-sans">
                Our Song
              </span>
            </motion.div>

            {/* 2. Vintage Camera */}
            <motion.div
              whileHover={{ scale: 1.1, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenGallery}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className="relative w-24 h-20 sm:w-32 sm:h-28 rounded-2xl bg-gradient-to-br from-[#3D2314] via-[#2A150B] to-[#1A0A10] p-3 shadow-2xl border-2 border-[#8D5B4C] flex flex-col items-center justify-center animate-float"
                style={{ animationDelay: '1s' }}
              >
                {/* Lens */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-gray-900 via-gray-800 to-rose-950 border-2 border-amber-300/60 shadow-inner flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-950/80 border border-blue-400/50 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white group-hover:scale-125 transition-transform" />
                  </div>
                </div>
                {/* Flash unit */}
                <div className="absolute top-2 right-3 w-3 h-2 bg-amber-200 rounded-sm animate-pulse" />
              </div>
              <span className="mt-4 text-xs sm:text-sm font-bold text-rose-900 group-hover:text-rose-600 transition-colors">
                Vintage Camera 📸
              </span>
              <span className="text-[10px] text-rose-600/70 font-sans">
                Photo Gallery
              </span>
            </motion.div>

            {/* 3. Bouquet of Roses */}
            <motion.div
              whileHover={{ scale: 1.1, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReasonsModal(true)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-rose-100 to-rose-200 p-2 shadow-2xl border-2 border-rose-300 flex items-center justify-center animate-float text-4xl sm:text-5xl"
                style={{ animationDelay: '2s' }}
              >
                <div className="relative">
                  <span className="group-hover:scale-125 inline-block transition-transform duration-300">
                    🌹
                  </span>
                  <div className="absolute -top-2 -right-2 text-rose-500 text-xs sm:text-sm animate-ping">
                    ♥
                  </div>
                </div>
              </div>
              <span className="mt-3 text-xs sm:text-sm font-bold text-rose-900 group-hover:text-rose-600 transition-colors">
                Bouquet of Roses 💐
              </span>
              <span className="text-[10px] text-rose-600/70 font-sans">
                10 Reasons I Love You
              </span>
            </motion.div>
          </div>

          {/* Wooden Shelf Plank */}
          <div className="relative w-full h-5 sm:h-7 bg-gradient-to-r from-[#5C382E] via-[#8D5B4C] to-[#5C382E] rounded-full shadow-2xl border-t border-amber-200/40 z-0">
            {/* Shelf bottom depth shadow */}
            <div className="absolute -bottom-2 left-4 right-4 h-2 bg-black/20 rounded-full blur-sm" />
          </div>
        </div>
      </div>

      {/* Reasons I Love You Modal */}
      <AnimatePresence>
        {showReasonsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowReasonsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-gradient-to-b from-[#FFF5F7] to-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowReasonsModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <ReasonsFlipDeck
                reasons={reasons}
                partnerName={partnerName}
                onClose={() => setShowReasonsModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

