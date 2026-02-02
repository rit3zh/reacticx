import type { StyleProp, TextStyle, ViewStyle } from "react-native";

interface IButton {
  children: React.ReactNode & React.ReactElement;
  readonly isLoading?: boolean;
  readonly onPress?: () => void;
  readonly width?: number;
  readonly height?: number;
  readonly backgroundColor?: string;
  readonly loadingTextBackgroundColor?: string;
  readonly loadingText?: string;
  readonly loadingTextColor?: string;
  readonly loadingTextSize?: number;
  readonly showLoadingIndicator?: boolean;
  readonly renderLoadingIndicator?: () => React.ReactNode | React.JSX.Element;
  readonly borderRadius?: number;
  readonly gradientColors?: string[];
  readonly style?: StyleProp<ViewStyle>;
  readonly loadingTextStyle?: StyleProp<TextStyle>;
  readonly withPressAnimation?: boolean;
  readonly animationDuration?: number;
  readonly disabled?: boolean;
}

export type { IButton };
