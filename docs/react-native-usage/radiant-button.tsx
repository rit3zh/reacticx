import { Text, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useFonts } from "expo-font";
import RadiantButton from "@/components/base/radiant-button";
import { Entypo } from "@expo/vector-icons";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
    StretchPro: require("@/assets/fonts/StretchPro.otf"),
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <RadiantButton style={styles.button}>
        <View style={styles.row}>
          <Entypo name="heart" size={17} color="#fff" />
          <Text
            style={[
              styles.text,
              {
                fontFamily: fontLoaded ? "HelveticaNowDisplay" : undefined,
              },
            ]}
          >
            Get Started
          </Text>
        </View>
      </RadiantButton>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  button: {
    width: 250,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 14,
  },

  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 17,
    color: "#fff",
    letterSpacing: 0.5,
  },
});
