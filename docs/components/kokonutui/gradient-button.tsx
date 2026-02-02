/**
 * @author: @dorianbaffier
 * @description: Gradient Button
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ColorVariant = "emerald" | "purple" | "orange";

interface GradientColors {
  dark: {
    border: string;
    overlay: string;
    accent: string;
    text: string;
    glow: string;
    textGlow: string;
    hover: string;
  };
  light: {
    border: string;
    base: string;
    overlay: string;
    accent: string;
    text: string;
    glow: string;
    hover: string;
  };
}

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  label?: string;
  className?: string;
  variant?: ColorVariant;
}

const gradientColors: Record<ColorVariant, GradientColors> = {
  emerald: {
    dark: {
      border: "from-[#336C4F] via-[#0C1F21] to-[#0D6437]",
      overlay: "from-[#347B52]/40 via-[#0C1F21] to-[#0D6437]/30",
      accent: "from-[#87F6B7]/10 via-[#0C1F21] to-[#17362A]/50",
      text: "from-[#8AEECA] to-[#73F8A8]",
      glow: "rgba(135,246,183,0.1)",
      textGlow: "rgba(135,246,183,0.4)",
      hover: "from-[#17362A]/20 via-[#87F6B7]/10 to-[#17362A]/20",
    },
    light: {
      border: "from-emerald-400 via-emerald-300 to-emerald-200",
      base: "from-emerald-50 via-emerald-50/80 to-emerald-50/90",
      overlay: "from-emerald-300/30 via-emerald-200/20 to-emerald-400/20",
      accent: "from-emerald-400/20 via-emerald-300/10 to-emerald-200/30",
      text: "from-emerald-700 to-emerald-600",
      glow: "rgba(52,211,153,0.2)",
      hover: "from-emerald-300/30 via-emerald-200/20 to-emerald-300/30",
    },
  },
  purple: {
    dark: {
      border: "from-[#6B46C1] via-[#0C1F21] to-[#553C9A]",
      overlay: "from-[#7E22CE]/40 via-[#0C1F21] to-[#6B46C1]/30",
      accent: "from-[#E9D8FD]/10 via-[#0C1F21] to-[#44337A]/50",
      text: "from-[#E9D8FD] to-[#D6BCFA]",
      glow: "rgba(159,122,234,0.1)",
      textGlow: "rgba(159,122,234,0.4)",
      hover: "from-[#44337A]/20 via-[#B794F4]/10 to-[#44337A]/20",
    },
    light: {
      border: "from-purple-400 via-purple-300 to-purple-200",
      base: "from-purple-50 via-purple-50/80 to-purple-50/90",
      overlay: "from-purple-300/30 via-purple-200/20 to-purple-400/20",
      accent: "from-purple-400/20 via-purple-300/10 to-purple-200/30",
      text: "from-purple-700 to-purple-600",
      glow: "rgba(159,122,234,0.2)",
      hover: "from-purple-300/30 via-purple-200/20 to-purple-300/30",
    },
  },
  orange: {
    dark: {
      border: "from-[#C05621] via-[#0C1F21] to-[#9C4221]",
      overlay: "from-[#DD6B20]/40 via-[#0C1F21] to-[#C05621]/30",
      accent: "from-[#FED7AA]/10 via-[#0C1F21] to-[#7B341E]/50",
      text: "from-[#FED7AA] to-[#FBD38D]",
      glow: "rgba(237,137,54,0.1)",
      textGlow: "rgba(237,137,54,0.4)",
      hover: "from-[#7B341E]/20 via-[#ED8936]/10 to-[#7B341E]/20",
    },
    light: {
      border: "from-orange-400 via-orange-300 to-orange-200",
      base: "from-orange-50 via-orange-50/80 to-orange-50/90",
      overlay: "from-orange-300/30 via-orange-200/20 to-orange-400/20",
      accent: "from-orange-400/20 via-orange-300/10 to-orange-200/30",
      text: "from-orange-700 to-orange-600",
      glow: "rgba(237,137,54,0.2)",
      hover: "from-orange-300/30 via-orange-200/20 to-orange-300/30",
    },
  },
};

export default function GradientButton({
  label = "Welcome",
  className,
  variant = "emerald",
  ...props
}: GradientButtonProps) {
  const colors = gradientColors[variant];

  return (
    <Button
      className={cn(
        "group relative h-12 overflow-hidden rounded-lg px-4 transition-all duration-500",
        className
      )}
      variant="ghost"
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-linear-to-b p-[2px]",
          "dark:bg-none",
          colors.light.border,
          colors.dark.border
        )}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-lg opacity-90",
            "bg-white/80",
            "dark:bg-[#0C1F21]"
          )}
        />
      </div>

      <div
        className={cn(
          "absolute inset-[2px] rounded-lg opacity-95",
          "bg-white/80",
          "dark:bg-[#0C1F21]"
        )}
      />

      <div
        className={cn(
          "absolute inset-[2px] rounded-lg bg-linear-to-r opacity-90",
          colors.light.base,
          "dark:from-[#0C1F21] dark:via-[#0C1F21] dark:to-[#0C1F21]"
        )}
      />
      <div
        className={cn(
          "absolute inset-[2px] rounded-lg bg-linear-to-b opacity-80",
          colors.light.overlay,
          colors.dark.overlay
        )}
      />
      <div
        className={cn(
          "absolute inset-[2px] rounded-lg bg-linear-to-br",
          colors.light.accent,
          colors.dark.accent
        )}
      />

      <div
        className={cn(
          "absolute inset-[2px] rounded-lg",
          `shadow-[inset_0_0_10px_${colors.light.glow}]`,
          `dark:shadow-[inset_0_0_10px_${colors.dark.glow}]`
        )}
      />

      <div className="relative flex items-center justify-center gap-2">
        <span
          className={cn(
            "bg-linear-to-b bg-clip-text font-light text-lg text-transparent tracking-tighter",
            colors.light.text,
            colors.dark.text,
            `dark:drop-shadow-[0_0_12px_${colors.dark.textGlow}]`
          )}
        >
          {label}
        </span>
      </div>

      <div
        className={cn(
          "absolute inset-[2px] rounded-lg bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          colors.light.hover,
          colors.dark.hover
        )}
      />
    </Button>
  );
}
