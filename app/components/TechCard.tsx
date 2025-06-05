// components/TechCard.tsx
import React from "react";
import Image from "next/image";

interface TechCardProps {
  name: string;
  iconSrc: string; // ruta a la imagen o ícono
}

const TechCard: React.FC<TechCardProps> = ({ name, iconSrc }) => {
  return (
    <div
      className="
        flex flex-col items-center 
        rounded-lg shadow-md p-4 w-24 
        transform transition-transform duration-200 ease-out 
        hover:scale-105 hover:bg-gray-700
      "
    >
      <div className="h-12 w-12 mb-2 relative">
        <Image
          src={iconSrc}
          alt={`${name} icon`}
          layout="fill"
          objectFit="contain"
          className="rounded"
        />
      </div>
      <span className="text-sm text-center font-medium">{name}</span>
    </div>
  );
};

export default TechCard;
