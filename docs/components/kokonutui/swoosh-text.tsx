"use client";

/**
 * @author: @dorianbaffier
 * @description: Swoosh Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SwooshTextProps {
  text?: string;
  className?: string;
  shadowColors?: {
    first?: string;
    second?: string;
    third?: string;
    fourth?: string;
    glow?: string;
  };
}

export default function SwooshText({
  text = "Hover Me",
  className = "",
  shadowColors = {
    first: "#07bccc",
    second: "#e601c0",
    third: "#e9019a",
    fourth: "#f40468",
    glow: "#f40468",
  },
}: SwooshTextProps) {
  const textShadowStyle = {
    textShadow: `10px 10px 0px ${shadowColors.first}, 
                     15px 15px 0px ${shadowColors.second}, 
                     20px 20px 0px ${shadowColors.third}, 
                     25px 25px 0px ${shadowColors.fourth}, 
                     45px 45px 10px ${shadowColors.glow}`,
  };

  const noShadowStyle = {
    textShadow: "none",
  };

  return (
    <div className="w-full text-center">
      <motion.div
        className={cn(
          "w-full cursor-pointer text-center font-bold text-3xl",
          "tracking-widest transition-all duration-200 ease-in-out",
          "text-black italic dark:text-white",
          "stroke-[#d6f4f4]",
          className
        )}
        style={textShadowStyle}
        whileHover={noShadowStyle}
      >
        {text}
      </motion.div>
    </div>
  );
}
