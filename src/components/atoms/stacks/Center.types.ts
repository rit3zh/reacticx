import type { StyleProp, ViewProps, ViewStyle } from "react-native";

interface ICenter extends ViewProps {
  children: React.ReactNode;
  readonly style?: StyleProp<ViewStyle>;
  /**
   * @deprecated Use `style` prop instead.
   */
  readonly className?: string;
}

export type { ICenter };
