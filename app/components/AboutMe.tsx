// components/AboutMe.tsx
import React, { useEffect } from "react";
import DecryptedText from "./DecryptedText/DecryptedText";
import ImageProfile from "./ImageProfile";
import TechCard from "./TechCard"; 
import { techs, Tech } from "@/app/utils/Techs"; 


export default function AboutMe() {
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
    <section id="about" className="py-16 text-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        {/* -------------------------------------------------- */}
        {/* Título “Acerca de mí” con clase reveal */}
        {/* -------------------------------------------------- */}
        <div className="reveal text-5xl font-bold font-share-tech mb-8 text-center">
          <DecryptedText text="Acerca de mí" />
        </div>

        {/* -------------------------------------------------- */}
        {/* Flex container: imagen a la izquierda, texto a la derecha */}
        {/* -------------------------------------------------- */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          {/* Izquierda: la imagen envuelta en un div que aplica hover + reveal */}
          <div className="reveal w-full md:w-2/3 flex justify-start">
            <div
              className="
              w-full
              max-w-[500px]
              transition-transform duration-300 ease-out
              hover:scale-105 hover:brightness-110
            "
            >
              <ImageProfile
                image="/diego_profile.png"
                width={1000}
                height={1000}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Derecha: párrafo creativo con info personal */}
          <div className="reveal w-full md:w-1/3 flex flex-col items-center">
            <p className="text-md leading-loose text-center mb-6 font-share-tech">
              Soy estudiante de tercer año de Ingeniería en Ciencias de la
              Computación en la Universidad del Valle. Me encanta la tecnología,
              aprender por mi cuenta y explorar ideas nuevas. Soy curioso por
              naturaleza y siempre busco formas creativas de hacer las cosas.
            </p>
            <p className="text-md leading-loose text-center mb-6 font-share-tech">
              Además de la programación, la música y el arte son parte esencial
              de mi vida. Toco la guitarra desde pequeño y también he aprendido
              a tocar otros instrumentos, siempre buscando nuevas maneras de
              expresarme. Creo que la tecnología puede mejorar la vida de las
              personas, y por eso busco crear soluciones que no solo sean
              eficientes, sino que realmente aporten valor.
            </p>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* Tecnologías y herramientas (sin clase reveal para que siempre sea visible) */}
        {/* -------------------------------------------------- */}
        <div className="w-full">
          <h4 className="text-2xl font-semibold mb-4 text-center font-share-tech reveal">
            Tecnologías y herramientas
          </h4>
          <div className="reveal grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center">
            {techs.map((tech: Tech) => (
              <TechCard key={tech.name} name={tech.name} iconSrc={tech.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
