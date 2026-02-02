import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useState } from "react";
import AnimatedSwitch from "@/components/base/switch/AnimatedSwitch";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const [darkMode, setDarkMode] = useState(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.card}>
        <AnimatedSwitch
          value={darkMode}
          onValueChange={setDarkMode}
          onColor="#8bf26ee2"
          offColor="#333"
          thumbColor="#fff"
          iconAnimationType="rotate"
          thumbOnIcon={<Feather name="check" size={12} color="black" />}
          thumbOffIcon={
            <Ionicons name="close-outline" size={12} color="black" />
          }
          animateIcons
          thumbInset={4.5}
          height={40}
          width={70}
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
  card: {
    backgroundColor: "#141414",

    marginTop: 90,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#1f1f1f",
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
});
