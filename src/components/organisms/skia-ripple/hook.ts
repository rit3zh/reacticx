import { useCallback } from "react";
import { Easing, cancelAnimation, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import type { IRippleImage as IRipple } from "./types";
import { vec } from "react-native-skia";
import { Gesture } from "react-native-gesture-handler";

interface IUseRipple extends Required<
  Pick<
    IRipple,
    | "amplitude"
    | "frequency"
    | "speed"
    | "decay"
    | "duration"
    | "width"
    | "height"
  >
> {}

const useRipple = <T extends IUseRipple>(options: T) => {
  const { amplitude, decay, duration, frequency, height, speed, width } =
    options;
  const touchX = useSharedValue(width / 2);
  const touchY = useSharedValue(height / 2);
  const elapsedTime = useSharedValue(0);

  const uniforms = useDerivedValue(() => {
    const elapsed = elapsedTime.value;
    const isActive = elapsed > 0 && elapsed < duration;

    return {
      u_origin: vec(touchX.value, touchY.value),
      u_time: isActive ? elapsed : 0,
      u_amplitude: amplitude,
      u_frequency: frequency,
      u_decay: decay,
      u_speed: speed,
    };
  }, [
    touchX,
    touchY,
    elapsedTime,
    amplitude,
    frequency,
    decay,
    speed,
    duration,
  ]);

  const start = useCallback((x: number, y: number) => {
    "worklet";
    cancelAnimation(elapsedTime);
    touchX.value = x;
    touchY.value = y;
    elapsedTime.value = 0;
    elapsedTime.value = withTiming(duration, {
      duration: duration * 1000,
      easing: Easing.linear,
    });
  }, [duration, elapsedTime, touchX, touchY]);

  const tap = Gesture.Tap().onStart((event) => {
    start(event.x, event.y);
  });

  return { uniforms, tap, start };
};

export { useRipple };
