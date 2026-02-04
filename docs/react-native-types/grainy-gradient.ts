import type { StyleProp, ViewStyle } from "react-native";

type GrainyGradientColors = [string, string?, string?, string?];

interface IGrainyGradient {
  width?: number;
  height?: number;
  colors?: GrainyGradientColors;
  speed?: number;
  animated?: boolean;
  intensity?: number;
  size?: number;
  enabled?: boolean;
  amplitude?: number;
  brightness?: number;
  style?: StyleProp<ViewStyle>;
}

export type { IGrainyGradient, GrainyGradientColors };
