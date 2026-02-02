import type { WithSpringConfig } from "react-native-reanimated";

const ICON_BAR_HEIGHT = 44;
const PADDING = 24;

const SPRING_CONFIG: WithSpringConfig = {
  damping: 20,
  stiffness: 300,
  mass: 0.5,
} as const;

export { ICON_BAR_HEIGHT, PADDING, SPRING_CONFIG };
