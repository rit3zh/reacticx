import React from "react";
import type { StyleProp, ViewStyle } from "react-native";

interface ChipItem {
  label: string;
  icon: () => React.ReactNode & React.JSX.Element;
  activeColor?: string;
  labelColor?: string;
  inActiveBackgroundColor?: string;
}

interface ChipGroupProps<T> {
  chips: T[];
  selectedIndex?: number;
  onChange?: (index: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

interface AnimatedChipProps extends ChipItem {
  isActive: boolean;
  onPress: () => void;
}

export type { ChipItem, ChipGroupProps, AnimatedChipProps };
