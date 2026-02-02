// @ts-check
import React, { memo, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Platform,
  View,
  type ViewStyle,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
// @ts-check
import type { IButton } from "./types";

export const Button: React.FC<IButton> & React.FunctionComponent<IButton> =
  memo<IButton>(
    ({
      children,
      isLoading = false,
      onPress,
      width = 200,
      height = 48,
      backgroundColor = "#fff",
      loadingText = "Loading...",
      loadingTextColor = "white",
      loadingTextSize = 16,
      borderRadius,
      gradientColors,
      style,
      loadingTextStyle,
      withPressAnimation = true,
      animationDuration = 250,
      disabled = false,
      showLoadingIndicator = false,
      renderLoadingIndicator,
      loadingTextBackgroundColor = "#cacaca",
    }: IButton): React.ReactNode & React.JSX.Element & React.ReactElement => {
      const animationProgress = useSharedValue<number>(isLoading ? 1 : 0);
      const scaleValue = useSharedValue<number>(1);

      useEffect(() => {
        animationProgress.value = withTiming<number>(isLoading ? 1 : 0, {
          duration: animationDuration,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
      }, [isLoading, animationDuration]);

      const calculatedBorderRadius = borderRadius ?? height / 2;

      const contentAnimatedStylez = useAnimatedStyle<
        Pick<ViewStyle, "transform" | "opacity">
      >(() => {
        const translateY = interpolate(
          animationProgress.value,
          [0, 1],
          [0, -20],
        );
        const opacity = interpolate(animationProgress.value, [0, 0.5], [1, 0]);

        return {
          transform: [{ translateY }],
          opacity,
        };
      });

      const loadingAnimatedStylez = useAnimatedStyle<
        Pick<ViewStyle, "transform" | "opacity">
      >(() => {
        const translateY = interpolate(
          animationProgress.value,
          [0, 1],
          [20, 0],
        );
        const opacity = interpolate(animationProgress.value, [0.5, 1], [0, 1]);

        return {
          transform: [{ translateY }],
          opacity,
        };
      });

      const pressAnimatedStylez = useAnimatedStyle<
        Pick<ViewStyle, "transform" | "backgroundColor">
      >(() => {
        const bgColor = interpolateColor(
          animationProgress.value,
          [0, 1],
          [backgroundColor, loadingTextBackgroundColor!],
        );
        return {
          transform: [{ scale: scaleValue.value }],
          backgroundColor: bgColor,
        };
      });

      const handlePressIn = () => {
        if (withPressAnimation && !disabled && !isLoading) {
          scaleValue.value = withTiming(0.95, { duration: 100 });
        }
      };

      const handlePressOut = () => {
        if (withPressAnimation && !disabled && !isLoading) {
          scaleValue.value = withTiming(1, { duration: 200 });
        }
      };

      const renderInnerContent = () => (
        <View style={styles.contentWrapper}>
          <Animated.View
            style={[styles.contentContainer, contentAnimatedStylez]}
          >
            {children}
          </Animated.View>

          <Animated.View
            style={[styles.loadingContainer, loadingAnimatedStylez]}
          >
            {showLoadingIndicator &&
              (renderLoadingIndicator ? (
                renderLoadingIndicator()
              ) : (
                <Animated.View style={{ marginRight: loadingText ? 8 : 0 }}>
                  <ActivityIndicator color={"#000"} size={"small"} />
                </Animated.View>
              ))}
            <Animated.Text
              style={[
                styles.loadingText,
                {
                  color: loadingTextColor,
                  fontSize: loadingTextSize,
                },
                loadingTextStyle,
              ]}
            >
              {loadingText}
            </Animated.Text>
          </Animated.View>
        </View>
      );

      const buttonContent = gradientColors ? (
        <Animated.View style={[pressAnimatedStylez]}>
          <LinearGradient
            colors={gradientColors as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.button,
              {
                width,
                height,
                borderRadius: calculatedBorderRadius,
              },
              style,
            ]}
          >
            {renderInnerContent()}
          </LinearGradient>
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            styles.button,
            {
              width,
              height,
              backgroundColor,
              borderRadius: calculatedBorderRadius,
            },
            pressAnimatedStylez,
            style,
          ]}
        >
          {renderInnerContent()}
        </Animated.View>
      );

      return (
        <Pressable
          onPress={onPress}
          disabled={isLoading || disabled}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={({ pressed }) => [
            styles.pressable,
            Platform.OS === "ios" && pressed && styles.pressed,
          ]}
          accessible={true}
          accessibilityRole="button"
          accessibilityState={{ disabled: isLoading || disabled }}
        >
          {buttonContent}
        </Pressable>
      );
    },
  );

const styles = StyleSheet.create({
  pressable: {
    alignSelf: "flex-start",
  },
  pressed: {
    opacity: 0.9,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  contentWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontWeight: "600",
  },
});

export default memo<React.FC<IButton> & React.FunctionComponent<IButton>>(
  Button,
);
