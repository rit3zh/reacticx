import React, { memo } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import type { HamburgerIconProps } from "./types";
import { BlurView, BlurViewProps } from "expo-blur";

const AnimatedBlurView =
  Animated.createAnimatedComponent<BlurViewProps>(BlurView);

export const HamburgerIcon: React.FC<HamburgerIconProps> =
  memo<HamburgerIconProps>(
    ({
      progress,
      size = 54,
      color = "black",
      strokeWidth,
      lineGap,
      lineWidth,
      onPress,
      style,
    }: HamburgerIconProps): React.JSX.Element & React.ReactNode => {
      const calculatedStrokeWidth: number = strokeWidth ?? size * 0.04;
      const calculatedLineWidth: number = lineWidth ?? size * 0.75;
      const calculatedLineGap: number = lineGap ?? size * 0.25;
      const lineHeight: number = calculatedStrokeWidth;

      const animatedBlurViewPropz = useAnimatedProps<BlurViewProps>(() => {
        const intensity = interpolate(
          progress.value,
          [0, 0.3, 0.6, 1],
          [0, 2.5, 9.5, 0],
        );

        return {
          intensity,
        };
      });

      const topStyle = useAnimatedStyle<ViewStyle>(() => ({
        transform: [
          {
            translateY: interpolate(
              progress.value,
              [0, 1],
              [-calculatedLineGap, 0],
            ),
          },
          { rotate: `${interpolate(progress.value, [0, 1], [0, 45])}deg` },
        ],
      }));

      const middleStyle = useAnimatedStyle<ViewStyle>(() => ({
        opacity: interpolate(progress.value, [0, 0.9, 1], [1, 0, 0]),
      }));

      const bottomStyle = useAnimatedStyle<ViewStyle>(() => ({
        transform: [
          {
            translateY: interpolate(
              progress.value,
              [0, 1],
              [calculatedLineGap, 0],
            ),
          },
          { rotate: `${interpolate(progress.value, [0, 1], [0, -45])}deg` },
        ],
      }));

      const lineBaseStyle: StyleProp<ViewStyle> = {
        width: calculatedLineWidth,
        height: lineHeight,
        backgroundColor: color,
        borderRadius: calculatedStrokeWidth,
        position: "absolute" as const,
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      };

      return (
        <Pressable
          onPress={onPress}
          style={[
            {
              width: size,
              height: size,
              alignItems: "center",
              justifyContent: "center",
            },
            style,
          ]}
        >
          <Animated.View style={[lineBaseStyle, topStyle]} />
          <Animated.View style={[lineBaseStyle, middleStyle]} />
          <Animated.View style={[lineBaseStyle, bottomStyle]} />
          {Platform.OS === "ios" && (
            <AnimatedBlurView
              animatedProps={animatedBlurViewPropz}
              tint={"prominent"}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  overflow: "hidden",
                },
              ]}
              pointerEvents={"none"}
            />
          )}
        </Pressable>
      );
    },
  );

export default memo<HamburgerIconProps>(HamburgerIcon);
