import type { StyleProp, ViewStyle } from "react-native";

type Region = "left" | "middle" | "right";

interface IElasticSlider {
  readonly defaultValue?: number;
  readonly startingValue?: number;
  readonly maxValue?: number;
  readonly isStepped?: boolean;
  readonly stepSize?: number;
  readonly renderLeadingAccessory?: () => React.ReactNode;
  readonly renderTrailingAccessory?: () => React.ReactNode;
  readonly onValueChange?: (value: number) => void;
  readonly onDragStart?: () => void;
  readonly onDragEnd?: (finalValue: number) => void;
  readonly trackColor?: string;
  readonly fillColor?: string;
  readonly style?: StyleProp<ViewStyle>;
}

export type { IElasticSlider, Region };
