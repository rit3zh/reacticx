/**
 * RadialIntro - Orbiting images animation component
 * Inspired by animate-ui radial-intro component (https://animate-ui.com/docs/components/community/radial-intro)
 */
import React, { useEffect, memo, useCallback } from "react";
import { View, StyleSheet, Pressable, type ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
  cancelAnimation,
  type SharedValue,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import type { OrbitItem, OrbitArmProps, RadialIntroProps } from "./types";
import { ANIMATION_DELAYS, TIMING_CONFIG, TIMING_CONFIG_SLOW } from "./config";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const OrbitArm = memo<OrbitArmProps>(
  ({
    item,
    index,
    totalItems,
    stageSize,
    imageSize,
    spinDuration,
    orbitRadius,
    expanded,
    isCenter,
    revealOnFanOut,
    onCenterPress,
  }): React.ReactElement => {
    const step: number = 360 / totalItems;
    const targetAngle: number = index * step;

    const staggerDelay: number = index * 40;

    const armRotation: SharedValue<number> = useSharedValue<number>(0);

    const imageOffsetY: SharedValue<number> =
      useSharedValue<number>(orbitRadius);

    const imageRotation: SharedValue<number> = useSharedValue<number>(0);

    const imageOpacity: SharedValue<number> = useSharedValue<number>(
      isCenter ? 1 : 0,
    );

    const blurAmount: SharedValue<number> = useSharedValue<number>(0);

    const startContinuousSpin = useCallback((): void => {
      armRotation.value = withRepeat(
        withTiming(targetAngle + 360, {
          duration: spinDuration * 1000,
          easing: Easing.linear,
        }),
        -1,
        false,
      );

      imageRotation.value = withRepeat(
        withTiming(-targetAngle - 360, {
          duration: spinDuration * 1000,
          easing: Easing.linear,
        }),
        -1,
        false,
      );
    }, [targetAngle, spinDuration, armRotation, imageRotation]);

    const collapseOrbit = useCallback((): void => {
      cancelAnimation<number>(armRotation);
      cancelAnimation<number>(imageRotation);

      const reverseStagger: number = (totalItems - 1 - index) * 30;

      blurAmount.value = withDelay(
        reverseStagger,
        withTiming(25, { duration: 150, easing: Easing.in(Easing.cubic) }),
      );

      imageOffsetY.value = withDelay(
        reverseStagger,
        withTiming(orbitRadius, TIMING_CONFIG),
      );

      armRotation.value = withDelay(
        reverseStagger,
        withTiming(0, TIMING_CONFIG),
      );

      imageRotation.value = withDelay(
        reverseStagger,
        withTiming(0, TIMING_CONFIG),
      );

      if (!isCenter) {
        imageOpacity.value = withDelay(
          reverseStagger + 200,
          withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) }),
        );
      }

      if (isCenter) {
        blurAmount.value = withDelay(
          reverseStagger + 300,
          withTiming(0, { duration: 900, easing: Easing.out(Easing.cubic) }),
        );
      }
    }, [
      orbitRadius,
      isCenter,
      index,
      totalItems,
      imageOffsetY,
      armRotation,
      imageRotation,
      imageOpacity,
      blurAmount,
    ]);

    useEffect((): (() => void) | void => {
      if (expanded) {
        const revealDelay: number = revealOnFanOut
          ? ANIMATION_DELAYS.ORBIT_PLACEMENT + staggerDelay
          : ANIMATION_DELAYS.IMAGE_LIFT + staggerDelay;

        blurAmount.value = withDelay(
          revealDelay,
          withTiming(20, { duration: 50, easing: Easing.linear }),
        );

        imageOffsetY.value = withDelay(
          ANIMATION_DELAYS.IMAGE_LIFT + staggerDelay,
          withTiming(0, TIMING_CONFIG),
        );

        imageOpacity.value = withDelay(
          revealDelay,
          withTiming(1, { duration: 200, easing: Easing.out(Easing.cubic) }),
        );

        armRotation.value = withDelay(
          ANIMATION_DELAYS.ORBIT_PLACEMENT + staggerDelay,
          withTiming(targetAngle, TIMING_CONFIG_SLOW),
        );

        imageRotation.value = withDelay(
          ANIMATION_DELAYS.ORBIT_PLACEMENT + staggerDelay,
          withTiming(-targetAngle, TIMING_CONFIG_SLOW),
        );

        blurAmount.value = withDelay(
          ANIMATION_DELAYS.ORBIT_PLACEMENT + staggerDelay + 200,
          withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) }),
        );

        const spinTimeout = setTimeout(
          () => {
            startContinuousSpin();
          },
          ANIMATION_DELAYS.CONTINUOUS_SPIN + totalItems * 40,
        );

        return (): void => {
          clearTimeout(spinTimeout);
        };
      } else {
        collapseOrbit();
      }
    }, [
      expanded,
      targetAngle,
      staggerDelay,
      totalItems,
      revealOnFanOut,
      armRotation,
      imageOffsetY,
      imageRotation,
      imageOpacity,
      blurAmount,
      startContinuousSpin,
      collapseOrbit,
    ]);

    const armAnimatedStyle = useAnimatedStyle(
      (): ViewStyle => ({
        transform: [{ rotate: `${armRotation.value}deg` }],
      }),
    );

    const imageAnimatedStyle = useAnimatedStyle(
      (): ViewStyle => ({
        opacity: imageOpacity.value,
        transform: [
          { translateX: -imageSize / 2 },
          { translateY: imageOffsetY.value },
          { rotate: `${imageRotation.value}deg` },
        ],
      }),
    );

    const animatedBlurProps = useAnimatedProps(() => ({
      intensity: blurAmount.value,
    }));

    const imageContent: React.ReactElement = (
      <View
        style={[
          styles.imageWrapper,
          {
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
          },
        ]}
      >
        <Animated.Image
          source={{ uri: item.src }}
          style={[
            {
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize / 2,
            },
          ]}
          resizeMode="cover"
        />
        <AnimatedBlurView
          style={[
            StyleSheet.absoluteFillObject,
            styles.blurOverlay,
            { borderRadius: imageSize / 2 },
          ]}
          tint="prominent"
          animatedProps={animatedBlurProps}
        />
      </View>
    );

    return (
      <Animated.View
        style={[
          styles.arm,
          {
            width: stageSize,
            height: stageSize,
            zIndex: totalItems - index,
          },
          armAnimatedStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.imageContainer,
            {
              left: stageSize / 2,
              top: stageSize / 2 - orbitRadius,
            },
            imageAnimatedStyle,
          ]}
        >
          {isCenter && onCenterPress ? (
            <Pressable onPress={onCenterPress}>{imageContent}</Pressable>
          ) : (
            imageContent
          )}
        </Animated.View>
      </Animated.View>
    );
  },
);

