import { useContext } from "react";
import { ThemeContext } from "./context";
import type { ThemeColors, ThemeContextType, ThemeMode } from "./types";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const useThemeColors = (): ThemeColors => {
  const { colors } = useTheme();
  return colors;
};

export const useThemeMode = (): ThemeMode => {
  const { theme } = useTheme();
  return theme;
};
