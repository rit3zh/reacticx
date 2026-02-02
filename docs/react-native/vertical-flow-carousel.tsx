import { BlurView } from "expo-blur";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import type { AnimatedItemProps, VerticalCarouselProps } from "./types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

function AnimatedItem<T>({
  item,
  index,
  scrollY,
  itemHeight,
  spacing,
  rotationAngle,
  scaleInactive,
  opacityInactive,
  showBlur,
  blurIntensity,
  children,
  totalItems,
}: AnimatedItemProps<T>) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * (itemHeight + spacing),
      index * (itemHeight + spacing),
      (index + 1) * (itemHeight + spacing),
    ];

    const scale = interpolate(
      scrollY.value,
      inputRange,
      [scaleInactive, 1, scaleInactive],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      scrollY.value,
      inputRange,
      [opacityInactive, 1, opacityInactive],
      Extrapolation.CLAMP,
    );

    const rotateZ = interpolate(
      scrollY.value,
      inputRange,
      [rotationAngle, 0, -rotationAngle],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { scale },
        { rotateZ: `${rotateZ}deg` },
        { perspective: 1000 },
      ],
      opacity,
    };
  });

  const blurOpacity = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * (itemHeight + spacing),
      index * (itemHeight + spacing),
      (index + 1) * (itemHeight + spacing),
    ];

    const blur = interpolate(
      scrollY.value,
      inputRange,
      [1, 0, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity: blur,
    };
  });

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        animatedStyle,
        {
          marginBottom: index === totalItems - 1 ? 400 : spacing,
        },
      ]}
    >
      <View style={styles.itemContent}>
        {children}
        {showBlur && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              blurOpacity,
              { overflow: "hidden" },
            ]}
          >
            <BlurView
              intensity={blurIntensity}
              style={[
                StyleSheet.absoluteFill,
                {
                  overflow: "hidden",
                },
              ]}
              tint="dark"
            />
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
}

export default function VerticalFlowCarousel<T>({
  data,
  renderItem,
  itemHeight = 120,
  spacing = 50,
  containerStyle,
  contentContainerStyle,
  showBlur = true,
  blurIntensity = 16,
  rotationAngle = 12,
  scaleInactive = 0.85,
  opacityInactive = 0.5,
  snapEnabled = true,
}: VerticalCarouselProps<T>) {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        snapToInterval={snapEnabled ? itemHeight + spacing : undefined}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      >
        {data.map((item, index) => (
          <AnimatedItem
            key={index}
            item={item}
            index={index}
            scrollY={scrollY}
            itemHeight={itemHeight}
            spacing={spacing}
            rotationAngle={rotationAngle}
            scaleInactive={scaleInactive}
            opacityInactive={opacityInactive}
            showBlur={showBlur}
            blurIntensity={blurIntensity}
            totalItems={data.length}
          >
            {renderItem(item, index)}
          </AnimatedItem>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    // paddingHorizontal: 30,
  },
  itemContainer: {
    width: "100%",
  },
  itemContent: {
    width: "100%",
  },
});
