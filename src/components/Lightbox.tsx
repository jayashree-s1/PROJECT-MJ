import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  src: string;
  caption: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  src,
  caption,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-3xl max-h-[85vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {src ? (
            <img
              src={src}
              alt={caption}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
          ) : (
            <div className="w-80 h-80 bg-rose-950/80 rounded-2xl border-2 border-dashed border-rose-500/50 flex flex-col items-center justify-center p-6 text-center text-rose-200">
              <Heart className="w-12 h-12 text-rose-400 mb-3 fill-rose-500/20" />
              <p className="font-serif text-lg font-medium">{caption}</p>
              <p className="text-xs text-rose-300/80 mt-2">
                Empty frame placeholder. You can drop a photo here in edit mode or config.ts!
              </p>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-white font-serif text-lg sm:text-xl font-medium">
              {caption}
            </p>
            <p className="text-rose-300 text-xs mt-1 font-sans">
              With all my love for Baby 💕
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

