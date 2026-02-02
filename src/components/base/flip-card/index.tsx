import React, { createContext, memo, useContext, useState } from "react";
import { View, Pressable, StyleSheet, Platform, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  useAnimatedProps,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { BlurView, type BlurViewProps } from "@sbaiahmed1/react-native-blur";
import * as Haptics from "expo-haptics";
import type {
  FlipCardBackProps,
  FlipCardFrontProps,
  FlipCardContextValue,
  FlipCardProps,
  FlipCardTriggerProps,
} from "./types";

const AnimatedBlurView =
  Animated.createAnimatedComponent<BlurViewProps>(BlurView);
const FlipCardContext = createContext<FlipCardContextValue | null>(null);

const useFlipCard = (): FlipCardContextValue => {
  const context = useContext<FlipCardContextValue | null>(FlipCardContext);
  if (!context) {
    throw new Error(
      "FlipCard compound components must be used within FlipCard",
    );
  }
  return context;
};

export const FlipCard: React.FC<FlipCardProps> & {
  Front: React.FC<FlipCardFrontProps>;
  Back: React.FC<FlipCardBackProps>;
  Trigger: React.FC<FlipCardTriggerProps>;
} = ({
  children,
  width = 340,
  height = 480,
  borderRadius = 24,
  blurIntensity = 90,
  containerStyle,
  animationDuration = 600,
  enableHaptics = true,
  onFlip,
  blurTint,
  scaleOnPress = true,
}: FlipCardProps):
  | (React.ReactElement & React.ReactNode & React.JSX.Element)
  | null => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const rotation = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);

  const flip = () => {
    if (enableHaptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);

    rotation.value = withTiming<number>(newFlippedState ? 180 : 0, {
      duration: animationDuration,
      easing: Easing.inOut(Easing.cubic),
    });

    onFlip?.(newFlippedState);
  };

  return (
    <FlipCardContext.Provider
      value={{
        isFlipped,
        flip,
        width,
        height,
        borderRadius,
        blurIntensity,
        animationDuration,
        rotation,
        scale,
        tint: blurTint || "light",
        scaleEnabled: scaleOnPress,
      }}
    >
      <View style={[styles.container, containerStyle, { width, height }]}>
        {children}
      </View>
    </FlipCardContext.Provider>
  );
};

const Front: React.FC<FlipCardFrontProps> &
  React.FunctionComponent<FlipCardFrontProps> = memo<FlipCardFrontProps>(
  ({
    children,
    style,
  }: FlipCardFrontProps):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const {
      rotation,
      scale,
      width,
      height,
      borderRadius,
      blurIntensity,
      tint,
    }: FlipCardContextValue = useFlipCard();

    const frontAnimatedStylez = useAnimatedStyle<
      Pick<ViewStyle, "transform" | "opacity">
    >(() => {
      const rotateY = interpolate(
        rotation.value,
        [0, 180],
        [0, 180],
        Extrapolation.CLAMP,
      );

      const opacity = interpolate(
        rotation.value,
        [0, 90, 90.01, 180],
        [1, 1, 0, 0],
        Extrapolation.CLAMP,
      );

      return {
        transform: [
          { perspective: 1000 },
          { rotateY: `${rotateY}deg` },
          { scale: scale.value },
        ],
        opacity,
      };
    });

    const frontBlurPropz = useAnimatedProps<Pick<BlurViewProps, "blurAmount">>(
      () => {
        const intensity =
          rotation.value <= 20
            ? withSpring<number>(
                interpolate(
                  rotation.value,
                  [0, 20],
                  [0, blurIntensity],
                  Extrapolation.CLAMP,
                ),
              )
            : rotation.value >= 160
              ? withSpring<number>(
                  interpolate(
                    rotation.value,
                    [160, 180],
                    [blurIntensity, 0],
                    Extrapolation.CLAMP,
                  ),
                )
              : blurIntensity;

        return {
          blurAmount: intensity,
        };
      },
    );

    return (
      <Animated.View
        style={[
          styles.card,
          { width, height, borderRadius },
          frontAnimatedStylez,
          style,
        ]}
      >
        {children}

        {Platform.OS === "ios" && (
          <AnimatedBlurView
            blurType={tint}
            animatedProps={frontBlurPropz}
            style={[
              StyleSheet.absoluteFill,
              { borderRadius, overflow: "hidden" },
            ]}
          />
        )}
      </Animated.View>
    );
  },
);

