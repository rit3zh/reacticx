import { Dimensions } from "react-native";
import type { GradientTuple } from "./types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const VIEWPORT_WIDTH: number = SCREEN_WIDTH / 100;
export const VIEWPORT_HEIGHT: number = SCREEN_HEIGHT / 100;

export const processGradient = <T extends string[]>(
  colors?: T,
): GradientTuple => {
  if (!colors || colors.length === 0) {
    return ["#6366f1", "#8b5cf6"] as const;
  }
  if (colors.length === 1) {
    return [colors[0], colors[0]] as const;
  }
  return [colors[0], colors[1]] as const;
};

export const calculateTabPosition = <T extends number, U extends number>(
  index: T,
  totalTabs: U,
): number => {
  const screenWidth = Math.ceil(VIEWPORT_WIDTH * 100);
  const tabWidth = screenWidth / totalTabs;
  const tabCenter = index * tabWidth + tabWidth / 2;
  const screenCenter = screenWidth / 2;
  return -screenWidth + (tabCenter - screenCenter);
};
