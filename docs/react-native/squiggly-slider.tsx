import React, { memo, useEffect } from "react";
import { View } from "react-native";
import { Canvas, Path, RoundedRect } from "@shopify/react-native-skia";
import {
  useSharedValue,
  useDerivedValue,
  useFrameCallback,
  withSpring,
  type FrameInfo,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type { ISquigglySlider } from "./types";
import { TWO_PI, SEGMENTS_PER_WAVELENGTH } from "./const";
import { scheduleOnRN } from "react-native-worklets";

export const SquigglySlider: React.FC<ISquigglySlider> &
  React.FunctionComponent<ISquigglySlider> = memo<ISquigglySlider>(
  ({
    value,
    onValueChange,
    onSlidingComplete,
    width,
    height: heightProp,
    strokeWidth = 6,
    wavelength: wavelengthProp,
    amplitude: amplitudeProp,
    activeColor = "#FFFFFF",
    inactiveColor = "rgba(160, 130, 160, 0.5)",
    thumbColor = "#E04F93",
    speed = 4,
  }: React.ComponentProps<typeof SquigglySlider> & ISquigglySlider):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const amplitude = amplitudeProp ?? Math.max(strokeWidth * 2.5, 10);
    const wavelength = wavelengthProp ?? Math.max(strokeWidth * 10, 50);
    const height = heightProp ?? (amplitude + strokeWidth) * 2 + 16;
    const padding = strokeWidth * 2;
    const trackWidth = width - padding * 2;
    const centerY = height / 2;
    const thumbW = Math.max(strokeWidth + 2, 6);
    const thumbH = Math.max(strokeWidth * 5, 24);

    const progress = useSharedValue<number>(value);
    const phase = useSharedValue<number>(0);
    const animatedAmp = useSharedValue<number>(amplitude);

    useFrameCallback((frameInfo: FrameInfo) => {
      "worklet";
      const dt = (frameInfo.timeSincePreviousFrame ?? 16) / 1000;
      phase.value = phase.value + dt / speed;
    });
    useEffect(() => {
      progress.value = withSpring<number>(value, {
        damping: 20,
        stiffness: 200,
        mass: 0.4,
      });
    }, [value, progress]);
    const wavePath = useDerivedValue<string>(() => {
      "worklet";
      const halfStroke = strokeWidth / 2;
      const start = padding + halfStroke;
      const end = padding + progress.value * trackWidth - halfStroke;

      if (end <= start) return "M0 0";

      const segW = wavelength / SEGMENTS_PER_WAVELENGTH;
      const count = Math.ceil((end - start) / segW) + 1;

      let d = "";
      for (let i = 0; i < count; i++) {
        const x = Math.min(start + i * segW, end);
        const proportion = (x - start) / wavelength;
        const radians = proportion * TWO_PI + TWO_PI * phase.value;
        const y = centerY + Math.sin(radians) * animatedAmp.value;
        if (i === 0) {
          d = "M" + x.toFixed(2) + " " + y.toFixed(2);
        } else {
          d += " L" + x.toFixed(2) + " " + y.toFixed(2);
        }
      }
      return d;
    });

    const inactivePath = useDerivedValue(() => {
      "worklet";
      const x0 = padding + progress.value * trackWidth;
      const x1 = width - padding;
      if (x1 <= x0) return "M0 0";
      return (
        "M" +
        x0.toFixed(2) +
        " " +
        centerY.toFixed(2) +
        " L" +
        x1.toFixed(2) +
        " " +
        centerY.toFixed(2)
      );
    });

    const thumbX = useDerivedValue(() => {
      "worklet";
      return padding + progress.value * trackWidth - thumbW / 2;
    });

    const updateValue = <T extends number>(v: T) => onValueChange<number>(v);
    const complete = () => onSlidingComplete?.();

    const panGesture = Gesture.Pan()
      .minDistance(0)
      .onBegin((e) => {
        "worklet";
        animatedAmp.value = withSpring<number>(0, {
          damping: 18,
          stiffness: 220,
          mass: 0.5,
        });
        const v = Math.min(1, Math.max(0, (e.x - padding) / trackWidth));
        progress.value = v;
        scheduleOnRN(onValueChange<number>, v);
      })
      .onUpdate((e) => {
        "worklet";
        const v = Math.min(1, Math.max(0, (e.x - padding) / trackWidth));
        progress.value = v;
        scheduleOnRN(onValueChange<number>, v);
      })
      .onFinalize(() => {
        "worklet";
        animatedAmp.value = withSpring<number>(amplitude, {
          damping: 12,
          stiffness: 180,
          mass: 0.5,
        });
        scheduleOnRN(complete);
      });

    return (
      <GestureDetector gesture={panGesture}>
        <View style={{ width, height }} collapsable={false}>
          <Canvas style={{ width, height }}>
            <Path
              path={inactivePath}
              style="stroke"
              strokeWidth={strokeWidth}
              strokeCap="round"
              color={inactiveColor}
            />
            <Path
              path={wavePath}
              style="stroke"
              strokeWidth={strokeWidth}
              strokeCap="round"
              strokeJoin="round"
              color={activeColor}
            />
            <RoundedRect
              x={thumbX}
              y={centerY - thumbH / 2}
              width={thumbW}
              height={thumbH}
              r={thumbW / 2}
              color={thumbColor}
            />
          </Canvas>
        </View>
      </GestureDetector>
    );
  },
);
