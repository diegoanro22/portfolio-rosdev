// components/RollingProjects.tsx
import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
  ResolvedValues,
} from "framer-motion";
import { proyectos, Project } from "@/app/utils/Projects"

interface RollingProjectsProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  projects?: Project[];
}

const RollingProjects: React.FC<RollingProjectsProps> = ({
  autoplay = false,
  pauseOnHover = false,
  projects = [],
}) => {
  // Si no se pasan por props, usa el array importado
  const galleryItems = projects.length > 0 ? projects : proyectos;

  // Estado para detectar pantalla pequeña (≤ 640px)
  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 640 : false
  );
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dimensiones del cilindro (ajústalas según el tamaño de tus tarjetas)
  // En móvil, lo hacemos más pequeño para que quepa bien:
  const cylinderWidth: number = isScreenSizeSm ? 800 : 1200;
  const faceCount: number = galleryItems.length;
  // Multiplicamos por 1.3 para permitir algo de padding horizontal
  const faceWidth: number = (cylinderWidth / faceCount) * 1.3;
  const radius: number = cylinderWidth / (2 * Math.PI);

  // Framer Motion: valores y animaciones
  const dragFactor: number = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const transform = useTransform(
    rotation,
    (val: number) => `rotate3d(0,1,0,${val}deg)`
  );

  // Inicia giro infinito con framer-motion
  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  // Cada vez que cambie autoplay, arrancamos o detenemos
  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest: ResolvedValues) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = (): void => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = (): void => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      {/* Overlays en los bordes para sombrear */}
      <div
        className="absolute top-0 left-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />

      {/* Contenedor 3D */}
      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryItems.map((proj, i) => (
            <div
              key={i}
              className="group absolute flex flex-col h-[200px] w-[260px] rounded-lg bg-white p-4 text-left shadow-lg [backface-visibility:hidden] sm:h-[180px] sm:w-[220px]"
              style={{
                width: `${faceWidth}px`,
                // Posiciona cada tarjeta en su ángulo correspondiente
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              {/* Contenido de la tarjeta */}
              <h3 className="text-lg font-semibold mb-1">{proj.title}</h3>
              <p className="text-xs text-gray-600 flex-grow">
                {proj.description}
              </p>
              <ul className="flex flex-wrap gap-1 mt-2">
                {proj.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex gap-2">
                <a
                  href={proj.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white bg-gray-800 px-2 py-1 rounded hover:bg-gray-900 transition-colors"
                >
                  Repo
                </a>
                {proj.demoLink && (
                  <a
                    href={proj.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-800 border border-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingProjects;
