import type { ReactNode } from "react";
import type { SharedValue } from "react-native-reanimated";

export type BlurCarouselProps<ItemT> = {
  data: readonly ItemT[];
  renderItem: (info: { item: ItemT; index: number }) => React.ReactNode;
  keyExtractor?: (item: ItemT, index: number) => string;
  spacing?: number;
  itemWidth?: number;
  horizontalSpacing?: number;
};

export interface BlurCarouselItemProps<ItemT> {
  item: ItemT;
  index: number;
  scrollX: SharedValue<number>;
  renderItem: (info: { item: ItemT; index: number }) => ReactNode;
  spacing?: number;
  itemWidth?: number;
}
