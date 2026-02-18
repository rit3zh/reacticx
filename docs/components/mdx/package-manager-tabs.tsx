"use client";

import { CheckCheck } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

type PackageManagerTabsProps = {
  onSelect: (packageManager: string) => void;
  commandName: string;
  prePath: string;
};

const STORAGE_KEY = "package-manager-selection";

const packageManagers = [
  { id: "npm", title: "npm" },
  { id: "bun", title: "bun" },
  { id: "pnpm", title: "pnpm" },
];
const DEFAULT_PACKAGE_MANAGER = "bun";

export function PackageManagerTabs({
  onSelect,
  commandName,
  prePath,
}: PackageManagerTabsProps) {
  const [selected, setSelected] = React.useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_PACKAGE_MANAGER;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_PACKAGE_MANAGER;
      const isValidPackageManager = packageManagers.some((item) => item.id === stored);
      return isValidPackageManager ? stored : DEFAULT_PACKAGE_MANAGER;
    } catch {
      return DEFAULT_PACKAGE_MANAGER;
    }
  });
  const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 });
  const [isCopied, setIsCopied] = React.useState(false);

  const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = React.useRef<HTMLDivElement>(null);
  const copyButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButton = buttonRefs.current.get(selected);
      const container = containerRef.current;

      if (selectedButton && container) {
        const rect = selectedButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setDimensions({
          width: rect.width,
          left: rect.left - containerRect.left,
        });
      }
    };

    requestAnimationFrame(updateDimensions);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [selected]);

  const handleTabClick = (tabId: string) => {
    setSelected(tabId);
    try {
      localStorage.setItem(STORAGE_KEY, tabId);
    } catch {
      // Ignore err
    }
    onSelect(tabId);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    tabId: string,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabClick(tabId);
    }
  };

  const getCommand = (packageManager: string): string => {
    if (packageManager === "pnpm") {
      return `pnpm dlx reacticx add ${commandName}`;
    }
    if (packageManager === "npm") {
      return `npx reacticx add ${commandName}`;
    }
    return `bunx --bun reacticx add ${commandName}`;
  };

  const handleCopyCommand = () => {
    const commandToCopy = getCommand(selected);
    navigator.clipboard.writeText(commandToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
      {/* Tabs */}
      <div
        aria-label="Package manager tabs"
        className={cn(
          "relative flex items-center gap-1",
          "h-8 rounded-md",
          "bg-white dark:bg-neutral-900",
          "border border-black/10 dark:border-white/10",
          "transition-all duration-200",
          "text-black dark:text-white",
        )}
        ref={containerRef}
        role="tablist"
      >
        {/* Active pill */}
        <motion.div
          animate={{
            width: dimensions.width - 4,
            x: dimensions.left + 2,
            opacity: 1,
          }}
          className="absolute z-[1] rounded-md bg-black dark:bg-white"
          initial={false}
          style={{ height: "calc(100% - 4px)", top: "2px" }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />

        <div className="relative z-[2] flex">
          {packageManagers.map((item) => {
            const isSelected = selected === item.id;

            return (
              <motion.button
                key={item.id}
                id={`tab-${item.id}`}
                role="tab"
                type="button"
                tabIndex={isSelected ? 0 : -1}
                aria-selected={isSelected}
                aria-controls={`panel-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el);
                  else buttonRefs.current.delete(item.id);
                }}
                className={cn(
                  "relative flex h-8 items-center justify-center px-3",
                  "rounded-md text-xs font-medium truncate",
                  "transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "text-white dark:text-black"
                    : "text-black/60 hover:bg-black/5 hover:text-black dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white",
                )}
              >
                <span className="truncate">{item.title}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Copy command */}
      <button
        ref={copyButtonRef}
        type="button"
        onClick={handleCopyCommand}
        className={cn(
          "relative h-8 w-full",
          "flex items-center gap-1.5 px-3",
          "rounded-md border font-mono text-xs font-medium",
          "bg-white dark:bg-neutral-900",
          "border-black/10 dark:border-white/10",
          "text-neutral-600 hover:text-black hover:border-black/20",
          "dark:text-neutral-400 dark:hover:text-white dark:hover:border-white/20",
          "transition-all duration-200",
        )}
      >
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-1",
            "transition-opacity duration-200",
            isCopied ? "opacity-100" : "opacity-0",
          )}
        >
          <CheckCheck className="h-3.5 w-3.5 text-green-500" />
          <span className="truncate">Copied to clipboard</span>
        </span>

        <span
          className={cn(
            "truncate transition-opacity duration-200",
            isCopied ? "opacity-0" : "opacity-100",
          )}
        >
          {getCommand(selected)}
        </span>
      </button>
    </div>
  );
}
