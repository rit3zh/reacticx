import type { StyleProp, ViewStyle } from "react-native";

export type ToastType = "default" | "success" | "error" | "warning" | "info";
export type ToastPosition = "top" | "bottom";

export interface ToastProps {
  children: React.ReactNode;
}

export interface ExpandedContentProps {
  dismiss: () => void;
}

export interface ToastOptions {
  duration?: number;
  type?: ToastType;
  position?: ToastPosition;
  onClose?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  } | null;
  expandedContent?:
    | React.ReactNode
    | ((props: ExpandedContentProps) => React.ReactNode);
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

export interface Toast {
  id: string;
  content: React.ReactNode | string;
  options: Required<ToastOptions>;
}

export interface ToastContextValue {
  toasts: Toast[];
  show: (content: React.ReactNode | string, options?: ToastOptions) => string;
  update: (
    id: string,
    content: React.ReactNode | string,
    options?: ToastOptions,
  ) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  expandedToasts: Set<string>;
  expandToast: (id: string) => void;
  collapseToast: (id: string) => void;
}
