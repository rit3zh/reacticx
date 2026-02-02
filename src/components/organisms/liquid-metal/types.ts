import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

type RGBA = [number, number, number, number];

interface ILiquidMetal {
  readonly width?: number;
  readonly height?: number;
  readonly borderRadius?: number;
  readonly highlightColor?: string;
  readonly shadowColor?: string;
  readonly density?: number;
  readonly rate?: number;
  readonly split?: number;
  readonly turbulence?: number;
  readonly crispness?: number;
  readonly tilt?: number;
  readonly pulsate?: number;
  readonly halo?: number;
  readonly asChild?: boolean;
  readonly children?: ReactNode;
  readonly style?: StyleProp<ViewStyle>;
}

export type { ILiquidMetal, RGBA };
