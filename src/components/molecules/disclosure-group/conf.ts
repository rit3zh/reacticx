import type { BlurTint } from "expo-blur";

const DisclosureGroupThemes = {
  light: {
    cardBackground: "#ffffff",
    itemBackground: "#f4f4f5",
    separatorColor: "#e4e4e7",
    textColor: "#09090b",
    secondaryTextColor: "#71717a",
    chevronColor: "#71717a",
    blurTint: "light" as BlurTint,
  },
  dark: {
    cardBackground: "#18181b",
    itemBackground: "#27272a",
    separatorColor: "#3f3f46",
    textColor: "#fafafa",
    secondaryTextColor: "#a1a1aa",
    chevronColor: "#a1a1aa",
    blurTint: "dark" as BlurTint,
  },
  ocean: {
    cardBackground: "#0c4a6e",
    itemBackground: "#075985",
    separatorColor: "#0369a1",
    textColor: "#e0f2fe",
    secondaryTextColor: "#7dd3fc",
    chevronColor: "#7dd3fc",
    blurTint: "dark" as BlurTint,
  },
  sunset: {
    cardBackground: "#7c2d12",
    itemBackground: "#9a3412",
    separatorColor: "#c2410c",
    textColor: "#fed7aa",
    secondaryTextColor: "#fdba74",
    chevronColor: "#fdba74",
    blurTint: "dark" as BlurTint,
  },
  forest: {
    cardBackground: "#14532d",
    itemBackground: "#166534",
    separatorColor: "#15803d",
    textColor: "#d1fae5",
    secondaryTextColor: "#86efac",
    chevronColor: "#86efac",
    blurTint: "dark" as BlurTint,
  },
  midnight: {
    cardBackground: "#1e1b4b",
    itemBackground: "#312e81",
    separatorColor: "#3730a3",
    textColor: "#ddd6fe",
    secondaryTextColor: "#a5b4fc",
    chevronColor: "#a5b4fc",
    blurTint: "dark" as BlurTint,
  },
} as const;

export { DisclosureGroupThemes };
