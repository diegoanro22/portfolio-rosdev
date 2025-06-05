import React from "react";
import { motion } from "framer-motion";

export default function HomeMain() {
  return (
    <section
      id="home"
      className="relative flex h-screen flex-col items-center justify-center px-4 text-center"
    >
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-white mb-4 font-share-tech"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ¡Hola, soy Diego Rosales!
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-gray-300 max-w-2xl font-share-tech"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Bienvenido a mi
        portafolio.
      </motion.p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 font-share-tech text-white rounded-md transition"
        >
          Ver Proyectos
        </button>
        <button
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="px-6 py-3 border border-white text-white font-share-tech hover:bg-white hover:text-gray-900 rounded-md transition"
        >
          Contáctame
        </button>
      </div>
    </section>
  );
}