OrbitArm.displayName = "RadialIntro.OrbitArm";

const RadialIntro = memo<RadialIntroProps>(
  ({
    orbitItems,
    stageSize = 320,
    imageSize = 60,
    spinDuration = 30,
    expanded = false,
    onCenterPress,
    revealOnFanOut = true,
    style,
  }): React.ReactElement => {
    const orbitRadius: number = stageSize / 2 - imageSize / 2;

    return (
      <View
        style={[
          styles.container,
          {
            width: stageSize,
            height: stageSize,
          },
          style,
        ]}
      >
        {orbitItems.map(
          (item: OrbitItem, index: number): React.ReactElement => (
            <OrbitArm
              key={item.id}
              item={item}
              index={index}
              totalItems={orbitItems.length}
              stageSize={stageSize}
              imageSize={imageSize}
              spinDuration={spinDuration}
              orbitRadius={orbitRadius}
              expanded={expanded}
              isCenter={index === 0}
              revealOnFanOut={revealOnFanOut}
              onCenterPress={onCenterPress}
            />
          ),
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "visible",
  },
  arm: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  imageContainer: {
    position: "absolute",
  },
  imageWrapper: {
    overflow: "hidden",
  },

  blurOverlay: {
    overflow: "hidden",
  },
});

export { RadialIntro, type RadialIntroProps, type OrbitItem };
