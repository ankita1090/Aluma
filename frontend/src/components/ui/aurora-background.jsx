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
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-[#a1154f] text-white",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            "--aurora":
              "repeating-linear-gradient(100deg,#B31457_10%,#C32C70_15%,#D24F8E_20%,#DD78A7_25%,#F2B6D0_30%)",

            "--soft-gradient":
              "repeating-linear-gradient(100deg,#D24F8E_0%,#D24F8E_7%,transparent_10%,transparent_12%,#C32C70_16%)",

            "--white-gradient":
              "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

            "--pink-100": "#F2B6D0", // light pink-purple
            "--pink-200": "#DD78A7", // soft mauve
            "--pink-300": "#D24F8E", // rose-magenta
            "--pink-400": "#C32C70", // bright wine
            "--pink-500": "#B31457", // rich plum
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
                `[mask-image:radial-gradient(ellipse_at_100%_0%,#C32C70_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
