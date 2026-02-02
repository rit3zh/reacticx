import { StyleProp, ViewStyle } from "react-native";

interface IDynamicIslandTheme {
  backgroundColor: string;
  borderRadius: number;
}

interface IDynamicIslandConfig {
  readonly collapsedWidth: number;
  readonly collapsedHeight: number;
  readonly expandedWidth: number;
  readonly expandedHeight: number;
  readonly theme: IDynamicIslandTheme;
  readonly topOffset?: number;
  readonly duration?: number;
}

interface ISlotRegistry {
  trigger: Map<string, React.ReactNode>;
  content: Map<string, React.ReactNode>;
}

type SlotType = "trigger" | "content";

interface IDynamicIslandContext {
  isExpanded: boolean;
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
  registerSlot: <
    T extends SlotType,
    I extends string,
    N extends React.ReactNode,
  >(
    type: SlotType,
    id: string,
    node: React.ReactNode,
  ) => void;
  unregisterSlot: <T extends SlotType, I extends string>(
    type: T,
    id: I,
  ) => void;
}

interface IProvider {
  children: React.ReactNode;
  config?: Partial<Omit<IDynamicIslandConfig, "theme">>;
  theme?: IDynamicIslandTheme;
  onExpand?: () => void;
  onCollapse?: () => void;
  haptics?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface ITrigger {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface IContent {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export type {
  IDynamicIslandConfig,
  IDynamicIslandContext,
  ISlotRegistry,
  IDynamicIslandTheme,
  IProvider,
  IContent,
  ITrigger,
  SlotType,
};
