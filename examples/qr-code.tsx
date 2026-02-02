import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import QrCode from "@/components/base/qr-code";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <QrCode
        springConfig={{
          damping: 28,
          stiffness: 150,
          mass: 0.2,
        }}
        backgroundColorFocused="#f1f0f4"
        textStyle={{
          fontFamily: fontLoaded ? "HelveticaNowDisplay" : undefined,
        }}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    top: 150,
  },
  card: {
    width: 280,
    height: 56,
    backgroundColor: "#151515",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: { width: 20 },
  text: {
    fontSize: 35,
    color: "#fff",
  },
});
