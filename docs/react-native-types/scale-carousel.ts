import type { ReactNode } from "react";
import type { ImageSourcePropType } from "react-native";
import type { SharedValue } from "react-native-reanimated";

export interface ScaleCarouselItem {
  image: ImageSourcePropType;
}

export type ScaleCarouselProps<ItemT extends ScaleCarouselItem> = {
  data: readonly ItemT[];
  renderItem: (info: { item: ItemT; index: number }) => ReactNode;
  keyExtractor?: (item: ItemT, index: number) => string;
  itemWidth?: number;
  itemHeight?: number;
  spacing?: number;
  pagingEnabled?: boolean;
  showHorizontalScrollIndicator?: boolean;
  scaleRange?: [number, number, number];
  rotationRange?: [number, number, number];
};

export interface ScaleCarouselItemProps<ItemT extends ScaleCarouselItem> {
  item: ItemT;
  index: number;
  scaleRange?: [number, number, number];
  rotationRange?: [number, number, number];
  scrollX: SharedValue<number>;
  renderItem: (info: { item: ItemT; index: number }) => ReactNode;
  itemWidth: number;
  itemHeight: number;
  spacing: number;
}
