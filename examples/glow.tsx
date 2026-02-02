import { View, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Glow from "@/components/base/glow";
import { useFonts } from "expo-font";
import { Octicons } from "@expo/vector-icons";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <Glow
        size={2}
        style="withoutEasing"
        intensity={1}
        speed={0.9}
        duration={8000}
        gradient={[
          { offset: "5%", color: "#ffc130", opacity: 0.9 },
          { offset: "10%", color: "#f5b111", opacity: 1 },
          { offset: "50%", color: "transparent", opacity: 0 },
        ]}
      >
        <View style={styles.card}>
          <Octicons name="sparkles-fill" size={18} color="#f5b111" />
          <Text
            style={[
              styles.text,
              {
                fontFamily: fontLoaded ? "HelveticaNowDisplay" : undefined,
              },
            ]}
          >
            Generate
          </Text>
        </View>
      </Glow>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    marginTop: 100,
  },
  card: {
    width: 280,
    height: 56,
    backgroundColor: "#151515",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  text: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    letterSpacing: 0.5,
  },
});
