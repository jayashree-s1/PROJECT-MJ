import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { defaultConfig, isEditMode, clearCustomMedia } from './config';
import { EnvelopeGate } from './sections/EnvelopeGate';
import { HeroSection } from './sections/HeroSection';
import { TimeCounterSection } from './sections/TimeCounterSection';
import { LoveStorySection } from './sections/LoveStorySection';
import { GallerySection } from './sections/GallerySection';
import { VideoMemorySection } from './sections/VideoMemorySection';
import { LoveLettersSection } from './sections/LoveLettersSection';
import { DiscoverShelfSection } from './sections/DiscoverShelfSection';
import { OurSongSection } from './sections/OurSongSection';
import { FinalSurpriseSection } from './sections/FinalSurpriseSection';
import { SectionDivider } from './components/SectionDivider';
import { CustomCursor } from './components/CustomCursor';
import { AudioToggle } from './components/AudioToggle';
import { BearManager } from './bears/BearManager';
import { useAudio } from './hooks/useAudio';
import { CuteLoader } from './components/CuteLoader';

export const App: React.FC = () => {
  const [config] = useState(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [editMode, setEditMode] = useState(false);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  // Audio setup: Background loop music (Stay with me) + Dedicated favourite song for Vinyl Player (Aaruyire)
  const bgAudio = useAudio(config.backgroundMusic.songSrc);
  const favouriteSongAudio = useAudio(config.ourSong.songSrc);

  const handleToggleFavouriteSong = () => {
    if (favouriteSongAudio.isPlaying) {
      favouriteSongAudio.pause();
    } else {
      if (bgAudio.isPlaying) {
        bgAudio.pause();
      }
      favouriteSongAudio.play();
    }
  };

  const handleToggleTopAudio = () => {
    if (favouriteSongAudio.isPlaying) {
      favouriteSongAudio.pause();
    } else if (bgAudio.isPlaying) {
      bgAudio.pause();
    } else {
      bgAudio.play();
    }
  };

  // Initial loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll with Lenis
  useEffect(() => {
    setEditMode(isEditMode());

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    // Track active section for BearManager reactions
    const handleScroll = () => {
      const sections = ['hero', 'counter', 'story', 'gallery', 'video', 'letters', 'shelf', 'song', 'final'];
      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenGate = () => {
    setHasEntered(true);
    // Start background ambient music
    if (config.musicEnabled) {
      bgAudio.play();
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (lenisInstance) {
        lenisInstance.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF6F0] selection:bg-rose-300 selection:text-rose-950">
      {/* Custom Heart Cursor & Mobile Tap Sparkles */}
      <CustomCursor />

      {/* Floating Two Roaming Cartoon Bears */}
      {hasEntered && <BearManager activeSection={activeSection} />}

      {/* Floating Audio Toggle Button */}
      {hasEntered && (
        <AudioToggle
          isPlaying={favouriteSongAudio.isPlaying || bgAudio.isPlaying}
          onToggle={handleToggleTopAudio}
          songTitle={favouriteSongAudio.isPlaying ? config.ourSong.title : config.backgroundMusic.title}
        />
      )}

      {/* Initial Cute Bear Loader */}
      {isLoading && <CuteLoader />}

      {/* 3.1 ENVELOPE GATE (Intro) */}
      {!hasEntered && (
        <EnvelopeGate
          partnerName={config.partnerName}
          onOpen={handleOpenGate}
        />
      )}

      {/* MAIN SITE CONTENT */}
      <main className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* 3.2 HERO (3D) */}
        <HeroSection
          partnerName={config.partnerName}
          title={config.hero.title}
          subtitle={config.hero.subtitle}
          ctaText={config.hero.ctaText}
          heroPhoto={config.hero.heroPhoto}
          onNavigate={scrollToSection}
        />

        {/* Section Divider: Hero to Counter */}
        <SectionDivider fillColor="#FFE4E8" variant="wave1" />

        {/* 3.3 TIME TOGETHER COUNTER */}
        <TimeCounterSection
          partnerName={config.partnerName}
          startDate={config.startDate}
          anniversaryDate={config.anniversaryDate}
        />

        {/* Section Divider: Counter to Love Story */}
        <SectionDivider fillColor="#FFF9F5" variant="wave2" />

        {/* 3.4 OUR LOVE STORY (Timeline) */}
        <LoveStorySection
          partnerName={config.partnerName}
          milestones={config.milestones}
        />

        {/* Section Divider: Story to Dark Cinematic Gallery */}
        <SectionDivider fillColor="#1A0A10" variant="curve" />

        {/* 3.5 GALLERY (Dark Cinematic Section) */}
        <GallerySection
          partnerName={config.partnerName}
          polaroids={config.gallery.polaroids}
          gridPhotos={config.gallery.gridPhotos}
        />

        {/* Section Divider: Gallery to Video Memory */}
        <SectionDivider fillColor="#FFF0F3" variant="wave1" />

        {/* 3.6 VIDEO MEMORY */}
        <VideoMemorySection
          partnerName={config.partnerName}
          videoSrc={config.videoMemory.videoSrc}
          title={config.videoMemory.title}
          subtitle={config.videoMemory.subtitle}
          caption={config.videoMemory.caption}
          onPlay={() => {
            if (bgAudio.isPlaying) bgAudio.pause();
            if (favouriteSongAudio.isPlaying) favouriteSongAudio.pause();
          }}
        />

        {/* Section Divider: Video to Love Letters */}
        <SectionDivider fillColor="#FFF5F7" variant="wave2" />

        {/* 3.7 LOVE LETTERS */}
        <LoveLettersSection
          partnerName={config.partnerName}
          letters={config.letters}
        />

        {/* Section Divider: Letters to Discover Shelf */}
        <SectionDivider fillColor="#FFF0E6" variant="curve" />

        {/* 3.8 TAP-TO-DISCOVER OBJECTS */}
        <DiscoverShelfSection
          partnerName={config.partnerName}
          reasons={config.reasons}
          onOpenMusic={() => scrollToSection('song')}
          onOpenGallery={() => scrollToSection('gallery')}
        />

        {/* Section Divider: Shelf to Our Song */}
        <SectionDivider fillColor="#FFE8EC" variant="wave1" />

        {/* 3.9 OUR SONG */}
        <OurSongSection
          partnerName={config.partnerName}
          songTitle={config.ourSong.title}
          artist={config.ourSong.artist}
          albumArt={config.ourSong.albumArt}
          quote={config.ourSong.quote}
          isPlaying={favouriteSongAudio.isPlaying}
          onTogglePlay={handleToggleFavouriteSong}
          seek={favouriteSongAudio.seek}
          duration={favouriteSongAudio.duration}
          isSynthesized={favouriteSongAudio.isSynthesized}
          onSeek={favouriteSongAudio.seekTo}
        />

        {/* Section Divider: Song to Final Surprise */}
        <SectionDivider fillColor="#1A0A10" variant="wave2" />

        {/* 3.10 FINAL SURPRISE & FOOTER */}
        <FinalSurpriseSection
          partnerName={config.partnerName}
          quote={config.finalSurprise.quote}
          question={config.finalSurprise.question}
          yesButtonText={config.finalSurprise.yesButtonText}
          noButtonText={config.finalSurprise.noButtonText}
          successMessage={config.finalSurprise.successMessage}
          successSubmessage={config.finalSurprise.successSubmessage}
        />
      </main>
    </div>
  );
};
export default App;

