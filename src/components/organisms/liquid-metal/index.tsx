// @ts-check
import React, { useMemo, memo } from "react";
import { View, StyleSheet } from "react-native";
import {
  Canvas,
  Fill,
  Skia,
  Shader,
  type Uniforms,
} from "@shopify/react-native-skia";
import {
  useSharedValue,
  useFrameCallback,
  useDerivedValue,
} from "react-native-reanimated";
import { SHADER_SOURCE, DEFAULTS } from "./conf";
import { colorToRGBA } from "./helper";
import type { ILiquidMetal, RGBA } from "./types";

const shader = Skia.RuntimeEffect.Make(SHADER_SOURCE);

export const LiquidMetal: React.FC<ILiquidMetal> &
  React.FunctionComponent<ILiquidMetal> = memo(
  ({
    width = DEFAULTS.WIDTH,
    height = DEFAULTS.HEIGHT,
    borderRadius = DEFAULTS.BORDER_RADIUS,
    highlightColor = DEFAULTS.HIGHLIGHT,
    shadowColor = DEFAULTS.SHADOW,
    density = DEFAULTS.DENSITY,
    rate = DEFAULTS.RATE,
    split = DEFAULTS.SPLIT,
    turbulence = DEFAULTS.TURBULENCE,
    crispness = DEFAULTS.CRISPNESS,
    tilt = DEFAULTS.TILT,
    pulsate = DEFAULTS.PULSATE,
    halo = DEFAULTS.HALO,
    asChild = false,
    children,
    style,
  }: ILiquidMetal) => {
    const tick = useSharedValue<number>(0);

    useFrameCallback(() => {
      tick.value += 0.016 * rate;
    });

    const light = useMemo<RGBA>(
      () => colorToRGBA(highlightColor),
      [highlightColor],
    );
    const dark = useMemo<RGBA>(() => colorToRGBA(shadowColor), [shadowColor]);

    const uniforms = useDerivedValue<Uniforms>(() => ({
      uDimensions: [width, height],
      uTick: tick.value,
      uLight: light,
      uDark: dark,
      uDensity: density,
      uRate: rate,
      uSplit: split,
      uTurbulence: turbulence,
      uCrispness: crispness,
      uTilt: tilt,
      uPulsate: pulsate,
      uHalo: halo,
    }));

    if (!shader) return null;

    const shaderContent: React.ReactNode & React.ReactElement = (
      <Canvas style={[StyleSheet.absoluteFill, { borderRadius }]}>
        <Fill>
          <Shader source={shader} uniforms={uniforms} />
        </Fill>
      </Canvas>
    );

    if (asChild) {
      return (
        <View style={[styles.wrapper, { width, height, borderRadius }, style]}>
          {shaderContent}
          <View style={[styles.content, { borderRadius }]}>{children}</View>
        </View>
      );
    }

    return (
      <View style={[styles.wrapper, { width, height, borderRadius }, style]}>
        {shaderContent}
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

export type { ILiquidMetal, RGBA } from "./types";
export default memo<
  React.FC<ILiquidMetal> & React.FunctionComponent<ILiquidMetal>
>(LiquidMetal);
