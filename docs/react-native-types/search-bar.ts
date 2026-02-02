import type {
  TextInputProps,
  ViewStyle,
  TextStyle,
  DimensionValue,
  StyleProp,
} from "react-native";

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  width?: DimensionValue;
  maxWidth?: number;
  parentHeight?: number | 40;
  tint?: string;
  iconPadding?: number;
  renderTrailingIcons?: () => React.ReactNode;
  renderLeadingIcons?: () => React.ReactNode;
  onSearchDone?: () => void;
  onSearchMount?: () => void;
  containerWidth?: number;
  focusedWidth?: number;
  cancelButtonWidth?: number;
  iconStyle?: StyleProp<ViewStyle>;
  enableWidthAnimation?: boolean;
  centerWhenUnfocused?: boolean;
  textCenterOffset?: number;
  iconCenterOffset?: number;
}
