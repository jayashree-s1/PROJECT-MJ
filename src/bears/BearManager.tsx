import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BearGraphics, BearPose } from './BearGraphics';

const CUTE_SPEECHES = [
  "I love you, Baby! 💕",
  "He's the best! ✨",
  "Tap me! 🥰",
  "Happy 1 Year Together!",
  "Baby is my favourite 🐻",
  "Forever and always! 💖",
  "Snuggle time? 🥺",
  "You make every day magic!",
  "Big bear hugs for Baby! 🧸",
];

export const BearManager: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const [isBottom, setIsBottom] = useState(false);
  const [whitePose, setWhitePose] = useState<BearPose>('wave');
  const [brownPose, setBrownPose] = useState<BearPose>('heart');
  const [speech, setSpeech] = useState<string | null>("Happy 1st Anniversary, Baby! 💕");
  const [speechOwner, setSpeechOwner] = useState<'white' | 'brown'>('white');
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; offset: number }[]>([]);
  const [isCoupleUnited, setIsCoupleUnited] = useState(false);

  // Track scroll position to check if we're at the very bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const atBottom = docHeight - scrollPos < 140;
      setIsBottom(atBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-based actions for the bottom-right bears
  useEffect(() => {
    if (isBottom) {
      setSpeech("Sleeping under the stars with Baby... ✨");
      return;
    }

    setIsCoupleUnited(false);

    switch (activeSection) {
      case 'hero':
        setWhitePose('wave');
        setBrownPose('heart');
        setSpeech("Happy 1st Anniversary, Baby! 💕");
        setSpeechOwner('white');
        break;
      case 'counter':
        setWhitePose('dance');
        setBrownPose('dance');
        setSpeech("Counting every second with you! ⏳");
        setSpeechOwner('brown');
        break;
      case 'story':
        setWhitePose('read');
        setBrownPose('read');
        setSpeech("Our beautiful journey 📖");
        setSpeechOwner('white');
        break;
      case 'gallery':
        setWhitePose('read');
        setBrownPose('blush');
        setSpeech("Look at our photos, Baby! 📸");
        setSpeechOwner('white');
        break;
      case 'video':
        setWhitePose('popcorn');
        setBrownPose('popcorn');
        setSpeech("Movie time with Baby! 🍿");
        setSpeechOwner('brown');
        break;
      case 'letters':
        setWhitePose('cry');
        setBrownPose('hug');
        setSpeech("Happy tears... so touching 💌");
        setSpeechOwner('white');
        break;
      case 'shelf':
        setWhitePose('heart');
        setBrownPose('wave');
        setSpeech("Tap the keepsakes! 🌹");
        setSpeechOwner('white');
        break;
      case 'song':
        setWhitePose('dance');
        setBrownPose('dance');
        setSpeech("Dancing to our song! 🎵");
        setSpeechOwner('brown');
        break;
      case 'final':
        setIsCoupleUnited(true);
        setSpeech("Forever and ever, Baby! 💍");
        setSpeechOwner('white');
        break;
      default:
        break;
    }
  }, [activeSection, isBottom]);

  // Idle actions cycle when standing together in the bottom-right corner
  useEffect(() => {
    if (isBottom || activeSection === 'final') return;

    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.25) {
        // Cuddle / Hug
        setWhitePose('hug');
        setBrownPose('hug');
        setSpeech("Snuggles for Baby 💕");
        setSpeechOwner('white');
      } else if (rand < 0.5) {
        // Kiss & Blush
        setWhitePose('kiss');
        setBrownPose('blush');
        setSpeech("Hehe, kisses! 💋");
        setSpeechOwner('white');
      } else if (rand < 0.75) {
        // Heart exchange
        setWhitePose('heart');
        setBrownPose('heart');
        setSpeech("You're the best, Baby! ✨");
        setSpeechOwner('brown');
      } else {
        // Dance together
        setWhitePose('dance');
        setBrownPose('wave');
        setSpeech("I love you so much! 🧸");
        setSpeechOwner('white');
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [isBottom, activeSection]);

  // Click / Tap reaction on White Bear
  const handleWhiteTap = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const poses: BearPose[] = ['blush', 'kiss', 'heart', 'dance', 'spin'];
    const chosenPose = poses[Math.floor(Math.random() * poses.length)];
    const chosenSpeech = CUTE_SPEECHES[Math.floor(Math.random() * CUTE_SPEECHES.length)];

    setWhitePose(chosenPose);
    setSpeech(chosenSpeech);
    setSpeechOwner('white');
    triggerHeartPop();

    // Brown bear reacts back with love
    setTimeout(() => {
      setBrownPose('kiss');
    }, 250);
  };

  // Click / Tap reaction on Brown Bear
  const handleBrownTap = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const poses: BearPose[] = ['kiss', 'heart', 'hug', 'blush', 'spin'];
    const chosenPose = poses[Math.floor(Math.random() * poses.length)];
    const chosenSpeech = CUTE_SPEECHES[Math.floor(Math.random() * CUTE_SPEECHES.length)];

    setBrownPose(chosenPose);
    setSpeech(chosenSpeech);
    setSpeechOwner('brown');
    triggerHeartPop();

    // White bear reacts back with blush
    setTimeout(() => {
      setWhitePose('blush');
    }, 250);
  };

  const triggerHeartPop = () => {
    const id = Date.now() + Math.random();
    const offset = (Math.random() - 0.5) * 60;
    setFloatingHearts((prev) => [...prev, { id, offset }]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((item) => item.id !== id));
    }, 1500);
  };

  return (
    <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-5 z-50 pointer-events-none select-none">
      {/* Floating Heart Pop Particles */}
      {floatingHearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 1, scale: 0.6, y: 0, x: h.offset }}
          animate={{ opacity: 0, scale: 1.5, y: -90, x: h.offset * 1.4 }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
          className="absolute top-0 right-16 text-2xl text-rose-500 pointer-events-none select-none"
        >
          💖
        </motion.div>
      ))}

      {/* Speech Bubble floating directly above the couple in the bottom right corner */}
      <AnimatePresence>
        {speech && (
          <motion.div
            key={speech}
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute -top-12 sm:-top-14 ${
              speechOwner === 'white' ? 'right-12 sm:right-16' : 'right-2 sm:right-4'
            } max-w-[220px] whitespace-nowrap bg-white/95 text-rose-900 text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-2xl shadow-xl border border-rose-200/90 pointer-events-none flex items-center space-x-1.5`}
          >
            <span>{speech}</span>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white/95 rotate-45 border-r border-b border-rose-200/90" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Bears Station in the Bottom Right Corner */}
      <div className="relative flex items-end pointer-events-auto">
        {isBottom ? (
          /* When scrolled to bottom: sleeping couple under starry blanket */
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerHeartPop}
            className="cursor-pointer"
          >
            <BearGraphics type="couple" pose="sleep" className="w-36 h-28 sm:w-44 sm:h-32" />
          </motion.div>
        ) : isCoupleUnited ? (
          /* Final surprise hug & kiss couple */
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerHeartPop}
            className="cursor-pointer"
          >
            <BearGraphics type="couple" pose="hug" className="w-36 h-28 sm:w-44 sm:h-32" />
          </motion.div>
        ) : (
          /* Two Bears Side-by-Side in Corner */
          <div className="flex items-end -space-x-2 sm:-space-x-3 bg-white/30 backdrop-blur-[2px] p-1.5 pb-0 rounded-2xl border border-rose-200/40 shadow-sm hover:shadow-md transition-all">
            {/* White Bear (Left) */}
            <motion.div
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleWhiteTap}
              className="w-16 h-18 sm:w-20 sm:h-22 cursor-pointer touch-none"
              title="White Bear (Tap me!)"
            >
              <BearGraphics
                type="white"
                pose={whitePose}
                direction="right"
                className="w-full h-full drop-shadow-md"
              />
            </motion.div>

            {/* Brown Bear (Right) */}
            <motion.div
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleBrownTap}
              className="w-16 h-18 sm:w-20 sm:h-22 cursor-pointer touch-none"
              title="Brown Bear (Tap me!)"
            >
              <BearGraphics
                type="brown"
                pose={brownPose}
                direction="left"
                className="w-full h-full drop-shadow-md"
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