const Back: React.FC<FlipCardBackProps> &
  React.FunctionComponent<FlipCardBackProps> = memo<FlipCardBackProps>(
  ({
    children,
    style,
  }: FlipCardBackProps):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const {
      rotation,
      scale,
      width,
      height,
      borderRadius,
      blurIntensity,
      tint,
    }: FlipCardContextValue = useFlipCard();

    const backAnimatedStylez = useAnimatedStyle<
      Pick<ViewStyle, "transform" | "opacity">
    >(() => {
      const rotateY = interpolate(
        rotation.value,
        [0, 180],
        [180, 360],
        Extrapolation.CLAMP,
      );

      const opacity = interpolate(
        rotation.value,
        [0, 89.99, 90, 180],
        [0, 0, 1, 1],
        Extrapolation.CLAMP,
      );
      return {
        transform: [
          { perspective: 1000 },
          { rotateY: `${rotateY}deg` },
          { scale: scale.value },
        ],
        opacity,
      };
    });
    const backBlurPropz = useAnimatedProps<Pick<BlurViewProps, "blurAmount">>(
      () => {
        const intensity =
          rotation.value >= 160
            ? withSpring(
                interpolate(
                  rotation.value,
                  [180, 160],
                  [0, blurIntensity],
                  Extrapolation.CLAMP,
                ),
              )
            : rotation.value <= 20
              ? withSpring(
                  interpolate(
                    rotation.value,
                    [20, 0],
                    [blurIntensity, 0],
                    Extrapolation.CLAMP,
                  ),
                )
              : blurIntensity;

        return {
          blurAmount: intensity,
        };
      },
    );

    return (
      <Animated.View
        style={[
          styles.card,
          { width, height, borderRadius },
          backAnimatedStylez,
          style,
        ]}
      >
        {children}
        {Platform.OS === "ios" && (
          <AnimatedBlurView
            blurType={tint}
            animatedProps={backBlurPropz}
            style={[
              StyleSheet.absoluteFill,
              { borderRadius, overflow: "hidden" },
            ]}
          />
        )}
      </Animated.View>
    );
  },
);

const Trigger: React.FC<FlipCardTriggerProps> &
  React.FunctionComponent<FlipCardTriggerProps> = memo<FlipCardTriggerProps>(
  ({
    children,
    asChild,
    ...props
  }: FlipCardTriggerProps):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const { flip, scale, scaleEnabled }: FlipCardContextValue = useFlipCard();

    const onPressIn = () => {
      if (!scaleEnabled) return;
      scale.value = withTiming<number>(0.95, { duration: 100 });
    };

    const onPressOut = () => {
      if (!scaleEnabled) return;
      scale.value = withTiming<number>(1, { duration: 200 });
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        onPress: flip,
        onPressIn,
        onPressOut,
        ...props,
      });
    }

    return (
      <Pressable
        onPress={flip}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={StyleSheet.absoluteFill}
        {...props}
      >
        {children}
      </Pressable>
    );
  },
);

FlipCard.Front = Front;
FlipCard.Back = Back;
FlipCard.Trigger = Trigger;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  card:
    Platform.OS === "android"
      ? {
          position: "absolute",
          backgroundColor: "#1a1a1a",

          overflow: "hidden",
          backfaceVisibility: "hidden",
        }
      : {
          position: "absolute",
          backgroundColor: "#1a1a1a",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
          overflow: "hidden",
          backfaceVisibility: "hidden",
        },
});
