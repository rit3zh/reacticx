import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SymbolView } from "expo-symbols";
import { ChipGroup } from "@/components";
import { useState } from "react";
import AnimatedMaskedText from "@/components/molecules/animated-masked-text/AnimatedMaskedText";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    Coolveticsa: require("@/assets/fonts/Coolvetica-Rg-Cram.otf"),
  });

  const [selected, setSelected] = useState(0);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <AnimatedMaskedText
          style={{
            fontSize: 84,
            fontWeight: "100",
          }}
          baseTextColor="#2a2a2a"
        >
          Reacticx
        </AnimatedMaskedText>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 100,
    gap: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
  },
});
