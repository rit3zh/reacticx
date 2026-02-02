import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "@/components/organisms/dropdown";
import { useFonts } from "expo-font";

export default function App(): React.JSX.Element {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
    Coolvetica: require("@/assets/fonts/Coolvetica-Rg.otf"),
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text
              style={[
                styles.title,
                { fontFamily: fontLoaded ? "SfProRounded" : undefined },
              ]}
            >
              Reacticx
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  fontFamily: fontLoaded ? "HelveticaNowDisplay" : undefined,
                },
              ]}
            >
              Last updated 2 mins ago
            </Text>
          </View>

          <Dropdown>
            <Dropdown.Trigger style={styles.trigger}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
            </Dropdown.Trigger>

            <Dropdown.Content style={styles.menu}>
              <Dropdown.Item onPress={() => console.log("Edit")}>
                <Text style={styles.itemText}>Edit</Text>
                <Ionicons name="pencil" size={16} color="#111" />
              </Dropdown.Item>

              <Dropdown.Item
                onPress={() => console.log("Copy")}
                style={{
                  gap: 8,
                }}
              >
                <Text style={styles.itemText}>Copy</Text>
                <Ionicons name="copy-outline" size={16} color="#111" />
              </Dropdown.Item>

              <Dropdown.Item
                onPress={() => console.log("Archive")}
                style={{
                  gap: 8,
                }}
              >
                <Text style={styles.itemText}>Archive</Text>
                <Ionicons name="archive-outline" size={16} color="#111" />
              </Dropdown.Item>

              <Dropdown.Item onPress={() => console.log("Delete")}>
                <Text style={[styles.itemText, styles.destructive]}>
                  Delete
                </Text>
                <Ionicons name="trash-outline" size={16} color="#dc2626" />
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </View>

        <Text
          style={[
            styles.body,
            {
              fontFamily: fontLoaded ? "Coolvetica" : undefined,
            },
          ]}
        >
          I love all the people who use Reacticx to build amazing apps, and I am
          grateful for the opportunity to create this tool for you.
        </Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",

    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 20,
    top: 120,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  subtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    marginTop: 2,
  },

  body: {
    marginTop: 12,
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    lineHeight: 20,
  },

  trigger: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  menu: {
    backgroundColor: "#fff",
  },

  itemText: {
    fontSize: 15,
    color: "#111",
  },

  destructive: {
    color: "#dc2626",
  },
});
