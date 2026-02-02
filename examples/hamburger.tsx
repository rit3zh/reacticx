import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SymbolView } from "expo-symbols";
import { CountdownTimer } from "@/components/micro-interactions/countdown";
import { Ionicons } from "@expo/vector-icons";
import { FlexiButton } from "@/components/micro-interactions/flexi-button";
import GooeySwitch from "@/components/micro-interactions/gooey-switch";
import Hamburger from "@/components/micro-interactions/hamburger";
import { useSharedValue, withTiming } from "react-native-reanimated";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
    Coolvetica: require("@/assets/fonts/Coolvetica-Rg.otf"),
  });

  const launchDate = new Date("2026-07-20T14:30:00");
  const progress = useSharedValue(0);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <Hamburger
          progress={progress}
          color="#fff"
          size={90}
          onPress={() => {
            progress.value = withTiming(progress.value === 1 ? 0 : 1);
          }}
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
    alignItems: "center",
    gap: 24,
    top: 80,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  date: {
    fontSize: 15,
    color: "#333",
    marginTop: 8,
  },
});
