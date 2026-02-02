import React, { memo, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  type ViewStyle,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  interpolate,
  useAnimatedProps,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  PanGesture,
  TapGesture,
} from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";

import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { BlurView, BlurViewProps } from "expo-blur";

import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type { TabBarProps } from "./types";

const SPACING = 10;
const SCALE_UP = 1.2;

const AnimatedBlurView =
  Animated.createAnimatedComponent<BlurViewProps>(BlurView);

const TabButton: React.FC<TabBarProps> & React.FunctionComponent<TabBarProps> =
  memo(
    ({ onPress, onLongPress, isFocused, label, icon, index, activeIndex }) => {
      const scale = useSharedValue(1);
      const opacity = useSharedValue(0.6);

      React.useEffect(() => {
        scale.value = withSpring(isFocused ? 1.1 : 1, {});
        opacity.value = withTiming(isFocused ? 1 : 0.6, { duration: 200 });
      }, [isFocused]);

      const animatedStyle = useAnimatedStyle(() => {
        const isActive = activeIndex.value === index;
        const isCurrentlyFocused = isFocused && activeIndex.value === -1;

        return {
          transform: [
            {
              scale: withSpring(
                isActive ? SCALE_UP : isCurrentlyFocused ? 1.1 : 1,
                {},
              ),
            },
          ],
          opacity: withTiming(isActive ? 1 : isCurrentlyFocused ? 1 : 0.6, {
            duration: 200,
          }),
          zIndex: isActive ? 1000 : index,
        };
      });

      const handlePressIn = () => {
        if (activeIndex.value === -1) {
          scale.value = withSpring(0.85, {});
        }
      };

      const handlePressOut = () => {
        if (activeIndex.value === -1) {
          scale.value = withSpring(isFocused ? 1.1 : 1, {});
        }
      };

      return (
        <TouchableOpacity
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.tabButton}
          activeOpacity={1}
        >
          <Animated.View style={[styles.iconContainer, animatedStyle]}>
            {icon?.({
              focused: isFocused || activeIndex.value === index,
              color:
                isFocused || activeIndex.value === index ? "#fff" : "#6b7280",
              size: 28,
            })}
          </Animated.View>
        </TouchableOpacity>
      );
    },
  );

