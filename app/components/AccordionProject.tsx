// /components/AccordionProject.tsx
"use client"

import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./AccordionCn"
import { Project } from "@/app/utils/Projects"
import Image from 'next/image'

interface AccordionProjectProps {
  items: Project[]
}

export default function AccordionProject({ items }: AccordionProjectProps) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {items.map((proj) => (
        <AccordionItem
          key={proj.id}
          value={proj.id.toString()}
          className=" rounded-lg shadow-md overflow-hidden reveal"
        >
          {/* Trigger: miniatura + título + tecnologías */}
          <AccordionTrigger className="flex items-center gap-4 px-4 py-3  transition-colors font-share-tech">
            <div className="flex-none w-30 h-30 overflow-hidden rounded-md border ">
              <Image
                src={proj.imgUrl}
                alt={`${proj.title} miniatura`}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-white">
                {proj.title}
              </h3>
              <p className="text-sm text-gray-300">
                {proj.technologies.join(" • ")}
              </p>
            </div>
            {/* Icono de flecha incluido en AccordionTrigger */}
          </AccordionTrigger>

          {/* Contenido desplegable */}
          <AccordionContent className="px-4 pb-4 text-gray-200 font-share-tech">
            <p className="mb-4">{proj.description}</p>
            <div className="flex gap-4">
              <a
                href={proj.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2 font-share-tech bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                Ver Repositorio
              </a>
              {proj.demoLink && (
                <a
                  href={proj.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 border font-share-tech border-white text-white hover:bg-white hover:text-gray-900 rounded-md transition"
                >
                  Ver Demo
                </a>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
