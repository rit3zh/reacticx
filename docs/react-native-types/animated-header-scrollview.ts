import type { BlurTint } from "expo-blur";
import type { LinearGradientPoint } from "expo-linear-gradient";
import type { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";

interface GradientConfig {
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  locations?: readonly [number, number, ...number[]] | null;
  readonly start?: LinearGradientPoint;
  readonly end?: LinearGradientPoint;
}

interface BlurConfig {
  readonly intensity: number;
  readonly tint: BlurTint;
}

interface MaskGradientColors {
  readonly start: string;
  readonly middle: string;
  readonly end: string;
}

interface AnimatedHeaderProps {
  readonly largeTitle: string;
  readonly subtitle?: string;
  readonly children: React.ReactNode;
  readonly rightComponent?: React.ReactNode;
  readonly showsVerticalScrollIndicator?: boolean;
  readonly contentContainerStyle?: StyleProp<ViewStyle>;
  readonly headerBackgroundGradient?: GradientConfig;
  readonly headerBlurConfig?: BlurConfig;
  readonly smallTitleBlurIntensity?: number;
  readonly smallTitleBlurTint?: BlurTint;
  readonly maskGradientColors?: MaskGradientColors;
  readonly largeTitleBlurIntensity?: number;

  readonly largeHeaderTitleStyle?: StyleProp<TextStyle>;
  readonly largeHeaderSubtitleStyle?: StyleProp<TextStyle>;
  readonly smallHeaderTitleStyle?: StyleProp<TextStyle>;
  readonly smallHeaderSubtitleStyle?: StyleProp<TextStyle>;
}

export type { AnimatedHeaderProps, GradientConfig, BlurConfig };
