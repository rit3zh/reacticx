import type { DotConfig, TextConfig, TimingConfig } from "./types";

const DEFAULT_TIMING: TimingConfig = {
  interval: 300,
  animationDuration: 200,
} as const;

const DEFAULT_DOT: DotConfig = {
  visible: true,
  size: 8,
  color: "#ffffffff",
} as const;

const DEFAULT_TEXT: TextConfig = {
  fontSize: 24,
  fontWeight: "500",
  color: "#ffffffff",
} as const;

export { DEFAULT_TIMING, DEFAULT_DOT, DEFAULT_TEXT };
