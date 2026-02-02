import type { ReactNode } from "react";
import type { SharedValue } from "react-native-reanimated";

export type CircularCarouselProps<ItemT> = {
  data: readonly ItemT[];
  renderItem: (info: { item: ItemT; index: number }) => React.ReactNode;
  keyExtractor?: (item: ItemT, index: number) => string;
  spacing?: number;
  itemWidth?: number;
  horizontalSpacing?: number;
  onIndexChange?: <T extends number>(index: T) => void;
};

export interface CircularCarouselItemProps<ItemT> {
  item: ItemT;
  index: number;
  scrollX: SharedValue<number>;
  renderItem: (info: { item: ItemT; index: number }) => ReactNode;
  spacing?: number;
  itemWidth?: number;
  dataLength?: number;
}
