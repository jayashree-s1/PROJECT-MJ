import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BearGraphics } from '../bears/BearGraphics';
import { EditableText } from '../components/EditableText';

interface FinalSurpriseSectionProps {
  partnerName: string;
  quote: string;
  question: string;
  yesButtonText: string;
  noButtonText: string;
  successMessage: string;
  successSubmessage: string;
}

export const FinalSurpriseSection: React.FC<FinalSurpriseSectionProps> = ({
  partnerName,
  quote,
  question,
  yesButtonText,
  noButtonText,
  successMessage,
  successSubmessage,
}) => {
  const [hasSaidYes, setHasSaidYes] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);

  // Playfully dodge the "No" button
  const handleNoDodge = () => {
    const maxX = 130;
    const maxY = 80;
    const randomX = (Math.random() - 0.5) * 2 * maxX;
    const randomY = (Math.random() - 0.5) * 2 * maxY;
    setNoButtonPos({ x: randomX, y: randomY });
    setDodgeCount((prev) => prev + 1);
  };

  const handleYes = () => {
    setHasSaidYes(true);

    // Multi-stage confetti celebration
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E63B60', '#FFE4E8', '#E8B35A', '#FFCCD5'],
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#E63B60', '#FFE4E8', '#E8B35A', '#FFCCD5'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section
      id="final"
      className="relative min-h-[90vh] py-24 px-4 bg-gradient-to-b from-[#1A0A10] via-[#2D0D19] to-[#12050A] text-white flex flex-col justify-between items-center text-center overflow-hidden"
    >
      {/* Background Starry Twilight & Sunset Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-t from-rose-600/30 via-rose-500/10 to-transparent rounded-full blur-[100px]" />
        {/* Soft twinkling stars */}
        <div className="absolute top-12 left-1/5 text-yellow-200/60 text-lg animate-pulse">✦</div>
        <div className="absolute top-24 right-1/4 text-rose-300/60 text-sm animate-pulse" style={{ animationDelay: '1s' }}>♥</div>
        <div className="absolute bottom-1/3 left-1/6 text-yellow-100/50 text-xl animate-pulse" style={{ animationDelay: '2s' }}>★</div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto my-auto flex flex-col items-center">
        {/* Romantic Sunset Quote */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Sparkles className="w-6 h-6 text-gold mx-auto mb-3 animate-spin-slow" />
          <p className="font-serif text-lg sm:text-2xl text-rose-200 font-light italic leading-relaxed max-w-xl mx-auto">
            "<EditableText
              fieldKey="final_quote"
              defaultText={quote}
              multiline
            />"
          </p>
        </motion.div>

        {!hasSaidYes ? (
          /* The Big Question */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-rose-600/30 border border-rose-500/50 flex items-center justify-center mb-4 shadow-xl heart-glow">
              <Heart className="w-9 h-9 text-rose-400 fill-rose-500 animate-heartbeat" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              <EditableText
                fieldKey="final_question"
                defaultText={question}
              />
            </h2>

            {/* Yes and Dodging No Buttons */}
            <div className="relative flex items-center justify-center space-x-6 min-h-[90px]">
              {/* YES BUTTON */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-9 py-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white font-bold text-base sm:text-xl shadow-2xl hover:shadow-rose-500/60 border-2 border-white/60 transition-all flex items-center space-x-2 heart-glow z-20 cursor-pointer"
              >
                <span>{yesButtonText}</span>
                <Heart className="w-5 h-5 fill-white animate-pulse" />
              </motion.button>

              {/* DODGING NO BUTTON */}
              <motion.button
                animate={{
                  x: noButtonPos.x,
                  y: noButtonPos.y,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                onMouseEnter={handleNoDodge}
                onTouchStart={handleNoDodge}
                onClick={handleNoDodge}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 text-sm font-semibold border border-white/20 backdrop-blur-md transition-colors select-none cursor-pointer"
              >
                {dodgeCount > 3 ? "Wait, try again! 🙈" : noButtonText}
              </motion.button>
            </div>

            {dodgeCount > 0 && (
              <p className="text-xs text-rose-300/80 font-sans mt-4 animate-pulse">
                (Hehe, you can't say no to me, {partnerName}! 💕)
              </p>
            )}
          </motion.div>
        ) : (
          /* Success Celebration Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            {/* The Bear Couple Hugging and Kissing */}
            <div className="w-56 h-36 mb-6">
              <BearGraphics type="couple" pose="hug" className="w-full h-full" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-rose-300 mb-3 tracking-wide">
              <EditableText
                fieldKey="final_success_message"
                defaultText={successMessage}
              />
            </h2>
            <div className="font-sans text-rose-100 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              <EditableText
                fieldKey="final_success_submessage"
                defaultText={successSubmessage}
                multiline
              />
            </div>

            <div className="mt-8 inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-200 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Happy 1st Anniversary, my beloved {partnerName}</span>
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Romantic Footer */}
      <footer className="relative z-10 pt-16 pb-6 text-center border-t border-rose-900/30 w-full max-w-4xl mx-auto">
        <p className="font-serif text-base sm:text-lg text-rose-200/90 font-medium tracking-wide">
          Made with all my love, for my {partnerName} 💕
        </p>
        <p className="text-xs text-rose-400/70 font-sans mt-1">
          Forever & Always • 1st Love Anniversary
        </p>
      </footer>
    </section>
  );
};

