import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Interface for the Iphone15Pro component props
interface Iphone15ProProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  src?: string;
  alt?: string;
}

const Iphone15Pro: React.FC<Iphone15ProProps> = ({
  width = "100%",
  height = "auto",
  src,
  alt = "iPhone screen content",
  className,
  ...props
}) => {
  return (
    <div className={cn("relative", className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 433 882"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-500 ease-in-out"
        {...props}
      >
        {/* Outer frame */}
        <path
          d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />
        {/* Side buttons */}
        <path
          d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />
        <path
          d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />
        <path
          d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />
        <path
          d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />

        {/* Inner body */}
        <path
          d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
          className="fill-[#262626] dark:fill-black" // Simplified dark mode fill
        />

        {/* Top speaker grille */}
        <path
          opacity="0.5"
          d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />

        {/* Screen area */}
        <path
          d="M21.25 75C21.25 44.2101 46.2101 19.25 77 19.25H355C385.79 19.25 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 21.25 837.79 21.25 807V75Z"
          className="fill-[#111] dark:fill-[#F5F5F5]" // Screen background
        />

        {/* Screen Content Area */}
        {src && (
          <foreignObject
            x="21.25"
            y="19.25"
            width="389.5"
            height="843.5"
            clipPath="url(#roundedCorners)"
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "55.75px",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#111",
              }}
              className="dark:bg-[#F5F5F5]"
            >
              <Image
                src={src}
                alt={alt}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </foreignObject>
        )}

        <defs>
          <clipPath id="roundedCorners">
            <rect
              x="21.25"
              y="19.25"
              width="389.5"
              height="843.5"
              rx="55.75"
              ry="55.75"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

interface TriplePhoneHeroProps {
  imageLeftSrc: string;
  imageLeftAlt?: string;
  imageCenterSrc: string;
  imageCenterAlt?: string;
  imageRightSrc: string;
  imageRightAlt?: string;
}

const TriplePhoneHero: React.FC<TriplePhoneHeroProps> = ({
  imageLeftSrc,
  imageLeftAlt = "Left phone screen content",
  imageCenterSrc,
  imageCenterAlt = "Center phone screen content",
  imageRightSrc,
  imageRightAlt = "Right phone screen content",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-30% 0px -30% 0px",
  });

  const common = { duration: 1.2, ease: [0.4, 0, 0.2, 1] };

  const centerVariant = {
    hidden: { opacity: 0, y: "60%", scale: 0.85 },
    visible: {
      opacity: 1,
      y: "15%",
      scale: 1,
      transition: { ...common },
    },
  };
  const side = (dir: "left" | "right") => ({
    hidden: { opacity: 0, y: "65%", x: "0%", rotate: 0, scale: 0.85 },
    visible: {
      opacity: 0.8,
      y: "25%",
      x: dir === "left" ? "-50%" : "50%",
      rotate: dir === "left" ? -10 : 10,
      scale: 1,
      transition: { ...common, delay: 0.15 },
    },
  });

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[600px] w-full items-center justify-center"
    >
      <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
        {/* left phone */}
        <motion.div
          variants={side("left") as any}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute w-[280px] md:w-[320px] lg:w-[360px] z-10"
        >
          <Iphone15Pro src={imageLeftSrc} alt={imageLeftAlt} />
        </motion.div>

        {/* center phone */}
        <motion.div
          variants={centerVariant as any}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative w-[300px] md:w-[340px] lg:w-[380px] z-20"
        >
          <Iphone15Pro src={imageCenterSrc} alt={imageCenterAlt} />
        </motion.div>

        {/* right phone */}
        <motion.div
          variants={side("right") as any}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute w-[280px] md:w-[320px] lg:w-[360px] z-10"
        >
          <Iphone15Pro src={imageRightSrc} alt={imageRightAlt} />
        </motion.div>
      </div>
    </div>
  );
};

export default TriplePhoneHero;
