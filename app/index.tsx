import { View, Text, StyleSheet, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import MaterialCarousel from "@/components/molecules/material-carousel";

const IMAGES: string[] = [
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
];

const DESTINATIONS = [
  { name: "Maldives", country: "Indian Ocean" },
  { name: "Bali", country: "Indonesia" },
  { name: "Swiss Alps", country: "Switzerland" },
  { name: "Yosemite", country: "California" },
];

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
    Coolvetica: require("@/assets/fonts/Coolvetica-Rg.otf"),
    DrukWide: require("../assets/fonts/DrukWideBold.ttf"),
  });

  const [saved, setSaved] = useState<number[]>([]);

  const toggleSave = (index: number) => {
    setSaved((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.label,
              { fontFamily: fontLoaded ? "SfProRounded" : undefined },
            ]}
          >
            DISCOVER
          </Text>
          <Text
            style={[
              styles.title,
              { fontFamily: fontLoaded ? "DrukWide" : undefined },
            ]}
          >
            EXPLORE
          </Text>
        </View>
        <View style={styles.iconButton}>
          <Ionicons name="compass-outline" size={20} color="#fff" />
        </View>
      </View>

      {/* Carousel */}
      <View style={styles.carouselSection}>
        <MaterialCarousel
          data={IMAGES}
          renderItem={(item: string, index: number) => (
            <View style={styles.overlay}>
              <View style={styles.cardInfo}>
                <Text
                  style={[
                    styles.destinationName,
                    { fontFamily: fontLoaded ? "DrukWide" : undefined },
                  ]}
                >
                  {DESTINATIONS[index]?.name}
                </Text>
                <View style={styles.locationRow}>
                  <Ionicons
                    name="location"
                    size={12}
                    color="rgba(255,255,255,0.7)"
                  />
                  <Text
                    style={[
                      styles.countryText,
                      {
                        fontFamily: fontLoaded
                          ? "HelveticaNowDisplay"
                          : undefined,
                      },
                    ]}
                  >
                    {DESTINATIONS[index]?.country}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons
              name="images-outline"
              size={18}
              color="rgba(255,255,255,0.5)"
            />
            <Text
              style={[
                styles.statText,
                { fontFamily: fontLoaded ? "HelveticaNowDisplay" : undefined },
              ]}
            >
              {IMAGES.length} places
            </Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="bookmark" size={18} color="rgba(255,255,255,0.5)" />
            <Text
              style={[
                styles.statText,
                { fontFamily: fontLoaded ? "HelveticaNowDisplay" : undefined },
              ]}
            >
              {saved.length} saved
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.hint,
            { fontFamily: fontLoaded ? "Coolvetica" : undefined },
          ]}
        >
          Swipe to explore destinations
        </Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
  },

  label: {
    fontSize: 15,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 2,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    color: "#fff",
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  carouselSection: {
    height: 420,
  },

  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },

  saveButton: {
    alignSelf: "flex-end",

    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  cardInfo: {
    gap: 6,
    padding: 20,
  },

  destinationName: {
    fontSize: 18,
    color: "#fff",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  countryText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
  },

  bottomSection: {
    paddingHorizontal: 24,
    marginTop: 32,
    gap: 24,
  },

  statsRow: {
    flexDirection: "row",
    gap: 24,
  },

  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  statText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
  },

  hint: {
    fontSize: 14,
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
  },
});
