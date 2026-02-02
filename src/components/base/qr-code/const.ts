import { Platform } from "react-native";
import type { WithSpringConfig } from "react-native-reanimated";

const BACKGROUND_COLOR = "#eeedf4";
const QR_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const SPRING_CONFIG: WithSpringConfig = {
  ...Platform.select({
    android: { damping: 18, stiffness: 230, mass: 0.6 },
    ios: { damping: 18, stiffness: 250, mass: 0.9 },
  }),
};

export { BACKGROUND_COLOR, SPRING_CONFIG, QR_URL };
