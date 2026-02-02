import React, { type ReactNode, useEffect, useState, memo } from "react";
import {
  View,
  type LayoutChangeEvent,
  StyleSheet,
  ViewStyle,
} from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  type RectProps,
  type LinearGradientProps,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
  type SharedValue,
} from "react-native-reanimated";
import type { AnimationStyle, GlowProps, Layout, GradientStop } from "./types";

const AnimatedRect = Animated.createAnimatedComponent<RectProps>(Rect);
const AnimatedLinearGradient =
  Animated.createAnimatedComponent<LinearGradientProps>(LinearGradient);

const getBorderRadius = (children: ReactNode): number | undefined => {
  if (!React.isValidElement(children)) return undefined;

  const child = children as React.ReactElement<{ style?: ViewStyle }>;
  const style = child.props?.style;

  if (!style) return undefined;

  if (Array.isArray(style)) {
    for (const s of style) {
      const flattened = StyleSheet.flatten(s);
      if (flattened?.borderRadius !== undefined) {
        return flattened.borderRadius as number;
      }
    }
  } else {
    const flattened = StyleSheet.flatten(style);
    if (flattened?.borderRadius !== undefined) {
      return flattened.borderRadius as number;
    }
  }

  return undefined;
};

export const Glow: React.FC<GlowProps> & React.FunctionComponent<GlowProps> =
  memo<GlowProps>(
    ({
      children,
      size = 4,
      color = "#8b5cf6",
      secondaryColor = "#ec4899",
      duration = 3000,
      style = "pulse",
      radius: radiusProp,
      intensity = 1,
      speed = 1,
      enabled = true,
      animated = true,
      gradient,
      width = 20,
    }): React.ReactNode & React.JSX.Element & React.ReactElement => {
      const [layout, setLayout] = useState<Layout>({ width: 0, height: 0 });
      const progress: SharedValue<number> = useSharedValue<number>(0);

      const detectedRadius = getBorderRadius(children);
      const radius: number = radiusProp ?? detectedRadius ?? 20;

      useEffect(() => {
        if (!enabled || !animated) {
          progress.value = 0;
          return;
        }

        const adjustedDuration = duration / speed;

        const animations: Record<AnimationStyle, any> = {
          linear: withRepeat(
            withTiming(1, {
              duration: adjustedDuration,
              easing: Easing.linear,
            }),
            -1,
            false,
          ),
          withoutEasing: withRepeat(
            withTiming(1, { duration: adjustedDuration }),
            -1,
            false,
          ),
          pulse: withRepeat(
            withTiming(1, {
              duration: adjustedDuration,
              easing: Easing.bezier(0.45, 0, 0.55, 1),
            }),
            -1,
            false,
          ),
          wave: withRepeat(
            withTiming(1, {
              duration: adjustedDuration,
              easing: Easing.inOut(Easing.ease),
            }),
            -1,
            false,
          ),
          breathe: withRepeat(
            withSequence(
              withTiming(1, {
                duration: adjustedDuration / 2,
                easing: Easing.inOut(Easing.quad),
              }),
              withTiming(0, {
                duration: adjustedDuration / 2,
                easing: Easing.inOut(Easing.quad),
              }),
            ),
            -1,
            false,
          ),
          snap: withRepeat(
            withTiming(1, {
              duration: adjustedDuration,
              easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
            }),
            -1,
            false,
          ),
          spinner: withRepeat(
            withTiming(1, {
              duration: adjustedDuration,
              easing: Easing.linear,
            }),
            -1,
            false,
          ),
        };

        progress.value = animations[style];
      }, [duration, style, speed, enabled, animated, progress]);

      const handleLayout = (event: LayoutChangeEvent): void => {
        const { width, height } = event.nativeEvent.layout;
        setLayout({ width, height });
      };

      const animatedGradient = useAnimatedProps(() => {
        if (!animated) {
          return {
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%",
          };
        }

        const angle = progress.value * Math.PI * 2;

        return {
          x1: `${50 + Math.cos(angle) * 50}%`,
          y1: `${50 + Math.sin(angle) * 50}%`,
          x2: `${50 + Math.cos(angle + Math.PI) * 50}%`,
          y2: `${50 + Math.sin(angle + Math.PI) * 50}%`,
        };
      });

      const animatedOpacity = useAnimatedProps(() => {
        if (!animated) {
          return { opacity: intensity };
        }

        const baseOpacity =
          style === "breathe"
            ? progress.value
            : interpolate(progress.value, [0, 0.5, 1], [0.6, 1, 0.6]);

        return { opacity: baseOpacity * intensity };
      });

      if (!layout.width || !layout.height) {
        return <View onLayout={handleLayout}>{children}</View>;
      }

      const maxRadius = Math.min(layout.width, layout.height) / 2;
      const actualRadius = Math.min(radius, maxRadius);
      const glowRadius = actualRadius + size / 2;

      const getStops = (): ReadonlyArray<GradientStop> => {
        if (style === "spinner") {
          const half = width / 2;
          return [
            { offset: "0%", color, opacity: 0 },
            { offset: `${Math.max(0, 50 - half - 10)}%`, color, opacity: 0 },
            { offset: `${Math.max(0, 50 - half)}%`, color, opacity: 0.3 },
            { offset: "50%", color: secondaryColor, opacity: 1 },
            { offset: `${Math.min(100, 50 + half)}%`, color, opacity: 0.3 },
            { offset: `${Math.min(100, 50 + half + 10)}%`, color, opacity: 0 },
            { offset: "100%", color, opacity: 0 },
          ];
        }

        return [
          { offset: "0%", color, opacity: 0 },
          { offset: "25%", color, opacity: 1 },
          { offset: "50%", color: secondaryColor, opacity: 1 },
          { offset: "75%", color, opacity: 1 },
          { offset: "100%", color, opacity: 0 },
        ];
      };

      const stops = gradient ?? getStops();

      return (
        <View style={{ position: "relative" }}>
          {enabled && (
            <View
              style={{
                position: "absolute",
                top: -size,
                left: -size,
                right: -size,
                bottom: -size,
              }}
              pointerEvents="none"
            >
              <Svg
                width={layout.width + size * 2}
                height={layout.height + size * 2}
              >
                <Defs>
                  <AnimatedLinearGradient
                    id="gradient"
                    animatedProps={animatedGradient}
                  >
                    {stops.map((stop, index) => (
                      <Stop
                        key={index}
                        offset={stop.offset}
                        stopColor={stop.color}
                        stopOpacity={stop.opacity}
                      />
                    ))}
                  </AnimatedLinearGradient>
                </Defs>

                <AnimatedRect
                  x={size / 2}
                  y={size / 2}
                  width={layout.width + size}
                  height={layout.height + size}
                  rx={glowRadius}
                  ry={glowRadius}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth={size}
                  animatedProps={animatedOpacity}
                />
              </Svg>
            </View>
          )}

          <View onLayout={handleLayout}>{children}</View>
        </View>
      );
    },
  );

export default memo<React.FC<GlowProps> & React.FunctionComponent<GlowProps>>(
  Glow,
);
