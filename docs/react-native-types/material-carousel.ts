import type { SharedValue } from "react-native-reanimated";

interface ICarouselItem {
  item: string;
  scrollX: SharedValue<number>;
  index: number;
  readonly renderItem?: (item: string, index: number) => React.ReactNode;
  readonly dataLength?: number;
}

interface IMaterialCarousel {
  data: string[];
  renderItem: (item: string, index: number) => React.ReactNode;
}

export type { ICarouselItem, IMaterialCarousel };
