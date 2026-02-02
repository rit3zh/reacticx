import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  memo,
} from "react";
import {
  Canvas,
  Circle,
  Group,
  Image,
  Mask,
  Rect,
  SkImage,
  makeImageFromView,
} from "@shopify/react-native-skia";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import {
  ThemeMode,
  AnimationType,
  type ThemeSwitcherProps,
  type ThemeSwitcherRef,
} from "./types";
import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_SWITCH_DELAY,
  DEFAULT_EASING,
} from "./conf";
import { wait, getEasingFunction, getMaxRadius } from "./helpers";

export const ThemeSwitcher = forwardRef<ThemeSwitcherRef, ThemeSwitcherProps>(
  (
    {
      theme,
      onThemeChange,
      children,
      animationDuration = DEFAULT_ANIMATION_DURATION,
      animationType = DEFAULT_ANIMATION_TYPE,
      style,
      onAnimationStart,
      onAnimationComplete,
      switchDelay = DEFAULT_SWITCH_DELAY,
      easing = DEFAULT_EASING,
    },
    ref,
  ) => {
    const pd = PixelRatio.get();
    const viewRef = useRef<View>(null);
    const [overlay, setOverlay] = useState<SkImage | null>(null);
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
      Dimensions.get("screen");

    const circleRadius = useSharedValue(0);
    const circleCenterX = useSharedValue(SCREEN_WIDTH / 2);
    const circleCenterY = useSharedValue(SCREEN_HEIGHT / 2);
    const wipePosition = useSharedValue(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const animateThemeChange = async <T extends number, U extends number>(
      touchX?: T,
      touchY?: U,
    ): Promise<void> => {
      if (isAnimating) return;

      setIsAnimating(true);
      onAnimationStart?.();

      const centerX = touchX ?? SCREEN_WIDTH / 2;
      const centerY = touchY ?? SCREEN_HEIGHT / 2;

      circleCenterX.value = centerX;
      circleCenterY.value = centerY;

      if (viewRef.current) {
        const snapshot = await makeImageFromView<View>(viewRef);
        setOverlay(snapshot);
      }

      await wait<number>(switchDelay);

      const newTheme: ThemeMode =
        theme === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
      onThemeChange(newTheme);

      const easingFn = getEasingFunction(easing);
      const animationTypeValue =
        typeof animationType === "string" ? animationType : animationType;

      switch (animationTypeValue) {
        case AnimationType.Circular:
        case "circular": {
          const maxRadius = getMaxRadius(
            centerX,
            centerY,
            SCREEN_WIDTH,
            SCREEN_HEIGHT,
          );
          circleRadius.value = withTiming(maxRadius, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;
        }

        case AnimationType.CircularInverted:
        case "circularInverted": {
          const maxRadiusInverted = getMaxRadius(
            centerX,
            centerY,
            SCREEN_WIDTH,
            SCREEN_HEIGHT,
          );
          circleRadius.value = maxRadiusInverted;
          circleRadius.value = withTiming(0, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;
        }

        case AnimationType.Wipe:
        case "wipe":
          wipePosition.value = withTiming(SCREEN_WIDTH, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;

        case AnimationType.WipeRight:
        case "wipeRight":
          wipePosition.value = SCREEN_WIDTH;
          wipePosition.value = withTiming(0, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;

        case AnimationType.WipeDown:
        case "wipeDown":
          wipePosition.value = withTiming(SCREEN_HEIGHT, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;

        case AnimationType.WipeUp:
        case "wipeUp":
          wipePosition.value = SCREEN_HEIGHT;
          wipePosition.value = withTiming(0, {
            duration: animationDuration,
            easing: easingFn,
          });
          break;

        default:
          wipePosition.value = withTiming(SCREEN_WIDTH, {
            duration: animationDuration,
            easing: easingFn,
          });
      }

      await wait(animationDuration);

      setOverlay(null);
      setIsAnimating(false);
      onAnimationComplete?.();

      await wait(200);
      circleRadius.value = 0;
      wipePosition.value = 0;
    };

    useImperativeHandle(ref, () => ({
      animate: animateThemeChange,
    }));

    const renderMask = () => {
      const animationTypeValue = animationType as string;

      switch (animationTypeValue) {
        case AnimationType.Circular:
        case "circular":
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Circle
                cx={circleCenterX}
                cy={circleCenterY}
                r={circleRadius}
                color="black"
              />
            </Group>
          );

        case AnimationType.CircularInverted:
        case "circularInverted":
          return (
            <Group>
              <Circle
                cx={circleCenterX}
                cy={circleCenterY}
                r={circleRadius}
                color="white"
              />
            </Group>
          );

        case AnimationType.Wipe:
        case "wipe":
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Rect height={SCREEN_HEIGHT} width={wipePosition} color="black" />
            </Group>
          );

        case AnimationType.WipeRight:
        case "wipeRight":
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Rect
                x={wipePosition}
                height={SCREEN_HEIGHT}
                width={SCREEN_WIDTH}
                color="black"
              />
            </Group>
          );

        case AnimationType.WipeDown:
        case "wipeDown":
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Rect height={wipePosition} width={SCREEN_WIDTH} color="black" />
            </Group>
          );

        case AnimationType.WipeUp:
        case "wipeUp":
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Rect
                y={wipePosition}
                height={SCREEN_HEIGHT}
                width={SCREEN_WIDTH}
                color="black"
              />
            </Group>
          );

        default:
          return (
            <Group>
              <Rect height={SCREEN_HEIGHT} width={SCREEN_WIDTH} color="white" />
              <Rect height={SCREEN_HEIGHT} width={wipePosition} color="black" />
            </Group>
          );
      }
    };

    return (
      <View style={[styles.container, style]} ref={viewRef} collapsable={false}>
        {children}

        {overlay && (
          <Canvas style={StyleSheet.absoluteFillObject} pointerEvents="none">
            <Mask mode="luminance" mask={renderMask()}>
              <Image
                image={overlay}
                x={0}
                y={0}
                width={overlay.width() / pd}
                height={overlay.height() / pd}
              />
            </Mask>
          </Canvas>
        )}
      </View>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
