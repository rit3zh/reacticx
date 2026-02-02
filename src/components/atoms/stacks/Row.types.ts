import type { StyleProp, ViewStyle } from "react-native";

interface IRow {
  children: React.ReactNode;
  readonly spacing?: number;
  readonly style?: StyleProp<ViewStyle>;
}

export type { IRow };
