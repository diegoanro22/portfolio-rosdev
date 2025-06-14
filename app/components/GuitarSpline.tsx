// src/app/components/GuitarSpline.tsx
'use client';
import React from 'react';
import Spline from '@splinetool/react-spline';
import { useAudio } from '@/app/contexts/AudioContext';

interface GuitarSplineProps {
  onGuitarClick?: () => void;
}

const GuitarSpline: React.FC<GuitarSplineProps> = ({ onGuitarClick }) => {
  const { audioRef } = useAudio();
  const splineSceneUrl = 'https://prod.spline.design/6j-Q7nxkmFqoYOS9/scene.splinecode';

  const handleClick = () => {
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
    <div className="relative w-full h-0 pb-[100%] md:pb-[56.25%]">
      {/* 
        - pb-[75%] aplicará 75% de padding-bottom (ratio 4:3 aproximadamente)
          en pantallas pequeñas (por defecto).
        - md:pb-[56.25%] anula ese padding-bottom a partir de pantallas >= 768px,
          volviendo a ratio 16:9.
      */}
      <div className="absolute inset-0">
        <Spline scene={splineSceneUrl} onMouseDown={handleClick} />
      </div>
    </div>
  );
};

export default GuitarSpline;
