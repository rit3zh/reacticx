import type { SkPath, SkPathBuilder } from "react-native-skia";
import type {
  ICircularStatusBarIphoneDuoArcPose,
  ICircularStatusBarIphoneDuoBatteryPose,
  ICircularStatusBarIphoneDuoSignalPose,
  ICircularStatusBarIphoneDuoWifiPose,
  TCircularStatusBarIphoneDuoPhase,
} from "./types";
import {
  ARC,
  BATTERY,
  PHASES,
  RING,
  SIGNAL,
  SIGNAL_TIMING,
  SPRING_DECAY,
  SPRING_ONSET,
  SPRINGS,
  WIFI,
} from "./conf";

const lerp = (from: number, to: number, amount: number): number => {
  "worklet";
  return from + (to - from) * amount;
};

const phase = (time: number, [start, end]: TCircularStatusBarIphoneDuoPhase): number => {
  "worklet";
  return Math.min(1, Math.max(0, (time - start) / (end - start)));
};

const smoother = (amount: number): number => {
  "worklet";
  return amount * amount * amount * (amount * (amount * 6 - 15) + 10);
};

const bump = (amount: number): number => {
  "worklet";
  const rise = amount * (1 - amount);
  return 64 * rise * rise * rise;
};

const warp = (amount: number): number => {
  "worklet";
  const eased =
    amount < SPRING_ONSET
      ? (amount * amount) / (2 * SPRING_ONSET)
      : amount - SPRING_ONSET / 2;
  return eased / (1 - SPRING_ONSET / 2);
};

const softAbs = (value: number, softness: number): number => {
  "worklet";
  return Math.sqrt(value * value + softness * softness) - softness;
};

const springResponse = (amount: number, damping: number): number => {
  "worklet";
  const natural = SPRING_DECAY / damping;
  const damped = natural * Math.sqrt(1 - damping * damping);
  return (
    1 -
    Math.exp(-SPRING_DECAY * amount) *
      (Math.cos(damped * amount) +
        (SPRING_DECAY / damped) * Math.sin(damped * amount))
  );
};

const spring = (
  time: number,
  window: TCircularStatusBarIphoneDuoPhase,
  damping: number,
): number => {
  "worklet";
  const linear = phase(time, window);
  if (linear <= 0) return 0;
  if (linear >= 1) return 1;
  const amount = warp(linear);
  return (
    springResponse(amount, damping) +
    (1 - springResponse(1, damping)) * smoother(amount)
  );
};

const cubic = (
  a: number,
  b: number,
  c: number,
  d: number,
  t: number,
): number => {
  "worklet";
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};

const signalPose = (index: number, time: number): ICircularStatusBarIphoneDuoSignalPose => {
  "worklet";
  const rank = SIGNAL.count - 1 - index;

  const collapse = spring(
    time,
    [
      SIGNAL_TIMING.collapseStart + rank * SIGNAL_TIMING.collapseStagger,
      SIGNAL_TIMING.collapseEnd + rank * SIGNAL_TIMING.collapseEndStagger,
    ],
    SPRINGS.signal,
  );
  const height = lerp(SIGNAL.heights[index], SIGNAL.width, collapse);
  const fromX = SIGNAL.firstX + index * SIGNAL.gap;
  const fromY = SIGNAL.baseline - height / 2;

  const slot = ((120 - index * 20) * Math.PI) / 180;
  const toX = RING.x + RING.radius * Math.cos(slot);
  const toY = RING.y + RING.radius * Math.sin(slot);

  const takeoff = SIGNAL_TIMING.flightStart + rank * SIGNAL_TIMING.flightStagger;
  const travel = spring(
    time,
    [takeoff, takeoff + SIGNAL_TIMING.flightLength],
    SPRINGS.flight,
  );

  return {
    cx: cubic(fromX, fromX, toX + 12, toX, travel),
    cy: cubic(fromY, SIGNAL.dipNear, SIGNAL.dipFar, toY, travel),
    height,
  };
};

