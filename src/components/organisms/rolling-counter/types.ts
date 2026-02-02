import type { SharedValue, WithSpringConfig } from "react-native-reanimated";

interface IReusableDigit {
  place: number;
  counterValue: SharedValue<number>;
  height: number;
  width: number;
  color: string;
  fontSize: number;
  springConfig: Partial<WithSpringConfig>;
}

interface ICounter {
  value: number | SharedValue<number>;
  height?: number;
  width?: number;
  fontSize?: number;
  color?: string;
  springConfig?: Partial<WithSpringConfig>;
}

export type { ICounter, IReusableDigit };
