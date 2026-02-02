// @ts-check
import React, {
  useState,
  useMemo,
  useCallback,
  memo,
  isValidElement,
  useEffect,
} from "react";
import { View, StyleSheet, type LayoutChangeEvent } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  useAnimatedProps,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { BlurView, type BlurViewProps } from "expo-blur";
import type {
  TouchableRippleProps,
  RippleConfig,
  RippleData,
  IRippleWave,
} from "./types";
import { scheduleOnRN } from "react-native-worklets";
import { getBorderRadiusFromChildren } from "./helper";

const AnimatedBlurView =
  Animated.createAnimatedComponent<BlurViewProps>(BlurView);

const RippleWave: React.FC<IRippleWave> & React.FunctionComponent<IRippleWave> =
  memo<IRippleWave>(
    ({
      ripple,
      config,
      layout,
      borderRadiusStyle,
      isHolding,
      onComplete,
    }: IRippleWave): React.ReactElement &
      React.ReactNode &
      React.JSX.Element => {
      const scale = useSharedValue<number>(0);
      const opacity = useSharedValue<number>(config.opacity);
      const isPaused = useSharedValue<boolean>(false);

      useEffect(() => {
        if (isHolding && !isPaused.value) {
          isPaused.value = true;
          scale.value = withTiming(0.6, {
            duration: 200,
            easing: Easing.out(Easing.ease),
          });
          opacity.value = withTiming<number>(config.opacity * 0.8, {
            duration: 200,
          });
        } else if (!isHolding && isPaused.value) {
          isPaused.value = false;
          scale.value = withTiming<number>(config.scale, {
            duration: config.duration * 0.5,
            easing: Easing.out(Easing.ease),
          });
          opacity.value = withSequence(
            withTiming<number>(config.opacity, {
              duration: config.duration * 0.2,
            }),
            withTiming<number>(
              0,
              {
                duration: config.duration * 0.5,
                easing: Easing.out(Easing.ease),
              },
              () => {
                scheduleOnRN(onComplete, ripple.id);
              },
            ),
          );
        } else if (!isHolding && !isPaused.value) {
          scale.value = withTiming(config.scale, {
            duration: config.duration,
            easing: Easing.out(Easing.ease),
          });
          opacity.value = withSequence(
            withTiming(config.opacity, { duration: config.duration * 0.3 }),
            withTiming(
              0,
              {
                duration: config.duration * 0.7,
                easing: Easing.out(Easing.ease),
              },
              () => {
                scheduleOnRN(onComplete, ripple.id);
              },
            ),
          );
        }
      }, [isHolding]);

      const animatedStylez = useAnimatedStyle(() => {
        const size = Math.max(layout.width, layout.height) * 2.5;
        return {
          position: "absolute",
          width: size,
          height: size,
          top: ripple.y - size / 2,
          left: ripple.x - size / 2,
          borderRadius: size / 2,
          transform: [{ scale: scale.value }],
          opacity: opacity.value,
          overflow: "hidden",
        };
      });

      const animatedBlurProps = useAnimatedProps(() => {
        if (!config.blur.enabled) return { intensity: 0 };
        return {
          intensity: opacity.value * (config.blur.intensity || 20),
        };
      });

      if (config.blur.enabled) {
        return (
          <Animated.View pointerEvents="none" style={[animatedStylez]}>
            <AnimatedBlurView
              animatedProps={animatedBlurProps}
              tint={config.blur.tint}
              style={StyleSheet.absoluteFill}
            />
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: config.color,
                },
              ]}
            />
          </Animated.View>
        );
      }

      return (
        <Animated.View
          pointerEvents="none"
          style={[
            animatedStylez,
            {
              backgroundColor: config.color,
            },
          ]}
        />
      );
    },
  );

