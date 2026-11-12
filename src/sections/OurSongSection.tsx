import React from 'react';
import { motion } from 'framer-motion';
import { Disc, Play, Pause, Music, Heart, Volume2, Sparkles } from 'lucide-react';
import { EmptyFrame } from '../components/EmptyFrame';

interface OurSongSectionProps {
  partnerName: string;
  songTitle: string;
  artist: string;
  albumArt: string;
  quote: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  seek: number;
  duration: number;
  isSynthesized: boolean;
  onSeek?: (seconds: number) => void;
}

export const OurSongSection: React.FC<OurSongSectionProps> = ({
  partnerName,
  songTitle,
  artist,
  albumArt,
  quote,
  isPlaying,
  onTogglePlay,
  seek,
  duration,
  isSynthesized,
  onSeek,
}) => {
  const progressPercent = duration > 0 ? Math.min(100, (seek / duration) * 100) : isPlaying ? 50 : 0;

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek || !duration || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(fraction * duration);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="song" className="relative py-24 px-4 bg-[#FFE8EC] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-rose-200 text-rose-800 text-xs sm:text-sm font-semibold mb-3">
          <Music className="w-4 h-4 text-rose-600" />
          <span>Our Soundtrack</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-rose-950 mb-3">
          Our Special Song, {partnerName}
        </h2>
        <p className="font-sans text-rose-800/80 text-sm sm:text-base max-w-lg mx-auto mb-14">
          "{quote}"
        </p>

        {/* Vinyl Player Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-rose-200/80 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-10">
          {/* Spinning Vinyl Record with Album Art Center */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0">
            {/* Vinyl Base */}
            <div
              className={`w-full h-full rounded-full bg-[#120509] p-3 shadow-2xl vinyl-grooves border-4 border-rose-950 flex items-center justify-center ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              {/* Album art frame in center */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-amber-300 shadow-md bg-white">
                <EmptyFrame
                  id="album-art"
                  src={albumArt}
                  alt={songTitle}
                  shape="circle"
                  aspectRatio="square"
                  className="w-full h-full"
                  placeholderText="Album art"
                />
              </div>
            </div>

            {/* Turntable needle styling */}
            <div
              className={`absolute -top-3 -right-2 w-14 h-14 pointer-events-none transition-transform duration-500 origin-top-right ${
                isPlaying ? 'rotate-12' : '-rotate-12'
              }`}
            >
              <div className="w-1.5 h-12 bg-amber-400 rounded-full shadow-md ml-auto" />
            </div>
          </div>

          {/* Player Details & Controls */}
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest">
              {isSynthesized ? "Romantic Ambient Melody" : "Our Favourite Song 💕"}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              {songTitle}
            </h3>
            <p className="text-sm font-medium text-rose-700/80 mt-0.5">
              {artist}
            </p>

            {/* Simulated Animated Waveform */}
            <div className="w-full flex items-center justify-center md:justify-start space-x-1 sm:space-x-1.5 h-10 my-4 px-2">
              {[40, 75, 55, 90, 60, 30, 85, 100, 45, 70, 95, 65, 35, 80, 50, 60].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-rose-500 animate-pulse' : 'bg-rose-200'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * (i % 2 === 0 ? 0.9 : 1.2)) % 100)}%` : '20%',
                    animationDelay: `${(i * 0.1).toFixed(2)}s`,
                  }}
                />
              ))}
            </div>

            {/* Progress Bar (Clickable) */}
            <div className="w-full mb-3">
              <div
                onClick={handleProgressBarClick}
                className="w-full h-3 bg-rose-100 rounded-full overflow-hidden cursor-pointer relative flex items-center group/bar"
                title={duration > 0 ? "Click to seek" : undefined}
              >
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-200 relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>{formatTime(seek)}</span>
                <span>{isSynthesized ? "∞" : formatTime(duration)}</span>
              </div>
            </div>

            {/* Play/Pause Button */}
            <div className="flex items-center space-x-4 mt-2">
              <button
                type="button"
                onClick={onTogglePlay}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white flex items-center justify-center shadow-lg hover:shadow-rose-400/50 transition-all active:scale-95 group"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white ml-1" />
                )}
              </button>

              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800">
                  {isPlaying ? "Now Playing" : "Tap to Play"}
                </p>
                <p className="text-[11px] text-rose-500">
                  Dedicated to my Baby 💕
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

