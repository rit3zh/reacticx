import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { Circle, Svg, type CircleProps } from "react-native-svg";
import type { ICircularProgress } from "./types";

const AnimatedCircle = Animated.createAnimatedComponent<CircleProps>(Circle);

export const CircularProgress: React.FC<ICircularProgress> =
  memo<ICircularProgress>((props: ICircularProgress): React.ReactNode => {
    const {
      progress,
      size = 50,
      strokeWidth = 3,
      outerCircleColor = "rgba(255, 255, 255, 0.3)",
      progressCircleColor = "white",
      backgroundColor = "#502314",
      gap: _gap = 2,
      onPress,
      renderIcon,
    } = props;

    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;

    const circleAnimatedProps = useAnimatedProps<
      Pick<CircleProps, "strokeDashoffset">
    >(() => {
      const progressValue = Math.min(Math.max(progress.value, 0), 100);
      const strokeDashoffset = circum * (1 - progressValue / 100);
      return {
        strokeDashoffset,
      };
    });

    const gap = _gap;
    const innerCircleSize = size - strokeWidth * 2 - gap * 2;
    const innerCirclePosition = strokeWidth + gap;

    return (
      <Pressable onPress={onPress}>
        <View style={{ width: size, height: size }}>
          <Svg width={size} height={size}>
            <Circle
              stroke={outerCircleColor}
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <AnimatedCircle
              stroke={progressCircleColor}
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeDasharray={`${circum} ${circum}`}
              strokeLinecap="round"
              transform={`rotate(-90, ${size / 2}, ${size / 2})`}
              strokeWidth={strokeWidth}
              animatedProps={circleAnimatedProps}
            />
          </Svg>
          <View
            style={[
              styles.innerCircle,
              {
                width: innerCircleSize,
                height: innerCircleSize,
                backgroundColor,
                top: innerCirclePosition,
                left: innerCirclePosition,
              },
            ]}
          >
            {renderIcon ? (
              renderIcon()
            ) : (
              <View
                style={{
                  width: innerCircleSize * 0.5,
                  height: innerCircleSize * 0.5,
                  backgroundColor: "#fff",
                }}
              />
            )}
          </View>
        </View>
      </Pressable>
    );
  });

const styles = StyleSheet.create({
  innerCircle: {
    position: "absolute",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
