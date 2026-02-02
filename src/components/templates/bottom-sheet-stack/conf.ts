import type { WithSpringConfig } from "react-native-reanimated";

const STACK_SPRING_CONFIG: WithSpringConfig = {
  damping: 25,
  stiffness: 300,
  mass: 0.5,
};

const SCALE_FACTOR = 0.95;
const TRANSLATE_Y_FACTOR = 20;

export { STACK_SPRING_CONFIG, SCALE_FACTOR, TRANSLATE_Y_FACTOR };
