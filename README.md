# 💕 Happy 1st Anniversary, Baby!

A complete, production-quality, mobile-first romantic anniversary website built as a magical surprise gift for **Baby** celebrating your **FIRST love anniversary**.

It feels cinematic, magical, and interactive, featuring:
- **Two Cute Roaming Bear Characters** (a White Bear and a Brown Bear couple) that walk along edges, hop, react to mouse and touch, follow cursor, count with timers, dance to music, cry happy tears during love letters, sleep together under a starry blanket, and hug & kiss!
- **Interactive 3D Visuals** powered by Three.js (React Three Fiber & Drei): floating glossy 3D hearts, fluttering rose petal rain, and mouse / phone tilt gyroscope parallax.
- **10 Storytelling Sections**:
  1. **Envelope Gate (Intro)**: Red gingham background, wax seal that cracks on tap, 3D letter slide-out, confetti burst, and music unlock.
  2. **Hero (3D)**: Parallax 3D heart scene, romantic title for Baby, glowing heart-shaped empty photo frame, and glass feature strip.
  3. **Time Together Counter**: Real-time ticking counter (Days, Hours, Minutes, Seconds) since your start date, plus next anniversary countdown pill.
  4. **Our Love Story (Timeline)**: Horizontal on desktop, vertical on mobile, with dotted line, heart nodes, and 5 customizable milestones with empty rounded photo slots.
  5. **Cinematic Gallery**: Dark wine theme with blurred rose glow, a 3D-tilting polaroid carousel with handwritten captions, and a 15-frame wooden memory wall with fullscreen lightbox.
  6. **Video Memory**: Cinema-style film-strip player with empty frame and play button.
  7. **Love Letters**: 3 pink envelopes with rose accents that unfold into paper-textured letters with a typewriter reveal effect.
  8. **Tap-to-Discover Shelf**: Cozy wooden shelf with a Vinyl Record (opens music), Vintage Camera (opens gallery), and Bouquet of Roses (opens "10 Reasons I Love You, Baby" flip-card deck).
  9. **Our Song**: Vinyl turntable player with spinning record, album-art frame, animated waveform visualizer, progress seek, and romantic chime synthesizer fallback when no mp3 is provided.
  10. **Final Surprise**: Twilight sunset question "Will you be mine forever, Baby?", a playful dodging "No" button, fullscreen confetti celebration upon pressing "YES", and the two bears hugging & kissing in the center!

---

## 🎨 Easy Customization Guide

All configuration is centralized in **`src/config.ts`**. You can customize every piece of text, date, milestone, letter, and reason in just this one file!

### 1. Change Partner Name & Dates
In `src/config.ts`:
```typescript
export const defaultConfig: AnniversaryConfig = {
  partnerName: "Baby", // Always calls him "Baby"
  startDate: "2023-11-11", // Your relationship start date (YYYY-MM-DD)
  anniversaryDate: "2024-11-11", // Your anniversary date
  // ...
};
```

### 2. How to Add Photos & Videos (Empty Frames)
By default, **every photo and video frame is an elegant empty placeholder** with a soft heart icon and `"Add your photo here"` so you can add media whenever you're ready!

You have **two easy ways** to add media:

#### Option A: Live In-Browser Upload (Edit Mode)
1. Open the website with `?edit=true` at the end of the URL:
   ```
   http://localhost:5173/?edit=true
   ```
2. Click directly on **any empty photo frame** or video box.
3. Select an image or video from your phone or computer. It will immediately preview and stay saved in your browser!
4. To reset, click the "Clear uploads" button in the bottom left badge.

#### Option B: Put Files in `/public/media/`
1. Copy your photos and videos into the `public/media/` folder (e.g., `hero.jpg`, `story1.jpg`, `fav-video.mp4`, `our-song.mp3`).
2. Update the paths in `src/config.ts`:
   ```typescript
   hero: {
     heroPhoto: "/media/hero.jpg",
   },
   milestones: [
     { id: "milestone-1", title: "First Met", photo: "/media/story1.jpg", ... },
   ],
   videoMemory: {
     videoSrc: "/media/fav-video.mp4",
   },
   ourSong: {
     songSrc: "/media/our-song.mp3",
   }
   ```

### 3. Adding Your Own Bear PNG Sprites (Optional)
If you have cut-out transparent PNGs for the cartoon bear couple, place them in `public/assets/bears/`:
- `hug.png`
- `kiss.png`
- `heart.png`
- `cry.png`
- `sleep.png`
- `read.png`
- `popcorn.png`
- `blush.png`
- `wave.png`
- `dance.png`

> **Note:** If any PNG is missing, the website automatically falls back to the built-in animated **SVG White Bear & Brown Bear couple** with charming expressions, blushing cheeks, and props!

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Run Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```
The optimized production output will be generated in the `dist/` directory.

---

## 🌐 Free 1-Click Deployment (Netlify or Vercel)

You can deploy this site in under 2 minutes and share a private link with Baby:

### Option 1: Netlify Drop (Fastest, No Git required)
1. Run `npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder into the Netlify window.
4. Your romantic site is live immediately with a free HTTPS URL to send him!

### Option 2: Vercel or GitHub
1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Framework preset: **Vite**.
4. Click **Deploy**. Vercel will automatically build and provide a custom URL!

---

## 📱 Mobile-First Performance & Features
- Built for 60fps on mobile phones (iPhone & Android).
- Gyroscope 3D parallax on phone tilt (with iOS permission button).
- Tap-spawned floating hearts on touch screens.
- Heart cursor with sparkling particle trail on desktop.
- Web Audio API romantic music box chord synthesis when no MP3 is supplied, ensuring soothing music always plays.
- Respects `prefers-reduced-motion` and automatically adapts particle count for low-end devices.

