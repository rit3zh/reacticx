import type { StyleProp, TextStyle } from "react-native";
import type { WithSpringConfig } from "react-native-reanimated";

interface QRCodeProps {
  readonly QRCodevalue?: string;
  readonly springConfig?: WithSpringConfig;
  readonly textStyle?: StyleProp<TextStyle>;
  readonly backgroundColorFocused?: string;
}

export type { QRCodeProps };
