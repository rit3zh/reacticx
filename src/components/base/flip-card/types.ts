import * as React from "react";
import type { BlurType } from "@sbaiahmed1/react-native-blur";
import type { ReactNode } from "react";
import type { ViewStyle, PressableProps } from "react-native";

interface FlipCardContextValue {
  isFlipped: boolean;
  flip: () => void;
  width: number;
  height: number;
  borderRadius: number;
  blurIntensity: number;
  animationDuration: number;
  rotation: any;
  scale: any;
  tint: BlurType;
  scaleEnabled: boolean;
}

interface FlipCardProps extends React.PropsWithChildren {
  readonly width?: number;
  readonly height?: number;
  readonly borderRadius?: number;
  readonly blurIntensity?: number;
  readonly containerStyle?: ViewStyle;
  readonly blurTint?: BlurType;
  readonly animationDuration?: number;
  readonly enableHaptics?: boolean;
  readonly onFlip?: (isFlipped: boolean) => void;
  readonly scaleOnPress?: boolean;
}

interface FlipCardFrontProps extends React.PropsWithChildren {
  readonly style?: ViewStyle;
}

interface FlipCardBackProps extends React.PropsWithChildren {
  readonly style?: ViewStyle;
}

interface FlipCardTriggerProps extends Omit<PressableProps, "onPress"> {
  readonly children?: ReactNode;
  readonly asChild?: boolean;
}

export type {
  FlipCardContextValue,
  FlipCardProps,
  FlipCardFrontProps,
  FlipCardBackProps,
  FlipCardTriggerProps,
};
