import React, { useState, useRef } from 'react';
import { Play, Pause, Film } from 'lucide-react';

interface VideoMemorySectionProps {
  partnerName: string;
  videoSrc?: string;
  title: string;
  subtitle: string;
  caption: string;
  onPlay?: () => void;
}

export const VideoMemorySection: React.FC<VideoMemorySectionProps> = ({
  partnerName,
  videoSrc = '',
  title,
  subtitle,
  caption,
  onPlay,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(videoSrc && videoSrc.trim() !== '');

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      onPlay?.();
    }
  };

  return (
    <section id="video" className="relative py-20 px-4 bg-[#FFF0F3] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-200 text-rose-800 text-xs sm:text-sm font-semibold mb-3">
          <Film className="w-4 h-4 text-rose-600" />
          <span>Cinematic Reel</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-rose-950 mb-2">
          {title}
        </h2>
        <p className="font-sans text-rose-800/80 text-sm sm:text-base max-w-lg mx-auto mb-10">
          {subtitle}
        </p>

        {/* Cinema Film Strip Frame */}
        <div className="relative max-w-2xl mx-auto bg-black p-3 sm:p-5 rounded-3xl shadow-2xl border-4 border-rose-900/60 overflow-hidden">
          {/* Top Film Strip Perforations */}
          <div className="w-full flex justify-between space-x-2 pb-3 px-1 border-b border-gray-800">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-4 h-3 bg-gray-900 rounded-sm border border-gray-700/60" />
            ))}
          </div>

          {/* Video Screen Area */}
          <div className="relative w-full aspect-video bg-gray-950 rounded-xl overflow-hidden my-3 flex items-center justify-center">
            {hasVideo ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="w-full h-full object-contain"
                  loop
                  playsInline
                  controls={isPlaying}
                  onPlay={() => {
                    setIsPlaying(true);
                    onPlay?.();
                  }}
                  onPause={() => setIsPlaying(false)}
                />
                {/* Overlay play button when paused */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-rose-600/95 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 ml-1 fill-white" />
                    </div>
                  </button>
                )}
              </div>
            ) : (
              /* Soft empty placeholder */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-rose-950/60 via-darkWine/80 to-black select-none">
                <div className="w-16 h-16 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-3 shadow-lg">
                  <Play className="w-8 h-8 ml-1 text-rose-300" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1">
                  Our Favourite Moment, {partnerName}
                </h4>
                <p className="text-xs text-rose-300/80 font-sans max-w-xs">
                  A special cinematic moment with you 💕
                </p>
              </div>
            )}
          </div>

          {/* Bottom Film Strip Perforations */}
          <div className="w-full flex justify-between space-x-2 pt-3 px-1 border-t border-gray-800">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-4 h-3 bg-gray-900 rounded-sm border border-gray-700/60" />
            ))}
          </div>
        </div>

        {/* Caption */}
        <p className="font-handwriting text-2xl sm:text-3xl text-rose-950 font-bold mt-6 tracking-wide">
          "{caption}"
        </p>
      </div>
    </section>
  );
};
