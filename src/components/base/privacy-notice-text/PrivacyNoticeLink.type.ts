import * as React from "react";
import type { StyleProp, ViewStyle } from "react-native";

interface IPrivacyNoticeLink extends React.PropsWithChildren {
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
  readonly size?: number | 14;
  readonly tint?: string;
}

export type { IPrivacyNoticeLink };
