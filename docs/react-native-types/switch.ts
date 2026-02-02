import type {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import type { WithSpringConfig } from "react-native-reanimated";

export interface AnimatedSwitchProps {
  value: boolean;
  onValueChange: <T extends boolean>(value: T) => void;
  readonly disabled?: boolean;
  readonly width?: number;
  readonly height?: number;
  readonly onColor?: string;
  readonly offColor?: string;
  readonly thumbColor?: string;
  readonly thumbSize?: number;
  readonly thumbInset?: number;
  readonly springConfig?: WithSpringConfig;
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
  readonly thumbOnIcon?: React.ReactNode;
  readonly thumbOffIcon?: React.ReactNode;
  readonly trackOnIcon?: React.ReactNode;
  readonly trackOffIcon?: React.ReactNode;
  readonly backgroundImage?: ImageSourcePropType;
  readonly backgroundImageStyle?: StyleProp<ImageStyle>;
  readonly animateIcons?: boolean;
  readonly iconAnimationType?: "fade" | "rotate" | "scale" | "bounce";
}
