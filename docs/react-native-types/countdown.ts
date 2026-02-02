import type { TextStyle } from "react-native";
import type {
  WithSpringConfig,
  WithTimingConfig,
} from "react-native-reanimated";

interface CharacterAnimationParams {
  opacity: number;
  translateY: number;
  scale: number;
}

interface AnimationConfig {
  characterDelay: number;
  characterEnterDuration: number;
  characterExitDuration: number;
  buttonTransitionDuration: number;
  spring: WithSpringConfig;
  timing: WithTimingConfig;
}

interface TextAnimationProps {
  text: string;
  style?: TextStyle;
}

interface CharacterProps {
  char: string;
  style?: TextStyle;
  index: number;
  animationConfig: AnimationConfig;
  enterInitial: CharacterAnimationParams;
  enterFinal: CharacterAnimationParams;
  exitInitial: CharacterAnimationParams;
  exitFinal: CharacterAnimationParams;
}

interface CountdownUnit {
  value: number;
  label: string;
}

interface TimeRemaining {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type CountdownSize = "small" | "medium" | "large" | "xlarge";

interface CountdownCustomization {
  readonly numberSize?: number;
  readonly labelSize?: number;
  readonly numberColor?: string;
  readonly labelColor?: string;
  readonly separatorColor?: string;
  readonly gap?: number;
  readonly letterSpacing?: number;
  readonly fontWeight?: "400" | "500" | "600" | "700" | "800" | "900";
  readonly showLabels?: boolean;
  readonly showDays?: boolean;
  readonly showSeparators?: boolean;
  readonly fontFamily?: string;
  readonly onFinish?: () => void;
  readonly finishText?: string;
}

interface CountdownTimerProps {
  targetDate: Date;
  readonly size?: CountdownSize;
  readonly customization?: CountdownCustomization;
}

export type {
  CharacterAnimationParams,
  AnimationConfig,
  TextAnimationProps,
  CharacterProps,
  CountdownUnit,
  TimeRemaining,
  CountdownSize,
  CountdownCustomization,
  CountdownTimerProps,
};
