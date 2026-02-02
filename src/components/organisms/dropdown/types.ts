import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DropdownContextValue {
  visible: boolean;
  open: () => void;
  close: () => void;
  triggerLayout: TriggerLayout | null;
  setTriggerLayout: (layout: TriggerLayout) => void;
  flipAnim: SharedValue<number>;
  activeItemIndex: SharedValue<number>;
}
interface TriggerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
interface ContentProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  position?: "top" | "bottom" | "left" | "right" | "auto";
}
interface ItemProps {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  index?: number;
}
interface Styles {
  overlay: ViewStyle;
  content: ViewStyle;
  item: ViewStyle;
}

export type {
  DropdownContextValue,
  TriggerLayout,
  TriggerProps,
  ContentProps,
  ItemProps,
  Styles,
};
