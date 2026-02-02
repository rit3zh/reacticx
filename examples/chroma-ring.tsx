import { StyleSheet, Image, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { MatchedGeometry } from "@/components/organisms/matched-geometry";
import { useFonts } from "expo-font";
import { ChromaRing } from "@/components/organisms/chroma-ring";
import { SymbolView } from "expo-symbols";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.stage}>
        <ChromaRing glow="#000000" base="#000000">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              padding: 12,
            }}
          >
            <SymbolView name="ring.dashed" tintColor={"#fff"} size={20} />

            <Text
              style={[
                styles.title,
                fontLoaded && { fontFamily: "HelveticaNowDisplay" },
              ]}
            >
              Chroma Ring
            </Text>
          </View>
        </ChromaRing>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },

  stage: {
    paddingTop: 150,
  },

  card: {
    width: 200,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
    bottom: 200,
    right: 100,
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 18,
  },

  meta: {
    padding: 12,
  },

  title: {
    color: "#fff",
    fontSize: 15,
  },

  subtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },
});
