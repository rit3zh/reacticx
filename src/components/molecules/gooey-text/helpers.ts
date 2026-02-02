import { MAX_BLUR, MIN_FRACTION } from "./conf";

function calculateBlur<F extends number>(fraction: F): number {
  "worklet";
  if (fraction <= MIN_FRACTION) return MAX_BLUR;
  const blur = 8 / fraction - 8;
  return Math.min(Math.max(blur, 0), MAX_BLUR);
}

function calculateOpacity<F extends number>(fraction: F): number {
  "worklet";
  return Math.pow(Math.max(0, Math.min(1, fraction)), 0.4);
}

export { calculateBlur, calculateOpacity };
