"use client";

import { CheckCheck, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { PackageManagerTabs } from "./package-manager-tabs";

const REGISTRY_URL: string = "https://reacticx-ui-components.pages.dev";

function SuccessParticles<T extends React.RefObject<HTMLButtonElement>>({
  buttonRef,
}: {
  buttonRef: T;
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
  const [prefetchedCode, setPrefetchedCode] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const terminalButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  const getFileName = useCallback(() => {
    const [folder, filename] = link.split("/");
    return filename ? filename : folder;
  }, [link]);

  // Pre-fetch the code so it's ready when user clicks
  const prefetchCode = useCallback(async () => {
    if (prefetchedCode || isFetching) return;

    setIsFetching(true);
    try {
      const registryRes = await fetch(`${REGISTRY_URL}/registry.json`);
      if (!registryRes.ok) return;

      const registry = await registryRes.json();
      const componentName = getFileName();
      const component = registry.components[componentName];
      if (!component) return;

      const cleanPath = component.path.replace(/^src\/components\//, "");
      const fileContents: string[] = [];

      for (const file of component.files) {
        if (file.endsWith(".tsx") || file.endsWith(".ts")) {
          const fileUrl = `${REGISTRY_URL}/${cleanPath}/${file}`;
          const res = await fetch(fileUrl);
          if (!res.ok) continue;
          const content = await res.text();
          if (
            content &&
            !content.trim().startsWith("<!DOCTYPE") &&
            !content.trim().startsWith("<html")
          ) {
            fileContents.push(`// ${file}\n${content}`);
          }
        }
      }

      if (fileContents.length > 0) {
        setPrefetchedCode(fileContents.join("\n\n"));
      }
    } catch (err) {
      console.warn("Prefetch failed:", err);
    } finally {
      setIsFetching(false);
    }
  }, [prefetchedCode, isFetching, getFileName]);

  // Prefetch on mount for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      prefetchCode();
    }, 1000);
    return () => clearTimeout(timer);
  }, [prefetchCode]);

  const handleCopyClick = async () => {
    setError(null);

    // If we have prefetched code, copy it synchronously (works with user gesture)
    if (prefetchedCode) {
      const textArea = document.createElement("textarea");
      textArea.value = prefetchedCode;
      textArea.style.cssText =
        "position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none;";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      let copySuccess = false;
      try {
        copySuccess = document.execCommand("copy");
      } catch (e) {
        console.warn("execCommand failed:", e);
      }

      document.body.removeChild(textArea);

      if (copySuccess) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return;
      }

      // Try clipboard API as fallback
      try {
        await navigator.clipboard.writeText(prefetchedCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return;
      } catch (e) {
        console.warn("Clipboard API failed:", e);
        setError("Failed to copy - please try again");
        return;
      }
    }

    // If no prefetched code, fetch now and prompt to click again
    setIsPending(true);
    try {
      await prefetchCode();
      setError("Code loaded - click again to copy");
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      setError("Failed to load code");
    } finally {
      setIsPending(false);
    }
  };

  const handleTerminalClick = async (packageManager: string) => {
    try {
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

      // Try multiple clipboard methods
      let copySuccess = false;

      if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
        try {
          const blob = new Blob([commandToCopy], { type: "text/plain" });
          const clipboardItem = new ClipboardItem({ "text/plain": blob });
          await navigator.clipboard.write([clipboardItem]);
          copySuccess = true;
        } catch (e) {
          console.warn("ClipboardItem method failed:", e);
        }
      }

      if (!copySuccess && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(commandToCopy);
          copySuccess = true;
        } catch (e) {
          console.warn("writeText method failed:", e);
        }
      }

      if (!copySuccess) {
        const textArea = document.createElement("textarea");
        textArea.value = commandToCopy;
        textArea.style.cssText =
          "position:fixed;left:-9999px;top:-9999px;opacity:0;";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          copySuccess = document.execCommand("copy");
        } catch (e) {
          console.warn("execCommand method failed:", e);
        }
        document.body.removeChild(textArea);
      }

      if (copySuccess) {
        setIsTerminalCopied(true);
        setTimeout(() => {
          setIsTerminalCopied(false);
        }, 1000);
      } else {
        throw new Error("All clipboard methods failed");
      }
    } catch (err) {
      console.error("Terminal clipboard error:", err);
      setError("Failed to copy command");
      setTimeout(() => setError(null), 3000);
    }
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
