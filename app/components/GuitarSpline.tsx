// src/app/components/GuitarSpline.tsx
'use client';
import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';

const GuitarSpline: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const splineSceneUrl = 'https://prod.spline.design/6j-Q7nxkmFqoYOS9/scene.splinecode';

  const handleClick = (_e: any) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
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
