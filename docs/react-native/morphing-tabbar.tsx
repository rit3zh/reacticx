// @ts-check
import React, { useState, useCallback, memo } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
  Platform,
} from "react-native";
import type {
  LayoutRectangle,
  ViewStyle,
  PressableProps,
  LayoutChangeEvent,
} from "react-native";
import {
  Canvas,
  RoundedRect,
  Group,
  Shadow,
  BackdropBlur,
  Fill,
  rect,
  rrect,
} from "@shopify/react-native-skia";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";
import type { IBackground, IMorphicTabBar, ITab } from "./types";
import { DEFAULT_DARK_THEME, DEFAULT_ITEMS, DEFAULT_LIGHT_THEME } from "./conf";
import {
  AndroidHaptics,
  impactAsync,
  ImpactFeedbackStyle,
  performAndroidHapticsAsync,
} from "expo-haptics";

const ANIMATION_EASING = Easing.bezier(0.4, 0, 0.2, 1);

const AnimatedPressable =
  Animated.createAnimatedComponent<PressableProps>(Pressable);

const Background: React.FC<IBackground> & React.FunctionComponent<IBackground> =
  memo<IBackground>(
    ({
      width,
      height,
      borderRadius,
      theme,
      enableGlass,
      enableShadow,
    }: IBackground):
      | (React.ReactNode & React.JSX.Element & React.ReactElement)
      | null => {
      if (width === 0 || height === 0) return null;

      return (
        <Canvas style={[StyleSheet.absoluteFill, { width, height }]}>
          <Group>
            {enableGlass && (
              <>
                <BackdropBlur
                  blur={10}
                  clip={rrect(
                    rect(0, 0, width, height),
                    borderRadius,
                    borderRadius,
                  )}
                >
                  <Fill
                    color={theme.glassBackground || "rgba(255, 255, 255, 0.1)"}
                  />
                </BackdropBlur>
              </>
            )}

            {enableShadow && (
              <RoundedRect
                x={0}
                y={0}
                width={width}
                height={height}
                r={borderRadius}
                color="transparent"
              >
                <Shadow
                  dx={0}
                  dy={4}
                  blur={12}
                  color={theme.shadowColor || "rgba(0, 0, 0, 0.2)"}
                />
              </RoundedRect>
            )}
          </Group>
        </Canvas>
      );
    },
  );
const Tab: React.FC<ITab> & React.FunctionComponent<ITab> = memo<ITab>(
  ({
    item,
    index,
    activeIndex,
    totalItems,
    onPress,
    animationProgress,
    previousIndex,
    theme,
    borderRadius,
    textStyle,
  }: ITab): React.ReactNode & React.JSX.Element & React.ReactElement => {
    const isActive = index === activeIndex;
    const isFirst = index === 0;
    const isLast = index === totalItems - 1;

    const animatedContainerStylez = useAnimatedStyle<
      Pick<
        ViewStyle,
        | "borderTopLeftRadius"
        | "borderBottomLeftRadius"
        | "borderTopRightRadius"
        | "borderBottomRightRadius"
        | "marginHorizontal"
      >
    >(() => {
      const progress = animationProgress.value;
      const prevIdx = previousIndex.value;

      const wasActive = prevIdx === index;
      const willBeActive = activeIndex === index;

      let leftRadius: number;
      if (willBeActive) {
        const fromRadius = wasActive
          ? borderRadius
          : prevIdx === index - 1 || isFirst
            ? borderRadius
            : 0;
        leftRadius = interpolate(progress, [0, 1], [fromRadius, borderRadius]);
      } else if (wasActive) {
        const toRadius =
          activeIndex === index - 1 || isFirst ? borderRadius : 0;
        leftRadius = interpolate(progress, [0, 1], [borderRadius, toRadius]);
      } else {
        const shouldBeRounded = activeIndex === index - 1 || isFirst;
        const wasRounded = prevIdx === index - 1 || isFirst;
        if (shouldBeRounded !== wasRounded) {
          leftRadius = interpolate(
            progress,
            [0, 1],
            [wasRounded ? borderRadius : 0, shouldBeRounded ? borderRadius : 0],
          );
        } else {
          leftRadius = shouldBeRounded ? borderRadius : 0;
        }
      }
      let rightRadius: number;
      if (willBeActive) {
        const fromRadius = wasActive
          ? borderRadius
          : prevIdx === index + 1 || isLast
            ? borderRadius
            : 0;
        rightRadius = interpolate(progress, [0, 1], [fromRadius, borderRadius]);
      } else if (wasActive) {
        const toRadius = activeIndex === index + 1 || isLast ? borderRadius : 0;
        rightRadius = interpolate(progress, [0, 1], [borderRadius, toRadius]);
      } else {
        const shouldBeRounded = activeIndex === index + 1 || isLast;
        const wasRounded = prevIdx === index + 1 || isLast;
        if (shouldBeRounded !== wasRounded) {
          rightRadius = interpolate(
            progress,
            [0, 1],
            [wasRounded ? borderRadius : 0, shouldBeRounded ? borderRadius : 0],
          );
        } else {
          rightRadius = shouldBeRounded ? borderRadius : 0;
        }
      }

      let marginH: number;
      if (willBeActive && !wasActive) {
        marginH = interpolate(progress, [0, 1], [0, 8]);
      } else if (wasActive && !willBeActive) {
        marginH = interpolate(progress, [0, 1], [8, 0]);
      } else if (willBeActive && wasActive) {
        marginH = 8;
      } else {
        marginH = 0;
      }

      return {
        borderTopLeftRadius: leftRadius,
        borderBottomLeftRadius: leftRadius,
        borderTopRightRadius: rightRadius,
        borderBottomRightRadius: rightRadius,
        marginHorizontal: marginH,
      };
    }, [activeIndex, borderRadius, isFirst, isLast]);

    const scaleValue = useSharedValue<number>(1);

    const handlePressIn = useCallback<() => void>(() => {
      scaleValue.value = withTiming(0.95, { duration: 100 });
    }, [scaleValue]);

    const handlePressOut = useCallback<() => void>(() => {
      scaleValue.value = withTiming<number>(1, { duration: 100 });
    }, [scaleValue]);

    const animatedScaleStylez = useAnimatedStyle<Pick<ViewStyle, "transform">>(
      () => ({
        transform: [{ scale: scaleValue.value }],
      }),
    );

    const handleOnPress: () => void = () => {
      return onPress<number>(index);
    };

    return (
      <AnimatedPressable
        onPress={handleOnPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.tab,
          { backgroundColor: theme.tabBackground },
          animatedContainerStylez,
          animatedScaleStylez,
        ]}
      >
        <Text
          style={[
            styles.tabText,
            {
              color: isActive ? theme.activeText : theme.inactiveText,
              fontWeight: isActive ? "600" : "400",
            },
            textStyle,
          ]}
        >
          {item.name}
        </Text>
      </AnimatedPressable>
    );
  },
);

