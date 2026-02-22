import type {
  ISiriBorderConfig,
  ISiriGlowConfig,
  ISiriNoiseConfig,
  ISiriShimmerConfig,
  ISiriToggleOptions,
  ISiriWaveConfig,
  RGB,
  IMergedConfigs,
  IDefaultOverrides,
} from "./types";
import {
  DEFAULT_BORDER,
  DEFAULT_GLOW,
  DEFAULT_NOISE,
  DEFAULT_SHIMMER,
  DEFAULT_WAVE,
} from "./const";

function hexToRgb<T extends string>(hex: T): RGB {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  return [(n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255];
}

function mergeConfig<T extends IDefaultOverrides, O extends ISiriToggleOptions>(
  defaults: T,
  override?: O,
): IMergedConfigs {
  return {
    wave: {
      ...DEFAULT_WAVE,
      ...defaults.wave,
      ...override?.wave,
    } as Required<ISiriWaveConfig>,
    noise: {
      ...DEFAULT_NOISE,
      ...defaults.noise,
      ...override?.noise,
    } as Required<ISiriNoiseConfig>,
    glow: {
      ...DEFAULT_GLOW,
      ...defaults.glow,
      ...override?.glow,
    } as Required<ISiriGlowConfig>,
    shimmer: {
      ...DEFAULT_SHIMMER,
      ...defaults.shimmer,
      ...override?.shimmer,
    } as Required<ISiriShimmerConfig>,
    border: {
      ...DEFAULT_BORDER,
      ...defaults.border,
      ...override?.border,
    } as Required<ISiriBorderConfig>,
  };
}

export { hexToRgb, mergeConfig };
