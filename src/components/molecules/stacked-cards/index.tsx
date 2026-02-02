import { StyleSheet, View, ViewStyle } from "react-native";
import React, { memo, useMemo, type ReactElement } from "react";
import Animated, {
  useAnimatedStyle,
  interpolate,
  withTiming,
  useSharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  Directions,
  type FlingGesture,
  type ComposedGesture,
} from "react-native-gesture-handler";
import type {
  FlingCardConfig,
  FlingStackConfig,
  BaseItemType,
  FlingStackComponent,
  FlingCardComponent,
} from "./types";
import { BlurView, type BlurViewProps } from "expo-blur";

const AnimatedBlurView = Animated.createAnimatedComponent(
  BlurView as React.ComponentType<BlurViewProps>,
);

const FlingCardInner = <T extends BaseItemType>({
  visibleCount,
  item,
  position,
  totalItems,
  animProgress,
  activeIndex,
  lastIndex,
  renderItem,
  cardWidth,
  cardHeight,
  cardContainerStyle,
  blurIntensity = 40,
  useBlur = true,
  tint,
}: FlingCardConfig<T>): React.ReactNode & React.JSX.Element & ReactElement => {
  const animatedCardStyle = useAnimatedStyle<
    Pick<ViewStyle, "transform" | "opacity">
  >(() => {
    const offsetY = interpolate(
      animProgress.value,
      [position - 1, position, position + 1],
      [-30, 1, 30],
    );
    const offsetYActive = interpolate(
      animProgress.value,
      [position - 1, position, position + 1],
      [-200, 1, 200],
    );
    const scaleValue = interpolate(
      animProgress.value,
      [position - 1, position, position + 1],
      [0.9, 1, 1.1],
    );
    const opacityValue = interpolate(
      animProgress.value,
      [position - 1, position, position + 1],
      [1, 1, 0],
    );
    return {
      transform: [
        {
          translateY: position === lastIndex.value ? offsetYActive : offsetY,
        },
        { scale: scaleValue },
      ],
      opacity:
        position < activeIndex.value + visibleCount - 1
          ? opacityValue
          : position === activeIndex.value + visibleCount - 1
            ? withTiming<number>(1)
            : withTiming<number>(0),
    };
  });

  const swipeUpGesture = useMemo<FlingGesture>(
    () =>
      Gesture.Fling()
        .direction(Directions.UP)
        .onStart(() => {
          if (activeIndex.value !== 0) {
            animProgress.value = withTiming((activeIndex.value -= 1));
            lastIndex.value = activeIndex.value - 1;
          }
        }),
    [animProgress, activeIndex, lastIndex],
  );

  const swipeDownGesture = useMemo<FlingGesture>(
    () =>
      Gesture.Fling()
        .direction(Directions.DOWN)
        .onStart(() => {
          if (activeIndex.value !== totalItems - 1) {
            animProgress.value = withTiming((activeIndex.value += 1));
            lastIndex.value = withTiming(activeIndex.value);
          }
        }),
    [animProgress, activeIndex, totalItems, lastIndex],
  );

  const combinedGestures = useMemo<ComposedGesture>(
    () => Gesture.Race(swipeUpGesture, swipeDownGesture),
    [swipeUpGesture, swipeDownGesture],
  );

  const animatedBlurViewPropz = useAnimatedProps<
    Pick<BlurViewProps, "intensity">
  >(() => {
    const intensity = interpolate(
      animProgress.value,
      [position - 1, position, position + 1],
      [blurIntensity, 0, blurIntensity],
    );
    return {
      intensity: intensity,
    };
  });

  return (
    <GestureDetector gesture={combinedGestures}>
      <Animated.View
        style={[
          styles.cardBase,
          {
            zIndex: totalItems - position,
            width: cardWidth,
            height: cardHeight,
          },
          cardContainerStyle,
          animatedCardStyle,
        ]}
      >
        {renderItem?.({ item, index: position })}
        {useBlur && (
          <AnimatedBlurView
            style={[
              StyleSheet.absoluteFillObject,
              {
                overflow: "hidden",
              },
            ]}
            animatedProps={animatedBlurViewPropz}
            tint={tint}
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
};

const FlingCard = memo(FlingCardInner) as FlingCardComponent;

const FlingStackInner = <T extends BaseItemType>({
  data,
  renderItem,
  visibleCount = 4,
  cardWidth = 300,
  cardHeight = 300,
  cardContainerStyle,
  wrapperStyle,
  blurIntensity = 40,
  useBlur = true,
  tint = "systemThickMaterialLight",
}: FlingStackConfig<T>): React.ReactNode & React.JSX.Element & ReactElement => {
  const animProgress = useSharedValue<number>(0);
  const activeIndex = useSharedValue<number>(0);
  const lastIndex = useSharedValue<number>(0);

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {data.map<React.JSX.Element>((item: T, idx: number) => (
        <FlingCard<T>
          key={item.id}
          visibleCount={visibleCount}
          blurIntensity={blurIntensity}
          useBlur={useBlur}
          item={item}
          position={idx}
          totalItems={data.length}
          animProgress={animProgress}
          activeIndex={activeIndex}
          lastIndex={lastIndex}
          renderItem={renderItem}
          cardWidth={cardWidth}
          tint={tint}
          cardHeight={cardHeight}
          cardContainerStyle={cardContainerStyle}
        />
      ))}
    </View>
  );
};

export const FlingStack = memo(FlingStackInner) as FlingStackComponent;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardBase: {
    position: "absolute",
    borderRadius: 20,
    overflow: "hidden",
  },
});
