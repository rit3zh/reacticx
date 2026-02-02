"use client";

import { CheckCheck, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type RefObject, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PackageManagerTabs } from "./package-manager-tabs";

const REGISTRY_URL = "https://reacticx-ui-components.pages.dev";

function SuccessParticles({
  buttonRef,
}: {
  buttonRef: React.RefObject<HTMLButtonElement>;
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

export default function PreviewContent({
  link,
  prePath,
  isBlock = false,
}: {
  link: string;
  prePath: string;
  isBlock?: boolean;
}) {
  const [isPending, setIsPending] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isTerminalCopied, setIsTerminalCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const terminalButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  const getFileName = () => {
    const [folder, filename] = link.split("/");
    return filename ? filename : folder;
  };

  const handleCopyClick = async () => {
    setIsPending(true);
    setError(null);

    try {
      // Fetch registry to get component info
      const registryRes = await fetch(`${REGISTRY_URL}/registry.json`);
      if (!registryRes.ok) {
        throw new Error("Failed to fetch registry");
      }

      const registry = await registryRes.json();
      const componentName = getFileName();
      const component = registry.components[componentName];

      if (!component) {
        throw new Error(`Component "${componentName}" not found`);
      }

      // Fetch all component files and combine them
      const cleanPath = component.path.replace(/^src\/components\//, "");
      const files = await Promise.all(
        component.files
          .filter(
            (file: string) => file.endsWith(".tsx") || file.endsWith(".ts"),
          )
          .map(async (file: string) => {
            const res = await fetch(`${REGISTRY_URL}/${cleanPath}/${file}`);
            if (!res.ok) {
              throw new Error(`Failed to fetch ${file}`);
            }
            const content = await res.text();
            return `// ${file}\n${content}`;
          }),
      );

      const combinedCode = files.join("\n\n");

      // Copy to clipboard
      await navigator.clipboard.writeText(combinedCode);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to copy");
      console.error("Copy error:", err);
    } finally {
      setIsPending(false);
    }
  };

  const handleTerminalClick = (packageManager: string) => {
    const componentName = getFileName();

    let commandToCopy: string;
    const componentAddCommand = `reacticx add ${componentName}`;

    if (packageManager === "pnpm") {
      commandToCopy = `pnpm dlx ${componentAddCommand}`;
    } else if (packageManager === "npm") {
      commandToCopy = `npx ${componentAddCommand}`;
    } else {
      commandToCopy = `bunx --bun ${componentAddCommand}`;
    }

    navigator.clipboard.writeText(commandToCopy);
    setIsTerminalCopied(true);
    setTimeout(() => {
      setIsTerminalCopied(false);
    }, 1000);
  };

  return (
    <>
      {isTerminalCopied && (
        <SuccessParticles
          buttonRef={terminalButtonRef as RefObject<HTMLButtonElement>}
        />
      )}
      {isCopied && (
        <SuccessParticles
          buttonRef={copyButtonRef as RefObject<HTMLButtonElement>}
        />
      )}
      <div className="relative flex w-full flex-col items-start justify-between gap-1 sm:flex-row sm:items-center sm:gap-2">
        <div className="w-full sm:w-auto">
          <PackageManagerTabs
            commandName={getFileName()}
            onSelect={handleTerminalClick}
            prePath={prePath}
          />
        </div>
        <div className="mt-1 flex w-full items-center justify-end gap-2 sm:mt-0 sm:w-auto">
          {!isBlock && (
            <button
              className={cn(
                "relative overflow-hidden",
                "h-7 px-3 font-medium text-xs",
                "bg-white text-black",
                "hover:bg-white/90",
                "transition-all duration-200",
                "group flex items-center justify-center gap-1.5",
                "rounded-md",
                "my-0 py-0 shadow-none",
                "w-fit md:w-full",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
              disabled={isPending}
              onClick={handleCopyClick}
              ref={copyButtonRef}
              type="button"
            >
              {isCopied ? (
                <CheckCheck className="h-3.5 w-3.5 text-black" />
              ) : (
                <Copy
                  className={cn(
                    "h-3.5 w-3.5 text-black",
                    "transition-all duration-200",
                    "group-hover:rotate-[-8deg]",
                  )}
                />
              )}
              <span className="text-black">
                {isPending ? "Copying..." : isCopied ? "Copied!" : "Copy Code"}
              </span>
            </button>
          )}
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
}
