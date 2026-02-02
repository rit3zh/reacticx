import type { SkImage } from "@shopify/react-native-skia";
import type { StyleProp, ViewStyle } from "react-native";

export interface IMenuItem {
  image: string;
}

export interface IInfiniteMenu {
  items: IMenuItem[];
  readonly scale?: number;
  readonly backgroundColor?: string;
  readonly style?: StyleProp<ViewStyle>;
}

export interface IDisc {
  screenX: number;
  screenY: number;
  radius: number;
  alpha: number;
  z: number;
  itemIndex: number;
}

export interface IDiscComponent {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  image: SkImage | null;
}
