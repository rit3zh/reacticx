import type { ViewStyle } from "react-native";

export type CircularLoaderProps = {
  size?: number;
  strokeWidth?: number;
  activeColor?: string;
  /**
   * @readonly
   * @not-in-use
   */
  inactiveColor?: string;
  duration?: number;
  style?: ViewStyle;
  gradientLength?: number;
  fadeOpacity?: number;
  blurAmount?: number;
  enableBlur?: boolean;
};
