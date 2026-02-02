import React, { memo, useEffect, useRef, useState } from "react";
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  G,
  Path,
  Svg,
  // @ts-check
  type PathProps,
  type GProps,
} from "react-native-svg";
import type { ICheckbox, IStrokePath } from "./types";
import { BOX_PATH, PADDING, TICK_PATH, VIEWPORT_SIZE } from "./conf";

const AnimatedSvgPath = Animated.createAnimatedComponent<PathProps>(Path);
const AnimatedG = Animated.createAnimatedComponent<GProps>(G);

const StrokePath: React.FC<IStrokePath> = ({
  animValue,
  ...pathProps
}: IStrokePath): React.ReactNode & React.JSX.Element => {
  const [pathLength, setPathLength] = useState<number>(0);
  const pathRef = useRef<typeof AnimatedSvgPath>(null);

  const animatedStrokeProps = useAnimatedProps<
    Pick<PathProps, "strokeDashoffset">
  >(() => {
    const easedProgress = Easing.bezierFn(0.37, 0, 0.63, 1)(animValue.value);
    const offset = pathLength - pathLength * easedProgress;

    return {
      strokeDashoffset: Math.max(0, offset),
    };
  });

  const handleLayout = () => {
    if (pathRef.current) {
      // @ts-ignore
      const totalLength = pathRef.current?.getTotalLength();
      setPathLength(totalLength);
    }
  };

  return (
    <AnimatedSvgPath
      animatedProps={animatedStrokeProps}
      fill="none"
      onLayout={handleLayout}
      // @ts-ignore
      ref={pathRef}
      strokeDasharray={pathLength}
      {...pathProps}
    />
  );
};

export const Checkbox: React.FC<ICheckbox> = memo<ICheckbox>(
  ({ checked = false, checkmarkColor, stroke = 1.5, size }: ICheckbox) => {
    const animValue = useSharedValue<number>(0);
    const scaleValue = useSharedValue<number>(1);

    useEffect(() => {
      animValue.value = withTiming<number>(checked ? 1 : 0, {
        duration: checked ? 300 : 250,
        easing: checked
          ? Easing.bezier(0.4, 0, 0.2, 1)
          : Easing.bezier(0.4, 0, 0.6, 1),
      });

      if (checked) {
        scaleValue.value = withSpring<number>(1, {
          damping: 10,
          stiffness: 150,
          mass: 0.5,
        });
      } else {
        scaleValue.value = withTiming<number>(1, { duration: 100 });
      }
    }, [checked, animValue, scaleValue]);

    const animatedCheckmarkProps = useAnimatedProps<Pick<GProps, "transform">>(
      () => {
        const scale = interpolate(scaleValue.value, [0, 1], [0.8, 1]);
        return {
          transform: [
            { translateX: 32 },
            { translateY: 32 },
            { scale },
            { translateX: -32 },
            { translateY: -32 },
          ],
        };
      },
    );

    const viewBox = [
      -PADDING,
      -PADDING,
      VIEWPORT_SIZE + PADDING,
      VIEWPORT_SIZE + PADDING,
    ].join(" ");

    return (
      <Svg
        viewBox={viewBox}
        style={{
          transform: [
            {
              scale: size ? size / VIEWPORT_SIZE : 1,
            },
          ],
        }}
      >
        {/* <Defs>
          <ClipPath id="clipPath">
            <Path
              d={BOX_PATH}
              fill="white"
              stroke="gray"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </ClipPath>
        </Defs> */}

        <G clipPath="url(#clipPath)">
          <AnimatedG animatedProps={animatedCheckmarkProps}>
            <StrokePath
              animValue={animValue}
              d={TICK_PATH}
              stroke={checkmarkColor}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </AnimatedG>
        </G>
      </Svg>
    );
  },
);

export default memo<React.FunctionComponent<ICheckbox>>(Checkbox);
