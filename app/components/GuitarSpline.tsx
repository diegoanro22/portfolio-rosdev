// src/app/components/GuitarSpline.tsx
'use client';
import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';

interface GuitarSplineProps {
  onGuitarClick?: () => void;
}

const GuitarSpline: React.FC<GuitarSplineProps> = ({ onGuitarClick }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const splineSceneUrl = 'https://prod.spline.design/6j-Q7nxkmFqoYOS9/scene.splinecode';

  const handleClick = (_e: any) => {
    // 1) Reproducimos el audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    // 2) Avisamos al padre que se hizo clic en la guitarra
    if (onGuitarClick) {
      onGuitarClick();
    }
  };

  return (
    <div className="relative w-full h-0 pb-[56.25%]">
      <div className="absolute inset-0">
        <Spline scene={splineSceneUrl} onMouseDown={handleClick} />
        <audio ref={audioRef} src="/sounds/fairy_fountain.mp3" preload="auto" />
      </div>
    </div>
  );
};

export default GuitarSpline;
