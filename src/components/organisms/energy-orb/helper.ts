import { NAMED_COLORS } from "./conf";
import type { RGB } from "./types";

const parseColor = <T extends string>(color: T): RGB => {
  const c = color.trim().toLowerCase();

  if (NAMED_COLORS[c]) {
    return NAMED_COLORS[c];
  }

  const hexMatch = c.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    return [
      parseInt(hexMatch[1], 16) / 255,
      parseInt(hexMatch[2], 16) / 255,
      parseInt(hexMatch[3], 16) / 255,
    ];
  }

  const shortHexMatch = c.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
  if (shortHexMatch) {
    return [
      parseInt(shortHexMatch[1] + shortHexMatch[1], 16) / 255,
      parseInt(shortHexMatch[2] + shortHexMatch[2], 16) / 255,
      parseInt(shortHexMatch[3] + shortHexMatch[3], 16) / 255,
    ];
  }

  const rgbMatch = c.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10) / 255,
      parseInt(rgbMatch[2], 10) / 255,
      parseInt(rgbMatch[3], 10) / 255,
    ];
  }

  return [0.3, 0.5, 1.0];
};

export { parseColor };
