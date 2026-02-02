"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import CircleTheme from "@/components/icons/circle-theme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      className="cursor-pointer rounded-lg border border-transparent px-2 py-0.5 transition-all hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      size="sm"
      variant="ghost"
    >
      {theme === "light" ? (
        <CircleTheme className="h-5 w-5 text-black" />
      ) : (
        <CircleTheme className="h-5 w-5 text-white" />
      )}
    </Button>
  );
}
