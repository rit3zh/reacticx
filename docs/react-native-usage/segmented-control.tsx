import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import SegmentedControl from "@/components/organisms/segmented-control";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const [index, setIndex] = useState(0);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.card}>
        <SegmentedControl
          currentIndex={index}
          onChange={setIndex}
          paddingVertical={10}
          borderRadius={200}
          disableScaleEffect={false}
        >
          <Text
            style={[
              styles.tabText,
              {
                fontFamily: fontLoaded ? "SfProRounded" : undefined,
              },
            ]}
          >
            I
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="heart" size={20} color="#ff4545" />
          </View>
          {/* <Text
            style={[
              styles.tabText,
              {
                fontFamily: fontLoaded ? "SfProRounded" : undefined,
              },
            ]}
          >
            Favorites
          </Text> */}
          <Text
            style={[
              styles.tabText,
              {
                fontFamily: fontLoaded ? "SfProRounded" : undefined,
              },
            ]}
          >
            Reacticx
          </Text>
        </SegmentedControl>
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

  card: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 24,
    top: 80,
  },

  tabText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },

  content: {
    marginTop: 24,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    maxWidth: 260,
  },
});
