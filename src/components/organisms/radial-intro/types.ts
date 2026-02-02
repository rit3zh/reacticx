import type { StyleProp, ViewStyle } from "react-native";

interface OrbitItem {
  readonly id: number;
  readonly name?: string;
  readonly src: string;
}

interface RadialIntroProps {
  orbitItems: readonly OrbitItem[];
  stageSize?: number;
  imageSize?: number;
  spinDuration?: number;
  expanded?: boolean;
  onCenterPress?: () => void;

  revealOnFanOut?: boolean;
  style?: StyleProp<ViewStyle>;
}
interface OrbitArmProps {
  readonly item: OrbitItem;
  readonly index: number;
  readonly totalItems: number;
  readonly stageSize: number;
  readonly imageSize: number;
  readonly spinDuration: number;
  readonly orbitRadius: number;
  readonly expanded: boolean;
  readonly isCenter: boolean;
  readonly revealOnFanOut: boolean;
  readonly onCenterPress?: () => void;
}

export { RadialIntroProps, OrbitItem, OrbitArmProps };
