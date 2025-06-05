// app/page.tsx
"use client";

import React from "react";
import Particles from "@/app/components/Particles/Particles";
import Navbar from "../components/Navbar";
import HomeMain from "../components/Home";
import AboutMe from "../components/AboutMe";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen  overflow-x-hidden bg-black">
      {/* 1) Fondo de partículas */}
      <div className="fixed inset-0 pointer-events-none ">
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

      {/* 2) Navbar sin posicionamiento */}
      <div className="mt-5">
        <Navbar />
      </div>

      {/* 3) Contenido principal en scroll normal */}
      <main className="flex flex-col">
        <HomeMain />
        <AboutMe />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
