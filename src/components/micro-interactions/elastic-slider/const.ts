import type { WithSpringConfig } from "react-native-reanimated";

const SPRING_CONFIG: WithSpringConfig = {
  damping: 20,
  stiffness: 300,
  mass: 1,
};

const SNAPBACK_SPRING: WithSpringConfig = {
  damping: 15,
  stiffness: 200,
  mass: 1,
};

export { SPRING_CONFIG, SNAPBACK_SPRING };
