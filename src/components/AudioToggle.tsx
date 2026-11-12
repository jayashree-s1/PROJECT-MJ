import React from 'react';
import { Music, Volume2, VolumeX, Disc } from 'lucide-react';

interface AudioToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
  songTitle?: string;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({
  isPlaying,
  onToggle,
  songTitle = 'Our Song',
}) => {
  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        type="button"
        onClick={onToggle}
        className="group flex items-center space-x-2.5 px-3.5 py-2 rounded-full bg-white/80 hover:bg-white text-rose-900 shadow-lg border border-rose-200/80 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
        title={isPlaying ? "Pause music" : "Play romantic music"}
      >
        <div className={`relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
          <Disc className="w-5 h-5 text-rose-600" />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
            </span>
          )}
        </div>

        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] text-rose-500 font-semibold uppercase tracking-wider">
            {isPlaying ? "Playing for Baby" : "Music"}
          </span>
          <span className="text-xs font-bold text-rose-950 truncate max-w-[100px]">
            {songTitle}
          </span>
        </div>

        <div className="text-rose-600">
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
        </div>
      </button>
    </div>
  );
};

