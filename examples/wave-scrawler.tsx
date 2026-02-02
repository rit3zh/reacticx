import React, { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import WaveScrawler from "@/components/organisms/wave-scrawler";

const IMAGES = [
  {
    uri: "https://i.pinimg.com/736x/9d/78/88/9d7888052044c88954e1af4c7c9699e6.jpg",
  },
  {
    uri: "https://i.pinimg.com/1200x/ca/ce/8f/cace8f011661cac3b001b6c004598353.jpg",
  },
  {
    uri: "https://i.pinimg.com/1200x/18/78/37/18783753f9ec9084a25a731580357b84.jpg",
  },
];

export default function WaveScrawlerExample() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % IMAGES.length);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <WaveScrawler
          source={IMAGES}
          index={index}
          duration={1000}
          // amplitude={0.108}
          // colorSeparation={0.095}
          style={styles.scrawler}
        />

        <Pressable onPress={next} style={StyleSheet.absoluteFill} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 320,
    height: 420,
    borderRadius: 24,
    overflow: "hidden",
    bottom: 150,
    backgroundColor: "#1a1a1a",
  },
  scrawler: {
    flex: 1,
  },
  dots: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotActive: {
    backgroundColor: "#fff",
  },
});
