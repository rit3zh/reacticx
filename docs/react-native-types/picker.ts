import type { DimensionValue } from "react-native";

interface IPicker {
  items: string[];
  readonly onIndexChange?: (index: number) => void;
  readonly onItemChange?: (item: string, index: number) => void;
  readonly initialIndex?: number;
  readonly itemHeight?: number;
  readonly fontSize?: number;
  readonly width?: DimensionValue;
  readonly textColor?: string;
  readonly selectedTextColor?: string;
  readonly backgroundColor?: string;
  readonly selectionAreaBackgroundColor?: string;
  readonly hapticFeedback?: boolean;
}

export { IPicker };
