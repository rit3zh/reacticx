// @ts-ignore
import React, { memo } from "react";
import { View, StyleSheet, Dimensions, type ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type { IScrollProgress } from "./types";
import { scheduleOnRN } from "react-native-worklets";
import { DEFAULT_CONTENT_CONTAINER_STYLE } from "./conf";
const WIDTH = Dimensions.get("window").width;

export const AnimatedScrollProgress: React.FC<IScrollProgress> &
  React.FunctionComponent<IScrollProgress> = memo<IScrollProgress>(
  ({
    children,
    renderInitialContent,
    renderEndContent,
    endReachedThreshold = 100,
    endResetThreshold = 95,
    fabWidth = WIDTH * 0.7,
    fabHeight = 50,
    fabBottomOffset = 30,
    fabBackgroundColor = "white",
    fabEndBackgroundColor = "forestgreen",
    fabBorderRadius = 100,
    showFabOnScroll = true,
    fabAppearScrollOffset = 150,
    fabEndScale = 1,
    contentContainerStyle,
    initialContentContainerStyle,
    endContentContainerStyle,
    fabStyle,
    fabButtonStyle,
    onScrollProgressChange,
    onEndReached,
    onEndReset,
    ...props
  }): React.ReactNode & React.JSX.Element & React.ReactElement => {
    const contentHeight = useSharedValue<number>(1);
    const scrollViewHeight = useSharedValue<number>(1);
    const textTransition = useSharedValue<number>(0);
    const scrollY = useSharedValue<number>(0);
    const hasReachedEnd = useSharedValue<boolean>(false);

    const scrollHandler = useAnimatedScrollHandler<Record<string, unknown>>({
      onScroll: (event) => {
        scrollY.value = event.contentOffset.y;
        contentHeight.value = event.contentSize.height;
        scrollViewHeight.value = event.layoutMeasurement.height;
      },
    });

    const scrollProgress = useDerivedValue<number>(() => {
      const maxScroll = contentHeight.value - scrollViewHeight.value;
      if (maxScroll <= 0) return 0;
      const progress = (scrollY.value / maxScroll) * 100;

      if (progress >= endReachedThreshold) {
        textTransition.value = withTiming<number>(1, { duration: 300 });
        if (!hasReachedEnd.value) {
          hasReachedEnd.value = true;
          if (onEndReached) {
            scheduleOnRN<[], void>(onEndReached);
          }
        }
      } else if (progress < endResetThreshold) {
        textTransition.value = withTiming<number>(0, { duration: 300 });
        if (hasReachedEnd.value) {
          hasReachedEnd.value = false;
          if (onEndReset) {
            scheduleOnRN(onEndReset);
          }
        }
      }

      const clampedProgress = Math.min(Math.max(progress, 0), 100);

      if (onScrollProgressChange) {
        scheduleOnRN<[number], void>(onScrollProgressChange, clampedProgress);
      }

      return clampedProgress;
    });

    const fabAnimatedStyle = useAnimatedStyle<
      Pick<ViewStyle, "opacity" | "transform">
    >(() => {
      if (!showFabOnScroll) {
        return {
          opacity: 1,
          transform: [{ translateY: 0 }],
        };
      }

      const opacity = interpolate(
        scrollY.value,
        [0, fabAppearScrollOffset],
        [0, 1],
        Extrapolation.CLAMP,
      );

      const translateY = interpolate(
        scrollY.value,
        [0, fabAppearScrollOffset],
        [100, 0],
        Extrapolation.CLAMP,
      );

      return {
        opacity: withTiming<number>(opacity, { duration: 300 }),
        transform: [
          { translateY: withTiming<number>(translateY, { duration: 300 }) },
        ],
      };
    });

    const initialTextStyle = useAnimatedStyle<
      Pick<ViewStyle, "opacity" | "transform">
    >(() => {
      const opacity = interpolate(
        textTransition.value,
        [0, 0.5, 1],
        [1, 0, 0],
        Extrapolation.CLAMP,
      );

      const translateY = interpolate(
        textTransition.value,
        [0, 1],
        [0, -20],
        Extrapolation.CLAMP,
      );

      return {
        opacity: withTiming<number>(opacity, { duration: 300 }),
        transform: [
          { translateY: withTiming<number>(translateY, { duration: 300 }) },
        ],
        position: "absolute" as const,
      };
    });

    const newTextStyle = useAnimatedStyle<
      Pick<ViewStyle, "opacity" | "transform">
    >(() => {
      const opacity = interpolate(
        textTransition.value,
        [0, 0.5, 1],
        [0, 0, 1],
        Extrapolation.CLAMP,
      );

      const translateY = interpolate(
        textTransition.value,
        [0, 0.5, 1],
        [20, 20, 0],
        Extrapolation.CLAMP,
      );

      return {
        opacity: withTiming<number>(opacity, { duration: 300 }),
        transform: [
          { translateY: withTiming<number>(translateY, { duration: 300 }) },
        ],
      };
    });

    const rAnimatedContainerStyle = useAnimatedStyle<
      Pick<ViewStyle, "backgroundColor" | "transform">
    >(() => {
      const scale = interpolate(
        scrollProgress.value,
        [endResetThreshold, endReachedThreshold],
        [1, fabEndScale],
        Extrapolation.CLAMP,
      );

      const backgroundColor = interpolateColor(
        scrollProgress.value,
        [endResetThreshold, endReachedThreshold],
        [fabBackgroundColor, fabEndBackgroundColor],
      );

      if (fabEndScale === 1) {
        return {
          backgroundColor,
        };
      }

      return {
        backgroundColor,
        transform: [
          {
            scale: withSpring<number>(scale, {
              damping: 12,
              stiffness: 90,
              mass: 0.8,
            }),
          },
        ],
      };
    });

    return (
      <>
        <Animated.ScrollView
          onScroll={scrollHandler}
          {...props}
          scrollEventThrottle={16}
        >
          {children}
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.fab,
            {
              width: fabWidth,
              height: fabHeight,
              bottom: fabBottomOffset,
            },
            fabAnimatedStyle,
            fabStyle,
          ]}
        >
          <Animated.View
            style={[
              styles.fabButton,
              {
                borderRadius: fabBorderRadius,
              },
              rAnimatedContainerStyle,
              fabButtonStyle,
            ]}
          >
            <View
              style={[DEFAULT_CONTENT_CONTAINER_STYLE, contentContainerStyle]}
            >
              <Animated.View
                style={[initialTextStyle, initialContentContainerStyle]}
              >
                {renderInitialContent()}
              </Animated.View>

              <Animated.View style={[newTextStyle, endContentContainerStyle]}>
                {renderEndContent()}
              </Animated.View>
            </View>
          </Animated.View>
        </Animated.View>
      </>
    );
  },
);

export default memo<
  React.FC<IScrollProgress> & React.FunctionComponent<IScrollProgress>
>(AnimatedScrollProgress);

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    alignSelf: "center",
  },
  fabButton: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
