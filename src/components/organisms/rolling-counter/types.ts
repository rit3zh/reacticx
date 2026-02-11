import { StyleProp, TextStyle } from "react-native";
import type { SharedValue, WithSpringConfig } from "react-native-reanimated";

interface IReusableDigit {
  place: number;
  counterValue: SharedValue<number>;
  height: number;
  width: number;
  digitStyle: StyleProp<TextStyle>;
  springConfig: Partial<WithSpringConfig>;
}

interface ICounter {
  value: number | SharedValue<number>;
  height?: number;
  width?: number;
  digitStyle?: StyleProp<TextStyle>;
  springConfig?: Partial<WithSpringConfig>;
}

export type { ICounter, IReusableDigit };
