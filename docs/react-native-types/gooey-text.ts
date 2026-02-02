import type { StyleProp, ViewStyle, TextStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

type FontWeight = TextStyle["fontWeight"];

interface IGooeyText {
  texts: string[];
  readonly morphTime?: number;
  readonly cooldownTime?: number;
  readonly style?: StyleProp<ViewStyle>;
  readonly fontSize?: number;
  readonly color?: string;
  readonly fontSource?: number | string;
  readonly fontFamily?: string;
  readonly fontWeight?: FontWeight;
  readonly width?: number;
  readonly height?: number;
}

interface IGooeyTextItem {
  text: string;
  index: number;
  totalTexts: number;
  masterClock: SharedValue<number>;
  cooldownFraction: number;
  font: any;
  color: string;
  x: number;
  y: number;
}

export type { IGooeyText, IGooeyTextItem };
