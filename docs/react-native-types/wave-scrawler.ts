import type { SkImage } from "@shopify/react-native-skia";
import type { StyleProp, ViewStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

type ImageSource = number | { uri: string };

interface ITransitionRenderer {
  fromImage: SkImage | null;
  toImage: SkImage | null;
  progress: SharedValue<number>;
  width: number;
  height: number;
  amplitude: number;
  waves: number;
  colorSeparation: number;
}

interface IWaveScrawler {
  source: ImageSource[];
  readonly index: number;
  readonly duration?: number;
  readonly amplitude?: number;
  readonly waves?: number;
  readonly colorSeparation?: number;
  readonly style?: StyleProp<ViewStyle>;
  readonly onTransitionEnd?: (index: number) => void;
}

export type { IWaveScrawler, ImageSource, ITransitionRenderer };
