"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  const [start, setStart] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
  ref={containerRef}
  className={cn(
    "scroller relative z-20 max-w-7xl", // removed 'overflow-hidden'
    className
  )}
  onMouseEnter={() => pauseOnHover && setPaused(true)}
  onMouseLeave={() => pauseOnHover && setPaused(false)}
>

      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4"
,
          start && "animate-scroll"
        )}
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {items.map((item) => (
          <li
          className="relative w-[350px] md:w-[450px] max-w-full shrink-0 rounded-2xl border border-zinc-300 bg-gradient-to-br from-white to-gray-100 dark:from-zinc-800 dark:to-zinc-900 px-8 py-10 shadow-xl transition-transform hover:scale-[1.02] flex flex-col justify-between min-h-[320px]"
          key={item.name}
        >
          <blockquote className="flex flex-col justify-between h-full">
            <div className="flex-1 flex items-center">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
                “{item.quote}”
              </p>
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {item.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </p>
            </div>
          </blockquote>
        </li>
        
        
        ))}
      </ul>
    </div>
  );
};
