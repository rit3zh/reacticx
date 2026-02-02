import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  type TextStyle,
  type ViewStyle,
  type TextLayoutEvent,
} from "react-native";
import type { ITitle } from "./types";
import { resolveColor, resolveSize } from "./helpers";
import { DEFAULT_THEME } from "./const";

const TextSkeleton: React.FC<{ width: number | string; height: number }> = ({
  width,
  height,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.textSkeleton,
        {
          width,
          height,
          opacity,
        } as any,
      ]}
    />
  );
};

const TitleComponent: React.FC<ITitle> & React.FunctionComponent<ITitle> = ({
  children,
  size,
  level,
  lineHeight,
  letterSpacing,
  style,
  containerStyle,
  weight = DEFAULT_THEME.defaultWeight,
  align = "left",
  transform = "none",
  decoration = "none",
  decorationColor,
  color,
  opacity = 1,
  shadow = false,
  shadowConfig,
  italic = false,
  numberOfLines,
  ellipsizeMode = "tail",
  maxWidth,
  minWidth,
  onPress,
  onLongPress,
  onLayout,
  onTextTruncated,
  selectable = false,
  suppressHighlighting = false,
  activeOpacity = 0.7,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "text",
  accessible = true,
  testID,
  loading = false,
  skeletonWidth = 120,
  animated = false,
  animationDuration = 300,
  prefix,
  suffix,
  gap = 8,
  allowFontScaling = true,
  maxFontSizeMultiplier,
  minimumFontScale,
  adjustsFontSizeToFit = false,
  className,
}: ITitle): React.ReactNode & React.JSX.Element & React.ReactElement => {
  const theme = DEFAULT_THEME;
  const fadeAnim = useRef<Animated.Value>(
    new Animated.Value(animated ? 0 : 1),
  ).current;
  const [isTruncated, setIsTruncated] = useState<boolean>(false);

  const resolvedSize = useMemo<number>(
    () => resolveSize(size, level, theme),
    [size, level, theme],
  );
  const resolvedColor = useMemo<string>(
    () => resolveColor(color, theme),
    [color, theme],
  );
  const resolvedWeight = theme.fontWeights[weight];
  useEffect(() => {
    if (animated) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [animated, animationDuration, fadeAnim]);
  const handleTextLayout = useCallback(
    (event: TextLayoutEvent) => {
      if (numberOfLines && onTextTruncated) {
        const { lines } = event.nativeEvent;
        const truncated = lines.length >= numberOfLines;
        setIsTruncated(truncated);
        onTextTruncated(truncated);
      }
    },
    [numberOfLines, onTextTruncated],
  );
  const textStyles = useMemo((): TextStyle[] => {
    const baseStyles: TextStyle[] = [
      styles.text,
      {
        fontSize: resolvedSize,
        fontWeight: resolvedWeight,
        color: resolvedColor,
        textAlign: align,
        textTransform: transform,
        textDecorationLine: decoration,
        opacity,
      },
    ];

    if (lineHeight) {
      baseStyles.push({ lineHeight: resolvedSize * lineHeight });
    }

    if (letterSpacing) {
      baseStyles.push({ letterSpacing });
    }

    if (italic) {
      baseStyles.push({ fontStyle: "italic" });
    }

    if (decorationColor) {
      baseStyles.push({ textDecorationColor: decorationColor });
    }

    if (shadow || shadowConfig) {
      baseStyles.push({
        textShadowColor: shadowConfig?.color ?? "rgba(0, 0, 0, 0.3)",
        textShadowOffset: shadowConfig?.offset ?? { width: 1, height: 1 },
        textShadowRadius: shadowConfig?.radius ?? 2,
      });
    }

    if (maxWidth) {
      baseStyles.push({ maxWidth });
    }

    if (minWidth) {
      baseStyles.push({ minWidth });
    }

    if (style) {
      baseStyles.push(style as TextStyle);
    }

    return baseStyles;
  }, [
    resolvedSize,
    resolvedWeight,
    resolvedColor,
    align,
    transform,
    decoration,
    opacity,
    lineHeight,
    letterSpacing,
    italic,
    decorationColor,
    shadow,
    shadowConfig,
    maxWidth,
    minWidth,
    style,
  ]);

  const containerStyles = useMemo((): ViewStyle[] => {
    const baseContainerStyles: ViewStyle[] = [styles.container];

    if (prefix || suffix) {
      baseContainerStyles.push(styles.row, { gap });
    }

    if (containerStyle) {
      baseContainerStyles.push(containerStyle as ViewStyle);
    }

    return baseContainerStyles;
  }, [prefix, suffix, gap, containerStyle]);

  if (loading) {
    return (
      <View style={containerStyles} testID={testID}>
        <TextSkeleton width={skeletonWidth} height={resolvedSize} />
      </View>
    );
  }

  const textElement = (
    <Text
      style={textStyles}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      selectable={selectable}
      suppressHighlighting={suppressHighlighting}
      allowFontScaling={allowFontScaling}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      minimumFontScale={minimumFontScale}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      onTextLayout={numberOfLines ? handleTextLayout : undefined}
      accessible={!onPress && accessible}
      accessibilityLabel={!onPress ? accessibilityLabel : undefined}
      accessibilityHint={!onPress ? accessibilityHint : undefined}
      accessibilityRole={!onPress ? accessibilityRole : undefined}
      testID={!onPress ? testID : undefined}
    >
      {children}
    </Text>
  );

  const content: React.ReactNode & React.JSX.Element = (
    <>
      {prefix && <View style={styles.addon}>{prefix}</View>}
      {textElement}
      {suffix && <View style={styles.addon}>{suffix}</View>}
    </>
  );

  const wrappedContent = onPress ? (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onLayout={onLayout}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      testID={testID}
      style={({ pressed }) => [
        containerStyles,
        pressed && { opacity: activeOpacity },
      ]}
    >
      {content}
    </Pressable>
  ) : (
    <View style={containerStyles} onLayout={onLayout}>
      {content}
    </View>
  );

  if (animated) {
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        {wrappedContent}
      </Animated.View>
    );
  }

  return wrappedContent;
};

