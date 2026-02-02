import React, { memo, useEffect } from "react";
import { StyleSheet, Pressable, type ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  useDerivedValue,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import type { AnimatedSwitchProps } from "./AnimatedSwitch.types";

export const AnimatedSwitch: React.FC<AnimatedSwitchProps> &
  React.FunctionComponent<AnimatedSwitchProps> = memo<AnimatedSwitchProps>(
  ({
    value,
    onValueChange,
    disabled = false,
    width = 56,
    height = 32,
    onColor = "#4CD964",
    offColor = "#E9E9EA",
    thumbColor = "#FFFFFF",
    thumbSize,
    thumbInset = 2,
    springConfig = {
      damping: 15,
      stiffness: 120,
      mass: 1,
    },
    style,
    testID,
    thumbOnIcon,
    thumbOffIcon,
    trackOnIcon,
    trackOffIcon,
    backgroundImage,
    backgroundImageStyle,
    animateIcons = true,
    iconAnimationType = "fade",
  }: AnimatedSwitchProps): React.ReactNode &
    React.JSX.Element &
    React.ReactNode => {
    const finalThumbSize = thumbSize ?? height - thumbInset * 2;
    const moveDistance = width - finalThumbSize - thumbInset * 2;

    const position = useSharedValue<number>(value ? 1 : 0);
    const iconProgress = useSharedValue<number>(value ? 1 : 0);
    const iconBounce = useSharedValue<number>(1);

    useEffect(() => {
      position.value = value ? 1 : 0;

      if (animateIcons) {
        iconProgress.value = withTiming(value ? 1 : 0, { duration: 200 });
        if (iconAnimationType === "bounce") {
          iconBounce.value = withSequence(
            withTiming(1.3, { duration: 100 }),
            withTiming(1, { duration: 100 }),
          );
        }
      } else {
        iconProgress.value = value ? 1 : 0;
      }
    }, [
      value,
      position,
      iconProgress,
      iconBounce,
      animateIcons,
      iconAnimationType,
    ]);

    const backgroundColor = useDerivedValue<string>(() => {
      return withSpring(
        interpolateColor(position.value, [0, 1], [offColor, onColor]),
      );
    });

    const thumbStylez = useAnimatedStyle<Pick<ViewStyle, "transform">>(() => {
      return {
        transform: [
          {
            translateX: withSpring(position.value * moveDistance, springConfig),
          },
        ],
      };
    });

    const backgroundStyle = useAnimatedStyle<
      Pick<ViewStyle, "backgroundColor">
    >(() => {
      return {
        backgroundColor: backgroundColor.value,
      };
    });

    const thumbOnIconStyle = useAnimatedStyle(() => {
      const baseOpacity = iconProgress.value;

      switch (iconAnimationType) {
        case "fade":
          return { opacity: baseOpacity };
        case "rotate":
          return {
            opacity: baseOpacity,
            transform: [{ rotate: `${iconProgress.value * 360}deg` }],
          };
        case "scale":
          return {
            opacity: baseOpacity,
            transform: [{ scale: iconProgress.value }],
          };
        case "bounce":
          return {
            opacity: baseOpacity,
            transform: [{ scale: baseOpacity * iconBounce.value }],
          };
        default:
          return { opacity: baseOpacity };
      }
    });

    const thumbOffIconStyle = useAnimatedStyle(() => {
      const baseOpacity = 1 - iconProgress.value;

      switch (iconAnimationType) {
        case "fade":
          return { opacity: baseOpacity };
        case "rotate":
          return {
            opacity: baseOpacity,
            transform: [{ rotate: `${(1 - iconProgress.value) * 360}deg` }],
          };
        case "scale":
          return {
            opacity: baseOpacity,
            transform: [{ scale: 1 - iconProgress.value }],
          };
        case "bounce":
          return {
            opacity: baseOpacity,
            transform: [{ scale: baseOpacity * iconBounce.value }],
          };
        default:
          return { opacity: baseOpacity };
      }
    });

    const handlePress = () => {
      if (disabled) return;
      const newValue = !value;
      onValueChange(newValue);
    };

    const trackOnIconStyle = useAnimatedStyle(() => {
      const baseOpacity = iconProgress.value;

      switch (iconAnimationType) {
        case "fade":
          return { opacity: baseOpacity };
        case "scale":
          return {
            opacity: baseOpacity,
            transform: [{ scale: iconProgress.value * 0.5 + 0.5 }],
          };
        case "rotate":
          return {
            opacity: baseOpacity,
            transform: [{ rotate: `${iconProgress.value * 90}deg` }],
          };
        case "bounce":
          return {
            opacity: baseOpacity,
            transform: [{ scale: iconBounce.value }],
          };
        default:
          return { opacity: baseOpacity };
      }
    });

    const trackOffIconStyle = useAnimatedStyle(() => {
      const baseOpacity = 1 - iconProgress.value;

      switch (iconAnimationType) {
        case "fade":
          return { opacity: baseOpacity };
        case "scale":
          return {
            opacity: baseOpacity,
            transform: [{ scale: (1 - iconProgress.value) * 0.5 + 0.5 }],
          };
        case "rotate":
          return {
            opacity: baseOpacity,
            transform: [{ rotate: `${(1 - iconProgress.value) * 90}deg` }],
          };
        case "bounce":
          return {
            opacity: baseOpacity,
            transform: [{ scale: iconBounce.value }],
          };
        default:
          return { opacity: baseOpacity };
      }
    });

    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        testID={testID}
        style={({ pressed }) => [
          { opacity: pressed || disabled ? 0.7 : 1 },
          style,
        ]}
      >
        <Animated.View
          style={[
            styles.track,
            backgroundStyle,
            {
              width,
              height,
              borderRadius: height / 2,
              overflow: "hidden",
            },
          ]}
        >
          {backgroundImage && (
            <Animated.Image
              source={backgroundImage}
              style={[styles.backgroundImage, backgroundImageStyle]}
              resizeMode="cover"
            />
          )}

          {trackOnIcon && (
            <Animated.View
              style={[
                styles.trackIconContainer,
                { justifyContent: "flex-start", alignItems: "flex-start" },
                trackOnIconStyle,
              ]}
            >
              {trackOnIcon}
            </Animated.View>
          )}

          {trackOffIcon && (
            <Animated.View
              style={[
                styles.trackIconContainer,
                { justifyContent: "flex-end", alignItems: "flex-end" },
                trackOffIconStyle,
              ]}
            >
              {trackOffIcon}
            </Animated.View>
          )}

          <Animated.View
            style={[
              styles.thumb,
              thumbStylez,
              {
                width: finalThumbSize,
                height: finalThumbSize,
                borderRadius: finalThumbSize / 2,
                backgroundColor: thumbColor,
                left: thumbInset,
                top: thumbInset,
              },
            ]}
          >
            {thumbOnIcon && (
              <Animated.View
                style={[styles.thumbIconContainer, thumbOnIconStyle]}
              >
                {thumbOnIcon}
              </Animated.View>
            )}

            {thumbOffIcon && (
              <Animated.View
                style={[styles.thumbIconContainer, thumbOffIconStyle]}
              >
                {thumbOffIcon}
              </Animated.View>
            )}
          </Animated.View>
        </Animated.View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  track: {
    justifyContent: "center",
  },
  thumb: {
    position: "absolute",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  trackIconContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: 8,
    zIndex: 1,
  },
  thumbIconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default AnimatedSwitch;
