"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function FocusCards() {
  const [hovered, setHovered] = useState(null);
  const router = useRouter();

  const cards = [
    {
      title: "Elena",
      description: "Listening partner for your wellness journey.",
      src: "/elena_logo.png",
      onClick: () => router.push("/pages/Elena"),
    },
    {
      title: "Jess",
      description: "Explore Jess's insights and wellness techniques.",
      src: "/jess_logo.png",
      onClick: () => router.push("/pages/Jess"),
    },
    {
      title: "Journal",
      description: "Dive into your personal wellness journal and reflections.",
      src: "/journal.png",
      onClick: () => router.push("/pages/Journal"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto w-full p-6">
      {cards.map((card, index) => (
        <div
          key={card.title}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          onClick={card.onClick}
          className={cn(
            "rounded-3xl bg-gradient-to-br from-[#4D90D7]/20 via-[#3D90D7]/15 to-[#2D90D7]/25 backdrop-blur-xl border border-white/20 shadow-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-blue-500/30 group relative overflow-hidden min-h-[420px] gap-6",
            hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
          )}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#3D90D7]/30 to-[#4D90D7]/30 opacity-0 group-hover:opacity-60 blur-sm transition-all duration-500"></div>
          
          {/* Image container with enhanced styling */}
          <div className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl border border-white/30 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
            {/* Inner glow ring */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#3D90D7]/20 to-[#4D90D7]/20 group-hover:from-[#3D90D7]/30 group-hover:to-[#4D90D7]/30 transition-all duration-500"></div>
            
            <img
              src={card.src}
              alt={card.title}
              className="relative z-10 w-28 h-28 object-contain rounded-full filter drop-shadow-lg"
            />
            
            {/* Floating particles */}
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/60 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full bg-[#3D90D7]/70 animate-pulse delay-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Text content with enhanced typography */}
          <div className="relative z-10 space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-500">
              {card.title}
            </h3>
            
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#3D90D7] to-[#4D90D7] mx-auto rounded-full group-hover:w-24 transition-all duration-500"></div>
            
            <p className="text-gray-700 text-lg leading-relaxed font-light max-w-xs group-hover:text-gray-600 transition-colors duration-300">
              {card.description}
            </p>
          </div>

          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        </div>
      ))}
    </div>
  );
}