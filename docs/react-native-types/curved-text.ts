/**
 * This is component is inspired by reactbits.dev's Curved Text Marquee.
 * Original implementation: https://reactbits.dev/text-animations/curved-loop
 */

import type { StyleProp, ViewStyle } from "react-native";

type Direction = "left" | "right";

interface ICurvedLoop {
  text: string;
  speed?: number;
  curve?: number;
  direction?: Direction;
  textColor?: string;
  fontSize?: number;

  copies?: number;
  style?: StyleProp<ViewStyle>;
}

export type { ICurvedLoop, Direction };
