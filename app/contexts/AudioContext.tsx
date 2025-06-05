// app/audio-context.tsx
'use client';

import React, { createContext, useContext, useRef, ReactNode } from "react";

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioContext = createContext<AudioContextType>({} as AudioContextType);


export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null) as React.RefObject<HTMLAudioElement>;

  return (
    <AudioContext.Provider value={{ audioRef }}>
      {children}
      <audio
        ref={audioRef}
        src="/sounds/fairy_fountain.mp3"
        preload="auto"
        style={{ display: "none" }}
      />
    </AudioContext.Provider>
  );
}

// Hook para consumir el AudioContext fácilmente
export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio debe usarse dentro de un <AudioProvider>");
  }
  return ctx;
}
