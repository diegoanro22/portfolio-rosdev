// components/Contact.tsx
import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-16 text-gray-900 text-center">
      <h2 className="text-4xl font-bold mb-8">Contacto</h2>
      <form
        action="https://formspree.io/f/yourFormID"
        method="POST"
        className="max-w-lg mx-auto flex flex-col gap-4 px-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <textarea
          name="message"
          rows={5}
          placeholder="Mensaje"
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          type="submit"
          className="self-center px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}
