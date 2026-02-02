import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SymbolView } from "expo-symbols";
import Lanyard from "@/components/molecules/lanyard";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
    Coolvetica: require("@/assets/fonts/Coolvetica-Rg.otf"),
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.title,
              { fontFamily: fontLoaded ? "Coolvetica" : undefined },
            ]}
          >
            Lanyard
          </Text>
          <Text
            style={[
              styles.subtitle,
              { fontFamily: fontLoaded ? "SfProRounded" : undefined },
            ]}
          >
            Drag to interact
          </Text>
        </View>
        <Pressable style={styles.iconButton} onPress={() => alert("profile")}>
          <SymbolView name="person.crop.circle" size={20} tintColor="#fff" />
        </Pressable>
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <Lanyard
          cardWidth={160}
          cardHeight={220}
          cardBackgroundColor="#000000"
          cardAccentColor="#ffffff"
          ropeColor="#ededed"
          ropePattern="striped"
          ropeSegments={8}
          ropeSegmentLength={15}
          ropeThickness={3}
          gravity={600}
          stiffness={0.85}
          damping={0.25}
          cardImageSource="https://pbs.twimg.com/profile_images/2002726630008184832/_p8TfI5J_400x400.jpg"
          cardImageWidth={70}
          cardImageHeight={70}
          anchorPosition={{
            x: SCREEN_WIDTH / 2,
            y: 20,
          }}
          cardData={{
            name: "Alex Morgan",
          }}
          onCardPress={() => {
            console.log("Card tapped!");
          }}
          onDragStart={() => {
            console.log("Drag started");
          }}
          onDragEnd={() => {
            console.log("Drag ended");
          }}
          containerStyle={styles.lanyardContainer}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  lanyardContainer: {},
  infoCard: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: "#141414",
    borderRadius: 16,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: "#222",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    fontSize: 15,
    color: "#e0e0e0",
  },
});
