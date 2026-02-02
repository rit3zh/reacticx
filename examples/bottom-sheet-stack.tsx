import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import {
  BottomSheetStackProvider,
  useBottomSheet,
} from "@/components/templates/bottom-sheet-stack";
import { BottomSheet } from "@/components/templates/bottom-sheet";

const SuccessSheet = () => {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  return (
    <View style={styles.successSheet}>
      <View style={styles.successIcon}>
        <Feather name="check" size={36} color="#30d158" />
      </View>
      <Text
        style={[
          styles.successTitle,
          fontLoaded && { fontFamily: "HelveticaNowDisplay" },
        ]}
      >
        Saved
      </Text>
      <Text
        style={[
          styles.successSub,
          fontLoaded && { fontFamily: "SfProRounded" },
        ]}
      >
        Your profile has been updated
      </Text>
    </View>
  );
};

const EditSheet = () => {
  const { present } = useBottomSheet();
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const handleSave = () => {
    present(
      <BottomSheet
        snapPoints={["35%"]}
        enableBackdrop={true}
        backgroundColor="#1c1c1e"
      >
        <SuccessSheet />
      </BottomSheet>,
    );
  };

  return (
    <View style={styles.editSheet}>
      <Text
        style={[
          styles.editTitle,
          fontLoaded && { fontFamily: "HelveticaNowDisplay" },
        ]}
      >
        Edit Profile
      </Text>

      <View style={styles.inputGroup}>
        <Text
          style={[
            styles.inputLabel,
            fontLoaded && { fontFamily: "SfProRounded" },
          ]}
        >
          Name
        </Text>
        <TextInput
          style={[styles.input, fontLoaded && { fontFamily: "SfProRounded" }]}
          defaultValue="John Doe"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text
          style={[
            styles.inputLabel,
            fontLoaded && { fontFamily: "SfProRounded" },
          ]}
        >
          Email
        </Text>
        <TextInput
          style={[styles.input, fontLoaded && { fontFamily: "SfProRounded" }]}
          defaultValue="john@example.com"
          placeholderTextColor="#666"
          keyboardType="email-address"
        />
      </View>

      <Pressable style={styles.saveBtn} onPress={handleSave}>
        <Text
          style={[
            styles.saveBtnText,
            fontLoaded && { fontFamily: "SfProRounded" },
          ]}
        >
          Save Changes
        </Text>
      </Pressable>
    </View>
  );
};

const ProfileSheet = () => {
  const { present } = useBottomSheet();
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const handleEdit = () => {
    present(
      <BottomSheet
        snapPoints={["55%"]}
        enableBackdrop={true}
        backgroundColor="#1c1c1e"
      >
        <EditSheet />
      </BottomSheet>,
    );
  };

  const ListItem = ({
    icon,
    label,
    isLast = false,
  }: {
    icon: string;
    label: string;
    isLast?: boolean;
  }) => (
    <Pressable style={[styles.listItem, isLast && styles.listItemLast]}>
      <Feather name={icon as any} size={18} color="#888" />
      <Text
        style={[styles.listText, fontLoaded && { fontFamily: "SfProRounded" }]}
      >
        {label}
      </Text>
      <Feather name="chevron-right" size={16} color="#444" />
    </Pressable>
  );

  return (
    <View style={styles.sheet}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Feather name="user" size={32} color="#fff" />
        </View>
        <Text
          style={[
            styles.name,
            fontLoaded && { fontFamily: "HelveticaNowDisplay" },
          ]}
        >
          John Doe
        </Text>
        <Text
          style={[styles.email, fontLoaded && { fontFamily: "SfProRounded" }]}
        >
          john@example.com
        </Text>
      </View>

      <View style={styles.row}>
        <Pressable style={styles.rowItem} onPress={handleEdit}>
          <Feather name="edit-2" size={18} color="#0a84ff" />
          <Text
            style={[
              styles.rowText,
              fontLoaded && { fontFamily: "SfProRounded" },
            ]}
          >
            Edit
          </Text>
        </Pressable>
        <View style={styles.rowDivider} />
        <Pressable style={styles.rowItem}>
          <Feather name="log-out" size={18} color="#ff453a" />
          <Text
            style={[
              styles.rowText,
              { color: "#ff453a" },
              fontLoaded && { fontFamily: "SfProRounded" },
            ]}
          >
            Logout
          </Text>
        </Pressable>
      </View>

      <Text
        style={[
          styles.sectionTitle,
          fontLoaded && { fontFamily: "SfProRounded" },
        ]}
      >
        General
      </Text>
      <View style={styles.list}>
        <ListItem icon="bell" label="Notifications" />
        <ListItem icon="moon" label="Appearance" />
        <ListItem icon="globe" label="Language" isLast />
      </View>

      <Text
        style={[
          styles.sectionTitle,
          fontLoaded && { fontFamily: "SfProRounded" },
        ]}
      >
        Privacy
      </Text>
      <View style={styles.list}>
        <ListItem icon="lock" label="Security" />
        <ListItem icon="shield" label="Data" isLast />
      </View>
    </View>
  );
};

const AppContent = () => {
  const { present } = useBottomSheet();
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
  });

  const openProfile = () => {
    present(
      <BottomSheet
        snapPoints={["75%"]}
        enableBackdrop={true}
        backdropOpacity={0.6}
        backgroundColor="#1c1c1e"
      >
        <ProfileSheet />
      </BottomSheet>,
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Pressable style={styles.trigger} onPress={openProfile}>
        <Text
          style={[
            styles.triggerText,
            fontLoaded && { fontFamily: "SfProRounded" },
          ]}
        >
          Edit Profile
        </Text>
      </Pressable>
    </View>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetStackProvider>
        <AppContent />
      </BottomSheetStackProvider>
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
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  triggerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  sheet: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#2c2c2e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#2c2c2e",
    borderRadius: 14,
    marginBottom: 24,
  },
  rowItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
  },
  rowDivider: {
    width: 1,
    backgroundColor: "#3a3a3c",
  },
  rowText: {
    fontSize: 15,
    color: "#0a84ff",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 13,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  list: {
    backgroundColor: "#2c2c2e",
    borderRadius: 14,
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3c",
  },
  listItemLast: {
    borderBottomWidth: 0,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: "#fff",
    marginLeft: 12,
  },
  editSheet: {
    padding: 24,
  },
  editTitle: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#2c2c2e",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#fff",
  },
  saveBtn: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  successSheet: {
    padding: 32,
    alignItems: "center",
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(48,209,88,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 8,
  },
  successSub: {
    fontSize: 15,
    color: "#666",
  },
});
