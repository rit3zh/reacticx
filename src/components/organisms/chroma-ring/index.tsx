import React, { memo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Canvas,
  Shader,
  Skia,
  Fill,
  Uniforms,
} from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { type IChromaRing } from "./types";
import { SHADER_SOURCE } from "./conf";
import { hexToRgb } from "./helper";

const LIQUID_METAL_BORDER_SHADER = Skia.RuntimeEffect.Make(SHADER_SOURCE)!;

export const ChromaRing: React.FC<IChromaRing> = memo<IChromaRing>(
  ({
    width = 300,
    height = 56,
    borderRadius: customBorderRadius,
    borderWidth = 2,
    speed = 1.0,
    base = "#333340",
    glow = "#c0c8e0",
    background = "#0a0a0a",
    children,
    style,
  }) => {
    const borderRadius = customBorderRadius ?? height / 2;

    const baseColorRgb = hexToRgb<typeof base>(base);
    const glowColorRgb = hexToRgb<typeof glow>(glow);

    const time = useSharedValue<number>(0);

    useEffect(() => {
      time.value = withRepeat(
        withTiming(Math.PI * 200, {
          duration: 200000,
          easing: Easing.linear,
        }),
        -1,
        false,
      );
    }, [time]);

    const uniforms = useDerivedValue<Uniforms>(() => ({
      iResolution: [width, height],
      iTime: time.value,
      borderWidth: borderWidth,
      borderRadius: borderRadius,
      speed: speed,
      baseColor: baseColorRgb,
      glowColor: glowColorRgb,
    }));

    return (
      <View style={[styles.container, { width, height, borderRadius }, style]}>
        <Canvas style={[StyleSheet.absoluteFill, { borderRadius }]}>
          <Fill>
            <Shader source={LIQUID_METAL_BORDER_SHADER} uniforms={uniforms} />
          </Fill>
        </Canvas>

        <View
          style={[
            styles.innerBackground,
            {
              backgroundColor: background,
              borderRadius: Math.max(0, borderRadius - borderWidth),
              margin: borderWidth,
            },
          ]}
        />

        <View style={[styles.contentContainer, { borderRadius }]}>
          {children}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
  innerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default memo<React.FC<IChromaRing>>(ChromaRing);
