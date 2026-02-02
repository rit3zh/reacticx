import type { StyleProp, TextStyle, ViewStyle } from "react-native";

type PressEffect = "speedUp" | "slowDown" | "pause" | "goBonkers" | null;

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  pressEffect?: PressEffect;
  radius?: number;
  fontSize?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
}

interface LetterProps {
  readonly letter: string;
  readonly index: number;
  readonly totalLetters: number;
  readonly radius: number;
  readonly fontSize: number;
  readonly color: string;
  readonly containerSize: number;
  readonly fontStyle?: StyleProp<TextStyle>;
}

export { CircularTextProps, LetterProps, PressEffect };
