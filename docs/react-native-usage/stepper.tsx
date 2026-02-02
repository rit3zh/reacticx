import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SymbolView } from "expo-symbols";
import Stepper from "@/components/molecules/stepper";
import { useState } from "react";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const [count, setCount] = useState(5);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.animatedText}>{count}</Text>
        <Stepper
          value={count}
          onValueChange={setCount}
          min={0}
          max={10}
          step={1}
        />
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
    paddingHorizontal: 25,
    paddingTop: 100,
    alignItems: "center",
  },
  animatedText: {
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
});
