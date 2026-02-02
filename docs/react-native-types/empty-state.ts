import type { ReactNode, ReactElement } from "react";
import { ViewStyle, TextStyle, StyleProp } from "react-native";

interface IEmptyContextValue {
  variant?: "default" | "outline";
  iconVariant?: "icon" | "illustration";
}

interface IEmptyProps {
  children: ReactNode;
  variant?: "default" | "outline";
  style?: StyleProp<ViewStyle>;
}

interface IEmptyHeader {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface IEmptyMedia {
  children: ReactNode;
  variant?: "icon" | "illustration";
  style?: StyleProp<ViewStyle>;
}

interface IEmptyTitle {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

interface IEmptyDescription {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

interface IEmptyContent {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface IButton {
  children: ReactNode;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export type {
  IEmptyContextValue,
  IEmptyProps,
  IEmptyHeader,
  IEmptyMedia,
  IEmptyTitle,
  IEmptyDescription,
  IEmptyContent,
  IButton,
};
