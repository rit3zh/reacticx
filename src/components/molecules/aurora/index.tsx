// @ts-ignore
import React, { memo, useMemo } from "react";
import { Canvas, Shader, Fill, Skia } from "react-native-skia";
import {
  useSharedValue,
  useFrameCallback,
  useDerivedValue,
  type FrameInfo,
} from "react-native-reanimated";
import { DEFAULT_AURORA_COLORS, DEFAULT_SKY_COLORS } from "./const";
import { AURORA_VERTEX_SHADER } from "./conf";
import { hexToRgb } from "./helper";
import type { IAurora } from "./types";
import { useWindowDimensions } from "react-native";

const SHADER = Skia.RuntimeEffect.Make(AURORA_VERTEX_SHADER)!;

export const Aurora: React.FC<IAurora> & React.FunctionComponent<IAurora> =
  memo<IAurora>(
    ({
      width: paramsWidth,
      height: paramsHeight,
      auroraColors = DEFAULT_AURORA_COLORS as string[],
      skyColors = DEFAULT_SKY_COLORS,
      speed = 0.5,
      intensity = 1,
      waveDirection = [9, -9],
    }: React.ComponentProps<typeof Aurora>):
      | (React.JSX.Element & React.ReactNode & React.ReactElement)
      | null => {
      const time = useSharedValue<number>(0);
      useFrameCallback((frameInfo: FrameInfo) => {
        if (frameInfo.timeSincePreviousFrame != null) {
          time.value += frameInfo.timeSincePreviousFrame / 1000;
        }
      });
      const color1 = useMemo(
        () => hexToRgb<string>(auroraColors[0] ?? DEFAULT_AURORA_COLORS[0]),
        [auroraColors],
      );
      const color2 = useMemo(
        () => hexToRgb<string>(auroraColors[1] ?? DEFAULT_AURORA_COLORS[1]),
        [auroraColors],
      );
      const color3 = useMemo(
        () => hexToRgb<string>(auroraColors[2] ?? DEFAULT_AURORA_COLORS[2]),
        [auroraColors],
      );
      const skyTop = useMemo(() => hexToRgb<string>(skyColors[0]), [skyColors]);
      const skyBottom = useMemo(
        () => hexToRgb<string>(skyColors[1]),
        [skyColors],
      );
      const { width: screenWidth, height: screenHeight } =
        useWindowDimensions();

      const width = paramsWidth ?? screenWidth;
      const height = paramsHeight ?? screenHeight * 0.25;
      const uniforms = useDerivedValue(() => {
        "worklet";
        return {
          resolution: [width, height] as [number, number],
          time: time.value,
          color1: color1 as [number, number, number],
          color2: color2 as [number, number, number],
          color3: color3 as [number, number, number],
          skyTop: skyTop as [number, number, number],
          skyBottom: skyBottom as [number, number, number],
          speed: speed,
          intensity: intensity,
          waveDirection: waveDirection as [number, number],
        } as const;
      }, [
        width,
        height,
        color1,
        color2,
        color3,
        skyTop,
        skyBottom,
        speed,
        intensity,
        waveDirection,
      ]);

      return (
        <Canvas style={{ width, height: height + 100 }}>
          <Fill>
            <Shader source={SHADER} uniforms={uniforms} />
          </Fill>
        </Canvas>
      );
    },
  );

export default memo<React.FC<IAurora> & React.FunctionComponent<IAurora>>(
  Aurora,
);
