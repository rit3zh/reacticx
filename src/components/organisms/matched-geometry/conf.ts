import { Dimensions } from "react-native";
import { Easing } from "react-native-reanimated";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const DISMISS_THRESHOLD = 100;
const ANIMATION_CONFIG = {
  duration: 500,
  easing: Easing.bezier(0.33, 0.01, 0, 1),
};

export { ANIMATION_CONFIG, DISMISS_THRESHOLD, SCREEN_HEIGHT, SCREEN_WIDTH };
