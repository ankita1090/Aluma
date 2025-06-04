"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThreeCards } from "@/sections/threeCards";

export default function Home() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AuroraBackground>
      <main className="min-h-screen flex flex-col">
        <div className="relative z-10 min-h-screen flex items-start justify-center px-6 pt-24 lg:pt-20">
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm w-fit">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 animate-pulse"></div>
                  <span className="text-sm font-medium text-white/90 tracking-wide">
                    PREMIUM WELLNESS
                  </span>
                </div>

                {/* Main Heading with Gradient */}
                <div className="space-y-4">
                  <h1 className="text-7xl lg:text-8xl font-black bg-gradient-to-br from-pink-200 via-rose-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl leading-none tracking-tight">
                    Welcome, to Aluma
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"></div>
                </div>

                {/* Subtitle with enhanced typography */}
                <p className="text-2xl lg:text-3xl font-light text-white/90 leading-relaxed tracking-wide">
                  Nurture your mind with
                  <span className="font-medium bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                    {" "}
                    peace
                  </span>
                  ,
                  <span className="font-medium bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                    {" "}
                    positivity
                  </span>
                  , and
                  <span className="font-medium bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                    {" "}
                    support
                  </span>
                  .
                </p>

                {/* Description */}
                <p className="text-xl text-white/70 font-light leading-relaxed max-w-lg">
                  Experience a sanctuary designed for your mental wellness
                  journey. Where luxury meets mindfulness.
                </p>
              </div>

              {/* Right Side: Luxury Logo Section */}
              <div
                className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="relative group">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/30 to-rose-500/30 blur-3xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>

                  {/* Main logo container */}
                  <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-500">
                    {/* Inner gradient ring */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-pink-400/20 to-rose-500/20 animate-spin-slow"></div>

                    {/* Logo placeholder with enhanced styling */}
                    <div className="relative z-10 w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-pink-100/90 to-rose-100/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                      <img
                        src="/aluma_logo.png"
                        alt="Aluma Logo"
                        className="w-32 h-32 lg:w-40 lg:h-40 object-contain filter drop-shadow-lg"
                      />
                    </div>

                    {/* Floating particles */}
                    <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-pink-300 animate-bounce opacity-60"></div>
                    <div className="absolute bottom-12 left-12 w-1.5 h-1.5 rounded-full bg-rose-300 animate-bounce delay-300 opacity-60"></div>
                    <div className="absolute top-20 left-8 w-1 h-1 rounded-full bg-pink-400 animate-bounce delay-700 opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 bg-gradient-to-b from-[#FF4D6D] via-[#FF5C8A] to-[#FF85A1]">
  <ThreeCards />
</div>


        {/* Add custom styles for animations */}
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
      </main>
    </AuroraBackground>
  );
}
