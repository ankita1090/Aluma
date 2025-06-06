"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

const Music = () => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="w-full">
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}>
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200">
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400">
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      {/* Music Cards Grid - Improved Layout */}
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {cards.map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              className="p-6 flex flex-col md:flex-row justify-between items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl cursor-pointer transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
              <div className="flex gap-6 flex-col md:flex-row items-center md:items-start w-full">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-20 w-20 md:h-16 md:w-16 rounded-lg object-cover object-top shadow-md" />
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-semibold text-white text-lg mb-1">
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-white/80 text-sm">
                    {card.description}
                  </motion.p>
                </div>
              </div>
              <motion.button
                layoutId={`button-${card.title}-${id}`}
                className="px-6 py-2 text-sm rounded-full font-semibold bg-white/20 hover:bg-green-500 hover:text-white text-white mt-4 md:mt-0 transition-all duration-300 border border-white/30 hover:border-green-500 flex-shrink-0">
                {card.ctaText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Lana Del Rey",
    title: "Peaceful music for meditation",
    src: "/music_pic1.png",
    ctaText: "Play",
    ctaLink: "https://youtu.be/1ZYbU82GVz4?si=OeB1XRh9nFe8xHyg",
    content: () => {
      return (
        <p>Relaxing sleep music for deep sleeping and stress relief. Fall asleep to beautiful nature videos and use the relaxing music ("Flying" by Peder B. Helland) as sleeping music, soothing meditation music, relaxation music, study music and more.
                  </p>
      );
    },
  },
  {
    description: "Music for stress relief",
    title: "Music for stress relief",
    src: "/music_pic2.png",
    ctaText: "Play",
    ctaLink: "https://youtu.be/lFcSrYw-ARY?si=A8fZ2r-z2RQeu-8x",
    content: () => {
      return (
        <p>Meditation Relax Music Channel presents a Relaxing Stress Relief Music Video with beautiful nature and calm Music for Meditation, deep sleep, music therapy. This relaxing new age composition can be used as Deep Meditation Music, Music for Yoga and Pilates , Music for Massage , Spa Music. Also this music is perfect as dream music, Healing music, Study Music, Sleep Music and Total Relaxation Music.
                  </p>
      );
    },
  },

  {
    description: "Metallica",
    title: "For Whom The Bell Tolls",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>Metallica, an iconic American heavy metal band, is renowned for their
                    powerful sound and intense performances that resonate deeply with
                    their audience. Formed in Los Angeles, California, they have become a
                    cultural icon in the heavy metal music industry. <br /> <br />Their
                    songs often reflect themes of aggression, social issues, and personal
                    struggles, capturing the essence of the heavy metal genre. With a
                    career spanning over four decades, Metallica has released numerous hit
                    albums and singles that have garnered them a massive fan following
                    both in the United States and abroad.
                  </p>
      );
    },
  },
  // {
  //   description: "Led Zeppelin",
  //   title: "Stairway To Heaven",
  //   src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
  //   ctaText: "Play",
  //   ctaLink: "https://ui.aceternity.com/templates",
  //   content: () => {
  //     return (
  //       <p>Led Zeppelin, a legendary British rock band, is renowned for their
  //                   innovative sound and profound impact on the music industry. Formed in
  //                   London in 1968, they have become a cultural icon in the rock music
  //                   world. <br /> <br />Their songs often reflect a blend of blues, hard
  //                   rock, and folk music, capturing the essence of the 1970s rock era.
  //                   With a career spanning over a decade, Led Zeppelin has released
  //                   numerous hit albums and singles that have garnered them a massive fan
  //                   following both in the United Kingdom and abroad.
  //                 </p>
  //     );
  //   },
  // },
  {
    description: "Or check out the creator's favorite relaxing playlist",
    title: "Bollywood party",
    src: "/music_pic5.png",
    ctaText: "Play",
    ctaLink: "https://www.youtube.com/watch?v=II2EO3Nw4m0&list=PLGb4vbMWyI-10b064S09MgvspGFOGQpBo",
    content: () => {
      return (
        <p>These are the Bollywood hits everyone loves—timeless tracks that feel like a warm hug from the past and a push forward into better days. A perfect blend of nostalgia and rhythm, this playlist is the creator’s way of saying life goes on… so why not dance through it? Whether you're unwinding solo or chasing the calm after the storm, let these melodies remind you: you're not alone, and there's always a reason to keep moving. 💫🎧🕺
                  </p>
      );
    },
  },
];

export default Music;