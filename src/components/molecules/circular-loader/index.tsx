import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import Svg, { Circle, Defs, G, Filter, FeGaussianBlur } from "react-native-svg";
import type { CircularLoaderProps } from "./types";
export const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = 40,
  strokeWidth = 4,
  activeColor = "#000000",
  duration = 1000,
  style,
  gradientLength = 20,
  fadeOpacity = 0,
  blurAmount = 0,
  enableBlur = false,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = 20;
  const gradientPercentage = gradientLength / 100;
  const activePercentage = 0.75;
  const solidArcPercentage = activePercentage - gradientPercentage;

  const segmentLength = (circumference * gradientPercentage) / segments;
  const activeLength = circumference * solidArcPercentage;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [duration]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Animated.View
        style={{
          width: size,
          height: size,
          transform: [{ rotate }],
        }}
      >
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {enableBlur && blurAmount > 0 && (
            <Defs>
              <Filter
                id="motionBlurSmooth"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <FeGaussianBlur in="SourceGraphic" stdDeviation={blurAmount} />
              </Filter>
            </Defs>
          )}

          <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={activeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${activeLength} ${circumference}`}
              filter={
                enableBlur && blurAmount > 0
                  ? "url(#motionBlurSmooth)"
                  : undefined
              }
            />

            {/* Gradient segments - smooth fade using opacity interpolation */}
            {Array.from({ length: segments }).map((_, index) => {
              // Smooth exponential fade curve
              const progress = index / segments;
              const opacity = 1 - Math.pow(progress, 1.5); // Exponential curve for natural fade
              const finalOpacity = opacity * (1 - fadeOpacity) + fadeOpacity;
              const offset = -(activeLength + segmentLength * index);

              // Don't render segments that are too faint to avoid visible dots
              if (finalOpacity < 0.01) {
                return null;
              }

              return (
                <Circle
                  key={index}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={activeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="butt"
                  fill="none"
                  opacity={finalOpacity}
                  strokeDasharray={`${segmentLength} ${circumference}`}
                  strokeDashoffset={offset}
                  filter={
                    enableBlur && blurAmount > 0
                      ? "url(#motionBlurSmooth)"
                      : undefined
                  }
                />
              );
            })}
          </G>
        </Svg>
      </Animated.View>
    </View>
  );
};
