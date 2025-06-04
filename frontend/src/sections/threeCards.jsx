'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

function Card({ title, description, imgSrc, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      onClick(); // Calls router.push(...)
    }, 400); // Match this with your fade duration
  };


  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative overflow-hidden min-h-[600px] flex flex-col items-center justify-center px-6 py-8 bg-base-800 rounded-xl shadow-xl cursor-pointer hover:shadow-pink-500/40 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Canvas Reveal Effect */}
      {isHovered && (
        <div className="absolute inset-0 z-0 rounded-xl">
          <CanvasRevealEffect />
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/40 bg-black/30 backdrop-blur-md w-fit shadow-lg">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 animate-pulse"></div>
            <span className="text-sm font-medium text-white tracking-wide">
              {title.toUpperCase()}
            </span>
          </div>

          <h2 className="text-5xl font-black bg-gradient-to-br from-pink-200 via-rose-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl leading-none tracking-tight">
            {title}
          </h2>

          <p className="text-lg font-light text-white leading-relaxed tracking-wide max-w-sm drop-shadow-lg">
            {description}
          </p>

          <div className="form-control mt-4">
            <button
              className="group relative px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">Explore</span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative group w-48 h-48 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-500">
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-pink-400/20 to-rose-500/20 animate-spin-slow"></div>
            <div className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-br from-pink-100/90 to-rose-100/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <img
                src={imgSrc}
                alt={`${title} Logo`}
                className="w-38 h-38 rounded-full object-contain filter drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export function ThreeCards() {
  const router = useRouter();

  // Card data for 3 cards
  const cards = [
    {
      title: "Elena",
      description: "Listening partner for your wellness journey.",
      imgSrc: "/elena_logo.png",
      onClick: () => router.push("/pages/Elena")
    },
    {
      title: "Jess",
      description: "Explore Jess's insights and wellness techniques.",
      imgSrc: "/jess_logo.png",
      onClick: () => router.push("/pages/Jess")
    },
    {
      title: "Journal",
      description: "Dive into your personal wellness journal and reflections.",
      imgSrc: "/journal.png",
      onClick: () => router.push("/pages/Journal")
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto p-6">
      {cards.map(({ title, description, imgSrc, onClick }) => (
        <Card
          key={title}
          title={title}
          description={description}
          imgSrc={imgSrc}
          onClick={onClick}
        />
      ))}
    </div>
  );
}