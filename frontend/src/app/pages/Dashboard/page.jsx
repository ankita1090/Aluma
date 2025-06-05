"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThreeCards } from "@/sections/threeCards";
import { FocusCards } from "@/components/ui/focus-cards";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import Music from "../Music/page";
import Cards from "../Cards/page";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

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
      quote: "Don’t watch the clock; do what it does. Keep going.",
      name: "Sam Levenson",
      title: "Writer & Humorist",
    },
    {
      quote: "You miss 100% of the shots you don’t take.",
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
      quote: "It always seems impossible until it’s done.",
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
    <AuroraBackground className="w-full m-0 p-0">
      <main className="min-h-screen flex flex-col m-0 p-0">
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-24 lg:pt-20 pb-4">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Side: Enhanced Text Content */}
              <div
                className={`flex flex-col gap-8 transition-all duration-1000 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {/* Premium Badge */}

                {/* Main Heading with Gradient */}
                <div className="space-y-4">
                  <h1 className="font-poppins text-7xl lg:text-8xl font-black bg-gradient-to-br from-sky-200 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl leading-none tracking-tight">
                    fsfsfewfcawec {name}
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                </div>

                {/* Subtitle with enhanced typography */}
                <p className="text-2xl lg:text-3xl font-light text-white/90 leading-relaxed tracking-wide">
                  Nurture your mind with <br />
                  <ContainerTextFlip />
                </p>

                <button
                  onClick={() => {
                    router.push("/pages/AboutYou");
                  }}
                  className="relative rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 p-[3px] group overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 group-hover:from-blue-400 group-hover:via-cyan-400 group-hover:to-blue-500 rounded-lg transition-all duration-500"></div>

                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg blur-sm opacity-0 group-hover:opacity-60 transition-all duration-500"></div>

                  {/* Button content */}
                  <div className="relative flex items-center justify-center bg-blue group-hover:bg-black/80 rounded-md px-8 py-3 text-white text-lg font-medium z-10 transition-all duration-300">
                    <span className="mr-2">Tell us more about yourself</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </button>

                {/* Description */}
                <p className="text-xl text-white font-light leading-relaxed max-w-lg">
                  Experience a sanctuary designed for your mental wellness
                  journey. Where luxury meets mindfulness.
                </p>
              </div>

              {/* Right Side: Logo Section */}
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
                        src="/aluma_logo.png"
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
          </div>
        </div>

        {/* Spacer with deep blue */}
        <div className="w-screen bg-[#134BB3] h-[10px] -mx-6"></div>

        {/* Cards section with blue gradient */}
        <div className="w-screen bg-gradient-to-b from-[#1D5DCB] via-[#4D86E0] to-[#7AA7F2] -mx-6 px-6">
          <div className="flex justify-center items-center w-full">
            <FocusCards />
          </div>
        </div>

        <div className="w-screen bg-gradient-to-b from-[#7AA7F2] via-[#4D86E0] to-[#C5DFFF] -mx-6 px-6 pt-4">
          <div className="flex justify-center items-center w-full">
            <Music />
          </div>
        </div>

        <button onClick={() => router.push("/pages/spotifyLogin")}>
          spotify login
        </button>

        {/* <div className="w-full bg-gradient-to-b from-[#134BB3] via-[#1D5DCB] to-[#4D86E0] py-20 min-h-[400px]"> */}
  {/* <div className="container mx-auto px-4 max-w-7xl">
    
    <div className="relative">
      <InfiniteMovingCards 
        items={quotes} 
        direction="right"
        speed="slow"
        pauseOnHover={true}
      />
    </div>
  </div> */}
{/* </div> */}

        {/* Global Styles */}
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden;
          }

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
      </main>
    </AuroraBackground>
  );
}
