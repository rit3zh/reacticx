import type { SharedValue } from "react-native-reanimated";

interface ITickHeights {
  small: number;
  medium: number;
  large: number;
}

interface IRuler {
  height: number;
  width: number;
  minValue: number;
  maxValue: number;
  step: number;
  readonly onScroll?: (value: number) => void;
  readonly onValueChange?: (value: number) => void;
  readonly labelInterval?: number;
  readonly tickColor?: string;
  readonly activeTickColor?: string;
  readonly cursorColor?: string;
  readonly backgroundColor?: string;
  readonly showCursor?: boolean;
  readonly tickHeights?: ITickHeights;
  readonly enableHaptics?: boolean;
  readonly animateOnMount?: boolean;
}

interface ITick {
  index: number;
  tickX: number;
  xCenter: number;
  yCenter: number;
  translateX: SharedValue<number>;
  mountAnimation: SharedValue<number>;
  tickHeight: number;
  isLarge: boolean;
  tickColor: string;
  activeTickColor: string;
  step: number;
}

export type { IRuler, ITickHeights, ITick };
