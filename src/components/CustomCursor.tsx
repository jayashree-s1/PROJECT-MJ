import React, { useEffect, useState, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface TapHeart {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(true);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [tapHearts, setTapHearts] = useState<TapHeart[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    setIsPointerDevice(!isTouchOnly);

    if (!isTouchOnly) {
      const handleMouseMove = (e: MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY });

        // Spawn a trailing sparkle occasionally
        counterRef.current++;
        if (counterRef.current % 3 === 0) {
          const colors = ['#E63B60', '#FFA3B5', '#E8B35A', '#FFD1DC'];
          const newSparkle: Sparkle = {
            id: Date.now() + Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 12,
            y: e.clientY + (Math.random() - 0.5) * 12,
            size: Math.random() * 5 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
          };
          setSparkles((prev) => [...prev.slice(-14), newSparkle]);
        }
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const clickable = target.closest('button, a, input, [role="button"], .cursor-pointer');
        setIsHovered(Boolean(clickable));
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseover', handleMouseOver, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseover', handleMouseOver);
      };
    }
  }, []);

  // Mobile tap hearts
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        const newHeart: TapHeart = {
          id: Date.now() + Math.random(),
          x: touch.clientX,
          y: touch.clientY,
        };
        setTapHearts((prev) => [...prev.slice(-8), newHeart]);

        setTimeout(() => {
          setTapHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
        }, 1200);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, []);

  // Clean up sparkles
  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = setTimeout(() => {
      setSparkles((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timer);
  }, [sparkles]);

  return (
    <>
      {/* Desktop Heart Cursor */}
      {isPointerDevice && (
        <>
          <div
            className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out select-none"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.35 : 1})`,
            }}
          >
            <div className="relative">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#E63B60"
                stroke="#FFF0F3"
                strokeWidth="1.5"
                className="drop-shadow-md filter drop-shadow-[0_2px_4px_rgba(230,59,96,0.4)]"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          {/* Sparkle Trail */}
          {sparkles.map((sp) => (
            <div
              key={sp.id}
              className="fixed pointer-events-none z-[9998] rounded-full animate-ping select-none"
              style={{
                left: `${sp.x}px`,
                top: `${sp.y}px`,
                width: `${sp.size}px`,
                height: `${sp.size}px`,
                backgroundColor: sp.color,
                opacity: 0.75,
              }}
            />
          ))}
        </>
      )}

      {/* Mobile Floating Tap Hearts */}
      {tapHearts.map((th) => (
        <div
          key={th.id}
          className="fixed pointer-events-none z-[9999] select-none text-rose-500 font-bold transition-all duration-1000 ease-out"
          style={{
            left: `${th.x - 12}px`,
            top: `${th.y - 12}px`,
            animation: 'tapFloat 1.2s forwards ease-out',
          }}
        >
          <span className="text-xl">♥</span>
        </div>
      ))}

      <style>{`
        @keyframes tapFloat {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.6);
          }
          50% {
            opacity: 1;
            transform: translateY(-28px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-56px) scale(0.9);
          }
        }
      `}</style>
    </>
  );
};

