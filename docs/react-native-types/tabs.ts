import type { ReactNode } from "react";
import type { SharedValue } from "react-native-reanimated";

interface Tab {
  id: string;
  title?: string;
  titleComponent?:
    | ReactNode
    | ((
        isActive: boolean,
        activeColor: string,
        inactiveColor: string,
      ) => ReactNode);
  content?: string;
  contentComponent?: ReactNode;
}

interface TopTabsProps {
  tabs: Tab[];
  activeColor?: string;
  inactiveColor?: string;
  underlineColor?: string;
  underlineHeight?: number;
}

interface TabItemProps {
  tab: Tab;
  isActive: boolean;
  onPress: () => void;
  onLayout: (event: any) => void;
  activeColor?: string;
  inactiveColor?: string;
}

interface AnimatedTabItemProps extends Omit<TabItemProps, "isActive"> {
  index: number;
  scrollX: SharedValue<number>;
  screenWidth: number;
}
interface ContentItemProps {
  item: Tab;
  index: number;
  scrollX: SharedValue<number>;
  screenWidth: number;
}

export type {
  Tab,
  TopTabsProps,
  TabItemProps,
  ContentItemProps,
  AnimatedTabItemProps,
};
