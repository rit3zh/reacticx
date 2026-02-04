import * as React from "react";
import { StyleSheet, View } from "react-native";
import { AnimatedMeshGradient } from "@/components/organisms/mesh-gradient";
import { IMeshGradientColor } from "@/components/organisms/mesh-gradient/types";

export default function App() {
  const colors: IMeshGradientColor[] = [
    { r: 0.9, g: 0.5, b: 255 / 0.92 },
    { r: 0.95, g: 0.4, b: 255 / 0.85 },
    { r: 0.88, g: 0.7, b: 255 / 0.96 },
    { r: 0.62, g: 0.1, b: 255 / 0.8 },
  ];

  return (
    <View style={stylez.container}>
      <AnimatedMeshGradient
        speed={2}
        contrast={0}
        noise={0.5}
        blur={0}
        animated={true}
        colors={colors}
      />
    </View>
  );
}

const stylez = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
