"use client";

import React, { useRef } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";

function SuccessParticles({
  buttonRef,
}: {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const rect = buttonRef.current?.getBoundingClientRect();
  if (!rect) return null;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const particles = Array.from({ length: 6 }, (_, index) => ({
    id: `particle-${index}-${Math.random().toString(36).substr(2, 9)}`,
    index,
  }));

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          animate={{
            scale: [0, 1, 0],
            x: [0, (particle.index % 2 ? 1 : -1) * (Math.random() * 50 + 20)],
            y: [0, -Math.random() * 50 - 20],
          }}
          className="fixed h-1 w-1 rounded-full bg-black dark:bg-white"
          initial={{
            scale: 0,
            x: 0,
            y: 0,
          }}
          key={particle.id}
          style={{ left: centerX, top: centerY }}
          transition={{
            duration: 0.6,
            delay: particle.index * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </AnimatePresence>
  );
}

const markdownCache = new Map<string, string>();
interface CopyMarkdownButtonProps {
  markdownUrl: string;
}

function CopyMarkdownButton({ markdownUrl }: CopyMarkdownButtonProps) {
  const [isLoading, setLoading] = React.useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onContentPrefetch = React.useCallback(async () => {
    if (markdownCache.has(markdownUrl)) return;

    try {
      const response = await fetch(markdownUrl);
      const content = await response.text();
      markdownCache.set(markdownUrl, content);
    } catch {
      // Silently fail prefetch, will retry on actual copy
    }
  }, [markdownUrl]);

  const [checked, onClick] = useCopyButton(async () => {
    const cached = markdownCache.get(markdownUrl);
    if (cached) {
      return navigator.clipboard.writeText(cached);
    }

    setLoading(true);
    try {
      const response = await fetch(markdownUrl);
      const content = await response.text();
      markdownCache.set(markdownUrl, content);

      return navigator.clipboard.writeText(content);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      {checked && <SuccessParticles buttonRef={buttonRef} />}
      <Button
        ref={buttonRef}
        variant="secondary"
        size="sm"
        className="h-7 text-xs text-black dark:text-white [&_svg:not([class*='size-'])]:size-3 [&_svg]:text-black dark:[&_svg]:text-white"
        onClick={onClick}
        onFocus={onContentPrefetch}
        onMouseEnter={onContentPrefetch}
        onTouchStart={onContentPrefetch}
        disabled={isLoading}
      >
        {checked ? <Check /> : <Copy />}
        Copy Markdown
      </Button>
    </>
  );
}

export { CopyMarkdownButton };
