import {
  Empty,
  EmptyButton,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/base/empty-state";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { SymbolView } from "expo-symbols";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia
            variant="icon"
            style={{
              backgroundColor: "#0a0a0a",
            }}
          >
            <SymbolView name="cube.box.fill" size={60} tintColor={"#fff"} />
          </EmptyMedia>
          <EmptyTitle>No Messages</EmptyTitle>
          <EmptyDescription>
            You don't have any messages yet. Start a conversation to get
            started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <EmptyButton
            variant="default"
            onPress={() => {
              console.log("New Message");
            }}
          >
            New Message
          </EmptyButton>
        </EmptyContent>
      </Empty>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
});
