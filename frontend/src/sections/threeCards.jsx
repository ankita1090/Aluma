"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function MainCard({ title, description, imgSrc, onClick, bgColorClass }) {
  const [isHovered, setIsHovered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      onClick();
    }, 400);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative overflow-hidden min-h-[500px] flex flex-col items-center justify-between px-8 py-10 rounded-xl shadow-xl cursor-pointer hover:shadow-pink-500/40 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      } ${bgColorClass}`}
    >
      {/* Card Content */}
      <div className="relative z-10 w-full max-w-sm mx-auto text-center flex flex-col gap-6">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-white leading-tight tracking-wide">
          {title}
        </h2>

        {/* Description */}
        <p className="text-lg font-light text-white/90 leading-relaxed tracking-wide">
          {description}
        </p>

        {/* Explore Now Button */}
        <button className="group relative mx-auto mt-4 px-8 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-md shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative">Explore Now</span>
        </button>
      </div>

      {/* Image at Bottom */}
      <div className="mt-10 flex justify-center">
        <div className="relative group w-40 h-40 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center transition-all duration-500">
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-pink-400/20 to-rose-500/20 animate-spin-slow"></div>
          <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-100/90 to-rose-100/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
            <img
              src={imgSrc}
              alt={`${title} Logo`}
              className="w-28 h-28 rounded-full object-contain filter drop-shadow-lg"
            />
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

  const cards = [
    {
      title: "Elena",
      description: "Listening partner for your wellness journey.",
      imgSrc: "/elena_logo.png",
      onClick: () => router.push("/pages/Elena"),
      bgColorClass: "bg-indigo-900",
    },
    {
      title: "Jess",
      description: "Explore Jess's insights and wellness techniques.",
      imgSrc: "/jess_logo.png",
      onClick: () => router.push("/pages/Jess"),
      bgColorClass: "bg-teal-900",
    },
    {
      title: "Journal",
      description: "Dive into your personal wellness journal and reflections.",
      imgSrc: "/journal.png",
      onClick: () => router.push("/pages/Journal"),
      bgColorClass: "bg-slate-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto p-6">
      {cards.map((card) => (
        <MainCard key={card.title} {...card} />
      ))}
    </div>
  );
}
