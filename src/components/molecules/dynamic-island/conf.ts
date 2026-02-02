import { Dimensions } from "react-native";
import type { IDynamicIslandConfig } from "./types";

const SAFE_AREA_TOP = 59;
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const DEFAULT_CONFIG: IDynamicIslandConfig = {
  collapsedWidth: 120,
  collapsedHeight: 36,
  expandedWidth: SCREEN_WIDTH - 20,
  expandedHeight: 90,
  topOffset: 11 + Math.max(SAFE_AREA_TOP - 59, 0),
  duration: 320,
  theme: {
    backgroundColor: "#000",
    borderRadius: 30,
  },
};

const DynamicIslandThemes = {
  dark: {
    backgroundColor: "#000",
    borderRadius: 30,
  },
  light: {
    backgroundColor: "#1c1c1e",
    borderRadius: 30,
  },
  blue: {
    backgroundColor: "#0a84ff",
    borderRadius: 30,
  },
} as const;

export { DEFAULT_CONFIG, DynamicIslandThemes };
