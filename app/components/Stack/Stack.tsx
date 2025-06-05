// /components/Stack.tsx
import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

//
//  1) Definimos un tipo genérico para cada carta (StackItem<T>),
//     que además de id e img, puede llevar un campo `data: T`.
//
export interface StackItem<T> {
  id: number | string;
  img: string;
  data?: T;
}

export interface StackProps<T> {
  /** Si true, rota cada carta Z aleatoriamente entre -5° y +5° **/
  randomRotation?: boolean;
  /** Límite de arrastre para enviar la carta al fondo **/
  sensitivity?: number;
  /** Tamaño (ancho/alto) de cada carta en píxeles **/
  cardDimensions?: { width: number; height: number };
  /**
   * cardsData: un array de StackItem<T>.
   * Cada item debe tener al menos `id` e `img`. Si quieres almacenar
   * un objeto completo (por ejemplo un proyecto), pásalo en `data`.
   **/
  cardsData: StackItem<T>[];
  /** Configuración de animación spring **/
  animationConfig?: { stiffness: number; damping: number };
  /**
   * Al hacer clic en una carta, se invocará esta función
   * con el objeto StackItem<T> correspondiente.
   **/
  onCardClick?: (item: StackItem<T>) => void;
}

//
//  2) Componente interno que maneja el tilt 3D y el arrastre de cada carta.
//
interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY, zIndex: 1 }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

//
//  3) Componente principal Stack, ahora genérico <T>.
//
export default function Stack<T>({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData,
  animationConfig = { stiffness: 260, damping: 20 },
  onCardClick,
}: StackProps<T>) {
  // Estado local con el orden actual de las cartas
  const [cards, setCards] = useState(cardsData);

  // Cuando enviamos una carta al fondo (drag fuera de rango), reordenamos el array:
  const sendToBack = (id: number | string) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      if (index < 0) return newCards;
      // Extraemos la carta y la colocamos al principio (fondo del stack)
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        // Cada carta rotará levemente en Z si randomRotation = true
        const randomRotate = randomRotation
          ? Math.random() * 10 - 5 // grado entre -5 y +5
          : 0;

        // Z‐Index dinámico: la carta de arriba debe tener mayor Z
        const zIndex = index + 1;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="rounded-2xl overflow-hidden border-4 border-white bg-gray-50 shadow-lg"
              onClick={() => {
                // Si se definió onCardClick, lo invocamos pasándole el StackItem<T>
                if (onCardClick) onCardClick(card);
              }}
              animate={{
                // Cada carta gira en Z y se escala levemente según su orden
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                zIndex,
              }}
            >
              {/* Aquí usamos <img> en lugar de next/image */}
              <img
                src={card.img}
                alt={`card-${card.id}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
