"use client";

import React, { useState } from "react";

interface FlipCardProps {
  frontIcon: string;
  frontTitle: string;
  frontText: string;
  backTitle: string;
  backText: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontIcon,
  frontTitle,
  frontText,
  backTitle,
  backText,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-72 h-72 [perspective:1000px] mx-auto"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* FRONT */}
        <div
          className="absolute w-full h-full [backface-visibility:hidden] rounded-full flex flex-col items-center justify-center text-center p-6"
          style={{
            background: `radial-gradient(circle at 30% 30%, #ffffff, #dbeafe)`,
            boxShadow:
              "inset -10px -10px 25px rgba(255,255,255,0.6), inset 10px 10px 25px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          <img src={frontIcon} alt={frontTitle} className="w-20 h-20 mb-4" />
          <h3 className="font-semibold text-xl mb-2 text-[#063970]">
            {frontTitle}
          </h3>
          <p className="text-gray-600">{frontText}</p>
        </div>

        {/* BACK */}
        <div
          className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-full flex flex-col items-center justify-center text-center text-white p-6"
          style={{
            background: `radial-gradient(circle at 30% 30%, #094b88, #063970)`,
            boxShadow:
              "inset -10px -10px 25px rgba(255,255,255,0.25), inset 10px 10px 25px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.3)",
          }}
        >
          <h3 className="font-semibold text-xl mb-2">{backTitle}</h3>
          <p>{backText}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
