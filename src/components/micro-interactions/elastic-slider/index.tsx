// @ts-check
import React, { memo, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  type LayoutChangeEvent,
  type ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { decay } from "./helper";
import type { IElasticSlider, Region } from "./types";
import { SNAPBACK_SPRING, SPRING_CONFIG } from "./const";
import { scheduleOnRN } from "react-native-worklets";

const ElasticSlider: React.FC<IElasticSlider> &
  React.FunctionComponent<IElasticSlider> = memo<IElasticSlider>(
  ({
    defaultValue = 50,
    startingValue = 0,
    maxValue = 100,
    isStepped = false,
    stepSize = 1,
    renderLeadingAccessory,
    renderTrailingAccessory,
    onValueChange,
    onDragStart,
    onDragEnd,
    trackColor = "#9CA3AF",
    fillColor = "#6B7280",
    style,
  }: IElasticSlider):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const sliderWidth = useSharedValue<number>(0);
    const value = useSharedValue<number>(defaultValue);
    const overflow = useSharedValue<number>(0);
    const region = useSharedValue<Region>("middle");
    const scale = useSharedValue<number>(1);
    useEffect(() => {
      value.value = defaultValue;
    }, [defaultValue]);
    const updateValue = useCallback(
      (val: number) => {
        onValueChange?.(Math.round(val));
      },
      [onValueChange],
    );
    const handleDragStart = useCallback(() => {
      onDragStart?.();
    }, [onDragStart]);
    const handleDragEnd = useCallback(
      (finalValue: number) => {
        onDragEnd?.(Math.round(finalValue));
      },
      [onDragEnd],
    );
    const onLayout = <T extends LayoutChangeEvent>(event: T) => {
      sliderWidth.value = event.nativeEvent.layout.width;
    };
    const panGesture = Gesture.Pan()
      .minDistance(1)
      .onStart(() => {
        "worklet";
        scale.value = withSpring(1.2, SPRING_CONFIG);
        scheduleOnRN(handleDragStart);
      })
      .onUpdate((event) => {
        "worklet";
        const x = event.x;
        const width = sliderWidth.value;
        let newValue = startingValue + (x / width) * (maxValue - startingValue);
        if (isStepped) {
          newValue = Math.round(newValue / stepSize) * stepSize;
        }
        newValue = Math.min(Math.max(newValue, startingValue), maxValue);
        value.value = newValue;
        if (x < 0) {
          region.value = "left";
          overflow.value = decay(-x);
        } else if (x > width) {
          region.value = "right";
          overflow.value = decay(x - width);
        } else {
          region.value = "middle";
          overflow.value = 0;
        }
        scheduleOnRN(updateValue, newValue);
      })
      .onEnd(() => {
        "worklet";
        overflow.value = withSpring<number>(0, SNAPBACK_SPRING);
        scale.value = withSpring<number>(1, SPRING_CONFIG);
        region.value = "middle";
        value.value = withSpring<number>(defaultValue, SNAPBACK_SPRING);
        scheduleOnRN(handleDragEnd, value.value);
        scheduleOnRN(updateValue, defaultValue);
      });
    const gesture = panGesture;
    const containerStyle = useAnimatedStyle<
      Pick<ViewStyle, "transform" | "opacity">
    >(() => ({
      transform: [{ scale: scale.value }],
      opacity: interpolate(scale.value, [1, 1.2], [0.7, 1]),
    }));
    const leftIconStyle = useAnimatedStyle<Pick<ViewStyle, "transform">>(() => {
      const isLeft = region.value === "left";
      return {
        transform: [
          { translateX: isLeft ? -overflow.value / scale.value : 0 },
          {
            scale: withSpring(isLeft ? 1.4 : 1, SPRING_CONFIG),
          },
        ],
      };
    });
    const rightIconStyle = useAnimatedStyle<Pick<ViewStyle, "transform">>(
      () => {
        const isRight = region.value === "right";
        return {
          transform: [
            { translateX: isRight ? overflow.value / scale.value : 0 },
            {
              scale: withSpring(isRight ? 1.4 : 1, SPRING_CONFIG),
            },
          ],
        };
      },
    );
    const trackStyle = useAnimatedStyle<
      Pick<ViewStyle, "transform" | "height">
    >(() => {
      const width = sliderWidth.value || 1;
      const scaleX = 1 + overflow.value / width;
      const scaleY = interpolate(
        overflow.value,
        [0, 80],
        [1, 0.8],
        Extrapolation.CLAMP,
      );
      const height = interpolate(scale.value, [1, 1.2], [6, 12]);
      const expansion = width * (scaleX - 1);
      let translateX = 0;
      if (region.value === "left") {
        translateX = -expansion / 4;
      } else if (region.value === "right") {
        translateX = expansion / 4;
      }
      return {
        transform: [{ translateX }, { scaleX }, { scaleY }],
        height,
      };
    });
    const fillStyle = useAnimatedStyle<Pick<ViewStyle, "width">>(() => {
      const totalRange = maxValue - startingValue;
      const percentage =
        totalRange === 0
          ? 0
          : ((value.value - startingValue) / totalRange) * 100;
      return {
        width: `${percentage}%`,
      };
    });
    return (
      <View style={[styles.wrapper, style]}>
        <Animated.View style={[styles.container, containerStyle]}>
          <Animated.View style={[styles.iconContainer, leftIconStyle]}>
            {renderLeadingAccessory?.() ?? (
              <Text style={styles.iconText}>−</Text>
            )}
          </Animated.View>
          <GestureDetector gesture={gesture}>
            <View style={styles.sliderContainer} onLayout={onLayout}>
              <Animated.View style={[styles.track, trackStyle]}>
                <View style={[styles.trackBg, { backgroundColor: trackColor }]}>
                  <Animated.View
                    style={[
                      styles.trackFill,
                      { backgroundColor: fillColor },
                      fillStyle,
                    ]}
                  />
                </View>
              </Animated.View>
            </View>
          </GestureDetector>
          <Animated.View style={[styles.iconContainer, rightIconStyle]}>
            {renderTrailingAccessory?.() ?? (
              <Text style={styles.iconText}>+</Text>
            )}
          </Animated.View>
        </Animated.View>
      </View>
    );
  },
);
const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: 192,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: "100%",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 18,
    color: "#6B7280",
    fontWeight: "500",
  },
  sliderContainer: {
    flex: 1,
    height: 44,
    justifyContent: "center",
  },
  track: {
    width: "100%",
    borderRadius: 100,
    overflow: "hidden",
  },
  trackBg: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    overflow: "hidden",
  },
  trackFill: {
    height: "100%",
    borderRadius: 100,
  },
  valueText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
export default memo<
  React.FC<IElasticSlider> & React.FunctionComponent<IElasticSlider>
>(ElasticSlider);
