import React, { ReactNode, useEffect } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect, Mask } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface GlowProps {
  children: ReactNode;
  glowSize?: number;
  glowColor?: string;
  secondaryColor?: string;
  animationDuration?: number;
  intensity?: number;
}

export const Glow: React.FC<GlowProps> = ({
  children,
  glowSize = 20,
  glowColor = "#8b5cf6",
  secondaryColor = "#ec4899",
  animationDuration = 3000,
  intensity = 1,
}) => {
  const [layout, setLayout] = React.useState({ width: 0, height: 0 });
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: animationDuration,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [animationDuration]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  // Animated gradient position
  const animatedGradientProps = useAnimatedProps(() => {
    const x1 = interpolate(
      progress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [0, 1, 0, -1, 0],
    );
    const y1 = interpolate(
      progress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [-1, 0, 1, 0, -1],
    );
    const x2 = interpolate(
      progress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [1, 0, -1, 0, 1],
    );
    const y2 = interpolate(
      progress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [0, 1, 0, -1, 0],
    );

    return {
      x1: `${x1 * 50 + 50}%`,
      y1: `${y1 * 50 + 50}%`,
      x2: `${x2 * 50 + 50}%`,
      y2: `${y2 * 50 + 50}%`,
    };
  });

  // Animated opacity for pulsing effect
  const animatedRectProps = useAnimatedProps(() => {
    const opacity = interpolate(progress.value, [0, 0.5, 1], [0.6, 1, 0.6]);

    return {
      opacity: opacity * intensity,
    };
  });

  if (layout.width === 0 || layout.height === 0) {
    return (
      <View onLayout={handleLayout} style={{ position: "relative" }}>
        {children}
      </View>
    );
  }

  return (
    <View style={{ position: "relative" }}>
      {/* SVG Glow Layer - Behind */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            width: layout.width + glowSize * 2,
            height: layout.height + glowSize * 2,
            top: -glowSize,
            left: -glowSize,
          },
        ]}
        pointerEvents="none"
      >
        <Svg
          width={layout.width + glowSize * 2}
          height={layout.height + glowSize * 2}
        >
          <Defs>
            <AnimatedLinearGradient
              id="glowGradient"
              animatedProps={animatedGradientProps}
            >
              <Stop offset="0%" stopColor={glowColor} stopOpacity="0" />
              <Stop offset="30%" stopColor={glowColor} stopOpacity="1" />
              <Stop offset="50%" stopColor={secondaryColor} stopOpacity="1" />
              <Stop offset="70%" stopColor={glowColor} stopOpacity="1" />
              <Stop offset="100%" stopColor={glowColor} stopOpacity="0" />
            </AnimatedLinearGradient>

            <Mask id="glowMask">
              {/* Outer rectangle (the glow area) */}
              <Rect
                x="0"
                y="0"
                width={layout.width + glowSize * 2}
                height={layout.height + glowSize * 2}
                fill="white"
              />
              {/* Inner rectangle (cut out the center) - slightly smaller to create border */}
              <Rect
                x={glowSize + 2}
                y={glowSize + 2}
                width={layout.width - 4}
                height={layout.height - 4}
                rx={18}
                ry={18}
                fill="black"
              />
            </Mask>
          </Defs>

          {/* Main glow rect with mask */}
          <AnimatedRect
            x="0"
            y="0"
            width={layout.width + glowSize * 2}
            height={layout.height + glowSize * 2}
            fill="url(#glowGradient)"
            mask="url(#glowMask)"
            animatedProps={animatedRectProps}
          />

          {/* Outer blur layer for softer glow */}
          <AnimatedRect
            x={glowSize / 2}
            y={glowSize / 2}
            width={layout.width + glowSize}
            height={layout.height + glowSize}
            rx={20}
            ry={20}
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth={glowSize / 2}
            opacity={0.3 * intensity}
            animatedProps={animatedRectProps}
          />
        </Svg>
      </View>

      {/* Children Container */}
      <View onLayout={handleLayout}>{children}</View>
    </View>
  );
};

export default Glow;
