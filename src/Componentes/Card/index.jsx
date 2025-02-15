import React, { useState, useEffect } from "react";

export default function Card({ images, altText, title, description }) {
  const [currentImage, setCurrentImage] = useState(images[0]); // Define a imagem inicial
  const [isHovered, setIsHovered] = useState(false);
  const [fade, setFade] = useState(false); // Estado para controlar a animação de fade
  let intervalId;

  useEffect(() => {
    if (isHovered) {
      let index = 0;
      intervalId = setInterval(() => {
        setFade(true); // Ativa o efeito de fade antes da troca
        setTimeout(() => {
          index = (index + 1) % images.length;
          setCurrentImage(images[index]);
          setFade(false); // Remove o efeito de fade após a troca
        }, 400); // Tempo da animação
      }, 2500); // Tempo de troca de imagem
    } else {
      setCurrentImage(images[0]); // Volta para a imagem inicial quando o mouse sai
    }

    return () => clearInterval(intervalId); // Limpa o intervalo ao sair do hover
  }, [isHovered, images]);

  return (
    <div
      className="flex flex-col items-center justify-between w-full sm:w-[300px] md:w-[350px] lg:w-[400px] lg:h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem com transição */}
      <div className="relative w-full flex justify-center px-0 lg:border-[6px] border-[#bc6c25] hover:border-[#efe7e1] rounded-[20px] z-16">
        <img
          src={currentImage}
          alt={altText}
          className={`w-[45vh] lg:w-full h-[60vh] lg:h-[356px] object-cover cursor-pointer border-[3px] border-[#bc6c25] lg:border-none shadow-md rounded-[15px] transition-opacity duration-300 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Contêiner das bolas */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className="bg-white opacity-60 h-[10px] w-[10px] rounded-full"
            ></div>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="mt-8 text-center">
        <p className="text-lg lg:text-xl font-medium fonte-principal">{title}</p>
        <p className="text-xs lg:text-base fonte-secundaria">{description}</p>
      </div>
    </div>
  );
}