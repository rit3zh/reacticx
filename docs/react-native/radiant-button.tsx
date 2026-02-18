import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  type LayoutChangeEvent,
} from "react-native";
import {
  Canvas,
  RoundedRect,
  vec,
  Group,
  LinearGradient,
  Rect,
  Fill,
  Shader,
  Skia,
  BlurMask,
  Mask,
} from "@shopify/react-native-skia";
import Animated, {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { BORDER_GLOW_SHADER } from "./conf";
import { createDotShaderSource, hexToRgb } from "./helpers";
import type { IRadiantButton } from "./types";

export const RadiantButton: React.FC<IRadiantButton> &
  React.FunctionComponent<IRadiantButton> = memo<
  IRadiantButton | React.ComponentProps<typeof RadiantButton>
>(
  ({
    children,
    onPress,
    style,
    textStyle,
    borderRadius = 12,
    borderWidth = 2,
    duration = 3000,
    theme: themeProp,
    paddingHorizontal = 24,
    paddingVertical = 14,
    disabled = false,
    showDots = true,
    showShimmer = true,
    showGlow = true,
    dotSpacing = 5,
    dotRadius = 0.65,
    dotOpacity = 0.35,
    shimmerOpacity = 0.35,
    glowBlur = 18,
    glowWidth = 0.7,
    breathingEnabled = true,
    glowBandWidth = 0.15,
  }: IRadiantButton | React.ComponentProps<typeof RadiantButton>):
    | (React.JSX.Element & React.ReactNode & React.ReactElement)
    | null => {
    const progress = useSharedValue<number>(0);
    const shimmerAngle = useSharedValue<number>(0);
    const breathe = useSharedValue<number>(0);
    const pressed = useSharedValue<number>(0);

    const defaultTheme = {
      background: "#000000",
      backgroundSubtle: "#1a1a1a",
      foreground: "#ffffff",
      highlight: "#c084fc",
      highlightSubtle: "#a855f7",
    };

    const theme = useMemo(
      () => ({ ...defaultTheme, ...themeProp }),
      [themeProp, defaultTheme],
    );

    const highlightRgb = useMemo<number[]>(
      () => hexToRgb(theme.highlight || "#67e8f9"),
      [theme.highlight],
    );

    const [layout, setLayout] = useState<{ width: number; height: number }>({
      width: 0,
      height: 0,
    });

    const borderGlowShader = useMemo(() => {
      try {
        return Skia.RuntimeEffect.Make(BORDER_GLOW_SHADER);
      } catch {
        return null;
      }
    }, []);

    const dotShader = useMemo(() => {
      if (!showDots) return null;
      try {
        return Skia.RuntimeEffect.Make(
          createDotShaderSource<number, number>(
            dotSpacing,
            dotRadius,
            dotOpacity,
            true,
          ),
        );
      } catch {
        return null;
      }
    }, [showDots, dotSpacing, dotRadius, dotOpacity]);

    useEffect(() => {
      if (disabled) return;

      progress.value = withRepeat<number>(
        withTiming(1, { duration, easing: Easing.linear }),
        -1,
        false,
      );

      if (showShimmer) {
        shimmerAngle.value = withRepeat<number>(
          withTiming(360, {
            duration: duration / 0.4,
            easing: Easing.linear,
          }),
          -1,
          false,
        );
      }

      if (breathingEnabled && showGlow) {
        breathe.value = withRepeat<number>(
          withTiming(1, {
            duration: duration * 1.5,
            easing: Easing.inOut(Easing.sin),
          }),
          -1,
          true,
        );
      }
    }, [disabled, duration, showShimmer, showGlow, breathingEnabled]);
    const handleLayout = <T extends LayoutChangeEvent>(e: T) => {
      const { width: w, height: h } = e.nativeEvent.layout;
      if (w !== layout.width || h !== layout.height) {
        setLayout({ width: w, height: h });
      }
    };

    const { width, height } = layout;
    const cx = width / 2;
    const cy = height / 2;

    const innerClip = useMemo(() => {
      if (!width || !height) return undefined;
      const bw = borderWidth;
      const p = Skia.Path.Make();
      p.addRRect(
        Skia.RRectXY(
          Skia.XYWHRect(bw, bw, width - bw * 2, height - bw * 2),
          Math.max(borderRadius - bw, 0),
          Math.max(borderRadius - bw, 0),
        ),
      );
      return p;
    }, [width, height, borderRadius, borderWidth]);

    const borderGlowUniforms = useDerivedValue(() => {
      const bandWidthAdjusted = interpolate(
        pressed.value,
        [0, 1],
        [glowBandWidth, glowBandWidth * 2],
      );
      return {
        iResolution: [width, height] as [number, number],
        progress: progress.value,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        bandWidth: bandWidthAdjusted,
        highlightColor: highlightRgb,
      };
    });
    const dotUniforms = useDerivedValue(() => ({
      iResolution: [width, height] as [number, number],
      angle: progress.value * Math.PI * 2,
    }));

    const shimmerTransform = useDerivedValue(() => {
      const rad = (shimmerAngle.value * Math.PI) / 180;
      return [{ rotate: rad }];
    });

    const glowOpacity = useDerivedValue<number>(() => {
      const base = 0.25;
      const breatheAdd = breathingEnabled
        ? interpolate(breathe.value, [0, 1], [0, 0.2])
        : 0;
      const pressAdd = interpolate(pressed.value, [0, 1], [0, 0.5]);
      return base + breatheAdd + pressAdd;
    });

    const glowScale = useDerivedValue<number>(() =>
      breathingEnabled ? interpolate(breathe.value, [0, 1], [1, 1.15]) : 1,
    );

    const glowTransform = useDerivedValue(() => [{ scale: glowScale.value }]);

    const handlePressIn = () => {
      pressed.value = withTiming<number>(1, { duration: 300 });
    };
    const handlePressOut = () => {
      pressed.value = withTiming<number>(0, { duration: 600 });
    };

    const animatedPressStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: interpolate(pressed.value, [0, 1], [0, 1]) }],
    }));

    const shimmerSize = Math.max(width, height) * 1.5;
    const hasLayout = width > 0 && height > 0;

    const renderChildren = () => {
      if (typeof children === "string") {
        return (
          <Text style={[styles.text, { color: theme.foreground }, textStyle]}>
            {children}
          </Text>
        );
      }
      return children;
    };

    return (
      <Animated.View style={animatedPressStyle}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLayout={handleLayout}
          disabled={disabled}
          style={[
            styles.button,
            {
              borderRadius,
              paddingHorizontal,
              paddingVertical,
              opacity: disabled ? 0.5 : 1,
            },
            style,
          ]}
        >
          {hasLayout && innerClip && (
            <Canvas
              style={{
                ...StyleSheet.absoluteFillObject,
              }}
            >
              {borderGlowShader && (
                <Group>
                  <Rect x={0} y={0} width={width} height={height}>
                    <Shader
                      source={borderGlowShader}
                      uniforms={borderGlowUniforms}
                    />
                    <BlurMask blur={6} style="normal" />
                  </Rect>
                  <Rect x={0} y={0} width={width} height={height}>
                    <Shader
                      source={borderGlowShader}
                      uniforms={borderGlowUniforms}
                    />
                  </Rect>
                </Group>
              )}

              <Group clip={innerClip}>
                <Rect
                  x={borderWidth}
                  y={borderWidth}
                  width={width - borderWidth * 2}
                  height={height - borderWidth * 2}
                  color={theme.background}
                />

                <RoundedRect
                  x={borderWidth}
                  y={borderWidth}
                  width={width - borderWidth * 2}
                  height={height - borderWidth * 2}
                  r={Math.max(borderRadius - borderWidth, 0)}
                  color={theme.backgroundSubtle}
                  style="stroke"
                  strokeWidth={1}
                />

                {showDots && dotShader && (
                  <Fill>
                    <Shader source={dotShader} uniforms={dotUniforms} />
                  </Fill>
                )}

                {showShimmer && (
                  <Mask
                    mask={
                      <Group>
                        <Rect
                          x={borderWidth}
                          y={borderWidth}
                          width={width - borderWidth * 2}
                          height={height - borderWidth * 2}
                        >
                          <LinearGradient
                            start={vec(cx, borderWidth)}
                            end={vec(cx, height - borderWidth)}
                            colors={["transparent", "transparent", "white"]}
                            positions={[0, 0.4, 1]}
                          />
                        </Rect>
                      </Group>
                    }
                  >
                    <Group
                      transform={shimmerTransform}
                      origin={vec(cx, cy)}
                      opacity={shimmerOpacity}
                    >
                      <Rect
                        x={cx - shimmerSize / 2}
                        y={cy - shimmerSize / 2}
                        width={shimmerSize}
                        height={shimmerSize}
                      >
                        <LinearGradient
                          start={vec(0, 0)}
                          end={vec(shimmerSize, shimmerSize * 0.7)}
                          colors={[
                            "transparent",
                            "transparent",
                            theme.highlight || "#67e8f9",
                            "transparent",
                            "transparent",
                          ]}
                          positions={[0, 0.35, 0.5, 0.65, 1]}
                        />
                      </Rect>
                    </Group>
                  </Mask>
                )}
                {showGlow && (
                  <Group
                    transform={glowTransform}
                    origin={vec(cx, height)}
                    opacity={glowOpacity}
                  >
                    <RoundedRect
                      x={cx - (width * glowWidth) / 2}
                      y={height - 22}
                      width={width * glowWidth}
                      height={26}
                      r={13}
                      color={theme.highlight || "#67e8f9"}
                    >
                      <BlurMask blur={glowBlur} style="normal" />
                    </RoundedRect>
                  </Group>
                )}
                {showGlow && (
                  <Group opacity={20}>
                    <RoundedRect
                      x={cx - width * 0.3}
                      y={height - borderWidth - 300}
                      width={width * 0.5}
                      height={3}
                      r={1.5}
                      color={theme.highlight || "#67e8f9"}
                    >
                      <BlurMask blur={3} style="normal" />
                    </RoundedRect>
                  </Group>
                )}
              </Group>
            </Canvas>
          )}
          <View style={styles.content}>{renderChildren()}</View>
        </Pressable>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    position: "relative",
    overflow: "hidden",
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default memo<
  React.FC<IRadiantButton> & React.FunctionComponent<IRadiantButton>
>(RadiantButton);
