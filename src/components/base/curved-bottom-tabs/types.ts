import { ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";

interface Tab {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge?: number;
}

interface AnimationConfig {
  readonly damping: number;
  readonly stiffness: number;
  readonly mass?: number;
}

interface ShadowStyle extends Pick<
  ViewStyle,
  | "shadowColor"
  | "shadowOffset"
  | "shadowOpacity"
  | "shadowRadius"
  | "elevation"
> {}

interface CurvedBottomTabsProps {
  tabs: Tab[];
  currentIndex: number;
  onPress: (index: number, tab: Tab) => void;

  readonly gradient?: string[];
  readonly barHeight?: number;
  readonly buttonScale?: number;
  readonly activeColor?: string;
  readonly inactiveColor?: string;
  readonly labelColor?: string;
  readonly textSize?: number;
  readonly fontFamily?: string;
  readonly hideWhenKeyboardShown?: boolean;
  readonly animation?: AnimationConfig;
  readonly shadow?: ShadowStyle;
}

interface FloatingButtonComponentProps {
  icon: React.ReactNode;
  tintColor: string;
  readonly gradient: readonly [string, string];
  scale: number;
  shadow: ShadowStyle;
  badge?: number;
}

interface BackgroundCurveProps {
  position: SharedValue<number>;
  gradient: readonly [string, string];
  height: number;
}

interface StyleConfig {
  barHeight: number;
  textSize: number;
  readonly fontFamily?: string;
  readonly inactiveColor: string;
  readonly labelColor: string;
}

type GradientTuple = readonly [string, string];

interface NavigationState {
  index: number;
  routes: Array<{
    key: string;
    name: string;
    params?: any;
  }>;
}

interface NavigationDescriptor {
  options: {
    tabBarLabel?: string;
    title?: string;
    tabBarIcon?: (props: {
      focused: boolean;
      color: string;
      size: number;
    }) => React.ReactNode;
    tabBarBadge?: number;
  };
}
interface CurvedTabBarNavigationProps {
  gradients?: string[];
}

export type {
  Tab,
  AnimationConfig,
  ShadowStyle,
  CurvedBottomTabsProps,
  FloatingButtonComponentProps,
  BackgroundCurveProps,
  StyleConfig,
  GradientTuple,
  NavigationState,
  NavigationDescriptor,
  CurvedTabBarNavigationProps,
};
