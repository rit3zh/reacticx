import type { FloatConfig, RoundConfig, ShimmerConfig } from "./types";

const DEFAULT_SHIMMER_CONFIG: ShimmerConfig = {
  duration: 1900,
  width: 0.8,
  colors: [
    "transparent",
    "rgba(239, 68, 68, 0.3)",
    "rgba(239, 68, 68, 0.8)",
    "rgba(239, 68, 68, 1)",
    "rgba(239, 68, 68, 0.5)",
    "transparent",
  ],
} as const;

const DEFAULT_FLOAT_CONFIG: FloatConfig = {
  duration: 100,
  distance: 10,
  scaleAmount: 0.28,
  characterDelay: 10,
} as const;

const DEFAULT_ROUND_CONFIG: RoundConfig = {
  total: -1,
  delayBetween: 2000,
} as const;

const DEFAULT_TEXT_COLOR = "#18181b" as const;
const DEFAULT_TEXT = "Try Reacticx With Expo and React Native" as const;
const MASK_COLOR = "white" as const;
const PADDING = 20 as const;

export {
  DEFAULT_SHIMMER_CONFIG,
  DEFAULT_FLOAT_CONFIG,
  DEFAULT_ROUND_CONFIG,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT,
  MASK_COLOR,
  PADDING,
};
