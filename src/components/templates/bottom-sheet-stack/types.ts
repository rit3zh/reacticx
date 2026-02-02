import type { BottomSheetMethods } from "../bottom-sheet/types";

interface IBottomSheetStackProvider {
  children: Required<React.ReactNode>;
}

interface IBottomSheetOptions {
  readonly onDismiss?: () => void;
}

interface IStackedSheet {
  id: string;
  component: React.ReactElement;
  ref: React.RefObject<BottomSheetMethods>;
  readonly onDismiss?: () => void;
}

interface IBottomSheetStackContextValue {
  pushSheet: (sheet: Omit<IStackedSheet, "id" | "ref">) => string;
  popSheet: (id?: string) => void;
  popToRoot: () => void;
  getStackDepth: () => number;
}

interface IStackedSheetWrapper {
  sheet: IStackedSheet;
  stackIndex: number;
  totalSheets: number;
  onClose: () => void;
}

export type {
  IBottomSheetOptions,
  IBottomSheetStackProvider,
  IBottomSheetStackContextValue,
  IStackedSheet,
  IStackedSheetWrapper,
};
