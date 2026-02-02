import type { SharedValue } from "react-native-reanimated";

interface ICircularList {
  data: string[];
  scaleEnabled?: boolean;
}

interface ICircularListItem {
  index: number;
  imageUri: string;
  contentOffset: SharedValue<number>;
  scaleEnabled?: boolean;
}

export type { ICircularList, ICircularListItem };
