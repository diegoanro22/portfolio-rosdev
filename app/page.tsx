// app/page.tsx
"use client";
import React from "react";
import Particles from "@/app/components/Particles/Particles";
import GuitarSpline from "@/app/components/GuitarSpline";
import SplitText from "@/app/components/SplitText/SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Fondo de partículas */}
      <div className="absolute inset-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <SplitText
        text="Hello, GSAP!"
        className="text-2xl font-semibold text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />

      {/* Contenido centrado: caja 16:9 responsive */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <GuitarSpline />
        </div>
      </div>
    </div>
  );
}
