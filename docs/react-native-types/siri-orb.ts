import type { StyleProp, ViewStyle } from "react-native";

interface IColor {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

interface IUnstableSiriORB {
  readonly size?: number;
  readonly speed?: number;
  readonly style?: StyleProp<ViewStyle>;
  readonly primaryColor?: IColor;
  readonly secondaryColor?: IColor;
  readonly noiseIntensity?: number;
  readonly glowIntensity?: number;
  readonly saturation?: number;
  readonly brightness?: number;
  readonly rotationSpeed?: number;
  readonly noiseScale?: number;
  readonly coreIntensity?: number;
  readonly edgeSoftness?: number;
  readonly paused?: boolean;
}

export type { IUnstableSiriORB, IColor };
