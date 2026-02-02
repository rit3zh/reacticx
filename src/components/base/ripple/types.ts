import type { BlurTint } from "expo-blur";
import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

interface BlurConfig {
  readonly enabled?: boolean;
  readonly intensity?: number;
  readonly tint?: BlurTint;
}

interface RippleConfig {
  readonly enabled?: boolean;
  readonly color?: string;
  readonly opacity?: number;
  readonly duration?: number;
  readonly scale?: number;
  readonly blur?: BlurConfig;
}

interface TouchableRippleProps {
  children: ReactNode;
  readonly onPress?: () => void;
  readonly onLongPress?: () => void;
  readonly onPressIn?: () => void;
  readonly onPressOut?: () => void;
  readonly rippleConfig?: RippleConfig;
  /**
   * @deprecated
   * @ignore
   */
  readonly borderRadius?: number;
  readonly centered?: boolean;
  readonly disabled?: boolean;
  readonly style?: ViewStyle | ViewStyle[];
  /**
   * @deprecated
   * @not-in-use
   */
  readonly hitSlop?:
    | number
    | { top?: number; bottom?: number; left?: number; right?: number };
  readonly testID?: string;
}

interface IRippleWave {
  ripple: RippleData;
  config: Required<RippleConfig>;
  layout: { width: number; height: number };
  borderRadiusStyle: any;
  isHolding: boolean;
  onComplete: (id: number) => void;
}

interface RippleData {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export type { RippleConfig, TouchableRippleProps, RippleData, IRippleWave };
