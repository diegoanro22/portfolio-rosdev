// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAudio } from './contexts/AudioContext';
import Particles from '@/app/components/Particles/Particles';
import GuitarSpline from '@/app/components/GuitarSpline';

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const { audioRef } = useAudio();

  useEffect(() => {
    if (!clicked) return;
    const timer = setTimeout(() => {
      router.push('/home');
    }, 3550);
    return () => clearTimeout(timer);
  }, [clicked, router]);

  const handleGuitarClick = () => {
    if (clicked) return;
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setClicked(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* ───────────────────────────────────────────────────────── */}
      {/* 1) Fondo de partículas */}
      <div className="absolute inset-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* 2) Guitarra Splines envuelta en un motion.div para animar su salida */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          // Inicial: guitarra en el centro, completamente opaca
          initial={{ y: 0, opacity: 1, scale: 1 }}
          // Si clicked === true, animamos: sube 600px, se desvanece y hace un pequeño zoom out
          animate={clicked ? { y: -600, opacity: 0, scale: 0.8 } : { y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 4, ease: 'easeInOut' }}
          className="w-full max-w-4xl h-auto pointer-events-auto"
        >
          <GuitarSpline onGuitarClick={handleGuitarClick} />
        </motion.div>
      </div>
    </div>
  );
}
