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
      src: "/elena_logo.png",
      onClick: () => router.push("/pages/Elena"),
    },
    {
      title: "Jess",
      src: "/jess_logo.png",
      onClick: () => router.push("/pages/Jess"),
    },
    {
      title: "Journal",
      src: "/journal.png",
      onClick: () => router.push("/pages/Journal"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <MiniCard
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}

const MiniCard = React.memo(({ card, index, hovered, setHovered }) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    onClick={card.onClick}
    className={cn(
      "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}
  >
    <img src={card.src} alt={card.title} className="object-cover absolute inset-0 w-full h-full" />
    <div
      className={cn(
        "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
        hovered === index ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
        {card.title}
      </div>
    </div>
  </div>
));

MiniCard.displayName = "MiniCard";
