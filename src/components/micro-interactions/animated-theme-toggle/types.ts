import type { StyleProp, ViewStyle } from "react-native";

interface IAnimatedThemeToggle {
  isDark: boolean;
  onToggle: () => void;
  readonly size?: number;
  readonly duration?: number;
  readonly color?: string;
  readonly strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}

export type { IAnimatedThemeToggle };
