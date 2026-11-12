// Central configuration file for Anniversary Website
// Permanently baked with your photos and love letters for Baby!

export interface Milestone {
  id: string;
  title: string;
  date: string;
  description: string;
  photo: string;
}

export interface Letter {
  id: string;
  title: string;
  sealLabel: string;
  content: string[];
}

export interface AnniversaryConfig {
  partnerName: string;
  anniversaryYear: number;
  startDate: string;
  anniversaryDate: string;

  hero: {
    title: string;
    subtitle: string;
    heroPhoto: string;
    ctaText: string;
  };

  milestones: Milestone[];

  gallery: {
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
  };

  videoMemory: {
    title: string;
    subtitle: string;
    videoSrc: string;
    caption: string;
  };

  letters: Letter[];

  reasons: string[];

  ourSong: {
    title: string;
    artist: string;
    albumArt: string;
    songSrc: string;
    quote: string;
  };

  backgroundMusic: {
    title: string;
    songSrc: string;
  };

  finalSurprise: {
    quote: string;
    question: string;
    yesButtonText: string;
    noButtonText: string;
    successMessage: string;
    successSubmessage: string;
  };

  musicEnabled: boolean;
}

export const defaultConfig: AnniversaryConfig = {
  partnerName: "Baby",
  anniversaryYear: 1,
  startDate: "2025-11-14",
  anniversaryDate: "2026-11-14",

  hero: {
    title: "To My Baby, Happy 1 Year Together",
    subtitle: "Every single moment with you is a gift I cherish with all my heart.",
    heroPhoto: "/media/hero-photo.jpg",
    ctaText: "Explore Our Journey",
  },

  milestones: [
    {
      id: "milestone-1",
      title: "First Met",
      date: "September 14, 2025",
      description: "The unforgettable day our paths crossed and my whole world lit up with your smile.",
      photo: "/media/milestone-1.jpg",
    },
    {
      id: "milestone-2",
      title: "Started as friends",
      date: "September 27, 2025",
      description: "This song has a special place in my heart. This is where our first convo starts.\nI never wanted the day to end.",
      photo: "/media/milestone-2.jpg",
    },
    {
      id: "milestone-3",
      title: "Fell in Love",
      date: "November 14, 2025",
      description: "The moment I looked into your eyes and knew you were the one my heart had waited for.",
      photo: "/media/milestone-3.jpg",
    },
    {
      id: "milestone-4",
      title: "Our Favourite Memory",
      date: "March 22, 2026",
      description: "Underneath the warm summer stars, whispering our dreams and holding hands tight.",
      photo: "/media/milestone-4.jpg",
    },
    {
      id: "milestone-5",
      title: "First Anniversary",
      date: "November 29, 2025",
      description: "365 days of laughter, cuddles, and growing closer every day. Here is to forever, Baby!",
      photo: "/media/milestone-5.jpg",
    },
  ],

  gallery: {
    polaroids: [
      { id: "pol-1", caption: "Fst pic as BF", photo: "/media/pol-1.jpg", rotation: -3 },
      { id: "pol-2", caption: "Cool baby", photo: "/media/pol-2.jpg", rotation: 2 },
      { id: "pol-3", caption: "Handsome", photo: "/media/pol-3.jpg", rotation: -1.5 },
      { id: "pol-4", caption: "Sweetest Smile", photo: "/media/pol-4.jpg", rotation: 4 },
      { id: "pol-5", caption: "Favorite pic", photo: "/media/pol-5.jpg", rotation: -2.5 },
    ],
    gridPhotos: [
      { id: "grid-1", caption: "Matching dress", photo: "/media/grid-1.jpg" },
      { id: "grid-2", caption: "selfie with u", photo: "/media/grid-2.jpg" },
      { id: "grid-3", caption: "Random pic", photo: "/media/grid-3.jpg?v=2" },
      { id: "grid-4", caption: "Hackaton", photo: "/media/grid-4.jpg" },
      { id: "grid-5", caption: "Proposal day", photo: "/media/grid-5.jpg" },
      { id: "grid-6", caption: "seriously eating", photo: "/media/grid-6.jpg" },
      { id: "grid-7", caption: "Fst time mall", photo: "/media/grid-7.jpg" },
      { id: "grid-8", caption: "Hackaton night", photo: "/media/grid-8.jpg" },
      { id: "grid-9", caption: "Secret selfie", photo: "/media/grid-9.jpg" },
      { id: "grid-10", caption: "edited pic", photo: "/media/grid-10.jpg" },
      { id: "grid-11", caption: "Selfie taken", photo: "/media/grid-11.jpg" },
      { id: "grid-12", caption: "favourite pic", photo: "/media/grid-12.jpg" },
      { id: "grid-13", caption: "unforgettable moment", photo: "/media/grid-13.jpg" },
      { id: "grid-14", caption: "aestatic pic", photo: "/media/grid-14.jpg" },
      { id: "grid-15", caption: "best pic ever", photo: "/media/grid-15.jpg" },
    ],
  },

  videoMemory: {
    title: "Our Favourite Moment, Baby",
    subtitle: "A little clip of our endless joy together",
    videoSrc: "/media/our-favourite-moment.mp4",
    caption: "Every second spent with you feels like pure cinematic magic.",
  },

  letters: [
    {
      id: "letter-1",
      title: "How We Met & Began",
      sealLabel: "Chapter 1",
      content: [
        "My Dearest Baby,",
        "I still remember the day we first met. It's funny how an ordinary day at college turned into something so special without either of us knowing what was waiting ahead. I remember seeing you, the way you came up to me and introduced yourself. At that moment, I had no idea that the person standing in front of me would eventually become such an important part of my life. It was just a simple conversation, a little moment between two people, but today, when I look back, it feels like the beginning of my favourite story. I never knew that one random meeting would lead to so many memories, countless smiles, little fights, endless conversations, and a love that means so much to me. If I could go back to that day, I would live that moment all over again, because that's the day my story with you began. ❤️",
      ],
    },
    {
      id: "letter-2",
      title: "What I Love About You",
      sealLabel: "Chapter 2",
      content: [
        "My Dearest Baby,",
        "My dear baby, ❤️ We've been through so much together. We've faced so many problems, had countless arguments, and even reached a point where we almost broke up. There were days when I missed you more than I could express, days when I felt hurt, and moments when everything seemed difficult. But look at us now, no matter how many times we fight, we always find our way back to each other. We talk again, share everything, reassure each other, and slowly understand each other better. I love how we've become more open about our feelings, how we care, how we get possessive over each other, and how we've both changed so much for the sake of our relationship. I know we're not perfect, and we still have a lot to learn, but I genuinely love the way we're growing together. Thank you for choosing us, for trying, for understanding me, and for loving me even through the difficult days. I don't just love the happy moments with you; I love the journey we've been through to reach where we are today. I love you so much, baby. And no matter how many ups and downs come our way, I hope we never stop choosing each other. ❤️",
      ],
    },
    {
      id: "letter-3",
      title: "My Promise For Our Future",
      sealLabel: "Forever",
      content: [
        "My Dearest Baby,",
        "As we celebrate our first anniversary, my heart is overflowing with gratitude. 365 days of being loved by you has been the greatest blessing of my life.",
        "I promise to always hold your hand through life's storms, to celebrate every triumph with you, to remind you how special you are, and to love you more fiercely with every sunrise.",
        "Happy 1st Anniversary, my love. Forever and always yours.",
      ],
    },
  ],

  reasons: [
    "The way you love me – I love how you make me feel loved, wanted, and special in your own little ways.",
    "Your care – Even the smallest things you do to take care of me mean more than you know.",
    "Your possessiveness – I love how protective and possessive you get sometimes. It makes me feel special.",
    "Your reassurance – I love how you reassure me when I overthink and make me feel secure about us.",
    "Our endless conversations – I love how we can share almost everything, from serious things to the most random nonsense.",
    "Your efforts – I love how you've changed and made efforts for me and for our relationship.",
    "The way you handle me – Even when I'm moody, annoying, or emotional, you still try to understand me.",
    "Our bond – I love that even after so many fights and misunderstandings, we still find our way back to each other.",
    "The happiness you bring me – Even an ordinary day becomes special when I get to talk to you.",
    "Simply because you're YOU – I don't need a special reason to love you. I love your little habits, your imperfections, your silly side, and every little thing that makes you the person you are.",
  ],

  ourSong: {
    title: "Aaruyire",
    artist: "A.R. Rahman • Guru",
    albumArt: "/media/milestone-2.jpg",
    songSrc: "/media/our-song.mp3",
    quote: "This song has a special place in our hearts. Where our first conversation started.",
  },

  backgroundMusic: {
    title: "Stay with me",
    songSrc: "/media/background-music.mp3",
  },

  finalSurprise: {
    quote: "No matter where life takes us, I want to go there with you.",
    question: "Will you be mine forever, Baby?",
    yesButtonText: "YES 💖",
    noButtonText: "No 🙈",
    successMessage: "YAY! Forever and Always, Baby! 💖",
    successSubmessage: "You just made me the happiest person in the entire world. Happy 1st Anniversary!",
  },

  musicEnabled: true,
};

// Backward compatibility helpers
export function getCustomMediaMap(): Record<string, string> {
  return {};
}

export function saveCustomMedia(id: string, dataUrl: string) { }

export function clearCustomMedia() { }

export function getCustomTextMap(): Record<string, string> {
  return {};
}

export function saveCustomText(key: string, value: string) { }

export function clearAllCustomEdits() { }

export function isEditMode(): boolean {
  return false;
}

export function setEditModeActive(active: boolean) { }

export function exportAllCustomData(): string {
  return "{}";
}
