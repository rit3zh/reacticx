import { View, Text, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SymbolView } from "expo-symbols";
import { SplitView } from "@/components/molecules/split-view";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Note {
  id: string;
  content: string;
}

interface Task {
  id: string;
  label: string;
  time: string;
}

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
    Coolvetica: require("@/assets/fonts/Coolvetica-Rg.otf"),
  });

  const notes: Note[] = [
    { id: "1", content: "Design system updates" },
    { id: "2", content: "Review pull requests" },
    { id: "3", content: "Team sync meeting" },
    { id: "4", content: "Update documentation" },
    { id: "5", content: "Fix navigation bug" },
  ];

  const tasks: Task[] = [
    { id: "1", label: "Morning standup", time: "09:00" },
    { id: "2", label: "Code review", time: "10:30" },
    { id: "3", label: "Client call", time: "14:00" },
    { id: "4", label: "Sprint planning", time: "16:00" },
    { id: "5", label: "Team retrospective", time: "17:30" },
  ];

  return (
    <>
      <StatusBar style="light" />
      <SplitView<Note, Task>
        topSectionItems={notes}
        bottomSectionItems={tasks}
        bottomSectionTitle="Tasks"
        initialTopSectionHeight={SCREEN_HEIGHT * 0.5}
        minSectionHeight={10}
        maxTopSectionHeight={SCREEN_HEIGHT * 0.7}
        velocityThreshold={800}
        springConfig={{
          damping: 20,
          stiffness: 150,
          mass: 0.5,
        }}
        containerBackgroundColor="#0a0a0a"
        sectionBackgroundColor="#141414"
        dividerBackgroundColor="#0a0a0a"
        dragHandleColor="#333"
        sectionTitleTextColor="#fff"
        showHeader={true}
        renderHeader={() => (
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { fontFamily: fontLoaded ? "Coolvetica" : undefined },
              ]}
            >
              Notes
            </Text>
            <View style={styles.iconButton}>
              <SymbolView name="plus" size={20} tintColor="#fff" />
            </View>
          </View>
        )}
        renderTopItem={({ item }) => (
          <View style={styles.noteCard}>
            <View style={styles.noteDot} />
            <Text
              style={[
                styles.noteText,
                { fontFamily: fontLoaded ? "SfProRounded" : undefined },
              ]}
            >
              {item.content}
            </Text>
          </View>
        )}
        renderBottomItem={({ item }) => (
          <View style={styles.taskRow}>
            <View style={styles.checkbox} />
            <View style={styles.taskInfo}>
              <Text
                style={[
                  styles.taskLabel,
                  { fontFamily: fontLoaded ? "SfProRounded" : undefined },
                ]}
              >
                {item.label}
              </Text>
            </View>
            <Text
              style={[
                styles.taskTime,
                { fontFamily: fontLoaded ? "SfProRounded" : undefined },
              ]}
            >
              {item.time}
            </Text>
          </View>
        )}
        topKeyExtractor={(item) => item.id}
        bottomKeyExtractor={(item) => item.id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#0a0a0a",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  noteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    gap: 12,
  },
  noteDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333",
  },
  noteText: {
    flex: 1,
    fontSize: 15,
    color: "#e0e0e0",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333",
  },
  taskInfo: {
    flex: 1,
  },
  taskLabel: {
    fontSize: 15,
    color: "#e0e0e0",
  },
  taskTime: {
    fontSize: 13,
    color: "#666",
  },
});
