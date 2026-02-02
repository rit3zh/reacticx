// @ts-check
import React, { useMemo, memo } from "react";
import { StyleSheet } from "react-native";
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
import {
  SHADER_SOURCE,
  DEFAULT_COLORS,
  DEFAULT_SPEED,
  DEFAULT_INTENSITY,
  DEFAULT_GLOW_RADIUS,
  DEFAULT_SIZE,
} from "./conf";
import { parseColor } from "./helper";
import type { IEnergyOrb, RGB } from "./types";

const source = Skia.RuntimeEffect.Make(SHADER_SOURCE);

export const EnergyOrb: React.FC<IEnergyOrb> &
  React.FunctionComponent<IEnergyOrb> = memo<IEnergyOrb>(
  ({
    width = DEFAULT_SIZE,
    height = DEFAULT_SIZE,
    speed = DEFAULT_SPEED,
    intensity = DEFAULT_INTENSITY,
    colors = DEFAULT_COLORS,
    glowRadius = DEFAULT_GLOW_RADIUS,
  }: IEnergyOrb):
    | (React.ReactNode & React.ReactElement & React.JSX.Element)
    | null => {
    const time = useSharedValue<number>(0);

    useFrameCallback(() => {
      time.value += 0.016 * speed;
    });

    const [c0r, c0g, c0b] = useMemo<RGB>(
      () => parseColor(colors[0] || DEFAULT_COLORS[0]),
      [colors],
    );
    const [c1r, c1g, c1b] = useMemo<RGB>(
      () => parseColor(colors[1] || colors[0] || DEFAULT_COLORS[1]),
      [colors],
    );
    const [c2r, c2g, c2b] = useMemo<RGB>(
      () => parseColor(colors[2] || colors[0] || DEFAULT_COLORS[2]),
      [colors],
    );

    const uniforms = useDerivedValue<Uniforms>(() => ({
      iTime: time.value,
      iResolution: [width, height],
      uSpeed: speed,
      uIntensity: intensity,
      uColor0: [c0r, c0g, c0b],
      uColor1: [c1r, c1g, c1b],
      uColor2: [c2r, c2g, c2b],
      uGlowRadius: glowRadius,
    }));

    if (!source) return null;

    return (
      <Canvas style={[styles.canvas, { width, height }]}>
        <Fill>
          <Shader source={source} uniforms={uniforms} />
        </Fill>
      </Canvas>
    );
  },
);

const styles = StyleSheet.create({
  canvas: {
    backgroundColor: "transparent",
  },
});

export default memo<React.FC<IEnergyOrb> & React.FunctionComponent<IEnergyOrb>>(
  EnergyOrb,
);
