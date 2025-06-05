// components/AboutMe.tsx
import React from "react";
import DecryptedText from "./DecryptedText/DecryptedText";
import ImageProfile from "./ImageProfile";

export default function AboutMe() {
  return (
    <section id="about" className="py-16 text-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* Título “Acerca de mí” */}
        <div className="text-5xl font-bold font-share-tech mb-8 text-center">
          <DecryptedText text="Acerca de mí" />
        </div>

        {/* Contenedor flex: a la izquierda la imagen y a la derecha el texto */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          {/* ● Izquierda: imagen más grande y alineada a la izquierda */}
          <div className="w-full md:w-2/3 flex justify-start">
            <ImageProfile
              image="/diego_profile.png"
              width={1000}
              height={1000}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* ● Derecha: texto ocupa menor espacio */}
          <div className="w-full md:w-1/3">
            {/* Tu contenido textual */}
            <p className="text-base leading-relaxed">
              ¡Hola! Soy Diego, desarrollador y diseñador enfocado en…
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