export const TouchableRipple: React.FC<TouchableRippleProps> &
  React.FunctionComponent<TouchableRippleProps> = memo<TouchableRippleProps>(
  ({
    children,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    rippleConfig,
    centered = false,
    disabled = false,
    style,
    testID,
    borderRadius,
    hitSlop,
  }: TouchableRippleProps):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const [layout, setLayout] = useState({ width: 0, height: 0 });
    const [ripples, setRipples] = useState<RippleData[]>([]);
    const [isHolding, setIsHolding] = useState<boolean>(false);
    const rippleIdCounter = useSharedValue<number>(0);

    const FINAL_CONFIG: Required<RippleConfig> = useMemo<
      Required<RippleConfig>
    >(
      () => ({
        enabled: true,
        color: "rgba(255, 255, 255, 0.2)",
        opacity: 0.6,
        duration: 600,
        scale: 1,

        ...rippleConfig,
        blur: {
          enabled: false,
          intensity: 40,
          tint: "default" as const,
          ...rippleConfig?.blur,
        },
      }),
      [rippleConfig],
    );

    const borderRadiusStyle = useMemo(() => {
      if (borderRadius !== undefined) {
        return { borderRadius };
      }
      return getBorderRadiusFromChildren(children);
    }, [borderRadius, children]);

    const handleLayout = useCallback(
      <T extends LayoutChangeEvent>(event: T) => {
        const { width, height } = event.nativeEvent.layout;
        setLayout({ width, height });
      },
      [],
    );

    const addRipple = useCallback(
      <X extends number, Y extends number>(x: X, y: Y) => {
        if (!FINAL_CONFIG.enabled || disabled) return;
        const rippleX = centered ? layout.width / 2 : x;
        const rippleY = centered ? layout.height / 2 : y;

        const newRipple: RippleData = {
          id: rippleIdCounter.value++,
          x: rippleX,
          y: rippleY,
          timestamp: Date.now(),
        };

        setRipples((prev) => [...prev, newRipple]);
      },
      [FINAL_CONFIG.enabled, disabled, centered, layout, rippleIdCounter],
    );

    const removeRipple = useCallback((id: number) => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, []);

    const tapGesture = Gesture.Tap()
      .enabled(!disabled)
      .onBegin((e) => {
        if (onPressIn) scheduleOnRN(onPressIn);
        scheduleOnRN(addRipple, e.x, e.y);
        scheduleOnRN(setIsHolding, true);
      })
      .onEnd(() => {
        scheduleOnRN(setIsHolding, false);
        if (onPressOut) scheduleOnRN(onPressOut);
        if (onPress) scheduleOnRN(onPress);
      })
      .onFinalize(() => {
        scheduleOnRN(setIsHolding, false);
        if (onPressOut) scheduleOnRN(onPressOut);
      });
    const longPressGesture = Gesture.LongPress()
      .enabled(!disabled && !!onLongPress)
      .minDuration(400)
      .onStart((e) => {
        scheduleOnRN(addRipple, e.x, e.y);
        scheduleOnRN(setIsHolding, true);
      })
      .onEnd(() => {
        if (onLongPress) scheduleOnRN(onLongPress);
        scheduleOnRN(setIsHolding, false);
      })
      .onFinalize(() => {
        scheduleOnRN(setIsHolding, false);
      });
    const composedGesture = useMemo(
      () => Gesture.Race(longPressGesture, tapGesture),
      [longPressGesture, tapGesture],
    );

    if (!isValidElement(children)) {
      console.error(
        "TouchableRipple expects a single valid React element as child.",
      );
      return null;
    }

    return (
      <GestureDetector gesture={composedGesture}>
        <View
          onLayout={handleLayout}
          testID={testID}
          style={{ overflow: "hidden" }}
        >
          <View
            style={[
              borderRadiusStyle,
              style,
              {
                overflow: "hidden",
              },
            ]}
          >
            {children}

            <View
              style={[
                StyleSheet.absoluteFill,
                borderRadiusStyle,
                {
                  overflow: "hidden",
                  pointerEvents: "none",
                },
              ]}
            >
              {ripples.map<React.ReactNode>((ripple) => (
                <RippleWave
                  isHolding={isHolding}
                  key={ripple.id}
                  ripple={ripple}
                  config={FINAL_CONFIG}
                  layout={layout}
                  borderRadiusStyle={borderRadiusStyle}
                  onComplete={removeRipple}
                />
              ))}
            </View>
          </View>
        </View>
      </GestureDetector>
    );
  },
);

export default memo<
  React.FC<TouchableRippleProps> & React.FunctionComponent<TouchableRippleProps>
>(TouchableRipple);
