/**
 * Animation inspired by:
 * https://x.com/dev_ya/status/1991193618787254462
 * Interaction design by Yanis Lebzar.
 */

import { StyleSheet, Pressable } from "react-native";
import React, { useState, useCallback } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
  interpolateColor,
  LinearTransition,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { CircularLoader } from "@/components/molecules/Loaders/circular";
import type {
  SpinButtonProps,
  AnimationConfig,
  CharacterAnimationParams,
  TextAnimationProps,
  CharacterProps,
} from "./types";
import {
  BUTTON_SCALE,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_BUTTON_COLORS,
  DEFAULT_CHARACTER_ENTER_FINAL,
  DEFAULT_CHARACTER_ENTER_INITIAL,
  DEFAULT_CHARACTER_EXIT_FINAL,
  DEFAULT_CHARACTER_EXIT_INITIAL,
  DEFAULT_SPINNER_CONFIG,
  DEFAULT_BUTTON_STYLE,
} from "./conf";

const mergeDeep = <T extends Record<string, any>>(
  target: T,
  source: Partial<T>,
): T => {
  const output = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      output[key] = mergeDeep(
        output[key] as Record<string, any>,
        source[key] as Record<string, any>,
      ) as T[Extract<keyof T, string>];
    } else if (source[key] !== undefined) {
      output[key] = source[key] as T[Extract<keyof T, string>];
    }
  }

  return output;
};

const StaggeredText: React.FC<
  TextAnimationProps & {
    readonly animationConfig: AnimationConfig;
    readonly enterInitial: CharacterAnimationParams;
    readonly enterFinal: CharacterAnimationParams;
    readonly exitInitial: CharacterAnimationParams;
    readonly exitFinal: CharacterAnimationParams;
  }
> = ({
  text,
  style,
  animationConfig,
  enterInitial,
  enterFinal,
  exitInitial,
  exitFinal,
}) => {
  const characters = Array.from(text);

  return (
    <Animated.View
      style={styles.textWrapper}
      layout={LinearTransition.duration(
        animationConfig.buttonTransitionDuration,
      ).easing(animationConfig.timing.easing!)}
    >
      {characters.map((char, index) => (
        <Character
          key={`${char}-${index}`}
          char={char}
          style={style}
          index={index}
          animationConfig={animationConfig}
          enterInitial={enterInitial}
          enterFinal={enterFinal}
          exitInitial={exitInitial}
          exitFinal={exitFinal}
        />
      ))}
    </Animated.View>
  );
};

