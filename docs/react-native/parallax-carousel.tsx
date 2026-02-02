import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import type {
  ParallaxCarouselItem,
  ParallaxCarouselItemProps,
  ParallaxCarouselProps,
} from "./types";
import { scheduleOnRN } from "react-native-worklets";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";

const { width, height } = Dimensions.get("window");

const ParallaxCarouselItemComponent = <ItemT extends ParallaxCarouselItem>({
  item,
  index,
  scrollX,
  renderItem,
  itemWidth,
  itemHeight,
  spacing,
  parallaxIntensity,
}: ParallaxCarouselItemProps<ItemT>) => {
  const inputRange = [
    (index - 1) * itemWidth,
    index * itemWidth,
    (index + 1) * itemWidth,
  ];

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(scrollX.value, inputRange, [
      -itemWidth * parallaxIntensity,
      0,
      itemWidth * parallaxIntensity,
    ]);

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View
      style={[styles.itemContainer, { width: itemWidth, height: itemHeight }]}
    >
      <View
        style={[
          styles.imageContainer,
          { width: itemWidth - spacing * 2, height: itemHeight - spacing * 2 },
        ]}
      >
        {item.image && (
          <Animated.Image
            source={item.image}
            style={[
              styles.image,
              {
                width: (itemWidth - spacing * 2) * 1,
                height: itemHeight - spacing * 2,
              },
              imageAnimatedStyle,
            ]}
          />
        )}
      </View>
      {renderItem({ item, index })}
    </View>
  );
};

const ParallaxCarousel = <ItemT extends ParallaxCarouselItem>({
  data,
  renderItem,
  keyExtractor,
  itemWidth = width,
  itemHeight = height * 0.75,
  spacing = 20,
  parallaxIntensity = 0.7,
  pagingEnabled = true,
  showHorizontalScrollIndicator = false,
}: ParallaxCarouselProps<ItemT>) => {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onEndDrag: () => {
      scheduleOnRN(impactAsync, ImpactFeedbackStyle.Rigid);
    },
  });

  const defaultKeyExtractor = (item: ItemT, index: number) =>
    keyExtractor ? keyExtractor(item, index) : `item-${index}`;

  return (
    <View style={styles.carouselWrapper}>
      <Animated.FlatList
        data={data}
        keyExtractor={defaultKeyExtractor}
        horizontal
        pagingEnabled={pagingEnabled}
        showsHorizontalScrollIndicator={showHorizontalScrollIndicator}
        onScroll={onScroll}
        style={{ flexGrow: 0 }}
        scrollEventThrottle={16}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item, index }) => (
          <ParallaxCarouselItemComponent
            item={item}
            index={index}
            scrollX={scrollX}
            renderItem={renderItem}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            spacing={spacing}
            parallaxIntensity={parallaxIntensity}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContent: {
    alignItems: "center",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
  },
});

export {
  ParallaxCarousel,
  ParallaxCarouselItemProps,
  ParallaxCarouselProps,
  ParallaxCarouselItem,
};
