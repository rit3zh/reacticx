import React, { memo, useCallback, useEffect, useRef } from "react";
import { View } from "react-native";
import {
  Canvas,
  Group,
  Path,
  RoundedRect,
  Skia,
  type Transforms3d,
} from "react-native-skia";
import {
  cancelAnimation,
  Easing,
  useDerivedValue,
  useSharedValue,
  type SharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import type { ICircularStatusBarIphoneDuo } from "./types";
import {
  BATTERY,
  BATTERY_CAP_PATH,
  DEFAULT_ACCESSIBILITY_LABEL,
  DEFAULT_COLOR,
  DEFAULT_LOOP_DELAY,
  DEFAULT_SIZE,
  DEFAULT_SPEED,
  LINE_WIDTH,
  SIGNAL,
  SWAP_AT,
  TIMELINE_LENGTH,
  VIEW_BOX,
  WIFI,
  WIFI_INNER_PATH,
  WIFI_OUTER_PATH,
  WIFI_WEDGE_PATH,
} from "./conf";
import {
  arcPose,
  batteryPose,
  signalPose,
  traceArc,
  wifiPose,
} from "./helper";

const WIFI_OUTER = Skia.Path.MakeFromSVGString(WIFI_OUTER_PATH)!;
const WIFI_INNER = Skia.Path.MakeFromSVGString(WIFI_INNER_PATH)!;
const WIFI_WEDGE = Skia.Path.MakeFromSVGString(WIFI_WEDGE_PATH)!;
const BATTERY_CAP = Skia.Path.MakeFromSVGString(BATTERY_CAP_PATH)!;
const EMPTY_PATH = Skia.PathBuilder.Make().detach();
const SIGNAL_BARS = Array.from({ length: SIGNAL.count }, (_, index) => index);

function SignalBar({
  color,
  index,
  time,
}: {
  color: string;
  index: number;
  time: SharedValue<number>;
}) {
  const rect = useDerivedValue(() => {
    const bar = signalPose(index, time.value);
    const radius = Math.min(SIGNAL.width, bar.height) / 2;
    return Skia.RRectXY(
      Skia.XYWHRect(
        bar.cx - SIGNAL.width / 2,
        bar.cy - bar.height / 2,
        SIGNAL.width,
        bar.height,
      ),
      radius,
      radius,
    );
  });

  return <RoundedRect rect={rect} color={color} />;
}

export const CircularStatusBarIphoneDuo: React.FC<ICircularStatusBarIphoneDuo> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  speed = DEFAULT_SPEED,
  loop = true,
  loopDelay = DEFAULT_LOOP_DELAY,
  autoPlay = true,
  reverse = false,
  progress,
  onAnimationEnd,
  accessibilityLabel = DEFAULT_ACCESSIBILITY_LABEL,
  style,
}: ICircularStatusBarIphoneDuo): React.JSX.Element => {
  const internalProgress = useSharedValue<number>(0);
  const driver = progress ?? internalProgress;

  const onAnimationEndRef =
    useRef<ICircularStatusBarIphoneDuo["onAnimationEnd"]>(onAnimationEnd);
  onAnimationEndRef.current = onAnimationEnd;
  const handleAnimationEnd = useCallback<() => void>(
    () => onAnimationEndRef.current?.(),
    [],
  );

  useEffect(() => {
    if (progress) return;

    cancelAnimation<number>(internalProgress);
    internalProgress.value = 0;

    if (!autoPlay) return;

    const rate = Math.max(speed, 0.01);
    const config = {
      duration: (TIMELINE_LENGTH * 1000) / rate,
      easing: Easing.linear,
    };
    const hold = (value: number) =>
      withDelay<number>(
        loopDelay / rate,
        withTiming<number>(value, { duration: 0 }),
      );

    if (!loop) {
      internalProgress.value = withTiming<number>(1, config, (finished) => {
        if (finished) scheduleOnRN(handleAnimationEnd);
      });
    } else if (reverse) {
      internalProgress.value = withRepeat<number>(
        withSequence<number>(
          withTiming<number>(1, config),
          hold(1),
          withTiming<number>(0, config),
          hold(0),
        ),
        -1,
        false,
      );
    } else {
      internalProgress.value = withRepeat<number>(
        withSequence<number>(withTiming<number>(1, config), hold(1)),
        -1,
        false,
      );
    }

    return () => cancelAnimation<number>(internalProgress);
  }, [
    internalProgress,
    progress,
    autoPlay,
    loop,
    reverse,
    speed,
    loopDelay,
    handleAnimationEnd,
  ]);

  const width = size;
  const height = (size * VIEW_BOX.height) / VIEW_BOX.width;
  const scale = size / VIEW_BOX.width;

  const time = useDerivedValue(
    () => Math.min(Math.max(driver.value, 0), 1) * TIMELINE_LENGTH,
  );
  const wifiTransform = useDerivedValue<Transforms3d>(() => {
    const glyph = wifiPose(time.value);
    return [
      { translateX: glyph.cx },
      { translateY: glyph.cy },
      { scale: glyph.scale },
      { translateX: -WIFI.width / 2 },
      { translateY: -WIFI.height / 2 },
    ];
  });
  const battery = useDerivedValue(() => batteryPose(Math.min(time.value, SWAP_AT)));
  const batteryOpacity = useDerivedValue(() => Number(time.value < SWAP_AT));
  const bodyRect = useDerivedValue(() => {
    const body = battery.value;
    const corner = Math.min(BATTERY.radius, body.width / 2);
    return Skia.RRectXY(
      Skia.XYWHRect(
        body.cx - body.width / 2,
        body.cy - body.height / 2,
        body.width,
        body.height,
      ),
      corner,
      corner,
    );
  });
  const capOpacity = useDerivedValue(() =>
    battery.value.capScale > 0.001 ? battery.value.capScale : 0,
  );
  const capTransform = useDerivedValue<Transforms3d>(() => {
    const body = battery.value;
    return [
      { translateX: body.capX },
      { translateY: body.cy },
      { scale: Math.max(0.001, body.capScale) },
      { translateY: -BATTERY.capHeight / 2 },
    ];
  });
  const arc = useDerivedValue(() =>
    time.value < SWAP_AT
      ? EMPTY_PATH
      : traceArc(Skia.PathBuilder.Make(), arcPose(time.value)),
  );

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      style={[{ width, height }, style]}
    >
      <Canvas style={{ width, height }}>
        <Group
          transform={[
            { scale },
            { translateX: -VIEW_BOX.x },
            { translateY: -VIEW_BOX.y },
          ]}
        >
          {SIGNAL_BARS.map((index) => (
            <SignalBar key={index} index={index} time={time} color={color} />
          ))}
          <Group transform={wifiTransform} color={color}>
            <Group style="stroke" strokeCap="round" strokeWidth={WIFI.arcWidth}>
              <Path path={WIFI_OUTER} />
              <Path path={WIFI_INNER} />
            </Group>
            <Path path={WIFI_WEDGE} />
          </Group>
          <Group opacity={batteryOpacity} color={color}>
            <RoundedRect rect={bodyRect} />
            <Path path={BATTERY_CAP} transform={capTransform} opacity={capOpacity} />
          </Group>
          <Path
            path={arc}
            color={color}
            style="stroke"
            strokeCap="round"
            strokeWidth={LINE_WIDTH}
          />
        </Group>
      </Canvas>
    </View>
  );
};

export default memo<React.FC<ICircularStatusBarIphoneDuo>>(CircularStatusBarIphoneDuo);
