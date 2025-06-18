// components/Contact.tsx
"use client"

import React, { useEffect } from "react"
import DecryptedText from "./DecryptedText/DecryptedText"
import { FaLinkedin, FaGithub } from "react-icons/fa"

export default function Contact() {
  // “Reveal on scroll” para Contact
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal")
    if (!reveals.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          } else {
            entry.target.classList.remove("visible")
          }
        })
      },
      { threshold: 0.3 }
    )

    reveals.forEach((el) => observer.observe(el))
    return () => reveals.forEach((el) => observer.unobserve(el))
  }, [])

  return (
    <section id="contact" className="py-16 text-gray-100">
      {/* Título con “reveal” */}
      <div className="reveal text-5xl text-white font-share-tech font-bold mb-8 text-center">
        <DecryptedText text="Contacto" />
      </div>

      <div className="max-w-xl mx-auto px-4 space-y-8 reveal">
        <p className="text-center text-lg mb-4 font-share-tech">
          ¿Tienes alguna pregunta, proyecto o simplemente quieres saludar?
          Escríbeme y con gusto te responderé.
        </p>

        <form
          action="https://formspree.io/f/xyzjzllo"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            required
            className="border border-gray-700 rounded px-4 py-2 placeholder-gray-400 font-share-tech focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            required
            className="border border-gray-700 rounded px-4 py-2 placeholder-gray-400 font-share-tech focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Mensaje"
            required
            className="border border-gray-700 rounded px-4 py-2 placeholder-gray-400 font-share-tech focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
          />
          <button
            type="submit"
            className="w-max self-center px-6 py-3 bg-indigo-600 text-white font-share-tech rounded hover:bg-indigo-700 transition"
          >
            Enviar
          </button>
        </form>

        {/* Enlaces a redes sociales y CV */}
        <div className="flex justify-center space-x-6 pt-4">
          <a
            href="https://www.linkedin.com/in/diego-rosales-8677a2278/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href="https://github.com/diegoanro22"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition"
            aria-label="GitHub"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="/CV.pdf"
            download
            className="flex items-center space-x-2 px-4 py-1 bg-indigo-600 text-white font-share-tech rounded hover:bg-indigo-700 transition"
            aria-label="Descargar CV"
          >
            <span>Descargar CV</span>
          </a>
        </div>
      </div>
    </section>
  )
}
