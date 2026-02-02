import type { ITabBar, ITabItem } from "./types";

const DEFAULT_ITEMS: ITabItem[] = [
  { keyPath: "/", name: "home" },
  { keyPath: "/works", name: "works" },
  { keyPath: "/blog", name: "blog" },
  { keyPath: "/about", name: "about" },
];

const DEFAULT_LIGHT_THEME: ITabBar = {
  tabBackground: "#000000",
  inactiveText: "#ffffff",
  activeText: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.3)",
  glassBackground: "rgba(0, 0, 0, 0.1)",
};

const DEFAULT_DARK_THEME: ITabBar = {
  tabBackground: "#ffffff",
  inactiveText: "#000000",
  activeText: "#000000",
  shadowColor: "rgba(255, 255, 255, 0.2)",
  glassBackground: "rgba(255, 255, 255, 0.1)",
};

export { DEFAULT_ITEMS, DEFAULT_LIGHT_THEME, DEFAULT_DARK_THEME };
