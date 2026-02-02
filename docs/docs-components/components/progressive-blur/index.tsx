// ProgressiveBlur component - fixed version
"use client";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

export type ProgressiveBlurProps = {
  direction?: keyof typeof GRADIENT_ANGLES;
  blurLayers?: number;
  className?: string;
  blurIntensity?: number;
} & HTMLMotionProps<"div">;

export function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 10,
  className,
  blurIntensity = 0.5,
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);

  // Determine fade direction based on the blur direction
  const isHorizontal = direction === "left" || direction === "right";
  const fadeStart = direction === "left" || direction === "top" ? 0 : 100;
  const fadeEnd = direction === "left" || direction === "top" ? 100 : 0;

  return (
    <div className={cn("relative", className)}>
      {Array.from({ length: layers }).map((_, index) => {
        const blurAmount = ((index + 1) / layers) * blurIntensity;
        const opacity = (index + 1) / layers;

        // Create gradient that fades content out
        const gradient = isHorizontal
          ? `linear-gradient(to ${direction === "left" ? "right" : "left"}, rgba(0,0,0,${opacity}) 0%, transparent 100%)`
          : `linear-gradient(to ${direction === "top" ? "bottom" : "top"}, rgba(0,0,0,${opacity}) 0%, transparent 100%)`;

        return (
          <motion.div
            key={index}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${blurAmount}px)`,
              WebkitBackdropFilter: `blur(${blurAmount}px)`,
            }}
            {...props}
          />
        );
      })}
    </div>
  );
}
