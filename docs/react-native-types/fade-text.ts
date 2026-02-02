import { BlurTint } from "expo-blur";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

interface FadeTextProps {
  inputs: string[];
  readonly wordDelay?: number;
  readonly duration?: number;
  readonly blurIntensity?: [number, number, number];
  readonly blurTint?: BlurTint;
  readonly scaleRange?: [number, number];
  readonly translateYRange?: [number, number];
  readonly opacityRange?: [number, number, number];
  readonly fontSize?: number;
  readonly fontWeight?: TextStyle["fontWeight"];
  readonly color?: string;
  readonly textAlign?: "left" | "center" | "right";
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly style?: StyleProp<TextStyle>;
}

interface AnimatedWordProps {
  word: string;
  index: number;
  delay: number;
  duration: number;
  blurIntensity: [number, number, number];
  blurTint: BlurTint;
  scaleRange: [number, number];
  translateYRange: [number, number];
  opacityRange: [number, number, number];
  fontSize: number;
  fontWeight: TextStyle["fontWeight"];
  color: string;
  textAlign: "left" | "center" | "right";
  style?: StyleProp<TextStyle>;
}

export type { FadeTextProps, AnimatedWordProps };
