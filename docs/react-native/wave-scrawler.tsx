// @ts-check
import { StyleSheet, View, type LayoutChangeEvent } from "react-native";
import React, { useEffect, useMemo, memo, useState } from "react";
import {
  Canvas,
  Skia,
  Fill,
  Shader,
  ImageShader,
  Group,
  rect,
  type SkRuntimeEffect,
  type Uniforms,
} from "@shopify/react-native-skia";
import {
  useSharedValue,
  withTiming,
  useDerivedValue,
  Easing,
} from "react-native-reanimated";
import type { IWaveScrawler, ITransitionRenderer } from "./types";
import { WAVE_SCRAWLER_SHADER, DEFAULT_CONFIG } from "./conf";
import { scheduleOnRN } from "react-native-worklets";
import { useLoadedImages } from "./hooks";

const TransitionRenderer: React.FC<ITransitionRenderer> &
  React.FunctionComponent<ITransitionRenderer> = memo<ITransitionRenderer>(
  ({
    fromImage,
    toImage,
    progress,
    width,
    height,
    amplitude,
    waves,
    colorSeparation,
  }: ITransitionRenderer):
    | (React.JSX.Element & React.ReactNode & React.ReactElement)
    | null => {
    const runtimeEffect = useMemo<SkRuntimeEffect | null>(() => {
      return Skia.RuntimeEffect.Make(WAVE_SCRAWLER_SHADER);
    }, []);

    const uniforms = useDerivedValue<Uniforms>(() => {
      return {
        progress: progress.value,
        resolution: [width, height],
        amplitude,
        waves,
        colorSeparation,
      };
    }, [progress, width, height, amplitude, waves, colorSeparation]);

    if (
      !runtimeEffect ||
      !fromImage ||
      !toImage ||
      width === 0 ||
      height === 0
    ) {
      if (fromImage && width > 0 && height > 0) {
        return (
          <Group>
            <ImageShader
              image={fromImage}
              fit="cover"
              rect={rect(0, 0, width, height)}
            />
            <Fill />
          </Group>
        );
      }
      return null;
    }

    return (
      <Fill>
        <Shader source={runtimeEffect} uniforms={uniforms}>
          <ImageShader
            image={fromImage}
            fit="cover"
            x={0}
            y={0}
            width={width}
            height={height}
          />
          <ImageShader
            image={toImage}
            fit="cover"
            x={0}
            y={0}
            width={width}
            height={height}
          />
        </Shader>
      </Fill>
    );
  },
);

export const WaveScrawler: React.FC<IWaveScrawler> &
  React.FunctionComponent<IWaveScrawler> = memo<IWaveScrawler>(
  ({
    source,
    index,
    duration = DEFAULT_CONFIG.duration,
    amplitude = DEFAULT_CONFIG.amplitude,
    waves = DEFAULT_CONFIG.waves,
    colorSeparation = DEFAULT_CONFIG.colorSeparation,
    style,
    onTransitionEnd,
  }: IWaveScrawler):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const [dimensions, setDimensions] = useState<{
      width: number;
      height: number;
    }>({ width: 0, height: 0 });
    const [fromIndex, setFromIndex] = useState<number>(index);
    const [toIndex, setToIndex] = useState<number>(index);
    const progress = useSharedValue<number>(1);
    const isAnimating = useSharedValue<boolean>(false);
    const loadedImages = useLoadedImages(source);

    const onLayout = <T extends LayoutChangeEvent>(event: T) => {
      const { width, height } = event.nativeEvent.layout;
      setDimensions({ width, height });
    };

    const handleTransitionEnd = <T extends number>(newIndex: T) => {
      onTransitionEnd?.(newIndex);
    };
    useEffect(() => {
      if (index !== toIndex && !isAnimating.value) {
        setFromIndex(toIndex);
        setToIndex(index);

        progress.value = 0;
        isAnimating.value = true;

        progress.value = withTiming<number>(
          1,
          {
            duration,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          },
          (finished) => {
            if (finished) {
              isAnimating.value = false;
              scheduleOnRN<[number], void>(handleTransitionEnd, index);
            }
          },
        );
      }
    }, [index]);

    const fromImage = loadedImages[fromIndex] ?? null;
    const toImage = loadedImages[toIndex] ?? null;

    return (
      <View style={[styles.container, style]} onLayout={onLayout}>
        <Canvas style={styles.canvas}>
          <TransitionRenderer
            fromImage={fromImage}
            toImage={toImage}
            progress={progress}
            width={dimensions.width}
            height={dimensions.height}
            amplitude={amplitude}
            waves={waves}
            colorSeparation={colorSeparation}
          />
        </Canvas>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  canvas: {
    flex: 1,
  },
});

export default memo<
  React.FC<IWaveScrawler> & React.FunctionComponent<IWaveScrawler>
>(WaveScrawler);
export type { IWaveScrawler, ImageSource, ITransitionRenderer } from "./types";
