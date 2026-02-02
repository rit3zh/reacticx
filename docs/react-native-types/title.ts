import * as React from "react";
import type { ReactNode } from "react";
import type {
  StyleProp,
  TextStyle,
  ViewStyle,
  AccessibilityRole,
  LayoutChangeEvent,
  GestureResponderEvent,
} from "react-native";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type FontWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

type TextAlign = "left" | "center" | "right" | "justify";
type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";
type TextDecoration =
  | "none"
  | "underline"
  | "line-through"
  | "underline line-through";

type EllipsizeMode = "head" | "middle" | "tail" | "clip";
type ColorVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "muted"
  | "white"
  | "black";

interface ITitle extends Required<React.PropsWithChildren> {
  readonly size?: number;
  readonly level?: HeadingLevel;
  readonly lineHeight?: number;
  readonly letterSpacing?: number;

  readonly style?: StyleProp<TextStyle>;
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly weight?: FontWeight;
  readonly align?: TextAlign;
  readonly transform?: TextTransform;
  readonly decoration?: TextDecoration;
  readonly decorationColor?: string;
  readonly color?: string | ColorVariant;
  readonly opacity?: number;
  readonly shadow?: boolean;
  readonly shadowConfig?: {
    readonly color?: string;
    readonly offset?: { width: number; height: number };
    readonly radius?: number;
  };
  readonly italic?: boolean;
  readonly numberOfLines?: number;
  readonly ellipsizeMode?: EllipsizeMode;
  readonly maxWidth?: number;
  readonly minWidth?: number;
  readonly onPress?: (event: GestureResponderEvent) => void;
  readonly onLongPress?: (event: GestureResponderEvent) => void;
  readonly onLayout?: (event: LayoutChangeEvent) => void;
  readonly onTextTruncated?: (isTruncated: boolean) => void;
  readonly selectable?: boolean;
  readonly suppressHighlighting?: boolean;
  readonly activeOpacity?: number;

  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
  readonly accessibilityRole?: AccessibilityRole;
  readonly accessible?: boolean;
  readonly testID?: string;
  readonly loading?: boolean;
  readonly skeletonWidth?: number | `${number}%`;
  readonly animated?: boolean;
  readonly animationDuration?: number;
  readonly prefix?: ReactNode;
  readonly suffix?: ReactNode;
  readonly gap?: number;
  readonly allowFontScaling?: boolean;
  readonly maxFontSizeMultiplier?: number;
  readonly minimumFontScale?: number;
  readonly adjustsFontSizeToFit?: boolean;
  /**
   * @deprecated Use 'style' prop instead
   */
  readonly className?: string;
}

interface ITitleTheme {
  colors: Record<ColorVariant, string>;
  headingSizes: Record<HeadingLevel, number>;
  fontWeights: Record<FontWeight, TextStyle["fontWeight"]>;
  defaultColor: string;
  defaultSize: number;
  defaultWeight: FontWeight;
}

export type {
  ITitle,
  ITitleTheme,
  HeadingLevel,
  FontWeight,
  TextAlign,
  TextTransform,
  TextDecoration,
  EllipsizeMode,
  ColorVariant,
};
