import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  LinearTransition,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type {
  AnimationConfig,
  CharacterAnimationParams,
  TextAnimationProps,
  CharacterProps,
  TimeRemaining,
  CountdownTimerProps,
} from "./types";
import {
  SIZE_PRESETS,
  DEFAULT_ANIMATION_CONFIG,
  ENTER_FINAL,
  EXIT_FINAL,
  ENTER_INITIAL,
  EXIT_INITIAL,
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

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  size = "medium",
  customization = {},
}: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isFinished, setIsFinished] = useState(false);
  const onFinishRef = React.useRef(customization.onFinish);

  useEffect(() => {
    onFinishRef.current = customization.onFinish;
  }, [customization.onFinish]);

  const preset = SIZE_PRESETS[size];

  const styling = {
    numberSize: customization.numberSize ?? preset.numberSize,
    labelSize: customization.labelSize ?? preset.labelSize,
    numberColor: customization.numberColor ?? "#ffffff",
    labelColor: customization.labelColor ?? "#666666",
    separatorColor: customization.separatorColor ?? "#ffffff",
    gap: customization.gap ?? preset.gap,
    letterSpacing: customization.letterSpacing ?? 2,
    fontWeight: customization.fontWeight ?? "700",
    separatorMargin: preset.separatorMargin,
    showLabels: customization.showLabels ?? true,
    showDays: customization.showDays ?? true,
    showSeparators: customization.showSeparators ?? true,
    finishText: customization.finishText ?? "Time's Up!",
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 365)) /
            (1000 * 60 * 60 * 24 * 30),
        );
        const days = Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
        );
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ years, months, days, hours, minutes, seconds });
      } else {
        setTimeRemaining({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        if (!isFinished) {
          setIsFinished(true);
          onFinishRef.current?.();
        }
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate, isFinished]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  const shouldShowYears = timeRemaining.years > 0;
  const shouldShowMonths = timeRemaining.years > 0 || timeRemaining.months > 0;
  const shouldShowDays =
    styling.showDays &&
    (timeRemaining.years > 0 ||
      timeRemaining.months > 0 ||
      timeRemaining.days > 0);
  const shouldShowHours =
    timeRemaining.years > 0 ||
    timeRemaining.months > 0 ||
    timeRemaining.days > 0 ||
    timeRemaining.hours > 0;
  const shouldShowMinutes =
    timeRemaining.years > 0 ||
    timeRemaining.months > 0 ||
    timeRemaining.days > 0 ||
    timeRemaining.hours > 0 ||
    timeRemaining.minutes > 0;

  return (
    <View style={[styles.countdownWrapper, { gap: styling.gap }]}>
      {isFinished ? (
        <StaggeredText
          text={styling.finishText}
          style={{
            fontSize: styling.numberSize,
            fontWeight: styling.fontWeight,
            color: styling.numberColor,
            letterSpacing: styling.letterSpacing,
          }}
          animationConfig={DEFAULT_ANIMATION_CONFIG}
          enterInitial={ENTER_INITIAL}
          enterFinal={ENTER_FINAL}
          exitInitial={EXIT_INITIAL}
          exitFinal={EXIT_FINAL}
        />
      ) : (
        <>
          {shouldShowYears && (
            <>
              <View style={styles.unitContainer}>
                <StaggeredText
                  text={formatNumber(timeRemaining.years)}
                  style={{
                    fontSize: styling.numberSize,
                    fontWeight: styling.fontWeight,
                    color: styling.numberColor,
                    letterSpacing: styling.letterSpacing,
                  }}
                  animationConfig={DEFAULT_ANIMATION_CONFIG}
                  enterInitial={ENTER_INITIAL}
                  enterFinal={ENTER_FINAL}
                  exitInitial={EXIT_INITIAL}
                  exitFinal={EXIT_FINAL}
                />
                {styling.showLabels && (
                  <Text
                    style={[
                      styles.labelText,
                      {
                        fontSize: styling.labelSize,
                        color: styling.labelColor,
                      },
                    ]}
                  >
                    YEARS
                  </Text>
                )}
              </View>

              {styling.showSeparators && (
                <Text
                  style={[
                    styles.separator,
                    {
                      fontSize: styling.numberSize,
                      color: styling.separatorColor,
                      marginHorizontal: styling.separatorMargin,
                    },
                  ]}
                >
                  :
                </Text>
              )}
            </>
          )}

          {shouldShowMonths && (
            <>
              <View style={styles.unitContainer}>
                <StaggeredText
                  text={formatNumber(timeRemaining.months)}
                  style={{
                    fontSize: styling.numberSize,
                    fontWeight: styling.fontWeight,
                    color: styling.numberColor,
                    letterSpacing: styling.letterSpacing,
                  }}
                  animationConfig={DEFAULT_ANIMATION_CONFIG}
                  enterInitial={ENTER_INITIAL}
                  enterFinal={ENTER_FINAL}
                  exitInitial={EXIT_INITIAL}
                  exitFinal={EXIT_FINAL}
                />
                {styling.showLabels && (
                  <Text
                    style={[
                      styles.labelText,
                      {
                        fontSize: styling.labelSize,
                        color: styling.labelColor,
                      },
                    ]}
                  >
                    MONTHS
                  </Text>
                )}
              </View>

              {styling.showSeparators && (
                <Text
                  style={[
                    styles.separator,
                    {
                      fontSize: styling.numberSize,
                      color: styling.separatorColor,
                      marginHorizontal: styling.separatorMargin,
                    },
                  ]}
                >
                  :
                </Text>
              )}
            </>
          )}

          {shouldShowDays && (
            <>
              <View style={styles.unitContainer}>
                <StaggeredText
                  text={formatNumber(timeRemaining.days)}
                  style={{
                    fontSize: styling.numberSize,
                    fontWeight: styling.fontWeight,
                    color: styling.numberColor,
                    letterSpacing: styling.letterSpacing,
                  }}
                  animationConfig={DEFAULT_ANIMATION_CONFIG}
                  enterInitial={ENTER_INITIAL}
                  enterFinal={ENTER_FINAL}
                  exitInitial={EXIT_INITIAL}
                  exitFinal={EXIT_FINAL}
                />
                {styling.showLabels && (
                  <Text
                    style={[
                      styles.labelText,
                      {
                        fontSize: styling.labelSize,
                        color: styling.labelColor,
                      },
                    ]}
                  >
                    DAYS
                  </Text>
                )}
              </View>

              {styling.showSeparators && (
                <Text
                  style={[
                    styles.separator,
                    {
                      fontSize: styling.numberSize,
                      color: styling.separatorColor,
                      marginHorizontal: styling.separatorMargin,
                    },
                  ]}
                >
                  :
                </Text>
              )}
            </>
          )}

          {shouldShowHours && (
            <>
              <View style={styles.unitContainer}>
                <StaggeredText
                  text={formatNumber(timeRemaining.hours)}
                  style={{
                    fontSize: styling.numberSize,
                    fontWeight: styling.fontWeight,
                    color: styling.numberColor,
                    letterSpacing: styling.letterSpacing,
                  }}
                  animationConfig={DEFAULT_ANIMATION_CONFIG}
                  enterInitial={ENTER_INITIAL}
                  enterFinal={ENTER_FINAL}
                  exitInitial={EXIT_INITIAL}
                  exitFinal={EXIT_FINAL}
                />
                {styling.showLabels && (
                  <Text
                    style={[
                      styles.labelText,
                      {
                        fontSize: styling.labelSize,
                        color: styling.labelColor,
                      },
                    ]}
                  >
                    HOURS
                  </Text>
                )}
              </View>

              {styling.showSeparators && (
                <Text
                  style={[
                    styles.separator,
                    {
                      fontSize: styling.numberSize,
                      color: styling.separatorColor,
                      marginHorizontal: styling.separatorMargin,
                    },
                  ]}
                >
                  :
                </Text>
              )}
            </>
          )}

          {shouldShowMinutes && (
            <>
              <View style={styles.unitContainer}>
                <StaggeredText
                  text={formatNumber(timeRemaining.minutes)}
                  style={{
                    fontSize: styling.numberSize,
                    fontWeight: styling.fontWeight,
                    color: styling.numberColor,
                    letterSpacing: styling.letterSpacing,
                  }}
                  animationConfig={DEFAULT_ANIMATION_CONFIG}
                  enterInitial={ENTER_INITIAL}
                  enterFinal={ENTER_FINAL}
                  exitInitial={EXIT_INITIAL}
                  exitFinal={EXIT_FINAL}
                />
                {styling.showLabels && (
                  <Text
                    style={[
                      styles.labelText,
                      {
                        fontSize: styling.labelSize,
                        color: styling.labelColor,
                      },
                    ]}
                  >
                    MINS
                  </Text>
                )}
              </View>

              {styling.showSeparators && (
                <Text
                  style={[
                    styles.separator,
                    {
                      fontSize: styling.numberSize,
                      color: styling.separatorColor,
                      marginHorizontal: styling.separatorMargin,
                    },
                  ]}
                >
                  :
                </Text>
              )}
            </>
          )}

          <View style={styles.unitContainer}>
            <StaggeredText
              text={formatNumber(timeRemaining.seconds)}
              style={{
                fontSize: styling.numberSize,
                fontWeight: styling.fontWeight,
                color: styling.numberColor,
                letterSpacing: styling.letterSpacing,
              }}
              animationConfig={DEFAULT_ANIMATION_CONFIG}
              enterInitial={ENTER_INITIAL}
              enterFinal={ENTER_FINAL}
              exitInitial={EXIT_INITIAL}
              exitFinal={EXIT_FINAL}
            />
            {styling.showLabels && (
              <Text
                style={[
                  styles.labelText,
                  {
                    fontSize: styling.labelSize,
                    color: styling.labelColor,
                  },
                ]}
              >
                SECS
              </Text>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  countdownWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  unitContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    flexDirection: "row",
    overflow: "hidden",
  },
  labelText: {
    fontWeight: "600",
    letterSpacing: 1.5,
    marginTop: 8,
  },
  separator: {
    fontWeight: "700",
  },
});
