import React, { memo, useEffect, useMemo } from "react";
import { View, StyleSheet, Platform, type TextStyle } from "react-native";
import {
  Canvas,
  Text,
  useFont,
  Group,
  Paint,
  Blur,
  ColorMatrix,
  matchFont,
  Skia,
} from "@shopify/react-native-skia";
import {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import type { IGooeyText, IGooeyTextItem } from "./types";
import { THRESHOLD_MATRIX } from "./conf";
import { calculateBlur, calculateOpacity } from "./helpers";

const GooeyTextItem: React.FC<IGooeyTextItem> &
  React.FunctionComponent<IGooeyTextItem> = ({
  text,
  index,
  totalTexts,
  masterClock,
  cooldownFraction,
  font,
  color,
  x,
  y,
}: IGooeyTextItem): React.ReactElement &
  React.ReactNode &
  React.JSX.Element => {
  const visibility = useDerivedValue(() => {
    const cycleIndex = Math.floor(masterClock.value) % totalTexts;

    const nextIndex = (cycleIndex + 1) % totalTexts;

    const progressInCycle = masterClock.value % 1;

    let morphProgress = 0;
    if (progressInCycle >= cooldownFraction) {
      morphProgress =
        (progressInCycle - cooldownFraction) / (1 - cooldownFraction);
    }

    if (index === cycleIndex) {
      return 1 - morphProgress;
    } else if (index === nextIndex) {
      return morphProgress;
    } else {
      return 0;
    }
  }, [index, totalTexts, cooldownFraction]);

  const blur = useDerivedValue(() => {
    return calculateBlur<number>(visibility.value);
  }, []);

  const opacity = useDerivedValue(() => {
    return calculateOpacity<number>(visibility.value);
  }, []);

  return (
    <Group
      layer={
        <Paint>
          <Blur blur={blur} />
        </Paint>
      }
      opacity={opacity}
    >
      <Text x={x} y={y} text={text} font={font} color={color} />
    </Group>
  );
};

function useSystemFont<
  T extends string,
  S extends number,
  W extends TextStyle["fontWeight"],
  P extends boolean,
>(fontFamily: T | undefined, fontSize: S, fontWeight: W, skip: P) {
  return useMemo(() => {
    if (skip) return null;

    const family =
      fontFamily ??
      Platform.select({
        ios: "Helvetica",
        android: "sans-serif",
        default: "serif",
      });

    try {
      return matchFont({
        fontFamily: family,
        fontSize,
        fontWeight: fontWeight as any,
      });
    } catch {
      const fontMgr = Skia.FontMgr.System();
      const numericWeight =
        fontWeight === "bold"
          ? 700
          : fontWeight === "normal"
            ? 400
            : parseInt(fontWeight as string, 10) || 400;

      const typeface = fontMgr.matchFamilyStyle(family, {
        weight: numericWeight,
      });

      return typeface ? Skia.Font(typeface, fontSize) : null;
    }
  }, [skip, fontFamily, fontSize, fontWeight]);
}

export const GooeyText: React.FC<IGooeyText> &
  React.FunctionComponent<IGooeyText> = memo<IGooeyText>(
  ({
    texts,
    morphTime = 1,
    cooldownTime = 0.25,
    style,
    fontSize = 48,
    color = "black",
    fontSource,
    fontFamily,
    fontWeight = "bold",
    width = 300,
    height = 100,
  }: IGooeyText): React.ReactNode & React.JSX.Element & React.ReactElement => {
    const customFont = useFont(fontSource ?? null, fontSize);
    const systemFont = useSystemFont(
      fontFamily,
      fontSize,
      fontWeight as TextStyle["fontWeight"],
      !!fontSource,
    );
    const font = fontSource ? customFont : systemFont;

    const cycleTime = cooldownTime + morphTime;
    const cooldownFraction = cooldownTime / cycleTime;
    const totalDuration = cycleTime * texts.length;

    const masterClock = useSharedValue<number>(0);

    useEffect(() => {
      if (texts.length < 2 || !font) return;

      masterClock.value = 0;
      masterClock.value = withRepeat(
        withTiming(texts.length, {
          duration: totalDuration * 1000,
          easing: Easing.linear,
        }),
        -1,
        false,
      );

      return () => {
        cancelAnimation<number>(masterClock);
      };
    }, [texts.length, totalDuration, font, masterClock]);

    const textPositions = useMemo(() => {
      if (!font) return texts.map<number>((_) => width / 2);

      return texts.map((text) => {
        try {
          const measured = font.measureText(text);
          return (width - measured.width) / 2;
        } catch {
          return width / 2;
        }
      });
    }, [font, width, texts]);

    const textY = height / 2 + fontSize / 3;

    if (!font) {
      return <View style={[styles.container, { width, height }, style]} />;
    }

    if (texts.length < 2) {
      return (
        <View style={[styles.container, { width, height }, style]}>
          <Canvas style={styles.canvas}>
            <Text
              x={textPositions[0] ?? width / 2}
              y={textY}
              text={texts[0] ?? ""}
              font={font}
              color={color}
            />
          </Canvas>
        </View>
      );
    }

    return (
      <View style={[styles.container, { width, height }, style]}>
        <Canvas style={styles.canvas}>
          <Group
            layer={
              <Paint>
                <ColorMatrix matrix={THRESHOLD_MATRIX} />
              </Paint>
            }
          >
            {texts.map<React.ReactElement<IGooeyTextItem>>(
              (text: string, index: number) => (
                <GooeyTextItem
                  key={`${text}-${index}`}
                  text={text}
                  index={index}
                  totalTexts={texts.length}
                  masterClock={masterClock}
                  cooldownFraction={cooldownFraction}
                  font={font}
                  color={color}
                  x={textPositions[index] ?? width / 2}
                  y={textY}
                />
              ),
            )}
          </Group>
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

export default memo(GooeyText);
