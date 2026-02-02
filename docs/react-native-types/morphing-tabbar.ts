import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

interface ITabItem {
  keyPath: string;
  name: string;
}

interface ITabBar {
  tabBackground: string;
  inactiveText: string;
  activeText: string;
  readonly shadowColor?: string;
  readonly glassBackground?: string;
}

interface IMorphicTabBar {
  readonly items?: ITabItem[];
  readonly onTabChange?: <T extends string, I extends number>(
    path: T,
    index: I,
  ) => void;
  readonly initialActiveIndex?: number;
  readonly animationDuration?: number;
  readonly borderRadius?: number;
  readonly light?: ITabBar;
  readonly dark?: ITabBar;
  readonly enableGlass?: boolean;
  readonly enableShadow?: boolean;
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
}

interface ITab {
  item: ITabItem;
  index: number;
  activeIndex: number;
  totalItems: number;
  onPress: <T extends number>(index: T) => void;
  animationProgress: SharedValue<number>;
  previousIndex: SharedValue<number>;
  theme: ITabBar;
  borderRadius: number;
  readonly textStyle?: StyleProp<TextStyle>;
}

interface IBackground {
  width: number;
  height: number;
  borderRadius: number;
  theme: ITabBar;
  enableGlass: boolean;
  enableShadow: boolean;
}

export type { ITabItem, ITabBar, IMorphicTabBar, ITab, IBackground };
