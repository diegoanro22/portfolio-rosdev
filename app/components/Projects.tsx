// components/Projects.tsx
import React from "react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  repoLink: string;
  demoLink?: string;
}

const proyectos: Project[] = [
  {
    title: "Proyecto 1: Lab de DB",
    description:
      "Implementación de CRUD en PostgreSQL con Next.js y Prisma. Incluye vistas y triggers.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    repoLink: "https://github.com/usuario/lab-db",
    demoLink: "https://lab-db.vercel.app",
  },
  {
    title: "Proyecto 2: E-Commerce Guitarras",
    description:
      "Tienda en línea de guitarras con React, API REST y carrito de compras en localStorage.",
    technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    repoLink: "https://github.com/usuario/ecommerce-guitarras",
    demoLink: "https://ecommerce-guitarras.netlify.app",
  },
  {
    title: "Proyecto 3: Blog de Música",
    description:
      "CMS sencillo de blog usando Next.js + MDX. Publica entradas con reseñas de álbumes y posts musicales.",
    technologies: ["Next.js", "MDX", "Tailwind CSS"],
    repoLink: "https://github.com/usuario/blog-musica",
    demoLink: "https://blog-musica.vercel.app",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16  text-gray-900 text-center">
      <h2 className="text-4xl font-bold mb-12">Proyectos</h2>
      <div className="container mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {proyectos.map((proj) => (
          <div
            key={proj.title}
            className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-2">{proj.title}</h3>
              <p className="text-gray-700 mb-4 flex-grow">{proj.description}</p>
              <ul className="flex flex-wrap gap-2 mb-4 justify-center">
                {proj.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex justify-center gap-4">
                <a
                  href={proj.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
                >
                  Repositorio
                </a>
                {proj.demoLink && (
                  <a
                    href={proj.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-200 transition"
                  >
                    Ver Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
