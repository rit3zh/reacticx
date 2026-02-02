import { ReactNode } from "react";

type AnimationStyle =
  | "linear"
  | "pulse"
  | "wave"
  | "breathe"
  | "snap"
  | "spinner"
  | "withoutEasing";

interface GradientStop {
  readonly offset: string;
  readonly color: string;
  readonly opacity: number;
}

interface GlowProps {
  readonly children: Required<ReactNode>;
  readonly size?: number;
  readonly color?: string;
  readonly animated?: boolean;
  readonly secondaryColor?: string;
  readonly duration?: number;
  readonly style?: AnimationStyle;
  readonly radius?: number;
  readonly intensity?: number;
  readonly speed?: number;
  readonly enabled?: boolean;
  readonly gradient?: ReadonlyArray<GradientStop>;
  readonly width?: number;
}

interface Layout {
  readonly width: number;
  readonly height: number;
}

export { GlowProps, Layout, AnimationStyle, GradientStop };
