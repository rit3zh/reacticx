import type { StyleProp, ViewStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

interface HamburgerIconProps {
  progress: SharedValue<number>;
  readonly size?: number;
  readonly color?: string;
  readonly strokeWidth?: number;
  readonly onPress?: () => void;
  readonly lineGap?: number;
  readonly lineWidth?: number;
  readonly style?: StyleProp<ViewStyle>;
}

export type { HamburgerIconProps };