export const MorphicTabBar: React.FC<IMorphicTabBar> &
  React.FunctionComponent<IMorphicTabBar> = memo<IMorphicTabBar>(
  ({
    items = DEFAULT_ITEMS,
    onTabChange,
    initialActiveIndex = 0,
    animationDuration = 300,
    borderRadius = 12,
    light = DEFAULT_LIGHT_THEME,
    dark = DEFAULT_DARK_THEME,
    enableGlass = false,
    enableShadow = true,
    containerStyle,
    textStyle,
  }: IMorphicTabBar):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const theme = isDark ? dark : light;

    const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
    const [containerLayout, setContainerLayout] = useState<
      Pick<LayoutRectangle, "width" | "height">
    >({
      width: 0,
      height: 0,
    });

    const animationProgress = useSharedValue<number>(1);
    const previousIndex = useSharedValue<number>(initialActiveIndex);

    const handleContainerLayout = useCallback<
      (event: LayoutChangeEvent) => void
    >((event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setContainerLayout({ width, height });
    }, []);

    const handleTabPress = useCallback<(index: number) => void>(
      (index: number) => {
        if (index === activeIndex) return;

        previousIndex.value = activeIndex;
        animationProgress.value = 0;
        animationProgress.value = withTiming<number>(1, {
          duration: animationDuration,
          easing: ANIMATION_EASING,
        });

        setActiveIndex(index);

        if (Platform.OS === "ios") {
          impactAsync(ImpactFeedbackStyle.Soft);
        } else {
          performAndroidHapticsAsync(AndroidHaptics.Keyboard_Tap);
        }
        onTabChange?.<string, number>(items[index].keyPath, index);
      },
      [
        activeIndex,
        animationProgress,
        previousIndex,
        animationDuration,
        items,
        onTabChange,
      ],
    );

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.navWrapper}>
          <View
            style={[styles.navContainer, { borderRadius }]}
            onLayout={handleContainerLayout}
          >
            <Background
              width={containerLayout.width}
              height={containerLayout.height}
              borderRadius={borderRadius}
              theme={theme}
              enableGlass={enableGlass}
              enableShadow={enableShadow}
            />

            <View style={styles.tabsRow}>
              {items.map<React.JSX.Element>((item, index) => (
                <Tab
                  key={`${item.keyPath}-${index}`}
                  item={item}
                  index={index}
                  activeIndex={activeIndex}
                  totalItems={items.length}
                  onPress={handleTabPress}
                  animationProgress={animationProgress}
                  previousIndex={previousIndex}
                  theme={theme}
                  borderRadius={borderRadius}
                  textStyle={textStyle}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  navContainer: {
    flexDirection: "row",
    overflow: "hidden",
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 14,
  },
});

export default memo<
  React.FC<IMorphicTabBar> & React.FunctionComponent<IMorphicTabBar>
>(MorphicTabBar);
