"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThreeCards } from "@/sections/threeCards";
import { FocusCards } from "@/components/ui/focus-cards";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import Music from "../Music/page";
import Cards from "../Cards/page";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";import SelfAssessmentCard from "../SelfAssessmentCard/page";
import Navbar from "@/sections/navbar";

export default function Home() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("User");

  const quotes = [
    {
      quote: "The only way to do great work is to love what you do.",
      name: "Steve Jobs",
      title: "Co-founder of Apple",
    },
    {
      quote: "Believe you can and you're halfway there.",
      name: "Theodore Roosevelt",
      title: "26th U.S. President",
    },
    {
      quote:
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      name: "Winston Churchill",
      title: "Former British Prime Minister",
    },
    {
      quote: "Don't watch the clock; do what it does. Keep going.",
      name: "Sam Levenson",
      title: "Writer & Humorist",
    },
    {
      quote: "You miss 100% of the shots you don't take.",
      name: "Wayne Gretzky",
      title: "Professional Hockey Player",
    },
    {
      quote:
        "Hardships often prepare ordinary people for an extraordinary destiny.",
      name: "C.S. Lewis",
      title: "Author",
    },
    {
      quote: "It always seems impossible until it's done.",
      name: "Nelson Mandela",
      title: "Former President of South Africa",
    },
    {
      quote:
        "Keep your face always toward the sunshine—and shadows will fall behind you.",
      name: "Walt Whitman",
      title: "Poet",
    },
  ];

  useEffect(() => {
    const handleFetchName = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user name");
        }
        const data = await response.json();
        console.log("Fetched user name:", data.name);
        setName(data.name || "User");
        return;
      } catch (error) {
        console.error("Error fetching user name:", error);
        return "User";
      }
    };
    handleFetchName();
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AuroraBackground className="w-full">
      
      <main className="min-h-screen flex flex-col " id="top">
      <Navbar />
        {/* Hero Section */}
        <section className="w-full pt-24 pb-26">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Section */}
            <div
              className={`flex flex-col gap-6 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="text-6xl lg:text-7xl font-black text-transparent bg-gradient-to-br from-sky-200 via-cyan-300 to-blue-500 bg-clip-text leading-tight">
                Welcome {name}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              <p className="text-2xl text-white/90 font-light leading-relaxed">
                Nurture your mind with <br />
                <ContainerTextFlip />
              </p>
              <button
                onClick={() => router.push("/pages/AboutYou")}
                className="rounded-lg px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:scale-105 transition-transform"
              >
                Tell us more about yourself →
              </button>
              <p className="text-lg text-white font-light max-w-md">
                Experience a sanctuary designed for your mental wellness
                journey. Where luxury meets mindfulness.
              </p>
            </div>

            {/* Logo Section */}
            <div
              className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300/30 to-blue-600/30 blur-3xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>

                {/* Main logo container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-500">
                  {/* Inner gradient ring */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-300/20 to-blue-600/20 animate-spin-slow"></div>

                  {/* Logo */}
                  <div className="relative z-10 w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-blue-100/90 to-blue-200/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                    <img
                      src="/Aluma_logo.png"
                      alt="Aluma Logo"
                      className="w-32 h-32 lg:w-40 lg:h-40 object-contain filter drop-shadow-lg"
                    />
                  </div>

                  {/* Floating particles */}
                  <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-blue-300 animate-bounce opacity-60"></div>
                  <div className="absolute bottom-12 left-12 w-1.5 h-1.5 rounded-full bg-blue-200 animate-bounce delay-300 opacity-60"></div>
                  <div className="absolute top-20 left-8 w-1 h-1 rounded-full bg-blue-400 animate-bounce delay-700 opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Cards Section */}
        <section id="FocusCards">
        <div className="w-screen bg-gradient-to-b from-[#1D5DCB] via-[#4D86E0] to-[#7AA7F2]  px-6">
          {/* <div className="w-screen  px-6"> */}
          <div className="flex justify-center items-center w-full">
            <FocusCards />
          </div>
        </div>
        </section>

        <div className="bg-white w-max h-2"> </div>

        <section id="SelfAssessment">
          <div className="w-screen bg-gradient-to-b from-[#1D5DCB] via-[#4D86E0] to-[#7AA7F2] px-6 py-2">
            <SelfAssessmentCard />
          </div>
        </section>

        {/* Music Section */}
        <section className="bg-transparent py-20 relative overflow-visible w-screen left-0 right-0 fixed top-0 z-0" id="music">
          {/* Ambient Blurs */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/15 rounded-full blur-2xl delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-5xl lg:text-6xl font-thin text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text pb-2">
              Feeling
            </h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text mt-2">
              Overwhelmed?
            </h3>
            <p className="text-2xl text-white/70 mt-8">
              Immerse yourself in our carefully curated
            </p>
            <p className="text-2xl text-transparent bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text">
              symphony of tranquility
            </p>

            {/* Music Player */}
            <div className="mt-12 max-w-5xl mx-auto bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-xl shadow-xl relative">
              <Music />
            </div>

            {/* Footer Text */}
            <p className="text-white/40 text-sm uppercase mt-12 tracking-widest">
              Let the music heal your soul
            </p>
          </div>

          {/* Floating Notes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 text-white/10 animate-float">
              ♪
            </div>
            <div className="absolute top-3/4 right-1/4 text-white/10 animate-float-delayed">
              ♫
            </div>
            <div className="absolute top-1/2 right-1/3 text-white/10 animate-float-slow">
              ♪
            </div>
            <div className="absolute bottom-1/4 left-1/3 text-white/10 animate-float-delayed">
              ♫
            </div>
          </div>
        </section>

        <section id="quotes">
          <div className="w-screen bg-gradient-to-b from-[#1D5DCB] via-[#4D86E0] to-[#7AA7F2] px-6 py-12">
            <div className="max-w-5xl mx-auto text-center mb-8">
              <h2 className="text-4xl font-bold text-white drop-shadow-md">
                Get going with a motivational quote!
              </h2>
            </div>
            <InfiniteMovingCards items={quotes} speed="slow" />
          </div>
        </section>


        {/* Animations */}
        <style jsx global>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
          }
          @keyframes float-delayed {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-30px) rotate(-180deg);
            }
          }
          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(90deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
            font-size: 2rem;
          }
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
            font-size: 1.5rem;
          }
          .animate-float-slow {
            animation: float-slow 10s ease-in-out infinite;
            font-size: 1.8rem;
          }
        `}</style>
      </main>
    </AuroraBackground>
  );
}
