import React, { useCallback, memo } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  ColorValue,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  SharedValue,
  interpolateColor,
  interpolate,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import type { StepperProps } from "./types";

const DIVIDER_HEIGHT: number = 12;
const DEFAULT_ICON_SIZE: number = 16;
const PRESSED_BG_COLOR: ColorValue = "#D1D1D6";
const NORMAL_BG_COLOR: ColorValue = "#ebebebff";
const ANIMATION_PRESS_IN_DURATION: number = 300;
const ANIMATION_PRESS_OUT_DURATION: number = 350;
const DIVIDER_FADE_DURATION: number = 250;
const SCALE_OUT_VALUE: number = 0.85;

const Stepper: React.FC<StepperProps> = memo(
  ({
    value,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    disabledOpacity = 0.4,
    containerStyle,
    buttonStyle,
    renderIncrementIcon,
    renderDecrementIcon,
    activeBackgroundColor,
    inActiveBackgroundColor,
    size,
  }) => {
    const incrementBgProgress: SharedValue<number> = useSharedValue(0);
    const decrementBgProgress: SharedValue<number> = useSharedValue(0);

    const handleIncrementPressIn = useCallback(() => {
      if (disabled || value >= max) return;
      incrementBgProgress.value = withTiming(1, {
        duration: ANIMATION_PRESS_IN_DURATION,
      });
    }, [disabled, value, max, incrementBgProgress]);

    const handleIncrementPressOut = useCallback(() => {
      incrementBgProgress.value = withTiming(0, {
        duration: ANIMATION_PRESS_OUT_DURATION,
      });
    }, [incrementBgProgress]);

    const handleIncrement = useCallback(() => {
      if (disabled || value >= max) return;
      onValueChange(Math.min(value + step, max));
    }, [value, max, step, disabled, onValueChange]);

    const handleDecrementPressIn = useCallback(() => {
      if (disabled || value <= min) return;
      decrementBgProgress.value = withTiming(1, {
        duration: ANIMATION_PRESS_IN_DURATION,
      });
    }, [disabled, value, min, decrementBgProgress]);

    const handleDecrementPressOut = useCallback(() => {
      decrementBgProgress.value = withTiming(0, {
        duration: ANIMATION_PRESS_OUT_DURATION,
      });
    }, [decrementBgProgress]);

    const handleDecrement = useCallback(() => {
      if (disabled || value <= min) return;
      onValueChange(Math.max(value - step, min));
    }, [value, min, step, disabled, onValueChange]);

    const decrementAnimatedStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        decrementBgProgress.value,
        [0, 1],
        [
          inActiveBackgroundColor || NORMAL_BG_COLOR,
          activeBackgroundColor || PRESSED_BG_COLOR,
        ],
      );
      return {
        backgroundColor,
      };
    });

    const incrementAnimatedStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        incrementBgProgress.value,
        [0, 1],
        [NORMAL_BG_COLOR, PRESSED_BG_COLOR],
      );

      return {
        backgroundColor,
      };
    });
    const animatedDecrementIconStylez = useAnimatedStyle(() => {
      const scale = interpolate(
        decrementBgProgress.value,
        [0, 1],
        [1, SCALE_OUT_VALUE],
      );
      return {
        transform: [{ scale }],
      };
    });

    const animatedIncrementIconStylez = useAnimatedStyle(() => {
      const scale = interpolate(
        incrementBgProgress.value,
        [0, 1],
        [1, SCALE_OUT_VALUE],
      );
      return {
        transform: [{ scale }],
      };
    });

    const isDecrementDisabled: boolean = disabled || value <= min;
    const isIncrementDisabled: boolean = disabled || value >= max;

    const DefaultDecrementIcon: React.FC = memo(() => (
      <Animated.View style={[animatedDecrementIconStylez]}>
        <AntDesign name="minus" size={DEFAULT_ICON_SIZE} color="black" />
      </Animated.View>
    ));
    const DefaultIncrementIcon: React.FC = memo(() => (
      <Animated.View style={[animatedIncrementIconStylez]}>
        <AntDesign name="plus" size={DEFAULT_ICON_SIZE} color="black" />
      </Animated.View>
    ));

    const animatedDividerStyles = useAnimatedStyle(() => {
      const isPressed =
        decrementBgProgress.value > 0 || incrementBgProgress.value > 0;
      const opacity = withTiming(isPressed ? 0 : 1, {
        duration: DIVIDER_FADE_DURATION,
      });

      return {
        opacity,
      };
    });

    return (
      <View style={[styles.wrapper, containerStyle]}>
        <View
          style={[
            styles.container,
            {
              width: size ? size * 2.5 : 100,
              height: size ? size : 40,
            },
          ]}
        >
          <Animated.View
            style={[styles.buttonContainer, decrementAnimatedStyle]}
          >
            <Pressable
              onPress={handleDecrement}
              onPressIn={handleDecrementPressIn}
              onPressOut={handleDecrementPressOut}
              disabled={isDecrementDisabled}
              hitSlop={20}
              style={[
                styles.button,
                buttonStyle,
                isDecrementDisabled && { opacity: disabledOpacity },
              ]}
            >
              {renderDecrementIcon ? (
                renderDecrementIcon()
              ) : (
                <DefaultDecrementIcon />
              )}
            </Pressable>
          </Animated.View>

          <Animated.View style={[styles.divider, animatedDividerStyles]} />

          <Animated.View
            style={[styles.buttonContainer, incrementAnimatedStyle]}
          >
            <Pressable
              onPress={handleIncrement}
              onPressIn={handleIncrementPressIn}
              onPressOut={handleIncrementPressOut}
              disabled={isIncrementDisabled}
              style={[
                styles.button,
                buttonStyle,
                isIncrementDisabled && { opacity: disabledOpacity },
              ]}
              hitSlop={20}
            >
              {renderIncrementIcon ? (
                renderIncrementIcon()
              ) : (
                <DefaultIncrementIcon />
              )}
            </Pressable>
          </Animated.View>
        </View>
      </View>
    );
  },
);

Stepper.displayName = "Stepper";

interface Styles {
  wrapper: ViewStyle;
  container: ViewStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  divider: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  wrapper: {},
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: NORMAL_BG_COLOR,
    overflow: "hidden",
    borderRadius: 12,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: 1,
    height: DIVIDER_HEIGHT,
    backgroundColor: "#C7C7CC",
  },
});

export default Stepper;
