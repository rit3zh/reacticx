import type { BadgeVariant } from "./types";

const variantStyles: Record<
  BadgeVariant,
  {
    backgroundColor: string;
    textColor: string;
    borderColor?: string;
    borderWidth?: number;
  }
> = {
  default: { backgroundColor: "#c6e8c5", textColor: "#374151" },
  success: { backgroundColor: "#D1FAE5", textColor: "#065F46" },
  warning: { backgroundColor: "#FEF3C7", textColor: "#92400E" },
  error: { backgroundColor: "#FEE2E2", textColor: "#991B1B" },
  pending: {
    backgroundColor: "#edeef8",
    textColor: "#312db8",
  },
  notifications: {
    backgroundColor: "transparent",
    textColor: "#dbdbdb",
    borderColor: "#e6e6e6",
    borderWidth: 0.3,
  },
};

const sizeStyles: Record<
  "sm" | "md" | "lg",
  { paddingVertical: number; paddingHorizontal: number; fontSize: number }
> = {
  sm: { paddingVertical: 4, paddingHorizontal: 8, fontSize: 10 },
  md: { paddingVertical: 7, paddingHorizontal: 15, fontSize: 16 },
  lg: { paddingVertical: 12, paddingHorizontal: 20, fontSize: 25 },
};

export { variantStyles, sizeStyles };
