import React, { memo } from "react";
import {
  Canvas,
  useClock,
  useCanvasSize,
  Fill,
  Skia,
  Shader,
  type Uniforms,
} from "react-native-skia";
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { hexToRgb } from "./helper";
import type { UnstableOrbProps } from "./types";
import { SHADER_SOURCE } from "./conf";

const shader = Skia.RuntimeEffect.Make(SHADER_SOURCE);

export const UnstableOrb: React.FC<UnstableOrbProps> &
  React.FunctionComponent<UnstableOrbProps> = memo<UnstableOrbProps>(
  ({
    colorShift = 0,
    intensity = 0.2,
    background = "#000000",
    colors = ["#9C43FE", "#4CC2E9", "#101499"],
    style = { width: 200, height: 200 },
  }: UnstableOrbProps): React.ReactNode & React.JSX.Element => {
    const { size, onLayout } = useCanvasSize();
    const time = useClock();
    const animatedIntensity = useSharedValue<number>(intensity);

    React.useEffect(() => {
      animatedIntensity.value = withTiming<number>(intensity, {
        duration: 400,
      });
    }, [animatedIntensity, intensity]);

    const [bgR, bgG, bgB] = hexToRgb<string>(background);
    const [orb1R, orb1G, orb1B] = hexToRgb<string>(colors[0]);
    const [orb2R, orb2G, orb2B] = hexToRgb<string>(colors[1]);
    const [orb3R, orb3G, orb3B] = hexToRgb<string>(colors[2]);

    const uniforms = useDerivedValue<Uniforms>(() => ({
      iTime: time.value / 1000,
      iResolution: [Math.max(1, size.width), Math.max(1, size.height)],
      colorShift: colorShift,
      distortion: animatedIntensity.value,
      bgColor: [bgR, bgG, bgB],
      orbColor1: [orb1R, orb1G, orb1B],
      orbColor2: [orb2R, orb2G, orb2B],
      orbColor3: [orb3R, orb3G, orb3B],
    }));

    return (
      <Canvas style={style} onLayout={onLayout}>
        {shader && (
          <Fill>
            <Shader source={shader} uniforms={uniforms} />
          </Fill>
        )}
      </Canvas>
    );
  },
);

export default UnstableOrb;
