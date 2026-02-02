import type { SharedValue } from "react-native-reanimated";

interface ICarouselRenderItem<T> {
  item: T;
  index: number;
  scrollX: SharedValue<number>;
  itemWidth: number;
  itemHeight: number;
  marginHorizontal: number;
  fullWidth: number;
}

interface ICarousel<T> {
  data: readonly T[];
  renderItem: (info: ICarouselRenderItem<T>) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  itemWidth?: number;
  itemHeight?: number;
  marginHorizontal?: number;
  rotationAngle?: number;
  translateYValue?: number;
  transformOrigin?: "bottom" | "center" | "top";
  useBlur?: boolean;
  scrollEventThrottle?: number;
  decelerationRate?: "fast" | "normal" | number;
  showsHorizontalScrollIndicator?: boolean;
}

interface ICarouselItem<T> {
  item: T;
  index: number;
  scrollX: SharedValue<number>;
  renderItem: (info: ICarouselRenderItem<T>) => React.ReactNode;
  itemWidth: number;
  itemHeight: number;
  marginHorizontal: number;
  fullWidth: number;
  rotationAngle: number;
  translateYValue: number;
  transformOrigin: "bottom" | "center" | "top";
  useBlur: boolean;
}

export type { ICarouselItem, ICarousel, ICarouselRenderItem };
