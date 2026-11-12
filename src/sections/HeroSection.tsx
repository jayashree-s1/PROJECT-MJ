import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown, Compass, BookOpen, Image as ImageIcon, Mail, Clock, Music } from 'lucide-react';
import { HeroScene } from '../three/HeroScene';
import { EmptyFrame } from '../components/EmptyFrame';
import { EditableText } from '../components/EditableText';
import { useGyroscope } from '../hooks/useGyroscope';

interface HeroSectionProps {
  partnerName: string;
  title: string;
  subtitle: string;
  ctaText: string;
  heroPhoto: string;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  partnerName,
  title,
  subtitle,
  ctaText,
  heroPhoto,
  onNavigate,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const gyro = useGyroscope();

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-between pt-16 sm:pt-20 pb-10 px-4 overflow-hidden bg-gradient-to-b from-[#FFF0F3] via-[#FFE4E8] to-[#FFF6F0]"
    >
      {/* 3D Scene Background */}
      <HeroScene mousePos={mousePos} gyro={{ gamma: gyro.gamma, beta: gyro.beta }} />

      {/* Gyroscope permission prompt for iOS if supported but not granted */}
      {gyro.supported && !gyro.permissionGranted && (
        <div className="absolute top-4 left-4 z-30">
          <button
            type="button"
            onClick={() => gyro.requestPermission()}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md text-rose-800 text-xs font-medium border border-rose-200 shadow-sm"
          >
            <Compass className="w-3.5 h-3.5 text-rose-500 animate-spin-slow" />
            <span>Enable tilt 3D</span>
          </button>
        </div>
      )}

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center my-auto">
        {/* Soft floating pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-rose-700 text-xs sm:text-sm font-semibold border border-rose-200/80 shadow-md mb-4"
        >
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span>Our 1st Anniversary Special</span>
        </motion.div>

        {/* Big Romantic Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-rose-950 tracking-tight leading-tight max-w-2xl"
        >
          <EditableText
            fieldKey="hero_title"
            defaultText={title}
            as="h1"
          />
        </motion.div>

        {/* Romantic Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-sans text-rose-800/80 text-sm sm:text-lg md:text-xl font-medium mt-3 max-w-xl"
        >
          "<EditableText
            fieldKey="hero_subtitle"
            defaultText={subtitle}
            multiline
            as="span"
          />"
        </motion.div>

        {/* Floating Heart-Shaped Big Empty Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative my-7 sm:my-9 animate-float"
        >
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 p-3 rounded-full bg-gradient-to-tr from-rose-400 via-rose-500 to-gold shadow-2xl heart-glow">
            <div className="w-full h-full rounded-full bg-white p-2 flex items-center justify-center overflow-hidden">
              <EmptyFrame
                id="hero-photo"
                src={heroPhoto}
                alt={`Photo of us, for ${partnerName}`}
                shape="circle"
                aspectRatio="square"
                className="w-full h-full shadow-inner"
                placeholderText="Add our hero photo here, Baby 💕"
              />
            </div>
          </div>

          {/* Sparkles around photo frame */}
          <div className="absolute -top-3 -right-2 text-gold text-2xl animate-spin-slow">✦</div>
          <div className="absolute -bottom-2 -left-2 text-rose-400 text-xl animate-pulse">♥</div>
        </motion.div>

        {/* Explore Journey CTA button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('counter')}
          className="px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-rose-400/50 flex items-center space-x-2 transition-all active:scale-95 group"
        >
          <span>{ctaText}</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </div>

      {/* Glass Feature Strip Below Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 w-full max-w-2xl mx-auto mt-6"
      >
        <div className="glass-card rounded-2xl p-2.5 sm:p-3 shadow-lg flex items-center justify-around text-rose-900 border border-white/80">
          <button
            type="button"
            onClick={() => onNavigate('story')}
            className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-white/60 transition-colors"
          >
            <BookOpen className="w-5 h-5 text-rose-600" />
            <span className="text-[11px] font-semibold">Love Story</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('gallery')}
            className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-white/60 transition-colors"
          >
            <ImageIcon className="w-5 h-5 text-rose-600" />
            <span className="text-[11px] font-semibold">Gallery</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('letters')}
            className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-white/60 transition-colors"
          >
            <Mail className="w-5 h-5 text-rose-600" />
            <span className="text-[11px] font-semibold">Love Notes</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('counter')}
            className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-white/60 transition-colors"
          >
            <Clock className="w-5 h-5 text-rose-600" />
            <span className="text-[11px] font-semibold">Countdown</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('song')}
            className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-white/60 transition-colors"
          >
            <Music className="w-5 h-5 text-rose-600" />
            <span className="text-[11px] font-semibold">Our Song</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

