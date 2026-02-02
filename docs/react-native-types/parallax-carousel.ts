import type { ReactNode } from "react";
import type { ImageSourcePropType } from "react-native";
import type { SharedValue } from "react-native-reanimated";

export interface ParallaxCarouselItem {
  image: ImageSourcePropType;
}

export type ParallaxCarouselProps<ItemT extends ParallaxCarouselItem> = {
  data: readonly ItemT[];
  renderItem: (info: { item: ItemT; index: number }) => ReactNode;
  keyExtractor?: (item: ItemT, index: number) => string;
  itemWidth?: number;
  itemHeight?: number;
  spacing?: number;
  parallaxIntensity?: number;
  pagingEnabled?: boolean;
  showHorizontalScrollIndicator?: boolean;
};

export interface ParallaxCarouselItemProps<ItemT extends ParallaxCarouselItem> {
  item: ItemT;
  index: number;
  scrollX: SharedValue<number>;
  renderItem: (info: { item: ItemT; index: number }) => ReactNode;
  itemWidth: number;
  itemHeight: number;
  spacing: number;
  parallaxIntensity: number;
}
