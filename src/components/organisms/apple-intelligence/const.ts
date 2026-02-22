import type {
  ISiriBorderConfig,
  ISiriGlowConfig,
  ISiriNoiseConfig,
  ISiriShimmerConfig,
  ISiriWaveConfig,
} from "./types";

const DEFAULT_WAVE: Required<ISiriWaveConfig> = {
  speed: 10,
  strength: 0.3,
  origin: [0.5, 1.0],
};
const DEFAULT_NOISE: Required<ISiriNoiseConfig> = {
  scale: 2.0,
  speed: 4.0,
  strength: 0.6,
};
const DEFAULT_GLOW: Required<Omit<ISiriGlowConfig, "colors">> & {
  colors: string[];
} = {
  speed: 0.15,
  saturation: 0.85,
  lightness: 0.6,
  colors: [],
};
const DEFAULT_SHIMMER: Required<ISiriShimmerConfig> = {
  amount: 0.3,
  speed: 2.5,
};
const DEFAULT_BORDER: Required<ISiriBorderConfig> = {
  margin: 8,
  spread: 16,
  radius: 44,
};

const ZERO3: [number, number, number] = [0, 0, 0];
const MAX_COLORS = 8;

export {
  DEFAULT_WAVE,
  DEFAULT_NOISE,
  DEFAULT_GLOW,
  DEFAULT_SHIMMER,
  DEFAULT_BORDER,
  ZERO3,
  MAX_COLORS,
};
