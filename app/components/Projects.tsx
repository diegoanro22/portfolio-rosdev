// /components/Projects.tsx
"use client"

import React, { useEffect } from "react"
import DecryptedText from "./DecryptedText/DecryptedText"
import { proyectos } from "@/app/utils/Projects"
import AccordionProject from "./AccordionProject"

export default function Projects() {
  // “Reveal on scroll” para los elementos con clase .reveal
   useEffect(() => {
      // 1) Seleccionamos todos los elementos con clase 'reveal'
      const reveals = document.querySelectorAll<HTMLElement>(".reveal");
      if (reveals.length === 0) return;
  
      // 2) Creamos el IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Si entra en el 30% del viewport, agregamos .visible
              entry.target.classList.add("visible");
            } else {
              // Si sale (menos del 30%), removemos .visible
              entry.target.classList.remove("visible");
            }
          });
        },
        { threshold: 0.3 } // 30% visible
      );
  
      // 3) Observamos cada elemento con clase .reveal
      reveals.forEach((el) => observer.observe(el));
  
      // 4) Al desmontar, dejamos de observar
      return () => {
        reveals.forEach((el) => observer.unobserve(el));
      };
    }, []);

  return (
    <section id="projects" className="py-16">
      {/* Título “Mis Proyectos” */}
      <div className="reveal text-5xl text-white font-bold font-share-tech mb-8 text-center">
        <DecryptedText text="Mis Proyectos" />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <AccordionProject items={proyectos} />
      </div>
    </section>
  )
}
