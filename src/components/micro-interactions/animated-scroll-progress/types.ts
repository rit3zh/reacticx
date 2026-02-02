import React from "react";
import type { ScrollViewProps, ViewStyle, StyleProp } from "react-native";

interface IScrollProgress extends ScrollViewProps {
  children: React.ReactNode;
  renderInitialContent: () => React.ReactNode;
  renderEndContent: () => React.ReactNode;
  readonly endReachedThreshold?: number;
  readonly endResetThreshold?: number;
  readonly fabWidth?: number;
  readonly fabHeight?: number;
  readonly fabBottomOffset?: number;
  readonly fabBackgroundColor?: string;
  readonly fabEndBackgroundColor?: string;
  readonly fabBorderRadius?: number;
  readonly showFabOnScroll?: boolean;
  readonly fabAppearScrollOffset?: number;
  readonly fabEndScale?: number;
  readonly contentContainerStyle?: StyleProp<ViewStyle>;
  readonly initialContentContainerStyle?: StyleProp<ViewStyle>;
  readonly endContentContainerStyle?: StyleProp<ViewStyle>;
  readonly fabStyle?: StyleProp<ViewStyle>;
  readonly fabButtonStyle?: StyleProp<ViewStyle>;
  readonly onScrollProgressChange?: (progress: number) => void;
  readonly onEndReached?: () => void;
  readonly onEndReset?: () => void;
}

export type { IScrollProgress };
