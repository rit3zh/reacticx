import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

interface IChromaRing {
  readonly width?: number;
  readonly height?: number;
  readonly borderRadius?: number;
  readonly borderWidth?: number;
  readonly speed?: number;
  readonly base?: string;
  readonly glow?: string;
  readonly background?: string;
  readonly children?: ReactNode;
  readonly style?: StyleProp<ViewStyle>;
}

// currently using Uniforms from Skia to avoid ts issues.

// @ts-nocheck
interface IUniforms {
  iResolution: number[];
  iTime: number;
  borderWidth: number;
  borderRadius: number;
  speed: number;
  baseColor: [number, number, number];
  glowColor: [number, number, number];
}

export type { IChromaRing, IUniforms };
