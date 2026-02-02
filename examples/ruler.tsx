import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useState } from "react";
import Ruler from "@/components/base/ruler";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const [value, setValue] = useState(18);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <View style={{ marginTop: 100 }}>
        <View style={styles.content}>
          <Text
            style={[styles.label, fontLoaded && { fontFamily: "SfProRounded" }]}
          >
            Weight
          </Text>
          <View style={styles.valueRow}>
            <Text
              style={[
                styles.value,
                fontLoaded && { fontFamily: "HelveticaNowDisplay" },
              ]}
            >
              {value}
            </Text>
            <Text
              style={[
                styles.unit,
                fontLoaded && { fontFamily: "SfProRounded" },
              ]}
            >
              kg
            </Text>
          </View>
        </View>

        <Ruler
          height={120}
          width={380}
          minValue={5}
          maxValue={50}
          step={18}
          tickColor="rgba(255,255,255,0.3)"
          activeTickColor="#fff"
          cursorColor="#fff"
          showCursor
          enableHaptics
          tickHeights={{ small: 20, medium: 28, large: 40 }}
          onValueChange={setValue}
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

    gap: 40,
  },
  content: {
    alignItems: "center",
    gap: 9,
  },
  label: {
    fontSize: 15,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  value: {
    fontSize: 72,
    color: "#fff",
    fontWeight: "600",
  },
  unit: {
    fontSize: 24,
    color: "rgba(255,255,255,0.5)",
  },
});