const Character: React.FC<CharacterProps> = ({
  char,
  style,
  index,
  animationConfig,
  enterInitial,
  enterFinal,
  exitInitial,
  exitFinal,
}) => {
  const animationDelay = (index + 1) * animationConfig.characterDelay;

  const enteringAnimation = () => {
    "worklet";

    const springConfig = animationConfig.spring;
    const timingConfig = {
      duration: animationConfig.characterEnterDuration,
    };

    return {
      initialValues: {
        opacity: enterInitial.opacity,
        transform: [
          { translateY: enterInitial.translateY },
          { scale: enterInitial.scale },
        ],
      },
      animations: {
        opacity: withDelay(
          animationDelay,
          withTiming(enterFinal.opacity, timingConfig),
        ),
        transform: [
          {
            translateY: withDelay(
              animationDelay,
              withSpring(enterFinal.translateY, springConfig),
            ),
          },
          {
            scale: withDelay(
              animationDelay,
              withSpring(enterFinal.scale, springConfig),
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
    };

    return {
      initialValues: {
        opacity: exitInitial.opacity,
        transform: [
          { translateY: exitInitial.translateY },
          { scale: exitInitial.scale },
        ],
      },
      animations: {
        opacity: withDelay(
          animationDelay,
          withTiming(exitFinal.opacity, timingConfig),
        ),
        transform: [
          {
            translateY: withDelay(
              animationDelay,
              withTiming(exitFinal.translateY, timingConfig),
            ),
          },
          {
            scale: withDelay(
              animationDelay,
              withTiming(exitFinal.scale, timingConfig),
            ),
          },
        ],
      },
    };
  };

  return (
    <Animated.Text
      entering={enteringAnimation}
      exiting={exitingAnimation}
      layout={LinearTransition.duration(180).easing(
        animationConfig.timing.easing!,
      )}
      style={[style]}
    >
      {char}
    </Animated.Text>
  );
};

const SpinButton: React.FC<SpinButtonProps> = ({
  idleText = "Save",
  activeText = "Saving",
  colors,
  animationConfig,
  spinnerConfig,
  buttonStyle,
  onPress,
  onStateChange,
  initialState = false,
  disabled = false,
  controlled = false,
  isActive,
}) => {
  const [internalState, setInternalState] = useState<boolean>(initialState);

  const isSaving = controlled ? (isActive ?? false) : internalState;

  const mergedColors = mergeDeep(DEFAULT_BUTTON_COLORS, colors ?? {});
  const mergedAnimationConfig = mergeDeep(
    DEFAULT_ANIMATION_CONFIG,
    animationConfig ?? {},
  );
  const mergedSpinnerConfig = mergeDeep(
    DEFAULT_SPINNER_CONFIG,
    spinnerConfig ?? {},
  );
  const mergedButtonStyle = mergeDeep(DEFAULT_BUTTON_STYLE, buttonStyle ?? {});

  const buttonScale = useSharedValue<number>(1);
  const buttonBackgroundProgress = useSharedValue<number>(initialState ? 1 : 0);
  const textColorProgress = useSharedValue<number>(initialState ? 1 : 0);
  const spinnerScale = useSharedValue<number>(initialState ? 1 : 0);
  const spinnerRotation = useSharedValue<number>(0);

  const handlePress = useCallback<() => void>((): void => {
    if (disabled) return;

    const newState = !isSaving;

    if (!controlled) {
      setInternalState(newState);
    }

    onPress?.(newState);
    onStateChange?.(newState);

    const colorTimingConfig = {
      duration: mergedAnimationConfig.colorTransitionDuration,
      easing: mergedAnimationConfig.timing.easing,
    };

    buttonBackgroundProgress.value = withTiming(
      newState ? 1 : 0,
      colorTimingConfig,
    );
    textColorProgress.value = withTiming(newState ? 1 : 0, colorTimingConfig);

    if (newState) {
      spinnerScale.value = withTiming(1, {
        duration: mergedAnimationConfig.spinnerEnterDuration,
        easing: Easing.bezier(0.34, 1.56, 0.64, 1),
      });
      spinnerRotation.value = withRepeat<number>(
        withTiming<number>(360, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
        false,
      );
    } else {
      spinnerScale.value = withTiming<number>(0, {
        duration: mergedAnimationConfig.spinnerExitDuration,
        easing: Easing.ease,
      });
      spinnerRotation.value = withTiming<number>(0, {
        duration: mergedAnimationConfig.spinnerExitDuration,
      });
    }

    buttonScale.value = withTiming<number>(BUTTON_SCALE.pressed, {
      duration: mergedAnimationConfig.buttonPressDuration,
    });
    buttonScale.value = withTiming<number>(BUTTON_SCALE.released, {
      duration: mergedAnimationConfig.buttonReleaseDuration,
      easing: Easing.out(Easing.ease),
    });
  }, [
    disabled,
    isSaving,
    controlled,
    onPress,
    onStateChange,
    mergedAnimationConfig,
    buttonBackgroundProgress,
    textColorProgress,
    spinnerScale,
    spinnerRotation,
    buttonScale,
  ]);

  const animatedButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      buttonBackgroundProgress.value,
      [0, 1],
      [mergedColors.idle.background, mergedColors.active.background],
    );

    return {
      transform: [{ scale: buttonScale.value }],
      backgroundColor,
      opacity: disabled ? 0.5 : 1,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      textColorProgress.value,
      [0, 1],
      [mergedColors.idle.text, mergedColors.active.text],
    );

    return {
      color,
    };
  });

  const animatedSpinnerContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: spinnerScale.value }],
      opacity: spinnerScale.value,
      backgroundColor: interpolateColor(
        spinnerScale.value,
        [0, 1],
        ["transparent", mergedSpinnerConfig.containerBackground],
      ),
    };
  });

  return (
    <Pressable onPress={handlePress} disabled={disabled}>
      <Animated.View
        style={[
          {
            paddingHorizontal: mergedButtonStyle.paddingHorizontal,
            paddingVertical: mergedButtonStyle.paddingVertical,
            borderRadius: mergedButtonStyle.borderRadius,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          },
          animatedButtonStyle,
        ]}
        layout={LinearTransition.duration(
          mergedAnimationConfig.buttonTransitionDuration,
        ).easing(mergedAnimationConfig.timing.easing!)}
      >
        <StaggeredText
          text={isSaving ? activeText : idleText}
          style={[
            {
              fontSize: mergedButtonStyle.fontSize,
              fontWeight: mergedButtonStyle.fontWeight,
            },
            animatedTextStyle,
          ]}
          animationConfig={mergedAnimationConfig}
          enterInitial={DEFAULT_CHARACTER_ENTER_INITIAL}
          enterFinal={DEFAULT_CHARACTER_ENTER_FINAL}
          exitInitial={DEFAULT_CHARACTER_EXIT_INITIAL}
          exitFinal={DEFAULT_CHARACTER_EXIT_FINAL}
        />

        <Animated.View
          style={[
            {
              position: "absolute",
              right: mergedSpinnerConfig.position.right,
              bottom: mergedSpinnerConfig.position.bottom,
              width: mergedSpinnerConfig.containerSize,
              height: mergedSpinnerConfig.containerSize,
              backgroundColor: mergedSpinnerConfig.containerBackground,
              borderRadius: 99,
              justifyContent: "center",
              alignItems: "center",
            },
            animatedSpinnerContainerStyle,
          ]}
        >
          <Animated.View
            style={{
              width: mergedSpinnerConfig.size,
              height: mergedSpinnerConfig.size,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularLoader
              activeColor={mergedSpinnerConfig.color}
              size={mergedSpinnerConfig.size}
              strokeWidth={mergedSpinnerConfig.strokeWidth}
              duration={800}
            />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default SpinButton;

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
