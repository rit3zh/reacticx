"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    subtitle?: string;
    size?: "sm" | "md" | "lg";
}

export default function Loader({
    title = "Configuring your account...",
    subtitle = "Please wait while we prepare everything for you",
    size = "md",
    className,
    ...props
}: LoaderProps) {
    const sizeConfig = {
        sm: {
            container: "size-20",
            titleClass: "text-sm/tight font-medium",
            subtitleClass: "text-xs/relaxed",
            spacing: "space-y-2",
            maxWidth: "max-w-48",
        },
        md: {
            container: "size-32",
            titleClass: "text-base/snug font-medium",
            subtitleClass: "text-sm/relaxed",
            spacing: "space-y-3",
            maxWidth: "max-w-56",
        },
        lg: {
            container: "size-40",
            titleClass: "text-lg/tight font-semibold",
            subtitleClass: "text-base/relaxed",
            spacing: "space-y-4",
            maxWidth: "max-w-64",
        },
    };

    const config = sizeConfig[size];

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-8 p-8",
                className
            )}
            {...props}
        >
            {/* Enhanced Monochrome Loader */}
            <motion.div
                className={cn("relative", config.container)}
                animate={{
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: [0.4, 0, 0.6, 1],
                }}
            >
                {/* Outer elegant ring with shimmer */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, rgb(0, 0, 0) 90deg, transparent 180deg)`,
                        mask: `radial-gradient(circle at 50% 50%, transparent 35%, black 37%, black 39%, transparent 41%)`,
                        WebkitMask: `radial-gradient(circle at 50% 50%, transparent 35%, black 37%, black 39%, transparent 41%)`,
                        opacity: 0.8,
                    }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />

                {/* Primary animated ring with gradient */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, rgb(0, 0, 0) 120deg, rgba(0, 0, 0, 0.5) 240deg, transparent 360deg)`,
                        mask: `radial-gradient(circle at 50% 50%, transparent 42%, black 44%, black 48%, transparent 50%)`,
                        WebkitMask: `radial-gradient(circle at 50% 50%, transparent 42%, black 44%, black 48%, transparent 50%)`,
                        opacity: 0.9,
                    }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: [0.4, 0, 0.6, 1],
                    }}
                />

                {/* Secondary elegant ring - counter rotation */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `conic-gradient(from 180deg, transparent 0deg, rgba(0, 0, 0, 0.6) 45deg, transparent 90deg)`,
                        mask: `radial-gradient(circle at 50% 50%, transparent 52%, black 54%, black 56%, transparent 58%)`,
                        WebkitMask: `radial-gradient(circle at 50% 50%, transparent 52%, black 54%, black 56%, transparent 58%)`,
                        opacity: 0.35,
                    }}
                    animate={{
                        rotate: [0, -360],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: [0.4, 0, 0.6, 1],
                    }}
                />

                {/* Accent particles */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `conic-gradient(from 270deg, transparent 0deg, rgba(0, 0, 0, 0.4) 20deg, transparent 40deg)`,
                        mask: `radial-gradient(circle at 50% 50%, transparent 61%, black 62%, black 63%, transparent 64%)`,
                        WebkitMask: `radial-gradient(circle at 50% 50%, transparent 61%, black 62%, black 63%, transparent 64%)`,
                        opacity: 0.5,
                    }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />

                {/* Dark mode variants */}
                <motion.div
                    className="absolute inset-0 rounded-full dark:block hidden"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, rgb(255, 255, 255) 90deg, transparent 180deg)`,
                        mask: `radial-gradient(circle at 50% 50%, transparent 35%, black 37%, black 39%, transparent 41%)`,
                        WebkitMask: `radial-gradient(circle at 50% 50%, transparent 35%, black 37%, black 39%, transparent 41%)`,
                        opacity: 0.8,
                    }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />

                <motion.div
                    className="absolute inset-0 rounded-full dark:block hidden"
                    style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, rgb(255, 255, 255) 120deg, rgba(255, 255, 255, 0.5) 240deg, transparent 360deg)`,
                        mask: `radial-gradient(circle at 50% 50%, transparent 42%, black 44%, black 48%, transparent 50%)`,
                        WebkitMask: `radial-gradient(circle at 50% 50%, transparent 42%, black 44%, black 48%, transparent 50%)`,
                        opacity: 0.9,
                    }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: [0.4, 0, 0.6, 1],
                    }}
                />

                <motion.div
                    className="absolute inset-0 rounded-full dark:block hidden"
                    style={{
                        background: `conic-gradient(from 180deg, transparent 0deg, rgba(255, 255, 255, 0.6) 45deg, transparent 90deg)`,
                        mask: `radial-gradient(circle at 50% 50%, transparent 52%, black 54%, black 56%, transparent 58%)`,
                        WebkitMask: `radial-gradient(circle at 50% 50%, transparent 52%, black 54%, black 56%, transparent 58%)`,
                        opacity: 0.35,
                    }}
                    animate={{
                        rotate: [0, -360],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: [0.4, 0, 0.6, 1],
                    }}
                />

                <motion.div
                    className="absolute inset-0 rounded-full dark:block hidden"
                    style={{
                        background: `conic-gradient(from 270deg, transparent 0deg, rgba(255, 255, 255, 0.4) 20deg, transparent 40deg)`,
                        mask: `radial-gradient(circle at 50% 50%, transparent 61%, black 62%, black 63%, transparent 64%)`,
                        WebkitMask: `radial-gradient(circle at 50% 50%, transparent 61%, black 62%, black 63%, transparent 64%)`,
                        opacity: 0.5,
                    }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />
            </motion.div>

            {/* Enhanced Typography with Breathing Animation */}
            <motion.div
                className={cn("text-center", config.spacing, config.maxWidth)}
                initial={{ opacity: 0, y: 12 }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.4,
                    duration: 1,
                    ease: [0.4, 0, 0.2, 1],
                }}
            >
                {/* Clean title with subtle animation */}
                <motion.h1
                    className={cn(
                        config.titleClass,
                        "text-black/90 dark:text-white/90 font-medium tracking-[-0.02em] leading-[1.15] antialiased"
                    )}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.6,
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                >
                    <motion.span
                        animate={{
                            opacity: [0.9, 0.7, 0.9],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: [0.4, 0, 0.6, 1],
                        }}
                    >
                        {title}
                    </motion.span>
                </motion.h1>

                {/* Clean subtitle with subtle animation */}
                <motion.p
                    className={cn(
                        config.subtitleClass,
                        "text-black/60 dark:text-white/60 font-normal tracking-[-0.01em] leading-[1.45] antialiased"
                    )}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.8,
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                >
                    <motion.span
                        animate={{
                            opacity: [0.6, 0.4, 0.6],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: [0.4, 0, 0.6, 1],
                        }}
                    >
                        {subtitle}
                    </motion.span>
                </motion.p>
            </motion.div>
        </div>
    );
}
