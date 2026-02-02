import { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

type AnimatedViewProps = React.ComponentProps<typeof Animated.View>;
type EnteringAnimation = AnimatedViewProps["entering"];
type ExitingAnimation = AnimatedViewProps["exiting"];

type AnimationDirection = "up" | "down";

type AnimationPreset = "fade" | "zoom" | "custom";

interface AnimationConfig {
  entering: EnteringAnimation;
  exiting: ExitingAnimation;
}

interface DotConfig {
  visible: boolean;
  size: number;
  color: ColorValue;
  style?: ViewStyle;
}

interface TextConfig {
  readonly style?: TextStyle;
  fontSize: number;
  fontWeight: TextStyle["fontWeight"];
  color: ColorValue;
}

interface TimingConfig {
  interval: number;
  animationDuration: number;
}

interface DynamicTextItem {
  text: string;
  readonly id?: string;
}

interface IDynamicText {
  items: readonly DynamicTextItem[] | readonly string[];
  readonly loop?: boolean;
  readonly loopCount?: number;
  readonly animationPreset?: AnimationPreset;
  readonly animationDirection?: AnimationDirection;
  readonly customEntering?: EnteringAnimation;
  readonly customExiting?: ExitingAnimation;
  readonly timing?: Partial<TimingConfig>;
  readonly text?: Partial<TextConfig>;
  readonly dot?: Partial<DotConfig>;
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly contentStyle?: StyleProp<ViewStyle>;
  readonly onAnimationComplete?: () => void;
  readonly onIndexChange?: (index: number, item: DynamicTextItem) => void;
  readonly paused?: boolean;
  readonly initialIndex?: number;
  readonly accessibilityLabel?: string;
}

export type {
  IDynamicText,
  DynamicTextItem,
  AnimationConfig,
  DotConfig,
  TextConfig,
  TimingConfig,
  AnimationDirection,
  AnimationPreset,
  EnteringAnimation,
  ExitingAnimation,
};
