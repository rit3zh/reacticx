import { View, Text, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SymbolView } from "expo-symbols";
import CircularList from "@/components/molecules/circular-list";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const CONTACTS = [
    "https://i.pinimg.com/736x/7e/91/43/7e91431a19f19426f94418cd4ee15548.jpg",
    "https://i.pinimg.com/1200x/02/8e/12/028e12754cbefa35a1ccbbbb69523ed7.jpg",
    "https://i.pinimg.com/736x/f2/c7/38/f2c7384598be1f5a2126e7b946e16a24.jpg",
    "https://i.pinimg.com/736x/e5/80/d5/e580d5227f399828d0adaa7eef232482.jpg",
    "https://i.pinimg.com/736x/c2/8f/94/c28f94a21c8dfebc3f2b6ba608c8099b.jpg",
    "https://i.pinimg.com/736x/c4/40/a0/c440a0df8d75affe4a5df5d7979359b0.jpg",
    "https://i.pinimg.com/736x/9c/ad/87/9cad87372cb22bb5a46260be66a3741e.jpg",
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.backButton}>
          <SymbolView name="chevron.left" size={14} tintColor="#fff" />
        </View>
        <Text
          style={[styles.title, fontLoaded && { fontFamily: "SfProRounded" }]}
        >
          Quick Call
        </Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.listContainer}>
        <CircularList data={CONTACTS} scaleEnabled={Boolean(true)} />
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
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
  placeholder: {
    width: 40,
  },
  listContainer: {
    height: SCREEN_WIDTH * 0.6,
    marginTop: 40,
  },
  actions: {
    alignItems: "center",
    gap: 24,
    paddingHorizontal: 24,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  callButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#30d158",
  },
  hint: {
    fontSize: 13,
    color: "#444",
  },
});
