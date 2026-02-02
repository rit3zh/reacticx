import type { RGBA } from "./types";

const COLORS: Record<string, RGBA> = {
  red: [1, 0, 0, 1],
  green: [0, 1, 0, 1],
  blue: [0, 0, 1, 1],
  white: [1, 1, 1, 1],
  black: [0, 0, 0, 1],
  yellow: [1, 1, 0, 1],
  cyan: [0, 1, 1, 1],
  magenta: [1, 0, 1, 1],
  orange: [1, 0.65, 0, 1],
  purple: [0.5, 0, 0.5, 1],
  pink: [1, 0.75, 0.8, 1],
  gold: [1, 0.84, 0, 1],
  silver: [0.75, 0.75, 0.75, 1],
  bronze: [0.8, 0.5, 0.2, 1],
};

const colorToRGBA = <T extends string>(val: T): RGBA => {
  const s = val.trim().toLowerCase();

  if (COLORS[s]) return COLORS[s];

  const hex6 = s.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hex6) {
    return [
      parseInt(hex6[1], 16) / 255,
      parseInt(hex6[2], 16) / 255,
      parseInt(hex6[3], 16) / 255,
      1,
    ];
  }

  const hex3 = s.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
  if (hex3) {
    return [
      parseInt(hex3[1] + hex3[1], 16) / 255,
      parseInt(hex3[2] + hex3[2], 16) / 255,
      parseInt(hex3[3] + hex3[3], 16) / 255,
      1,
    ];
  }

  const rgb = s.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\)/,
  );
  if (rgb) {
    return [
      parseInt(rgb[1], 10) / 255,
      parseInt(rgb[2], 10) / 255,
      parseInt(rgb[3], 10) / 255,
      rgb[4] ? parseFloat(rgb[4]) : 1,
    ];
  }

  return [0.9, 0.9, 0.95, 1];
};

export { colorToRGBA };
