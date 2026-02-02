import {
  View,
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Dialog } from "@/components";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";

export default function App<T>() {
  const { width } = useWindowDimensions();
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <Dialog>
        <Dialog.Trigger>
          <View style={styles.trigger}>
            <Feather name="trash-2" size={22} color="#fff" />
          </View>
        </Dialog.Trigger>

        <Dialog.Backdrop blurAmount={25} backgroundColor="rgba(0,0,0,0.7)" />

        <Dialog.Content>
          <View style={[styles.content, { width: width - 48 }]}>
            <View style={styles.iconCircle}>
              <Feather name="trash-2" size={28} color="#ff6b6b" />
            </View>

            <Text
              style={[
                styles.title,
                fontLoaded && { fontFamily: "HelveticaNowDisplay" },
              ]}
            >
              Delete item?
            </Text>

            <Text
              style={[
                styles.subtitle,
                fontLoaded && { fontFamily: "SfProRounded" },
              ]}
            >
              This action cannot be undone.
            </Text>

            <View style={styles.actions}>
              <Dialog.Close asChild>
                <Pressable style={[styles.btn, styles.cancelBtn]}>
                  <Text
                    style={[
                      styles.cancelText,
                      fontLoaded && { fontFamily: "SfProRounded" },
                    ]}
                  >
                    Cancel
                  </Text>
                </Pressable>
              </Dialog.Close>

              <Dialog.Close asChild>
                <Pressable style={[styles.btn, styles.deleteBtn]}>
                  <Feather name="trash-2" size={18} color="#fff" />
                  <Text
                    style={[
                      styles.deleteText,
                      fontLoaded && { fontFamily: "SfProRounded" },
                    ]}
                  >
                    Delete
                  </Text>
                </Pressable>
              </Dialog.Close>
            </View>
          </View>
        </Dialog.Content>
      </Dialog>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  trigger: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1c1c1e",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#1c1c1e",
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    alignSelf: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,107,107,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#8e8e93",
    marginBottom: 28,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  btn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#2c2c2e",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  deleteBtn: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#fd5252",
  },
  deleteText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
