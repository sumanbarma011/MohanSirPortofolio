"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import type { IconType } from "react-icons";

interface Company {
  name: string;
  // Accepts either a React Icon component or a string URL path
  logo: IconType | React.ComponentType<{ className?: string }> | string;
}

interface LogoTickerProps {
  companies: Company[];
  speed?: "slow" | "medium" | "fast";
}

export default function LogoTicker({
  companies,
  speed = "medium",
  className,
  ...props
}: LogoTickerProps & React.ComponentProps<"div">) {
  // Map speed presets to animation duration values
  const speedClasses = {
    slow: "animate-[marquee_60s_linear_infinite]",
    medium: "animate-[marquee_40s_linear_infinite]",
    fast: "animate-[marquee_20s_linear_infinite]",
  };

  return (
    <div
      className={cn(
        "w-full bg-background py-8 border-y border-border/40 overflow-hidden relative",
        className,
      )}
      {...props}
    >
      {/* Optional: Vignette fade effect on left and right edges for depth */}
      <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Main Flex Track */}
      <div className="flex w-max relative">
        {/* Loop the track twice to create the infinite seamless illusion */}
        {[...Array(2)].map((_, trackIdx) => (
          <div
            key={trackIdx}
            className={`flex items-center gap-16 px-8 shrink-0 ${speedClasses[speed]}`}
            aria-hidden={trackIdx === 1 ? "true" : "false"}
          >
            {companies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex items-center gap-3 text-muted-foreground/70 hover:text-foreground transition-colors duration-300 group select-none"
              >
                {/* Render Logic: Check if logo is an Image URL string or an Icon component */}
                {typeof company.logo === "string" ? (
                  <Image
                    src={company.logo}
                    width={8}
                    height={8}
                    alt={`${company.name} logo`}
                    className="h-8 w-auto object-contain filter grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <company.logo className="w-8 h-8 transition-transform duration-300 group-hover:scale-105" />
                )}
                <span className="text-lg font-semibold tracking-tight">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
