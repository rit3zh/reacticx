import type { BorderRadiusKey } from "@/constants/components/index";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "notifications"
  | "pending";

interface IBadge {
  label: string;
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
  radius?: BorderRadiusKey;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export type { IBadge, BadgeVariant };
