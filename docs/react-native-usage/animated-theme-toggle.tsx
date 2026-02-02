import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useState } from "react";
import { AnimatedThemeToggle } from "@/components/micro-interactions/animated-theme-toggle";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
  });

  const [isDark, setIsDark] = useState(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" animated />

      <View style={styles.row}>
        <AnimatedThemeToggle
          isDark={isDark}
          onToggle={() => setIsDark(!isDark)}
          size={98}
          color="#fff"
          strokeWidth={1.3}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    top: 120,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    width: 40,
  },
});
