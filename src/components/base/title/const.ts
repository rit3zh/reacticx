import type { ITitleTheme } from "./types";

const DEFAULT_THEME: ITitleTheme = {
  colors: {
    primary: "#007AFF",
    secondary: "#5856D6",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
    muted: "#8E8E93",
    white: "#FFFFFF",
    black: "#000000",
  },
  headingSizes: {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
  },
  fontWeights: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  defaultColor: "#FFFFFF",
  defaultSize: 18,
  defaultWeight: "bold",
};

export { DEFAULT_THEME };
