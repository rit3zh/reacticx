import { StyleSheet, ViewStyle } from "react-native";
import React, { memo } from "react";
import Animated, {
  withTiming,
  withDelay,
  withSpring,
  LinearTransition,
  Easing,
  useAnimatedProps,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BlurView, type BlurViewProps } from "expo-blur";
import type {
  StaggeredTextProps,
  AnimationConfig,
  CharacterAnimationParams,
  CharacterProps,
} from "./types";
import {
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_ENTER_FROM,
  DEFAULT_ENTER_TO,
  DEFAULT_EXIT_FROM,
  DEFAULT_EXIT_TO,
} from "./conf";

const AnimatedBlurView =
  Animated.createAnimatedComponent<BlurViewProps>(BlurView);

const Character: React.FC<CharacterProps> = memo<CharacterProps>(
  ({
    char,
    style,
    index,
    animationConfig,
    enterFrom,
    enterTo,
    exitFrom,
    exitTo,
  }: CharacterProps): React.ReactNode &
    React.JSX.Element &
    React.ReactElement => {
    const enterDelay = index * animationConfig.characterDelay;
    const exitDelay = index * (animationConfig.characterDelay * 0.5);

    const maxBlur = animationConfig.maxBlurIntensity ?? 12;
    const blurIntensity = useSharedValue<number>(maxBlur);

    const enteringAnimation = () => {
      "worklet";
      const springConfig = animationConfig.spring;
      const timingConfig = {
        duration: animationConfig.characterEnterDuration,
        easing: Easing.out(Easing.ease),
      };

      blurIntensity.value = maxBlur;
      blurIntensity.value = withDelay(
        enterDelay,
        withTiming(0, {
          duration: animationConfig.characterEnterDuration * 0.8,
          easing: Easing.out(Easing.ease),
        }),
      );

      return {
        initialValues: {
          opacity: enterFrom.opacity,
          transform: [
            { translateY: enterFrom.translateY },
            { scale: enterFrom.scale },
            { rotate: `${enterFrom.rotate}deg` },
          ],
        },
        animations: {
          opacity: withDelay(
            enterDelay,
            withTiming(enterTo.opacity, timingConfig),
          ),
          transform: [
            {
              translateY: withDelay(
                enterDelay,
                withSpring(enterTo.translateY, springConfig),
              ),
            },
            {
              scale: withDelay(
                enterDelay,
                withSpring(enterTo.scale, springConfig),
              ),
            },
            {
              rotate: withDelay(
                enterDelay,
                withSpring(`${enterTo.rotate}deg`, springConfig),
              ),
            },
          ],
        },
      };
    };

    const exitingAnimation = () => {
      "worklet";
      const timingConfig = {
        duration: animationConfig.characterExitDuration,
        easing: Easing.in(Easing.ease),
      };
      blurIntensity.value = withDelay(
        exitDelay,
        withTiming(maxBlur, {
          duration: animationConfig.characterExitDuration * 0.6,
          easing: Easing.in(Easing.ease),
        }),
      );

      return {
        initialValues: {
          opacity: exitFrom.opacity,
          transform: [
            { translateY: exitFrom.translateY },
            { scale: exitFrom.scale },
            { rotate: `${exitFrom.rotate}deg` },
          ],
        },
        animations: {
          opacity: withDelay(
            exitDelay,
            withTiming(exitTo.opacity, timingConfig),
          ),
          transform: [
            {
              translateY: withDelay(
                exitDelay,
                withTiming(exitTo.translateY, timingConfig),
              ),
            },
            {
              scale: withDelay(
                exitDelay,
                withTiming(exitTo.scale, timingConfig),
              ),
            },
            {
              rotate: withDelay(
                exitDelay,
                withTiming(`${exitTo.rotate}deg`, timingConfig),
              ),
            },
          ],
        },
      };
    };

    const animatedBlurProps = useAnimatedProps<
      Pick<BlurViewProps, "intensity">
    >(() => ({
      intensity: blurIntensity.value,
    }));

    const animatedBlurStyle = useAnimatedStyle<ViewStyle>(() => ({
      opacity: blurIntensity.value > 0.5 ? 1 : 0,
    }));

    return (
      <Animated.View
        entering={enteringAnimation}
        exiting={exitingAnimation}
        layout={LinearTransition.duration(
          animationConfig.layoutTransitionDuration,
        ).easing(Easing.out(Easing.ease))}
        style={styles.characterWrapper}
      >
        <Animated.Text style={style}>{char}</Animated.Text>
        <AnimatedBlurView
          style={[StyleSheet.absoluteFillObject, animatedBlurStyle]}
          animatedProps={animatedBlurProps}
          tint="prominent"
          experimentalBlurMethod={"dimezisBlurView"}
        />
      </Animated.View>
    );
  },
);

export const StaggeredText: React.FC<StaggeredTextProps> =
  memo<StaggeredTextProps>(
    ({
      text,
      style,
      animationConfig,
      enterFrom,
      enterTo,
      exitFrom,
      exitTo,
    }: StaggeredTextProps): React.ReactNode &
      React.JSX.Element &
      React.ReactElement => {
      const characters = Array.from<string>(text);

      const mergedAnimationConfig: AnimationConfig = {
        ...DEFAULT_ANIMATION_CONFIG,
        ...animationConfig,
        spring: {
          ...DEFAULT_ANIMATION_CONFIG.spring,
          ...animationConfig?.spring,
        },
      };

      const mergedEnterFrom: CharacterAnimationParams = {
        ...DEFAULT_ENTER_FROM,
        ...enterFrom,
      };

      const mergedEnterTo: CharacterAnimationParams = {
        ...DEFAULT_ENTER_TO,
        ...enterTo,
      };

      const mergedExitFrom: CharacterAnimationParams = {
        ...DEFAULT_EXIT_FROM,
        ...exitFrom,
      };

      const mergedExitTo: CharacterAnimationParams = {
        ...DEFAULT_EXIT_TO,
        ...exitTo,
      };

      return (
        <Animated.View
          style={styles.textWrapper}
          layout={LinearTransition.duration(
            mergedAnimationConfig.layoutTransitionDuration,
          ).easing(Easing.out(Easing.ease))}
        >
          {characters.map<React.JSX.Element | React.ReactNode>(
            (char, index) => (
              <Character
                key={`${char}-${index}`}
                char={char}
                style={style}
                index={index}
                totalChars={characters.length}
                animationConfig={mergedAnimationConfig}
                enterFrom={mergedEnterFrom}
                enterTo={mergedEnterTo}
                exitFrom={mergedExitFrom}
                exitTo={mergedExitTo}
              />
            ),
          )}
        </Animated.View>
      );
    },
  );

export default memo<StaggeredTextProps>(StaggeredText);

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  characterWrapper: {
    position: "relative",
    overflow: "hidden",
  },
});