const H1: React.FC<Omit<ITitle, "level">> &
  React.FunctionComponent<Omit<ITitle, "level">> = (
  props: Omit<ITitle, "level">,
): (React.ReactNode & React.JSX.Element & React.ReactElement) | null => (
  <TitleComponent {...props} level="h1" />
);
const H2: React.FC<Omit<ITitle, "level">> &
  React.FunctionComponent<Omit<ITitle, "level">> = (
  props: Omit<ITitle, "level">,
): (React.ReactNode & React.JSX.Element & React.ReactElement) | null => (
  <TitleComponent {...props} level="h2" />
);
const H3: React.FC<Omit<ITitle, "level">> &
  React.FunctionComponent<Omit<ITitle, "level">> = (
  props: Omit<ITitle, "level">,
): (React.ReactNode & React.JSX.Element & React.ReactElement) | null => (
  <TitleComponent {...props} level="h3" />
);
const H4: React.FC<Omit<ITitle, "level">> &
  React.FunctionComponent<Omit<ITitle, "level">> = (
  props: Omit<ITitle, "level">,
): (React.ReactNode & React.JSX.Element & React.ReactElement) | null => (
  <TitleComponent {...props} level="h4" />
);
const H5: React.FC<Omit<ITitle, "level">> &
  React.FunctionComponent<Omit<ITitle, "level">> = (
  props: Omit<ITitle, "level">,
): (React.ReactNode & React.JSX.Element & React.ReactElement) | null => (
  <TitleComponent {...props} level="h5" />
);
const H6: React.FC<Omit<ITitle, "level">> &
  React.FunctionComponent<Omit<ITitle, "level">> = (
  props: Omit<ITitle, "level">,
): (React.ReactNode & React.JSX.Element & React.ReactElement) | null => (
  <TitleComponent {...props} level="h6" />
);

export const Title = Object.assign(
  memo<React.FC<ITitle> & React.FunctionComponent<ITitle>>(TitleComponent),
  {
    H1: memo<Omit<ITitle, "level">>(H1),
    H2: memo<Omit<ITitle, "level">>(H2),
    H3: memo<Omit<ITitle, "level">>(H3),
    H4: memo<Omit<ITitle, "level">>(H4),
    H5: memo<Omit<ITitle, "level">>(H5),
    H6: memo<Omit<ITitle, "level">>(H6),
  },
);

export type { ITitle };

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flexShrink: 1,
  },
  addon: {
    justifyContent: "center",
    alignItems: "center",
  },
  textSkeleton: {
    backgroundColor: "#E1E1E1",
    borderRadius: 4,
  },
});
