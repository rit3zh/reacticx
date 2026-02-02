import { Easing } from "react-native-reanimated";

const TIMING_CONFIG = {
  duration: 400,
  easing: Easing.out(Easing.cubic),
} as const;

const TIMING_CONFIG_SLOW = {
  duration: 600,
  easing: Easing.out(Easing.cubic),
} as const;
const ANIMATION_DELAYS = {
  IMAGE_LIFT: 0,
  ORBIT_PLACEMENT: 300,
  CONTINUOUS_SPIN: 900,
} as const;

export { TIMING_CONFIG, TIMING_CONFIG_SLOW, ANIMATION_DELAYS };
