// components/Projects.tsx
import React, { useEffect } from "react";
import { proyectos, Project } from "@/app/utils/Projects";
import DecryptedText from "./DecryptedText/DecryptedText";

export default function Projects() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="projects" className="py-16 text-gray-100">
      <div className="reveal text-5xl font-bold font-share-tech mb-8 text-center">
        <DecryptedText text="Mis Proyectos" />
      </div>
      <div className="container mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {proyectos.map((proj: Project) => (
          <div
            key={proj.title}
            className="
              reveal
              flex flex-col 
              bg-white shadow-md rounded-lg overflow-hidden 
              hover:-translate-y-1
            "
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
                  className="
                    px-4 py-2 bg-gray-800 text-white rounded 
                    hover:bg-gray-900 transition-colors duration-200
                  "
                >
                  Repositorio
                </a>
                {proj.demoLink && (
                  <a
                    href={proj.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      px-4 py-2 border border-gray-800 text-gray-800 rounded 
                      hover:bg-gray-200 transition-colors duration-200
                    "
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
