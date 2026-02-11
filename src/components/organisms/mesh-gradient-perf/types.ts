import React from "react";
import type { StyleProp, ViewStyle } from "react-native";

interface IMeshGradientColor {
  r: number;
  g: number;
  b: number;
}

interface IPerformance {
  /**
   * Undersampling factor (0.1 - 1).
   * Reasonable values: (0.25, 0.3, 0.5, 1), 1: no undersampling.
   *
   * Less value -> More upscaling -> Less GPU usage
   *
   * Default: 0.3
   */
  undersampling?: number;
  /**
   * Reasonable values: (20, 30, 60), -1: no FPS lock.
   *
   * Less FPS -> Less GPU usage
   *
   * Less than 60 FPS more noticeable with high-speed animation
   *
   * Default: 60
   */
  fpsLock?: number;
}

interface IAnimatedMeshGradient {
  performance?: IPerformance;
  colors?: IMeshGradientColor[];
  speed?: number;
  noise?: number;
  blur?: number;
  contrast?: number;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

export type { IAnimatedMeshGradient, IMeshGradientColor, IPerformance };
