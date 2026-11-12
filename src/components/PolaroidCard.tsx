import React, { useRef, useState } from 'react';
import { EmptyFrame } from './EmptyFrame';

interface PolaroidCardProps {
  id: string;
  caption: string;
  photo?: string;
  rotation?: number;
  className?: string;
  onClick?: () => void;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  id,
  caption,
  photo = '',
  rotation = 0,
  className = '',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (centerY - y) / 10;
    const tiltY = (x - centerX) / 10;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotate(${rotation}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.2s ease',
      }}
      className={`relative bg-[#FFFDFB] p-3 pb-5 rounded-sm shadow-xl hover:shadow-2xl border border-gray-100/80 cursor-pointer transform-gpu ${className}`}
    >
      {/* Washi tape on top */}
      <div className="tape-top" />

      {/* Photo area */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden rounded-sm border border-black/5">
        <EmptyFrame
          id={id}
          src={photo}
          alt={caption}
          aspectRatio="square"
          shape="polaroid"
          placeholderText={caption}
        />
      </div>

      {/* Handwritten caption */}
      <div className="pt-3.5 pb-1 text-center">
        <p className="font-handwriting text-xl sm:text-2xl text-rose-950 font-bold tracking-wide">
          {caption}
        </p>
      </div>
    </div>
  );
};

