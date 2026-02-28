import type { IMeshGradientColor, IPerformance } from "./types";

const DEFAULT_INITIAL_COLORS: IMeshGradientColor[] = [
  { r: 0.0, g: 0.55, b: 0.55 },
  { r: 0.95, g: 0.85, b: 0.3 },
  { r: 0.85, g: 0.95, b: 0.85 },
  { r: 0.1, g: 0.35, b: 0.45 },
];

const DEFAULT_PERFORMANCE: Required<IPerformance> = {
  undersampling: 0.3,
  fpsLock: 60,
};

export { DEFAULT_INITIAL_COLORS, DEFAULT_PERFORMANCE };
