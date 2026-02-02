import { View, StyleSheet } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useSharedValue, withTiming, Easing } from "react-native-reanimated";

import { CircularProgress } from "@/components/organisms/circular-progress";
import { CircularText } from "@/components/organisms/circular-text";
import { useFonts } from "expo-font";
export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
    Coolvetica: require("@/assets/fonts/Coolvetica-Rg.otf"),
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
          marginTop: 100,
        }}
      >
        <CircularText text=" ✦ ⋆ REACTICX IS ✦ ⋆ AWESOME" />
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
});