const wifiPose = (time: number): ICircularStatusBarIphoneDuoWifiPose => {
  "worklet";
  const settle = spring(time, PHASES.wifi, SPRINGS.wifi);
  return {
    cx: lerp(WIFI.startX, RING.x, settle),
    cy: WIFI.startY,
    scale: lerp(1, WIFI.endScale, settle),
  };
};

const batteryPose = (time: number): ICircularStatusBarIphoneDuoBatteryPose => {
  "worklet";
  const squeeze = spring(time, PHASES.battery, SPRINGS.battery);
  const cx = lerp(BATTERY.startX, BATTERY.endX, squeeze);
  const width = lerp(BATTERY.startWidth, BATTERY.endWidth, squeeze);
  const height =
    BATTERY.height +
    Math.max(0, BATTERY.endWidth - width) * BATTERY.stretch;

  return {
    cx,
    cy: BATTERY.centerY,
    width,
    height,
    capX: cx + width / 2 + BATTERY.capGap,
    capScale: 1 - smoother(phase(time, PHASES.cap)),
  };
};

const orbitAngle = (time: number): number => {
  "worklet";
  return (
    ARC.windup * bump(phase(time, PHASES.windup)) +
    ARC.turn * spring(time, PHASES.orbit, SPRINGS.orbit)
  );
};

const arcPose = (time: number): ICircularStatusBarIphoneDuoArcPose => {
  "worklet";
  const angle = orbitAngle(time);
  const step = 1 / 500;
  const velocity =
    (orbitAngle(time + step) - orbitAngle(time - step)) / (2 * step);

  const fling =
    ARC.flingMax * Math.tanh((ARC.fling * velocity * velocity) / ARC.flingMax);
  const radius = RING.radius + fling;
  const radians = (angle * Math.PI) / 180;

  return {
    cx: RING.x + radius * Math.cos(radians),
    cy: RING.y + radius * Math.sin(radians),
    angle: angle + ARC.lean * velocity,
    curvature: spring(time, PHASES.curvature, SPRINGS.curvature) / radius,
    length:
      lerp(
        ARC.startLength,
        ARC.endLength,
        spring(time, PHASES.growth, SPRINGS.growth),
      ) +
      ARC.smear * softAbs(velocity, 60),
  };
};

const traceArc = (
  path: SkPathBuilder,
  { cx, cy, angle, curvature, length }: ICircularStatusBarIphoneDuoArcPose,
): SkPath => {
  "worklet";
  const theta = (angle * Math.PI) / 180;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const flat = Math.abs(curvature) < 1e-9;

  const segments = Math.max(
    1,
    Math.ceil(Math.abs(curvature * length) / (Math.PI / 2)),
  );
  const step = length / segments;
  const handle = flat
    ? step / 3
    : ((4 / 3) * Math.tan((curvature * step) / 4)) / curvature;

  const pointX = (s: number): number => {
    const half = Math.sin((curvature * s) / 2);
    const x = flat ? 0 : (-2 * half * half) / curvature;
    const y = flat ? s : Math.sin(curvature * s) / curvature;
    return cx + x * cos - y * sin;
  };

  const pointY = (s: number): number => {
    const half = Math.sin((curvature * s) / 2);
    const x = flat ? 0 : (-2 * half * half) / curvature;
    const y = flat ? s : Math.sin(curvature * s) / curvature;
    return cy + x * sin + y * cos;
  };

  const tangentX = (s: number): number => {
    const phi = curvature * s;
    return -Math.sin(phi) * cos - Math.cos(phi) * sin;
  };

  const tangentY = (s: number): number => {
    const phi = curvature * s;
    return -Math.sin(phi) * sin + Math.cos(phi) * cos;
  };

  let from = -length / 2;
  path.moveTo(pointX(from), pointY(from));

  for (let i = 0; i < segments; i++) {
    const to = from + step;
    path.cubicTo(
      pointX(from) + tangentX(from) * handle,
      pointY(from) + tangentY(from) * handle,
      pointX(to) - tangentX(to) * handle,
      pointY(to) - tangentY(to) * handle,
      pointX(to),
      pointY(to),
    );
    from = to;
  }

  return path.detach();
};

export { signalPose, wifiPose, batteryPose, arcPose, traceArc };
