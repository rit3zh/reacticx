import { View, Text, StyleSheet, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SymbolView } from "expo-symbols";
import { ToastProviderWithViewport, useToast } from "@/components";

const CustomToast = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <View style={toastStyles.container}>
      <View style={toastStyles.iconBox}>
        <SymbolView name="bell.fill" size={16} tintColor="#ffffff" />
      </View>
      <View style={toastStyles.content}>
        <Text style={toastStyles.title}>{title}</Text>
        <Text style={toastStyles.message}>{message}</Text>
      </View>
    </View>
  );
};

const toastStyles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  message: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
});

function AppContent() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const toast = useToast();

  const showCustomToast = () => {
    toast.show(
      <CustomToast title="New Message" message="Sarah sent you a photo." />,
      {
        duration: 5000,
        position: "top",
        type: "default",
        backgroundColor: "#1c1c1c",
      },
    );
  };

  const showRandomToast = () => {
    const TOAST_STRING = [
      {
        title: `Synced data sucessfully.`,
        type: "success",
        backgroundColor: "#1ad41d",
      },
      {
        title: `Failed to load data from server.`,
        type: "error",
        backgroundColor: "#ff4545",
      },
      {
        title: `Deprecation alert for your API usage.`,
        type: "warning",
        backgroundColor: "#ef932a",
      },
    ];

    const randomIndex = Math.floor(Math.random() * TOAST_STRING.length);

    toast.show(TOAST_STRING[randomIndex].title, {
      type: TOAST_STRING[randomIndex].type as any,
      backgroundColor: TOAST_STRING[randomIndex].backgroundColor,
      position: "top",
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            fontLoaded && { fontFamily: "HelveticaNowDisplay" },
          ]}
        >
          Notifications
        </Text>
        <View style={{ alignItems: "center" }}>
          <Pressable style={styles.button} onPress={showCustomToast}>
            <SymbolView name="bell.badge.fill" size={20} tintColor="#000000" />
            <Text
              style={[
                styles.buttonText,
                fontLoaded && { fontFamily: "SfProRounded" },
              ]}
            >
              Show Notification
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              {
                marginTop: 10,
              },
            ]}
            onPress={showRandomToast}
          >
            <SymbolView name="gear" size={20} tintColor="#000000" />
            <Text
              style={[
                styles.buttonText,
                fontLoaded && { fontFamily: "SfProRounded" },
              ]}
            >
              Custom Toast
            </Text>
          </Pressable>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <ToastProviderWithViewport>
      <AppContent />
    </ToastProviderWithViewport>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    gap: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 16,
    width: 300,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
