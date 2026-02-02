import type { ColorVariant, HeadingLevel, ITitleTheme } from "./types";
import { DEFAULT_THEME } from "./const";
const isColorVariant = (color: string): color is ColorVariant => {
  return color in DEFAULT_THEME.colors;
};

const resolveColor = <
  T extends string | ColorVariant | undefined,
  Theme extends ITitleTheme,
>(
  color: T,
  theme: Theme,
): string => {
  if (!color) return theme.defaultColor;
  if (isColorVariant(color)) return theme.colors[color];
  return color;
};

const resolveSize = <
  Size extends number | undefined,
  Theme extends ITitleTheme,
  Level extends HeadingLevel | undefined,
>(
  size: Size,
  level: Level,
  theme: Theme,
): number => {
  if (size !== undefined) return size;
  if (level) return theme.headingSizes[level];
  return theme.defaultSize;
};

export { resolveColor, resolveSize };