export const StackAwareTabBar: React.FC<BottomTabBarProps> &
  React.FunctionComponent<BottomTabBarProps> = memo(
  (props: BottomTabBarProps): JSX.Element & React.ReactNode => {
    const router = useRouter();
    const { state, descriptors, navigation } = props;
    const translateX = useSharedValue<number>(100);
    const opacity = useSharedValue<number>(0);
    const activeIndex = useSharedValue<number>(-1);
    const lastHapticIndex = useSharedValue<number>(-1);
    const tabBarWidth = useSharedValue<number>(0);
    const currentRoute = state.routes[state.index];
    const hasNestedRoutes =
      currentRoute?.state?.index !== undefined && currentRoute.state.index > 0;

    React.useEffect((): void => {
      if (hasNestedRoutes) {
        translateX.value = withSpring(0, {
          damping: 18,
          stiffness: 130,
          mass: 0.6,
        });
        opacity.value = withTiming(1, { duration: 200 });
      } else {
        translateX.value = withSpring(100, {
          damping: 18,
          stiffness: 130,
          mass: 0.6,
        });
        opacity.value = withTiming(0, { duration: 200 });
      }
    }, [hasNestedRoutes]);

    const backButtonStyle = useAnimatedStyle<ViewStyle>(() => ({
      transform: [
        { translateX: translateX.value },
        {
          scale: interpolate(opacity.value, [0, 1], [0, 1]),
        },
        {
          rotate: withSpring(
            `${interpolate(opacity.value, [0, 1], [100, 0])}deg`,
          ),
        },
      ],
      opacity: opacity.value,
    }));

    const handleBackPress = () => {
      router.back();
    };

    const triggerHaptic = useCallback<() => void>(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }, []);

    const calculateActiveIndex = useCallback(
      (x: number, totalWidth: number) => {
        "worklet";
        const tabCount = state.routes.length;
        const tabWidth = totalWidth / tabCount;

        for (let i = 0; i < tabCount; i++) {
          const tabStart = i * tabWidth;
          const tabEnd = tabStart + tabWidth;

          if (x >= tabStart && x <= tabEnd) {
            return i;
          }
        }

        if (x > totalWidth) {
          return tabCount - 1;
        }

        return 0;
      },
      [state.routes.length],
    );

    const navigateToTab = useCallback<(index: number) => void>(
      (index: number) => {
        const route = state.routes[index];
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });
        if (state.index !== index && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      },
      [state, navigation],
    );

    const panGesture: PanGesture = Gesture.Pan()
      .minDistance(0)
      .onBegin((event) => {
        "worklet";
        const width = tabBarWidth.value;
        if (width > 0) {
          const index = calculateActiveIndex(event.x, width);
          activeIndex.value = index;
          lastHapticIndex.value = index;
          scheduleOnRN(triggerHaptic);
        }
      })
      .onUpdate((event) => {
        "worklet";
        const width = tabBarWidth.value;
        if (width > 0) {
          const index = calculateActiveIndex(event.x, width);
          if (index !== activeIndex.value) {
            activeIndex.value = index;
            if (index !== lastHapticIndex.value) {
              lastHapticIndex.value = index;
              scheduleOnRN(triggerHaptic);
            }
          }
        }
      })
      .onEnd(() => {
        "worklet";
        const finalIndex = activeIndex.value;
        if (finalIndex >= 0 && finalIndex < state.routes.length) {
          scheduleOnRN(navigateToTab, finalIndex);
        }
        activeIndex.value = -1;
        lastHapticIndex.value = -1;
      })
      .onFinalize(() => {
        "worklet";
        activeIndex.value = -1;
        lastHapticIndex.value = -1;
      });

    const tapGesture: TapGesture = Gesture.Tap()
      .maxDuration(100)
      .onEnd((event) => {
        const width = tabBarWidth.value;
        if (width > 0) {
          const index = calculateActiveIndex(event.x, width);
          if (index >= 0 && index < state.routes.length) {
            scheduleOnRN(navigateToTab, index);
          }
        }
      });
    const composedGesture = Gesture.Exclusive(panGesture, tapGesture);
    const animatedBlurViewPropz = useAnimatedProps<
      Pick<BlurViewProps, "intensity">
    >(() => {
      const intensity = withSpring(
        interpolate(opacity.value, [0, 0.3, 0.5, 1], [0, 5.5, 94.5, 0]),
      );
      return {
        intensity,
      };
    });

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Animated.View style={[styles.backButtonContainer, backButtonStyle]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={20} color="#000" />
            </TouchableOpacity>
            <AnimatedBlurView
              style={[
                StyleSheet.absoluteFillObject,
                {
                  overflow: "hidden",
                  borderRadius: 25,
                },
              ]}
              animatedProps={animatedBlurViewPropz}
              tint={"systemUltraThinMaterialLight"}
              pointerEvents={"none"}
            />
          </Animated.View>

          <GestureDetector gesture={composedGesture}>
            <View
              style={styles.tabBar}
              onLayout={(event) => {
                tabBarWidth.value = event.nativeEvent.layout.width;
              }}
            >
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                  options.tabBarLabel !== undefined
                    ? String(options.tabBarLabel)
                    : options.title !== undefined
                      ? options.title
                      : route.name;
                const isFocused = state.index === index;
                const onPress = (): void => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };
                const onLongPress = (): void => {
                  navigation.emit({
                    type: "tabLongPress",
                    target: route.key,
                  });
                };
                return (
                  <TabButton
                    key={route.key}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    isFocused={isFocused}
                    label={label}
                    icon={options.tabBarIcon}
                    index={index}
                    activeIndex={activeIndex}
                  />
                );
              })}
            </View>
          </GestureDetector>
        </View>
      </View>
    );
  },
);

export default memo(StackAwareTabBar);

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#101010",
    borderRadius: 50,
    paddingVertical: 15,
    maxWidth: 200,
    paddingHorizontal: SPACING * 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  container: {
    paddingBottom: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButtonContainer: {
    position: "absolute",
    left: -SPACING / 2 - 50,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
