import React, { useMemo } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  type ScaledSize,
} from "react-native";
import {
  Canvas,
  Path,
  Skia,
  LinearGradient,
  Rect,
  vec,
  RadialGradient,
  SkPath,
  SkPaint,
} from "@shopify/react-native-skia";
import type { IGridBackground } from "./types";

export const GridBackground: React.FC<IGridBackground> &
  React.FunctionComponent<IGridBackground> = ({
  cellSize = 60,
  lineColor = "rgba(255, 255, 255, 0.06)",
  lineWidth = StyleSheet.hairlineWidth,
  backgroundColor = "#0A0A0A",
  showVignette = true,
  showTopFade = true,
  showBottomFade = true,
  children,
}: IGridBackground & React.ComponentProps<typeof GridBackground>):
  | (React.ReactNode & React.JSX.Element & React.ReactElement)
  | null => {
  const { width, height }: ScaledSize = useWindowDimensions();

  const gridPath = useMemo<SkPath>(() => {
    const path = Skia.Path.Make();

    const cols = Math.ceil(width / cellSize);
    for (let i = 0; i <= cols; i++) {
      const x = i * cellSize;
      path.moveTo(x, 0);
      path.lineTo(x, height);
    }
    const rows = Math.ceil(height / cellSize);
    for (let j = 0; j <= rows; j++) {
      const y = j * cellSize;
      path.moveTo(0, y);
      path.lineTo(width, y);
    }

    return path;
  }, [width, height, cellSize]);

  const gridPaint = useMemo<SkPaint>(() => {
    const paint = Skia.Paint();
    paint.setColor(Skia.Color(lineColor));
    paint.setStrokeWidth(lineWidth);
    paint.setStyle(1);
    paint.setAntiAlias(true);
    return paint;
  }, [lineColor, lineWidth]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Path path={gridPath} paint={gridPaint} />

        {showTopFade && (
          <Rect x={0} y={0} width={width} height={height * 0.35}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, height * 0.35)}
              colors={["#0A0A0AFF", "#0A0A0A00"]}
            />
          </Rect>
        )}

        {showVignette && (
          <Rect x={0} y={0} width={width} height={height}>
            <RadialGradient
              c={vec(width / 2, height * 0.7)}
              r={Math.max(width, height) * 0.6}
              colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
            />
          </Rect>
        )}

        {showBottomFade && (
          <Rect x={0} y={height * 0.1} width={width} height={height * 0.9}>
            <LinearGradient
              start={vec(0, height * 0.1)}
              end={vec(0, height)}
              colors={["#0A0A0A00", "#0A0A0AFF"]}
            />
          </Rect>
        )}
      </Canvas>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
