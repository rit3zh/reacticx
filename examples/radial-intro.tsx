import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { RadialIntro, OrbitItem } from "@/components/organisms/radial-intro";

const ORBIT_ITEMS: OrbitItem[] = [
  {
    id: 1,
    src: "https://i.pinimg.com/736x/87/c7/15/87c715543490556e23d672dd6a027ab6.jpg",
  },
  {
    id: 2,
    src: "https://i.pinimg.com/736x/7b/d6/4c/7bd64c93eb86c96ce99edb72fbfc1ff5.jpg",
  },
  {
    id: 3,
    src: "https://i.pinimg.com/736x/87/f0/07/87f0079fbcf63f332973c05974416042.jpg",
  },
  {
    id: 4,
    src: "https://i.pinimg.com/736x/fd/18/49/fd184979b399f45ef804ae9dbf087f49.jpg",
  },
  {
    id: 5,
    src: "https://i.pinimg.com/736x/f9/7f/85/f97f85fdffc8d0981d3fc9013da5ce04.jpg",
  },
];

export default function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.card}>
        <RadialIntro
          orbitItems={ORBIT_ITEMS}
          expanded={expanded}
          stageSize={500}
          style={{ marginTop: 10 }}
          revealOnFanOut={Boolean(false)}
          imageSize={90}
          spinDuration={12}
          onCenterPress={() => setExpanded((v) => !v)}
        />
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

  card: {},

  caption: {
    marginTop: 18,
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: -0.2,
  },
});
