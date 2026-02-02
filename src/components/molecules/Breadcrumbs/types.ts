import type { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";

export type BreadcrumbItemProps = {
  children: ReactNode;
  onPress?: () => void;
  isCurrent?: boolean;
  tint?: string;
  currentTint?: string;
  className?: string;
  style?: StyleProp<TextStyle>;
};

export type BreadcrumbsListProps = {
  children: ReactNode;
};

export type BreadcrumbsSeparatorProps = {
  children?: ReactNode;
};

export type BreadcrumbsProps = {
  children: ReactNode;
  style?: any;
};
