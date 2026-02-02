import type { StyleProp, TextStyle } from "react-native";

interface IAvatarItem {
  uri: string;
  name?: string;
}

interface IAvatar {
  image: IAvatarItem;
  readonly size?: number;
  onPress?(id: string): void;
  readonly showBorder?: boolean;
  readonly borderColor?: string;
  readonly borderWidth?: number;
  readonly onlineIndicatorBorderWidth?: number;
  readonly backgroundColor?: string;
  readonly textColor?: string;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly showAvatar?: boolean;
  readonly showText?: boolean;
  readonly textPosition?: "top" | "bottom" | "right";
  readonly textStyle?: StyleProp<TextStyle>;
  readonly shimmerSpeed?: number;
  readonly pressedScale?: number;
  readonly pressedOpacity?: number;
  readonly showOnlineIndicator?: boolean;
  readonly onlineIndicatorColor?: string;
  readonly onlineIndicatorSize?: number;
}

export type { IAvatar, IAvatarItem };
