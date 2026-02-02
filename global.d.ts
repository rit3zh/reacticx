import type { StyleProp, ViewStyle } from "react-native";

declare global {
  interface WithStyle {
    style?: StyleProp<ViewStyle>;
  }
}
