import { Ionicons } from "@expo/vector-icons";

interface Dimensions {
  width: number;
  height: number;
  x: number;
  y: number;
}

type IconName = keyof typeof Ionicons.glyphMap;
type IconRenderFn = () => JSX.Element & React.ReactNode;

interface FlexiButtonProps {
  onPress?: () => void;
  collapsedWidth?: number;
  expandedWidth?: number;
  text?: string;
  icon?: IconName | IconRenderFn;
  onDimensionsChange?: (dimensions: Dimensions) => void;
  backgroundColor?: string;
}

export { FlexiButtonProps, Dimensions };
