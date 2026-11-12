/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: '#FFE4E8',
        rose: {
          DEFAULT: '#E63B60',
          50: '#FFF0F3',
          100: '#FFE4E8',
          200: '#FFCCD5',
          300: '#FFA3B5',
          400: '#F76B8A',
          500: '#E63B60',
          600: '#C72448',
          700: '#A31936',
          800: '#8B1E2D',
          900: '#5E0F1B',
        },
        deepRed: '#8B1E2D',
        cream: '#FFF6F0',
        gold: '#E8B35A',
        darkWine: '#1A0A10',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Quicksand"', '"Poppins"', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.12)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

