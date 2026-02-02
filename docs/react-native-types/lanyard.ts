import type { ViewStyle, StyleProp } from "react-native";

interface IPoint2D {
  x: number;
  y: number;
}

interface ICardData {
  readonly name?: string;
  readonly title?: string;
  readonly company?: string;
  readonly avatarUri?: string;
  readonly qrCode?: string;
}

interface ILanyard {
  readonly cardData?: ICardData;
  readonly cardImageSource?: ReturnType<typeof require> | string;
  readonly cardImageHeight?: number;
  readonly cardImageWidth?: number;
  readonly gravity?: number;
  readonly stiffness?: number;
  readonly damping?: number;
  readonly iterations?: number;
  readonly ropeSegments?: number;
  readonly ropeSegmentLength?: number;
  readonly ropeThickness?: number;
  readonly ropeColor?: string;
  readonly ropePattern?: "solid" | "striped" | "dotted";
  readonly cardWidth?: number;
  readonly cardHeight?: number;
  readonly cardBackgroundColor?: string;
  readonly cardAccentColor?: string;
  readonly anchorPosition?: IPoint2D;
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly onCardPress?: () => void;
  readonly onDragStart?: () => void;
  readonly onDragEnd?: () => void;
}

export type { ILanyard, IPoint2D, ICardData };
