// @ts-check
import React, { ComponentProps, memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  Canvas,
  Group,
  Path,
  Skia,
  type SkPath,
} from "react-native-skia";
import {
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

import {
  getDefaultFrames,
  MotionEasing,
  buildMorphFrames,
  cubicBezier,
} from "./helper";
import type { IMorphLoader } from "./types";
import {
  DEG_TO_RAD,
  M3_LOADING_SEQUENCE,
  POINTS_PER_FRAME,
  SQRT2,
  STEPS_PER_SEGMENT,
  VIEWBOX,
} from "./const";

const MorphLoader: React.FC<IMorphLoader> &
  React.FunctionComponent<IMorphLoader> = memo<IMorphLoader>(
  ({
    size = 60,
    color = "#6750A4",
    rotationDuration = 5000,
    morphDuration = 650,
    style,
    shapes,
    easing,
  }: IMorphLoader & ComponentProps<typeof MorphLoader>): React.ReactNode &
    React.JSX.Element &
    React.ReactElement => {
    const rotation = useSharedValue<number>(0);
    const phase = useSharedValue<number>(0);

    const { flat, frameCount } = useMemo(
      () =>
        shapes || easing
          ? buildMorphFrames(shapes ?? M3_LOADING_SEQUENCE, easing)
          : getDefaultFrames(),
      [shapes, easing],
    );

    const innerSize = size;
    const canvasSize = innerSize * SQRT2;
    const scale = innerSize / VIEWBOX;
    const offset = (canvasSize - innerSize) / 2;
    const containerPad = (canvasSize - size) / 2;
    const paths = useMemo(
      () =>
        Array.from({ length: frameCount }, (_, frame) => {
          const base = frame * POINTS_PER_FRAME * 2;
          const points = Array.from({ length: POINTS_PER_FRAME }, (_, point) => ({
            x: flat[base + point * 2],
            y: flat[base + point * 2 + 1],
          }));
          return Skia.Path.Polygon(points, true);
        }),
      [flat, frameCount],
    );

    const origin = useMemo(
      () => ({ x: canvasSize / 2, y: canvasSize / 2 }),
      [canvasSize],
    );

    const rotPerMs = 360 / rotationDuration;
    const framesPerMs = STEPS_PER_SEGMENT / morphDuration;

    useFrameCallback((info) => {
      const dt = info.timeSincePreviousFrame ?? 16.6667;
      rotation.value = (rotation.value + dt * rotPerMs) % 360;
      phase.value = (phase.value + dt * framesPerMs) % frameCount;
    });

    const path = useDerivedValue<SkPath>(() => {
      const current = phase.value % frameCount;
      const frame = Math.floor(current);
      const next = (frame + 1) % frameCount;
      // Each closed contour has the same number and order of path verbs.
      return Skia.Path.Interpolate(paths[frame], paths[next], 1 - (current - frame))!;
    });

    const transform = useDerivedValue(() => [
      { rotate: rotation.value * DEG_TO_RAD },
    ]);

    return (
      <View style={[styles.center, { width: size, height: size }, style]}>
        <Canvas
          style={{
            width: canvasSize,
            height: canvasSize,
            position: "absolute",
            left: -containerPad,
            top: -containerPad,
          }}
        >
          <Group origin={origin} transform={transform}>
            <Group transform={[{ translateX: offset }, { translateY: offset }, { scale }]}>
              <Path path={path} color={color} />
            </Group>
          </Group>
        </Canvas>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export {
  MorphLoader,
  MorphLoader as default,
  MotionEasing,
  cubicBezier,
  buildMorphFrames,
  M3_LOADING_SEQUENCE,
};
export { shapeNames, type ShapeName } from "./shape-registry";
export type { IMorphLoader };
