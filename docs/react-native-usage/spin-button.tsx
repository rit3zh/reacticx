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
import Animated, {
  LinearTransition,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SpinButton from "@/components/micro-interactions/spin-button";

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

      <Animated.View style={styles.content} layout={LinearTransition}>
        <SpinButton
          colors={{
            active: {
              background: "#121212",
              text: "#fff",
            },
          }}
          spinnerConfig={{
            containerBackground: "#121212",
          }}
          animationConfig={{
            spring: {
              damping: 20,
              stiffness: 250,
              mass: 0.9,
            },
          }}
        />
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
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
