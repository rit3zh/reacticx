import { View, Text, StyleSheet, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Glow from "@/components/base/glow";
import Marquee from "@/components/base/marquee";
import { useFonts } from "expo-font";
import QrCode from "@/components/base/qr-code";
import Ripple from "@/components/base/ripple";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
          top: 120,
        }}
      >
        <Ripple
          rippleConfig={{
            color: "#fff",
            opacity: 0.2,
            scale: 0.97,
            duration: 1200,
            blur: {
              enabled: true,
              intensity: 50,
              tint: "extraLight",
            },
            enabled: true,
          }}
          onLongPress={() => ({})}
          centered={false}
          onPressIn={() => ({})}
          onPressOut={() => ({})}
          onPress={() => ({})}
          style={{}}
          disabled={false}
          testID={"touchable-ripple"}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/f7/fe/5f/f7fe5fc4f88fece1853a4bf2126ecf3f.jpg",
            }}
            style={{ width: 400, height: 250, borderRadius: 20 }}
          />
        </Ripple>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    // marginTop: 150,
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
