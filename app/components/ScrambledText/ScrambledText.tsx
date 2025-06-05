// components/ScrambledText/ScrambledText.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let SplitText: any = null;
    let ScrambleTextPlugin: any = null;
    let splitInstance: any;

    // Cargamos los plugins solo en el cliente (evitamos errores de SSR)
    const loadPlugins = async () => {
      // 1. Importa SplitText dinámicamente
      const splitModule = await import("gsap/SplitText");
      SplitText = splitModule.SplitText;

      // 2. Importa ScrambleTextPlugin dinámicamente
      const scrambleModule = await import("gsap/ScrambleTextPlugin");
      ScrambleTextPlugin = scrambleModule.ScrambleTextPlugin;

      // 3. Registra ambos plugins en gsap
      gsap.registerPlugin(SplitText, ScrambleTextPlugin);

      // 4. Si ref existe, crea la animación de “scramble”
      if (rootRef.current) {
        // Spliteamos el <p> en caracteres
        const targetP = rootRef.current.querySelector("p");
        if (!targetP) return;

        splitInstance = new SplitText(targetP, {
          type: "chars",
          charsClass: "inline-block will-change-transform",
        });

        // Guardamos el contenido original en data-content de cada char
        splitInstance.chars.forEach((charEl: any) => {
          const c = charEl as HTMLElement;
          gsap.set(c, { attr: { "data-content": c.innerHTML } });
        });

        // Listener de movimiento de puntero
        const handleMove = (e: PointerEvent) => {
          splitInstance.chars.forEach((charEl: any) => {
            const c = charEl as HTMLElement;
            const { left, top, width, height } = c.getBoundingClientRect();
            const dx = e.clientX - (left + width / 2);
            const dy = e.clientY - (top + height / 2);
            const dist = Math.hypot(dx, dy);

            if (dist < radius) {
              gsap.to(c, {
                overwrite: true,
                duration: duration * (1 - dist / radius),
                scrambleText: {
                  text: c.dataset.content || "",
                  chars: scrambleChars,
                  speed,
                },
                ease: "none",
              });
            }
          });
        };

        // Atamos el listener al contenedor
        rootRef.current.addEventListener("pointermove", handleMove);

        // Limpieza al desmontar
        return () => {
          if (rootRef.current) {
            rootRef.current.removeEventListener("pointermove", handleMove);
          }
          splitInstance.revert(); // restauramos el contenido original
        };
      }
    };

    loadPlugins();

    // Nota: no devolvemos nada en este return porque ya lo hacemos dentro de loadPlugins
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={`m-[7vw] max-w-[800px] font-mono text-[clamp(14px,4vw,32px)] text-white ${className}`}
      style={style}
    >
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;
