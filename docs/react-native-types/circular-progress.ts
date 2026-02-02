import type { ReactNode } from "react";
import type { SharedValue } from "react-native-reanimated";

interface ICircularProgress {
  progress: SharedValue<number>;
  readonly size?: number;
  readonly strokeWidth?: number;
  readonly outerCircleColor?: string;
  readonly progressCircleColor?: string;
  readonly backgroundColor?: string;
  readonly onPress?: () => void;
  readonly gap?: number;
  readonly renderIcon?: () => ReactNode;
}

export type { ICircularProgress };
