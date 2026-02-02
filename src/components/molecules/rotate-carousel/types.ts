import type { ReactNode } from "react";
import type { SharedValue } from "react-native-reanimated";

export type RotateCarouselProps<ItemT> = {
  data: readonly ItemT[];
  renderItem: (info: { item: ItemT; index: number }) => React.ReactNode;
  keyExtractor?: (item: ItemT, index: number) => string;
  spacing?: number;
  itemWidth?: number;
  horizontalSpacing?: number;
  rotatePercentage?: number;
};

export interface RotateCarouselItemProps<ItemT> {
  item: ItemT;
  index: number;
  scrollX: SharedValue<number>;
  renderItem: (info: { item: ItemT; index: number }) => ReactNode;
  spacing?: number;
  itemWidth?: number;
  rotatePercentage?: number;
}
