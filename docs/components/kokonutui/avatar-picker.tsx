"use client";

/**
 * @author: @dorianbaffier
 * @description: Avatar Picker
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { Check, ChevronRight, Crown, User2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Avatar {
  id: number;
  svg: React.ReactNode;
  alt: string;
}

const avatars: Avatar[] = [
  {
    id: 1,
    svg: (
      <svg
        aria-label="Avatar 1"
        fill="none"
        height="40"
        role="img"
        viewBox="0 0 36 36"
        width="40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Avatar 1</title>
        <mask
          height="36"
          id=":r111:"
          maskUnits="userSpaceOnUse"
          width="36"
          x="0"
          y="0"
        >
          <rect fill="#FFFFFF" height="36" rx="72" width="36" />
        </mask>
        <g mask="url(#:r111:)">
          <rect fill="#ff005b" height="36" width="36" />
          <rect
            fill="#ffb238"
            height="36"
            rx="6"
            transform="translate(9 -5) rotate(219 18 18) scale(1)"
            width="36"
            x="0"
            y="0"
          />
          <g transform="translate(4.5 -4) rotate(9 18 18)">
            <path
              d="M15 19c2 1 4 1 6 0"
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
            />
            <rect
              fill="#000000"
              height="2"
              rx="1"
              stroke="none"
              width="1.5"
              x="10"
              y="14"
            />
            <rect
              fill="#000000"
              height="2"
              rx="1"
              stroke="none"
              width="1.5"
              x="24"
              y="14"
            />
          </g>
        </g>
      </svg>
    ),
    alt: "Avatar 1",
  },
  {
    id: 2,
    svg: (
      <svg
        aria-label="Avatar 4"
        fill="none"
        height="40"
        role="img"
        viewBox="0 0 36 36"
        width="40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Avatar 4</title>
        <mask
          height="36"
          id=":R4mrttb:"
          maskUnits="userSpaceOnUse"
          width="36"
          x="0"
          y="0"
        >
          <rect fill="#FFFFFF" height="36" rx="72" width="36" />
        </mask>
        <g mask="url(#:R4mrttb:)">
          <rect fill="#ff7d10" height="36" width="36" />
          <rect
            fill="#0a0310"
            height="36"
            rx="6"
            transform="translate(5 -1) rotate(55 18 18) scale(1.1)"
            width="36"
            x="0"
            y="0"
          />
          <g transform="translate(7 -6) rotate(-5 18 18)">
            <path
              d="M15 20c2 1 4 1 6 0"
              fill="none"
              stroke="#FFFFFF"
              strokeLinecap="round"
            />
            <rect
              fill="#FFFFFF"
              height="2"
              rx="1"
              stroke="none"
              width="1.5"
              x="14"
              y="14"
            />
            <rect
              fill="#FFFFFF"
              height="2"
              rx="1"
              stroke="none"
              width="1.5"
              x="20"
              y="14"
            />
          </g>
        </g>
      </svg>
    ),
    alt: "Avatar 4",
  },
  {
    id: 3,
    svg: (
      <svg
        aria-label="Avatar 2"
        fill="none"
        height="40"
        role="img"
        viewBox="0 0 36 36"
        width="40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Avatar 2</title>
        <mask
          height="36"
          id=":r11c:"
          maskUnits="userSpaceOnUse"
          width="36"
          x="0"
          y="0"
        >
          <rect fill="#FFFFFF" height="36" rx="72" width="36" />
        </mask>
        <g mask="url(#:r11c:)">
          <rect fill="#0a0310" height="36" width="36" />
          <rect
            fill="#ff005b"
            height="36"
            rx="36"
            transform="translate(-3 7) rotate(227 18 18) scale(1.2)"
            width="36"
            x="0"
            y="0"
          />
          <g transform="translate(-3 3.5) rotate(7 18 18)">
            <path d="M13,21 a1,0.75 0 0,0 10,0" fill="#FFFFFF" />
            <rect
              fill="#FFFFFF"
              height="2"
              rx="1"
              stroke="none"
              width="1.5"
              x="12"
              y="14"
            />
            <rect
              fill="#FFFFFF"
              height="2"
              rx="1"
              stroke="none"
              width="1.5"
              x="22"
              y="14"
            />
          </g>
        </g>
      </svg>
    ),
    alt: "Avatar 2",
  },
  {
    id: 4,
    svg: (
      <svg
        aria-label="Avatar 3"
        fill="none"
        height="40"
        role="img"
        viewBox="0 0 36 36"
        width="40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Avatar 3</title>
        <mask
          height="36"
          id=":r1gg:"
          maskUnits="userSpaceOnUse"
          width="36"
          x="0"
          y="0"
        >
          <rect fill="#FFFFFF" height="36" rx="72" width="36" />
        </mask>
        <g mask="url(#:r1gg:)">
          <rect fill="#d8fcb3" height="36" width="36" />
          <rect
            fill="#89fcb3"
            height="36"
            rx="6"
            transform="translate(9 -5) rotate(219 18 18) scale(1)"
            width="36"
            x="0"
            y="0"
          />
          <g transform="translate(4.5 -4) rotate(9 18 18)">
            <path
              d="M15 19c2 1 4 1 6 0"
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
            />
            <rect
              fill="#000000"
              height="2"
              rx="1"
              stroke="none"
              width="1.5"
              x="10"
              y="14"
            />
            <rect
              fill="#000000"
              height="2"
              rx="1"
              stroke="none"
              width="1.5"
              x="24"
              y="14"
            />
          </g>
        </g>
      </svg>
    ),
    alt: "Avatar 3",
  },
];

interface ProfileSetupProps {
  onComplete?: (data: { username: string; avatarId: number }) => void;
  className?: string;
}

const mainAvatarVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const pickerVariants = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  },
  item: {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  },
};

const DetailRing = () => (
  <div className="absolute inset-0 rounded-full">
    <svg
      aria-label="Decorative outer ring animation"
      className="absolute inset-0 h-full w-full animate-[spin_30s_linear_infinite]"
      viewBox="0 0 100 100"
    >
      <title>Decorative outer spinning ring</title>
      <defs>
        <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop
            offset="50%"
            stopColor="hsl(var(--primary))"
            stopOpacity="0.1"
          />
          <stop
            offset="100%"
            stopColor="hsl(var(--primary))"
            stopOpacity="0.3"
          />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        fill="none"
        r="48"
        stroke="url(#gradient)"
        strokeDasharray="1,3"
        strokeWidth="0.5"
      />
    </svg>
    <svg
      aria-label="Decorative inner ring animation"
      className="absolute inset-0 h-full w-full animate-[spin_20s_linear_infinite_reverse]"
      viewBox="0 0 100 100"
    >
      <title>Decorative inner spinning ring</title>
      <circle
        cx="50"
        cy="50"
        fill="none"
        r="45"
        stroke="url(#gradient)"
        strokeDasharray="1,2"
        strokeWidth="0.25"
      />
    </svg>
  </div>
);

export default function ProfileSetup({
  onComplete,
  className,
}: ProfileSetupProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(avatars[0]);
  const [username, setUsername] = useState("");
  const [rotationCount, setRotationCount] = useState(0);
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleAvatarSelect = (avatar: Avatar) => {
    if (avatar.id === selectedAvatar.id) return;
    setRotationCount((prev) => prev + 720);
    setSelectedAvatar(avatar);
  };

  const handleSubmit = () => {
    if (username.trim() && onComplete) {
      onComplete({
        username: username.trim(),
        avatarId: selectedAvatar.id,
      });
    }
  };

  const isValid = username.trim().length >= 3;
  const showError = username.trim().length > 0 && username.trim().length < 3;

  return (
    <Card
      className={cn(
        "relative mx-auto w-full max-w-[400px] overflow-hidden border-primary/10 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-sm",
        className
      )}
    >
      <div className="-top-px absolute inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="bg-gradient-to-br from-primary/90 to-primary/60 bg-clip-text font-bold text-2xl text-transparent">
              Create Your Profile
            </h2>
            <p className="text-muted-foreground text-sm">
              Choose an avatar and enter your username to begin
            </p>
          </div>

          {/* Avatar Section */}
          <div className="relative flex flex-col items-center">
            {/* Main Avatar */}
            <motion.div
              animate="animate"
              className="relative h-28 w-28"
              initial="initial"
              variants={mainAvatarVariants as any}
            >
              <DetailRing />

              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/10 to-transparent opacity-50 blur-md" />

              <div className="relative h-full w-full overflow-hidden rounded-full border border-primary/20 bg-gradient-to-b from-background/80 to-background shadow-lg shadow-primary/5">
                <motion.div
                  animate={{ rotate: rotationCount }}
                  className="absolute inset-0 flex items-center justify-center"
                  transition={{
                    duration: 0.7,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <div className="scale-[2.8] transform">
                    {selectedAvatar.svg}
                  </div>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
              </div>

              <div className="-bottom-1 -right-1 absolute flex h-7 w-7 items-center justify-center rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm">
                <Crown className="h-4 w-4 text-primary" />
              </div>
            </motion.div>

            {/* Avatar Grid */}
            <motion.div
              animate="animate"
              className="mt-6 grid w-full max-w-[240px] grid-cols-4 gap-3"
              initial="initial"
              variants={pickerVariants.container}
            >
              {avatars.map((avatar) => (
                <motion.button
                  aria-label={`Select ${avatar.alt}`}
                  aria-pressed={selectedAvatar.id === avatar.id}
                  className={cn(
                    "group/avatar relative h-12 w-12 rounded-full",
                    "transition-all duration-300",
                    selectedAvatar.id === avatar.id
                      ? "ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                      : "hover:ring-2 hover:ring-primary/20 hover:ring-offset-2 hover:ring-offset-background"
                  )}
                  key={avatar.id}
                  onClick={() => handleAvatarSelect(avatar)}
                  onMouseEnter={() => setIsHovering(avatar.id)}
                  onMouseLeave={() => setIsHovering(null)}
                  variants={pickerVariants.item as any}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence>
                    {isHovering === avatar.id && (
                      <motion.div
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 rounded-full bg-primary/10"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background opacity-0 transition-opacity duration-300 group-hover/avatar:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="scale-[2.2] transform">{avatar.svg}</div>
                    </div>
                  </div>

                  {selectedAvatar.id === avatar.id && (
                    <div className="-bottom-0.5 -right-0.5 absolute flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Username Input */}
          <div className="space-y-6">
            <div className="relative">
              <div className="relative">
                <Input
                  className={cn(
                    "h-12 pl-10 text-base transition-all duration-200",
                    isFocused && "ring-2 ring-primary/20",
                    showError &&
                      "ring-2 ring-destructive/50 focus-visible:ring-destructive"
                  )}
                  maxLength={20}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder="Enter your username"
                  type="text"
                  value={username}
                />
                <User2
                  className={cn(
                    "-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 transition-colors duration-200",
                    isFocused ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </div>
              <AnimatePresence>
                {showError && (
                  <motion.p
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute mt-2 ml-1 text-destructive text-xs"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: -10 }}
                  >
                    Username must be at least 3 characters
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <Button
              className="group relative h-12 w-full text-base"
              disabled={!isValid}
              onClick={handleSubmit}
            >
              <span className="relative z-10">Start Adventure</span>
              <ChevronRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
