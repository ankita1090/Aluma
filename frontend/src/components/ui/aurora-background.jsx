"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-[#FFD3DC] text-slate-900",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            "--aurora":
              "repeating-linear-gradient(100deg,#FF4D6D_10%,#FF5C8A_15%,#FF85A1_20%,#FF9AAE_25%,#FFD3DC_30%)",

            "--soft-gradient":
              "repeating-linear-gradient(100deg,#FF85A1_0%,#FF85A1_7%,transparent_10%,transparent_12%,#FF5C8A_16%)",

            "--white-gradient":
              "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

            "--pink-100": "#FFD3DC", // Very light pink
            "--pink-200": "#FF9AAE", // Soft pink
            "--pink-300": "#FF85A1", // Mid pink
            "--pink-400": "#FF5C8A", // Vibrant rose
            "--pink-500": "#FF4D6D", // Bold magenta
            "--white": "#fff",
            "--transparent": "transparent",
          }}
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] 
              [background-image:var(--white-gradient),var(--aurora)] 
              [background-size:300%,_200%] 
              [background-position:50%_50%,50%_50%] 
              opacity-60 blur-[8px] invert-0 filter will-change-transform 
              [--aurora:repeating-linear-gradient(100deg,var(--pink-500)_10%,var(--pink-400)_15%,var(--pink-300)_20%,var(--pink-200)_25%,var(--pink-100)_30%)] 
              [--soft-gradient:repeating-linear-gradient(100deg,var(--pink-400)_0%,var(--pink-400)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--pink-300)_16%)] 
              [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] 
              after:absolute after:inset-0 
              after:[background-image:var(--white-gradient),var(--aurora)] 
              after:[background-size:200%,_100%] 
              after:[background-attachment:fixed] 
              after:mix-blend-difference 
              after:content-[""]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,#FF5C8A_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
