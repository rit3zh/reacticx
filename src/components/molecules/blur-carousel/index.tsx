import { Dimensions, Platform, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { BlurCarouselItemProps, BlurCarouselProps } from "./types";
import { BlurView } from "expo-blur";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Extrapolation,
  useAnimatedProps,
} from "react-native-reanimated";

const AnimatedBlurView =
  Animated.createAnimatedComponent(BlurView);
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ITEM_WIDTH = SCREEN_WIDTH * 0.75;
const SPACING = 20;
const SIDE_SPACING = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

const CarouselItem = <ItemT,>({
  item,
  index,
  scrollX,
  renderItem,
  itemWidth = ITEM_WIDTH,
  spacing = SPACING,
}: BlurCarouselItemProps<ItemT>): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  const animatedStyle = useAnimatedStyle<
    Required<Partial<Pick<ViewStyle, "transform" | "opacity">>>
  >(() => {
    const inputRange = [
      (index - 1) * itemWidth,
      index * itemWidth,
      (index + 1) * itemWidth,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.85, 1, 0.85],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const animatedBlurProps = useAnimatedProps(() => {
    const inputRange = [
      (index - 1) * itemWidth,
      index * itemWidth,
      (index + 1) * itemWidth,
    ];

    const blurIntensity = interpolate(
      scrollX.value,
      inputRange,
      [25, 0, 25],
      Extrapolation.CLAMP,
    );

    return {
      intensity: blurIntensity,
    };
  });
  const animateAndroidStylez = useAnimatedStyle(() => {
    return {
      filter: [
        {
          blur: interpolate(
            scrollX.value,
            [
              (index - 1) * itemWidth,
              index * itemWidth,
              (index + 1) * itemWidth,
            ],
            [25, 0, 25],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        styles.itemContainer,
        animatedStyle,
        {
          width: itemWidth,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.itemContent,
          {
            width: itemWidth - spacing * 2,
          },
          Platform.OS === "android" ? animateAndroidStylez : null,
        ]}
      >
        {renderItem({ item, index })}

        {Platform.OS === "ios" ? (
          <AnimatedBlurView
            style={[StyleSheet.absoluteFillObject, styles.blurOverlay]}
            tint="light"
            animatedProps={animatedBlurProps}
          />
        ) : null}
      </Animated.View>
    </Animated.View>
  );
};

const BlurCarousel = <ItemT,>({
  data,
  renderItem,
  horizontalSpacing = SIDE_SPACING,
  itemWidth = ITEM_WIDTH,
  spacing = SPACING,
}: BlurCarouselProps<ItemT>) => {
  const scrollX = useSharedValue<number>(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <Animated.FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      snapToInterval={itemWidth}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingHorizontal: horizontalSpacing,
      }}
      style={{ flexGrow: 0 }}
      renderItem={({ item, index }) => (
        <CarouselItem
          item={item}
          index={index}
          scrollX={scrollX}
          renderItem={renderItem}
          itemWidth={itemWidth}
          spacing={spacing}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemContent: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  blurOverlay: {
    borderRadius: 20,
  },
});

export { BlurCarousel, BlurCarouselItemProps, BlurCarouselProps };
