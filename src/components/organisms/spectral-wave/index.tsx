// @ts-check
import React, { useMemo, memo } from "react";
import { View, StyleSheet } from "react-native";
import {
  Canvas,
  Fill,
  Skia,
  Shader,
  type Uniforms,
} from "react-native-skia";
import {
  useSharedValue,
  useFrameCallback,
  useDerivedValue,
} from "react-native-reanimated";
import { SHADER_SOURCE } from "./const";
import { DEFAULTS } from "./conf";
import { colorToRGBA } from "./utils";
import type { ISpectralWave, RGBA } from "./types";

const shader = Skia.RuntimeEffect.Make(SHADER_SOURCE);

export const SpectralWave: React.FC<ISpectralWave> &
  React.FunctionComponent<ISpectralWave> = memo<
  Partial<ISpectralWave> & React.ComponentProps<typeof SpectralWave>
>(
  ({
    width = DEFAULTS.WIDTH,
    height = DEFAULTS.HEIGHT,
    borderRadius = DEFAULTS.BORDER_RADIUS,
    iterations = DEFAULTS.ITERATIONS,
    scale = DEFAULTS.SCALE,
    wavelengthOffset = DEFAULTS.WAVELENGTH_OFFSET,
    wavelengthRange = DEFAULTS.WAVELENGTH_RANGE,
    timeScale = DEFAULTS.TIME_SCALE,
    borderWidth = DEFAULTS.BORDER_WIDTH,
    borderColor = DEFAULTS.BORDER_COLOR,
    borderGlow = DEFAULTS.BORDER_GLOW,
    glowRadius = DEFAULTS.GLOW_RADIUS,
    brightness = DEFAULTS.BRIGHTNESS,
    colors = DEFAULTS.COLORS,
    asChild = false,
    children,
    style,
  }: Partial<ISpectralWave> & React.ComponentProps<typeof SpectralWave>):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const tick = useSharedValue<number>(0);
    useFrameCallback(() => {
      tick.value += 0.016;
    });
    const border = useMemo<RGBA>(() => colorToRGBA(borderColor), [borderColor]);

    const useCustom = colors != null ? 1.0 : 0.0;
    const c0 = useMemo<number[]>(
      () => (colors ? colorToRGBA(colors[0]).slice(0, 3) : [0, 0, 0]),
      [colors?.[0]],
    );
    const c1 = useMemo<number[]>(
      () => (colors ? colorToRGBA(colors[1]).slice(0, 3) : [0, 0, 0]),
      [colors?.[1]],
    );
    const c2 = useMemo<number[]>(
      () => (colors ? colorToRGBA(colors[2]).slice(0, 3) : [0, 0, 0]),
      [colors?.[2]],
    );

    const uniforms = useDerivedValue<Uniforms>(() => ({
      uDimensions: [width, height],
      uTick: tick.value,
      uIterations: iterations,
      uScale: scale,
      uWavelengthOffset: wavelengthOffset,
      uWavelengthRange: wavelengthRange,
      uTimeScale: timeScale,
      uBorderWidth: borderWidth,
      uBorderColor: border,
      uBorderGlow: borderGlow,
      uGlowRadius: glowRadius,
      uBrightness: brightness,
      uUseCustomColors: useCustom,
      uColor0: c0,
      uColor1: c1,
      uColor2: c2,
    }));

    if (!shader) return null;

    const shaderCanvas = (
      <Canvas style={[StyleSheet.absoluteFill, { borderRadius }]}>
        <Fill>
          <Shader source={shader} uniforms={uniforms} />
        </Fill>
      </Canvas>
    );

    if (asChild) {
      return (
        <View style={[styles.wrapper, { width, height, borderRadius }, style]}>
          {shaderCanvas}
          <View style={[styles.content, { borderRadius }]}>{children}</View>
        </View>
      );
    }

    return (
      <View style={[styles.wrapper, { width, height, borderRadius }, style]}>
        {shaderCanvas}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export type { ISpectralWave, RGBA } from "./types";
export default memo<
  React.FC<Partial<ISpectralWave>> &
    React.FunctionComponent<Partial<ISpectralWave>> &
    Partial<ISpectralWave> &
    React.ComponentProps<typeof SpectralWave>
>(SpectralWave);
