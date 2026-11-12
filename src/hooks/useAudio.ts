import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { defaultConfig } from '../config';

class ChimeSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private gainNode: GainNode | null = null;

  // Romantic music box notes: C4, E4, G4, B4, C5, D5, E5, G5
  private notes = [261.63, 329.63, 392.0, 493.88, 523.25, 587.33, 659.25, 783.99];
  private melody = [0, 2, 4, 2, 1, 3, 5, 3, 2, 4, 6, 4, 3, 5, 7, 5];
  private step = 0;

  start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
      this.isPlaying = true;
      this.playNext();
    } catch (e) {
      console.warn("AudioContext init error:", e);
    }
  }

  private playNext = () => {
    if (!this.isPlaying || !this.ctx || !this.gainNode) return;
    try {
      const freq = this.notes[this.melody[this.step % this.melody.length]];
      this.step++;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0, this.ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.25);

      this.timer = window.setTimeout(this.playNext, 750);
    } catch {
      // ignore
    }
  };

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        this.ctx.close();
      } catch {
        // ignore
      }
    }
    this.ctx = null;
  }
}

export function useAudio(songSrc?: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const howlRef = useRef<Howl | null>(null);
  const synthRef = useRef<ChimeSynthesizer | null>(null);
  const isAudioFile = Boolean(songSrc && songSrc.trim() !== "");

  useEffect(() => {
    if (isAudioFile && songSrc) {
      const sound = new Howl({
        src: [songSrc],
        html5: true,
        loop: true,
        volume: 0.7,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
        onload: () => setDuration(sound.duration()),
      });
      howlRef.current = sound;

      return () => {
        sound.unload();
      };
    } else {
      synthRef.current = new ChimeSynthesizer();
      return () => {
        synthRef.current?.stop();
      };
    }
  }, [songSrc, isAudioFile]);

  // Track seek position
  useEffect(() => {
    let animId: number;
    const updateSeek = () => {
      if (howlRef.current && isPlaying) {
        const cur = (howlRef.current.seek() as number) || 0;
        setSeek(cur);
        const dur = howlRef.current.duration();
        if (dur && dur > 0) {
          setDuration(dur);
        }
      }
      animId = requestAnimationFrame(updateSeek);
    };

    if (isPlaying && isAudioFile) {
      animId = requestAnimationFrame(updateSeek);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isAudioFile]);

  const seekTo = useCallback((seconds: number) => {
    if (isAudioFile && howlRef.current) {
      howlRef.current.seek(seconds);
      setSeek(seconds);
    }
  }, [isAudioFile]);

  const play = useCallback(() => {
    if (isAudioFile && howlRef.current) {
      howlRef.current.play();
      setIsPlaying(true);
    } else if (synthRef.current) {
      synthRef.current.start();
      setIsPlaying(true);
    }
  }, [isAudioFile]);

  const pause = useCallback(() => {
    if (isAudioFile && howlRef.current) {
      howlRef.current.pause();
    } else if (synthRef.current) {
      synthRef.current.stop();
    }
    setIsPlaying(false);
  }, [isAudioFile]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return {
    isPlaying,
    isMuted,
    duration,
    seek,
    play,
    pause,
    toggle,
    seekTo,
    isSynthesized: !isAudioFile,
  };
}

