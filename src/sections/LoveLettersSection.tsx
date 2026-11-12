import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, X, ChevronRight } from 'lucide-react';
import { Letter } from '../config';
import { EditableText } from '../components/EditableText';

interface LoveLettersSectionProps {
  partnerName: string;
  letters: Letter[];
}

export const LoveLettersSection: React.FC<LoveLettersSectionProps> = ({
  partnerName,
  letters,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  // Typewriter effect when a letter is opened
  useEffect(() => {
    if (!selectedLetter) {
      setTypewriterIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setTypewriterIndex((prev) => {
        if (prev < selectedLetter.content.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [selectedLetter]);

  return (
    <section id="letters" className="relative py-24 px-4 bg-[#FFF5F7] overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold mb-3">
            <Mail className="w-4 h-4 text-rose-600" />
            <span>Little Messages, Big Emotions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-rose-950 mb-3">
            Love Letters For My {partnerName}
          </h2>
          <p className="font-sans text-rose-800/80 text-sm sm:text-base">
            Words straight from my heart to yours on our first anniversary.
          </p>
        </div>

        {/* 3 Pink Envelopes Decorated with Roses */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-16">
          {letters.map((letter, idx) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedLetter(letter)}
              className="relative bg-gradient-to-br from-[#FFE4E8] via-[#FFCCD5] to-[#FFA3B5] p-6 rounded-3xl shadow-xl border border-rose-200 cursor-pointer group flex flex-col justify-between min-h-[220px]"
            >
              {/* Decorative rose icons */}
              <div className="absolute top-3 right-3 text-rose-500/80 text-lg group-hover:rotate-12 transition-transform">
                🌹
              </div>
              <div className="absolute bottom-3 left-3 text-rose-400/60 text-sm">
                🌸
              </div>

              {/* Envelope flap aesthetic */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-rose-300/50">
                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-widest">
                  {letter.sealLabel}
                </span>
                <Heart className="w-4 h-4 text-rose-600 fill-rose-500/20 group-hover:scale-125 transition-transform" />
              </div>

              {/* Title & Preview */}
              <div className="my-auto py-2">
                <h3 className="font-serif text-xl font-bold text-rose-950 group-hover:text-rose-700 transition-colors">
                  {letter.title}
                </h3>
                <p className="text-xs text-rose-800/70 font-sans mt-2 line-clamp-2">
                  "My Dearest {partnerName}, {letter.content[1] || ''}"
                </p>
              </div>

              {/* Read button */}
              <div className="flex items-center space-x-1 text-xs font-semibold text-rose-800 group-hover:text-rose-950 mt-2">
                <span>Unfold letter</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Romantic Quote Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-8 text-center shadow-lg border border-rose-200"
        >
          <Sparkles className="w-6 h-6 text-gold mx-auto mb-3 animate-spin-slow" />
          <p className="font-serif text-lg sm:text-2xl text-rose-950 font-medium italic leading-relaxed">
            "You make my world brighter, my heart happier, and my life more beautiful."
          </p>
          <p className="font-script text-2xl sm:text-3xl text-rose-600 mt-3">
            Always & Forever Yours
          </p>
        </motion.div>
      </div>

      {/* Unfolded Letter Modal with Paper Texture & Typewriter Effect */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overscroll-contain"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[85vh] paper-texture rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto overscroll-contain border border-amber-200/60 touch-pan-y"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedLetter(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="border-b border-rose-200/60 pb-4 mb-6">
                <span className="text-xs font-semibold text-rose-600 uppercase tracking-widest">
                  {selectedLetter.sealLabel}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 mt-1">
                  <EditableText
                    fieldKey={`letter_title_${selectedLetter.id}`}
                    defaultText={selectedLetter.title}
                  />
                </h3>
              </div>

              {/* Letter Body with Typewriter reveal and In-Browser Editing */}
              <div className="space-y-4 font-serif text-gray-800 leading-relaxed text-sm sm:text-base">
                {selectedLetter.content.map((paragraph, index) => {
                  const isVisible = index <= typewriterIndex;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                      transition={{ duration: 0.4 }}
                      className={`${index === 0 ? 'font-bold text-rose-950 text-lg' : ''}`}
                    >
                      <EditableText
                        fieldKey={`letter_content_${selectedLetter.id}_${index}`}
                        defaultText={paragraph}
                        multiline
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Romantic Signature */}
              <div className="mt-8 pt-4 border-t border-rose-200/60 flex items-center justify-between">
                <div>
                  <p className="font-script text-3xl text-rose-600">
                    With all my love,
                  </p>
                  <p className="font-sans text-xs text-gray-500 mt-1">
                    To my one and only {partnerName}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full wax-seal flex items-center justify-center shadow-md">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

