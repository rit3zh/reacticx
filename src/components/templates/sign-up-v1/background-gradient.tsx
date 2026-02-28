import { useWindowDimensions, View } from "react-native";
import React from "react";
import type { IBackgroundGradient } from "./types";
import { Canvas, Rect, RadialGradient, vec } from "@shopify/react-native-skia";

const BackgroundGradient: React.FC<IBackgroundGradient<string>> &
  React.FunctionComponent<IBackgroundGradient<string>> = (
  props: IBackgroundGradient<string> &
    React.ComponentProps<typeof BackgroundGradient>,
): (React.ReactNode & React.JSX.Element & React.ReactElement) | null => {
  const { width, height } = useWindowDimensions();

  const COLORS: string[] = props?.colors || [
    "#ffffff",
    "#f3e8ff",
    "#a855f7",
    "#7e22ce",
    "#4c1d95",
    "#000000",
    "#000000",
  ];

  const hasChildren = props?.children;

  return (
    <>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <RadialGradient
            c={vec(width / 2, -height * 0.19)}
            r={height * 0.55}
            colors={COLORS}
            positions={[0.1, 0.2, 0.5, 0.6, 0.7, 0.959, 1]}
          />
        </Rect>
      </Canvas>
      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {hasChildren && props.children}
      </View>
    </>
  );
};

export default BackgroundGradient;
