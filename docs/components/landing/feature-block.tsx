"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import Nextjs from "@/components/icons/nextjs";
import ReactIcon from "@/components/icons/react";
import { cn } from "@/lib/utils";
import ShadcnIcon from "../icons/shadcn";

export default function FeatureBlock() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseEnter = (iconName: string) => {
    setHoveredItem(iconName);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="z-10 mx-auto flex w-full max-w-none flex-col items-center">
      <div className="mx-auto grid w-[95%] grid-cols-3 items-center justify-center gap-6 py-4 md:flex md:w-[85%] md:flex-wrap md:gap-8">
        <motion.div
          className={cn(
            "relative flex flex-col items-center gap-2 text-blue-600 dark:text-blue-400"
          )}
          initial={{ opacity: 0, y: 20 }}
          onMouseEnter={() => handleMouseEnter("TailwindCSS")}
          onMouseLeave={handleMouseLeave}
          transition={{
            duration: 0.3,
            delay: 0.1,
            ease: [0.23, 1, 0.32, 1],
          }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <svg
            aria-labelledby="tailwindcss-icon-title"
            className="h-8 w-8"
            role="img"
            viewBox="0 0 54 33"
          >
            <title id="tailwindcss-icon-title">TailwindCSS</title>
            <g clipPath="url(#prefix__clip0)">
              <path
                clipRule="evenodd"
                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                fill="#38bdf8"
                fillRule="evenodd"
              />
            </g>
          </svg>
          <motion.span
            animate={{
              scale: hoveredItem === "TailwindCSS" ? 1.1 : 1,
              fontWeight: hoveredItem === "TailwindCSS" ? 500 : 400,
            }}
            className="mt-1 whitespace-nowrap text-center text-black text-xs dark:text-white"
          >
            TailwindCSS
          </motion.span>
        </motion.div>

        <motion.div
          className={cn(
            "relative flex flex-col items-center gap-2 text-yellow-500 dark:text-[#F5EA1E]"
          )}
          initial={{ opacity: 0, y: 20 }}
          onMouseEnter={() => handleMouseEnter("Motion")}
          onMouseLeave={handleMouseLeave}
          transition={{
            duration: 0.3,
            delay: 0.4,
            ease: [0.23, 1, 0.32, 1],
          }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Image
            alt="Motion"
            className="rounded-full"
            height={32}
            src="/motion.png"
            width={32}
          />
          <motion.span
            animate={{
              scale: hoveredItem === "Motion" ? 1.1 : 1,
              fontWeight: hoveredItem === "Motion" ? 500 : 400,
            }}
            className="mt-1 whitespace-nowrap text-center text-black text-xs dark:text-white"
          >
            Motion
          </motion.span>
        </motion.div>

        <motion.div
          className={cn(
            "relative flex flex-col items-center gap-2 text-black dark:text-white"
          )}
          initial={{ opacity: 0, y: 20 }}
          onMouseEnter={() => handleMouseEnter("shadcn/ui")}
          onMouseLeave={handleMouseLeave}
          transition={{
            duration: 0.3,
            delay: 0.5,
            ease: [0.23, 1, 0.32, 1],
          }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <ShadcnIcon
            aria-label="shadcn/ui"
            className="h-8 w-8 text-black dark:text-white"
          />
          <motion.span
            animate={{
              scale: hoveredItem === "shadcn/ui" ? 1.1 : 1,
              fontWeight: hoveredItem === "shadcn/ui" ? 500 : 400,
            }}
            className="mt-1 whitespace-nowrap text-center text-xs"
          >
            shadcn/ui
          </motion.span>
        </motion.div>

        <motion.div
          className={cn(
            "relative col-span-1 col-start-1 flex flex-col items-center gap-2 text-black md:col-auto dark:text-white"
          )}
          initial={{ opacity: 0, y: 20 }}
          onMouseEnter={() => handleMouseEnter("Next.js")}
          onMouseLeave={handleMouseLeave}
          transition={{
            duration: 0.3,
            delay: 0.6,
            ease: [0.23, 1, 0.32, 1],
          }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Nextjs aria-label="Next.js" className="h-8 w-8" />
          <motion.span
            animate={{
              scale: hoveredItem === "Next.js" ? 1.1 : 1,
              fontWeight: hoveredItem === "Next.js" ? 500 : 400,
            }}
            className="mt-1 whitespace-nowrap text-center text-xs"
          >
            Next.js
          </motion.span>
        </motion.div>
        <motion.div
          className={cn(
            "relative col-span-1 col-start-3 flex flex-col items-center gap-2 text-black md:col-auto dark:text-white"
          )}
          initial={{ opacity: 0, y: 20 }}
          onMouseEnter={() => handleMouseEnter("React")}
          onMouseLeave={handleMouseLeave}
          transition={{
            duration: 0.3,
            delay: 0.7,
            ease: [0.23, 1, 0.32, 1],
          }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <ReactIcon aria-label="React" className="h-8 w-8" />
          <motion.span
            animate={{
              scale: hoveredItem === "React" ? 1.1 : 1,
              fontWeight: hoveredItem === "React" ? 500 : 400,
            }}
            className="mt-1 whitespace-nowrap text-center text-xs"
          >
            React
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
