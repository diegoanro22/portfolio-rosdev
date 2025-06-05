// components/ImageProfile.tsx
import React from "react";
import Image from "next/image";

interface ImageProfileProps {
  image: string;
  width: number;
  height: number;
  className?: string;
}

const ImageProfile: React.FC<ImageProfileProps> = ({
  image,
  width,
  height,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={image}
        alt="Foto de perfil"
        width={width}
        height={height}
        layout="responsive"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
};

export default ImageProfile;
