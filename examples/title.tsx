import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Title } from "@/components/base/title";
import { SymbolView } from "expo-symbols";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <Title.H1 color="#fff" weight="bold" animated loading={loading}>
          Reactix
        </Title.H1>

        <Title.H4
          color="#616161"
          animated
          size={17}
          loading={loading}
          weight="normal"
          prefix={
            <SymbolView name="hand.wave.fill" size={18} tintColor="#616161" />
          }
          style={fontLoaded ? { fontFamily: "SfProRounded" } : undefined}
        >
          Welcome back and have a nice day!
        </Title.H4>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    paddingHorizontal: 24,
  },
  content: {
    gap: 8,
    top: 120,
  },
});
