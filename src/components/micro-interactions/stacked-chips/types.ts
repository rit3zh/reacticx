import type { ReactNode } from "react";

export interface ChipContextType {
  isOpen: boolean;
  toggle: () => void;
  triggerWidth: number;
  depth: number;
  parentIsOpen: boolean;
  setTriggerWidth: (w: number) => void;
}

export interface StackedChipsProps {
  children: ReactNode;
}

export interface TriggerProps {
  children: ReactNode;
  onPress?: () => void;
}
