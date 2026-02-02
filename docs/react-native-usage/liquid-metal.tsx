import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import LiquidMetal from "@/components/organisms/liquid-metal";
import { SymbolView } from "expo-symbols";

export default function App(): React.JSX.Element {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
    Coolvetica: require("@/assets/fonts/Coolvetica-Rg.otf"),
  });

  const INPUTS: string[] = [
    "Reacticx is awesome!",
    "UI components made easy.",
    "Build stunning apps fast.",
    "Customizable and flexible.",
    "Join the Reacticx community!",
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <LiquidMetal asChild width={300} height={60} borderRadius={100}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 290,
              height: 50,
              backgroundColor: "#000",
              borderRadius: 100,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <SymbolView
              name="oval.portrait.bottomhalf.filled"
              tintColor={"#fff"}
              size={18}
            />

            <Text
              style={{
                fontFamily: fontLoaded ? "SfProRounded" : undefined,
                fontSize: 18,
                color: "#fff",
              }}
            >
              Reacticx's Liquid Metal
            </Text>
          </View>
        </LiquidMetal>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",

    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 20,
    top: 120,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  subtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    marginTop: 2,
  },

  body: {
    marginTop: 12,
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    lineHeight: 20,
  },

  trigger: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  menu: {
    backgroundColor: "#fff",
  },

  itemText: {
    fontSize: 15,
    color: "#111",
  },

  destructive: {
    color: "#dc2626",
  },
});
