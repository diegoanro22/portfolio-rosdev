// components/Navbar.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";              // ← AÑADIDO useEffect, useRef
import GooeyNav, { GooeyNavProps } from "./GooeyNav/GooeyNav";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  // 1) Definimos los items del menú
  const baseItems: GooeyNavProps["items"] = [
    { label: "Inicio", href: "#home" },
    { label: "Sobre mí", href: "#about" },
    { label: "Proyectos", href: "#projects" },
    { label: "Contacto", href: "#contact" },
  ];

  // 2) Parámetros de GooeyNav
  const particleCount = 15;
  const particleDistances: [number, number] = [90, 10];
  const particleR = 100;
  const animationTime = 600;
  const timeVariance = 300;
  const colors = [1, 2, 3, 1, 2, 3, 1, 4];
  const initialActiveIndex = 0;

  // 3) Scroll suave para cada enlace
  const handleSmoothScroll = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // 4) Estado y función para menú móvil
  const [menuOpen, setMenuOpen] = useState(false);

  // ← AÑADIDO: Estado que controla qué índice está activo según el scroll
  const [scrollActiveIndex, setScrollActiveIndex] = useState<number>(initialActiveIndex);

  // ← AÑADIDO: Refs a cada sección para medir posiciones
  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  // ← AÑADIDO: Hook que calcula el “scroll-spy”
  useEffect(() => {
    // Al montarse, asignamos cada sección a su ref
    homeRef.current = document.getElementById("home");
    aboutRef.current = document.getElementById("about");
    projectsRef.current = document.getElementById("projects");
    contactRef.current = document.getElementById("contact");

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = window.innerHeight / 3; // Activa un poco antes de llegar al top

      // const homeTop = homeRef.current?.offsetTop ?? 0;
      const aboutTop = aboutRef.current?.offsetTop ?? 0;
      const projectsTop = projectsRef.current?.offsetTop ?? 0;
      const contactTop = contactRef.current?.offsetTop ?? 0;

      if (scrollY + offset >= contactTop) {
        setScrollActiveIndex(3);
      } else if (scrollY + offset >= projectsTop) {
        setScrollActiveIndex(2);
      } else if (scrollY + offset >= aboutTop) {
        setScrollActiveIndex(1);
      } else {
        setScrollActiveIndex(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Inicializamos una vez
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const itemsWithOnClick = baseItems.map((item) => ({
    label: item.label,
    href: item.href,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      handleSmoothScroll(item.href);
      setMenuOpen(false);
    },
  }));

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-80 backdrop-blur-none">
      <div className="h-20 flex items-center justify-between px-10 sm:px-8 max-w-7xl mx-auto">
        {/* LOGO: Aquí puedes agregar tu logo */}
        <div className="h-8 w-8">
          <Image
            src="/dog.svg"
            width={32}
            height={32}
            alt="Mi logo"
            className="h-full w-full object-contain"
          />
        </div>

        {/* BOTÓN MENÚ MÓVIL: visible solo en pantallas < md */}
        <button
          className="md:hidden text-white text-2xl mr-4 focus:outline-none font-share-tech"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* MENÚ DESKTOP: GooeyNav solo en pantallas >= md, alineado a la derecha */}
        <div className="hidden md:block">
          <div className="relative h-10 max-w overflow-hidden font-share-tech">
            <GooeyNav
              items={itemsWithOnClick}
              particleCount={particleCount}
              particleDistances={particleDistances}
              particleR={particleR}
              animationTime={animationTime}
              timeVariance={timeVariance}
              colors={colors}
              initialActiveIndex={initialActiveIndex}
              activeIndex={scrollActiveIndex}    
            />
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL: desplegable debajo del header */}
      {menuOpen && (
        <nav className="md:hidden bg-black bg-opacity-95">
          <ul className="flex flex-col space-y-4 py-4 px-6">
            {baseItems.map((item, idx) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(item.href);
                    setMenuOpen(false);
                  }}
                  className={`block text-lg font-medium transition ${
                    scrollActiveIndex === idx
                      ? "text-indigo-400"
                      : "text-white hover:text-indigo-300"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
