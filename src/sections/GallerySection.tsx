import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { PolaroidCard } from '../components/PolaroidCard';
import { EmptyFrame } from '../components/EmptyFrame';
import { Lightbox } from '../components/Lightbox';

interface GallerySectionProps {
  partnerName: string;
  polaroids: {
    id: string;
    caption: string;
    photo: string;
    rotation?: number;
  }[];
  gridPhotos: {
    id: string;
    caption: string;
    photo: string;
  }[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  partnerName,
  polaroids,
  gridPhotos,
}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeLightbox, setActiveLightbox] = useState<{
    isOpen: boolean;
    src: string;
    caption: string;
  }>({
    isOpen: false,
    src: '',
    caption: '',
  });

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % polaroids.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + polaroids.length) % polaroids.length);
  };

  return (
    <section
      id="gallery"
      className="relative py-24 px-4 bg-darkWine text-white overflow-hidden"
    >
      {/* Blurred romantic rose glow background gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-rose-600/30 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-deepRed/40 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs sm:text-sm font-semibold border border-rose-500/30 mb-3">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Cinematic Memories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide">
            A Gallery Full of Love
          </h2>
          <p className="font-sans text-rose-200/80 text-sm sm:text-base">
            Every snapshot captured with you, {partnerName}, is a timeless piece of art.
          </p>
        </div>

        {/* 1. 3D Tilting Polaroid Carousel */}
        <div className="relative max-w-xl mx-auto mb-20 px-4">
          <div className="flex items-center justify-between mb-4 text-xs text-rose-300/80">
            <span>Polaroid Moments</span>
            <span>
              {carouselIndex + 1} of {polaroids.length}
            </span>
          </div>

          <div className="relative w-full flex items-center justify-center min-h-[380px] sm:min-h-[420px]">
            {polaroids.map((p, idx) => {
              const isActive = idx === carouselIndex;
              const isPrev = idx === (carouselIndex - 1 + polaroids.length) % polaroids.length;
              const isNext = idx === (carouselIndex + 1) % polaroids.length;

              if (!isActive && !isPrev && !isNext) return null;

              return (
                <motion.div
                  key={p.id}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.45,
                    scale: isActive ? 1 : 0.85,
                    x: isActive ? 0 : isPrev ? -120 : 120,
                    zIndex: isActive ? 20 : 10,
                    rotate: isActive ? (p.rotation || 0) : isPrev ? -8 : 8,
                  }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute w-72 sm:w-80"
                  onClick={() => {
                    if (isActive) {
                      if (p.photo) {
                        setActiveLightbox({
                          isOpen: true,
                          src: p.photo,
                          caption: p.caption,
                        });
                      }
                    } else if (isPrev) {
                      handlePrev();
                    } else if (isNext) {
                      handleNext();
                    }
                  }}
                >
                  <PolaroidCard
                    id={p.id}
                    caption={p.caption}
                    photo={p.photo}
                    rotation={p.rotation}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-center space-x-6 mt-6">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all active:scale-95 border border-white/10 shadow-lg"
              title="Previous Polaroid"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-rose-300 font-sans tracking-widest uppercase">
              Swipe or tap cards
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all active:scale-95 border border-white/10 shadow-lg"
              title="Next Polaroid"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Wooden Frame Photo Grid (15 slots) */}
        <div className="mt-16 pt-10 border-t border-rose-900/40">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Our Memory Wall
              </h3>
              <p className="text-xs sm:text-sm text-rose-300/70 mt-1">
                15 curated photo spots ready for our special moments, {partnerName}.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              15 Frames
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
            {gridPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="group relative cursor-pointer"
                onClick={() => {
                  if (photo.photo) {
                    setActiveLightbox({
                      isOpen: true,
                      src: photo.photo,
                      caption: photo.caption,
                    });
                  }
                }}
              >
                {/* Elegant Wooden Frame border effect */}
                <div className="p-2 bg-gradient-to-br from-[#4A2818] via-[#2F170D] to-[#1E0D06] rounded-xl shadow-lg border border-[#8D5B4C]/40 group-hover:border-rose-400/60 transition-all duration-300 group-hover:-translate-y-1">
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-black/40">
                    <EmptyFrame
                      id={photo.id}
                      src={photo.photo}
                      alt={photo.caption}
                      aspectRatio="square"
                      shape="rounded"
                      placeholderText={photo.caption}
                    />
                  </div>
                  <div className="pt-1.5 px-0.5 text-center truncate">
                    <span className="text-[10px] text-rose-200/80 font-sans tracking-wide truncate">
                      {photo.caption}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={activeLightbox.isOpen}
        src={activeLightbox.src}
        caption={activeLightbox.caption}
        onClose={() => setActiveLightbox((prev) => ({ ...prev, isOpen: false }))}
      />
    </section>
  );
};

