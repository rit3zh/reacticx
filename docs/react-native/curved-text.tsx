/**
 * 🎨 Original Inspiration: reactbits.dev
 * Optimized Curved Marquee using Reanimated pattern
 */

import React, { useMemo, memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useFrameCallback,
  type FrameInfo,
} from "react-native-reanimated";
import Svg, {
  Defs,
  Path,
  Text,
  TextPath,
  TextPathProps,
} from "react-native-svg";
import type { ICurvedLoop } from "./types";

const SCREEN_WIDTH = Dimensions.get("window").width;
const AnimatedTextPath = Animated.createAnimatedComponent(TextPath);

export const UnStableCurvedLoopMarquee: React.FC<ICurvedLoop> = memo(
  ({
    text: marqueeText = "React Native + Expo + SVG ❤️",
    speed = 500,
    curve = 400,
    direction = "left",
    textColor = "#ffffff",
    fontSize = 96,
    copies = 50,
    style,
  }: ICurvedLoop): React.ReactElement => {
    const offset = useSharedValue<number>(0);
    const text = useMemo<string>(() => {
      const hasTrailing = /\s|\u00A0$/.test(marqueeText);
      return (
        (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0"
      );
    }, [marqueeText]);

    const spacing = useMemo(() => {
      return text.length * 2 * (fontSize * 1.6);
    }, [text, fontSize]);

    const pathId = useMemo(
      () => `curved-path-${Math.random().toString(36).slice(2)}`,
      [],
    );
    const pathD = useMemo(() => `M-100,40 Q500,${40 + curve} 1540,40`, [curve]);
    const totalText = useMemo(() => {
      const numCopies = Math.max(copies, Math.ceil(1800 / spacing) + 2);
      return Array(numCopies).fill(text).join("");
    }, [text, spacing, copies]);

    useFrameCallback((frameInfo: FrameInfo) => {
      "worklet";
      if (spacing === 0) return;

      const deltaTime = frameInfo.timeSincePreviousFrame ?? 16;
      const distance = (speed * deltaTime) / 1000;

      if (direction === "left") {
        offset.value -= distance;
        if (offset.value <= -spacing) {
          offset.value += spacing;
        }
      } else {
        offset.value += distance;
        if (offset.value >= 0) {
          offset.value -= spacing;
        }
      }
    }, spacing > 0);
    const animatedProps = useAnimatedProps<Pick<TextPathProps, "startOffset">>(
      () => {
        "worklet";
        return {
          startOffset: offset.value,
        };
      },
    );

    if (spacing === 0) {
      return <View style={styles.container} />;
    }

    return (
      <View
        style={[
          styles.container,
          style ?? {
            height: 120,
            overflow: "hidden",
          },
        ]}
      >
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 120"
          style={styles.svg}
          key={curve}
        >
          <Defs>
            <Path id={pathId} d={pathD} fill="none" stroke="transparent" />
          </Defs>
          <Text fill={textColor} fontSize={fontSize}>
            <AnimatedTextPath href={`#${pathId}`} animatedProps={animatedProps}>
              {totalText}
            </AnimatedTextPath>
          </Text>
        </Svg>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  svg: {
    overflow: "visible",
  },
});

export default UnStableCurvedLoopMarquee;
