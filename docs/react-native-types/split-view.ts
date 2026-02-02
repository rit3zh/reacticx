import type { ReactNode } from "react";
import type { ListRenderItem, StyleProp, ViewStyle } from "react-native";

interface SpringConfig {
  readonly damping: number;
  readonly stiffness: number;
  readonly mass: number;
}

interface SplitViewProps<TTop, TBottom> {
  readonly topSectionItems: ReadonlyArray<TTop>;
  readonly bottomSectionItems: ReadonlyArray<TBottom>;
  readonly bottomSectionTitle: string;
  readonly initialTopSectionHeight: number;
  readonly minSectionHeight: number;
  readonly maxTopSectionHeight: number;
  readonly maxBottomSectionHeight?: number;
  readonly velocityThreshold: number;
  readonly springConfig: SpringConfig;
  readonly containerBackgroundColor: string;
  readonly sectionBackgroundColor: string;
  readonly dividerBackgroundColor: string;
  readonly dragHandleColor: string;
  readonly renderTopItem: ListRenderItem<TTop>;
  readonly renderBottomItem: ListRenderItem<TBottom>;
  readonly renderHeader: () => ReactNode & React.JSX.Element;
  readonly topKeyExtractor: (item: TTop, index: number) => string;
  readonly bottomKeyExtractor: (item: TBottom, index: number) => string;
  readonly showHeader?: boolean;
  readonly topListContentContainerStyle?: StyleProp<ViewStyle>;
  readonly bottomListContentContainerStyle?: StyleProp<ViewStyle>;
  readonly topListStyle?: StyleProp<ViewStyle>;
  readonly bottomListStyle?: StyleProp<ViewStyle>;
  readonly sectionTitleStyle?: StyleProp<ViewStyle>;
  readonly sectionTitleTextColor?: string;
}

export type { SplitViewProps, SpringConfig };
