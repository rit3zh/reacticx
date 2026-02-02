import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import type {
  ScaleCarouselItem,
  ScaleCarouselItemProps,
  ScaleCarouselProps,
} from "./types";
import { scheduleOnRN } from "react-native-worklets";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";

const { width, height } = Dimensions.get("window");

const ScaleCarouselItemComponent = <ItemT extends ScaleCarouselItem>({
  item,
  index,
  scrollX,
  renderItem,
  itemWidth,
  itemHeight,
  spacing,
  scaleRange,
  rotationRange,
}: ScaleCarouselItemProps<ItemT>) => {
  const inputRange = [
    (index - 1) * itemWidth,
    index * itemWidth,
    (index + 1) * itemWidth,
  ];

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            scaleRange!,
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            rotationRange!,
          )}deg`,
        },
      ],
    };
  });

  return (
    <View
      style={[styles.itemContainer, { width: itemWidth, height: itemHeight }]}
    >
      <Animated.View
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
      </Animated.View>
      {renderItem({ item, index })}
    </View>
  );
};

const ScaleCarousel = <ItemT extends ScaleCarouselItem>({
  data,
  renderItem,
  keyExtractor,
  itemWidth = width,
  itemHeight = height * 0.75,
  spacing = 20,
  pagingEnabled = true,
  showHorizontalScrollIndicator = false,
  scaleRange = [1.6, 1, 1.6],
  rotationRange = [15, 0, -10],
}: ScaleCarouselProps<ItemT>) => {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x / (itemWidth + spacing);
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
        scrollEventThrottle={16}
        contentContainerStyle={styles.flatListContent}
        style={{
          flexGrow: 0,
        }}
        renderItem={({ item, index }) => (
          <ScaleCarouselItemComponent
            item={item}
            index={index}
            scrollX={scrollX}
            renderItem={renderItem}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            spacing={spacing}
            scaleRange={scaleRange}
            rotationRange={rotationRange}
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
  },
  image: {
    resizeMode: "cover",
  },
});

export {
  ScaleCarousel,
  ScaleCarouselItemProps,
  ScaleCarouselProps,
  ScaleCarouselItem,
};
