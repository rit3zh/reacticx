// @ts-check
import React, { memo } from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  interpolate,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";
import Svg, { Path, PathProps } from "react-native-svg";
import type { IAnimatedThemeToggle } from "./types";
import { MOON_PATH, PATH_LENGTHS, SUN_PATHS } from "./const";

const AnimatedPath = Animated.createAnimatedComponent<PathProps>(Path);

export const AnimatedThemeToggle: React.FC<IAnimatedThemeToggle> &
  React.FunctionComponent<IAnimatedThemeToggle> = memo<IAnimatedThemeToggle>(
  ({
    isDark,
    onToggle,
    size = 24,
    duration = 700,
    color = "#000000",
    strokeWidth = 2,
    style,
  }) => {
    const progress = useSharedValue<number>(isDark ? 1 : 0);

    React.useEffect(() => {
      progress.value = withTiming<number>(isDark ? 1 : 0, {
        duration,
        easing: Easing.inOut(Easing.ease),
      });
    }, [isDark, duration]);

    const scaleSun = useDerivedValue<number>(() =>
      interpolate(progress.value, [0, 1], [1, 0]),
    );

    const scaleMoon = useDerivedValue<number>(() =>
      interpolate(progress.value, [0, 1], [0, 1]),
    );

    const pathLengthSun = useDerivedValue<number>(() =>
      interpolate(scaleSun.value, [0, 0.6, 1], [0, 0, 1]),
    );

    const pathLengthMoon = useDerivedValue<number>(() =>
      interpolate(scaleMoon.value, [0, 0.6, 1], [0, 0, 1]),
    );

    const sunCirclePropz = useAnimatedProps<
      Pick<PathProps, "strokeDasharray" | "transform">
    >(() => {
      const drawn = pathLengthSun.value * PATH_LENGTHS.sunCircle;
      return {
        strokeDasharray: `${drawn} ${PATH_LENGTHS.sunCircle}`,
        transform: [
          { translateX: 12.5 * (1 - scaleSun.value) },
          { translateY: 12.5 * (1 - scaleSun.value) },
          { scale: scaleSun.value },
        ],
      };
    });

    const sunRayPropz = useAnimatedProps<
      Pick<PathProps, "strokeDasharray" | "transform">
    >(() => {
      const drawn = pathLengthSun.value * PATH_LENGTHS.sunRay;
      return {
        strokeDasharray: `${drawn} ${PATH_LENGTHS.sunRay}`,
        transform: [
          { translateX: 12.5 * (1 - scaleSun.value) },
          { translateY: 12.5 * (1 - scaleSun.value) },
          { scale: scaleSun.value },
        ],
      };
    });

    const moonPropz = useAnimatedProps<
      Pick<PathProps, "strokeDasharray" | "transform">
    >(() => {
      const drawn = pathLengthMoon.value * PATH_LENGTHS.moon;
      return {
        strokeDasharray: `${drawn} ${PATH_LENGTHS.moon}`,
        transform: [
          { translateX: 12.5 * (1 - scaleMoon.value) },
          { translateY: 12.5 * (1 - scaleMoon.value) },
          { scale: scaleMoon.value },
        ],
      };
    });

    return (
      <Pressable onPress={onToggle} style={[style]}>
        <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
          <AnimatedPath
            d={SUN_PATHS.circle}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            animatedProps={sunCirclePropz}
          />

          {SUN_PATHS.rays.map<React.JSX.Element>(
            (d: string, index?: number) => (
              <AnimatedPath
                key={`sun-ray-${index}`}
                d={d}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                animatedProps={sunRayPropz}
              />
            ),
          )}

          <AnimatedPath
            d={MOON_PATH}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            animatedProps={moonPropz}
          />
        </Svg>
      </Pressable>
    );
  },
);
