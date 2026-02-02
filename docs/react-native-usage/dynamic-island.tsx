import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DynamicIsland } from "@/components/molecules/dynamic-island";

const App = () => {
  return (
    <DynamicIsland.Provider>
      <DynamicIsland.Trigger>
        <Text>Trigger Me</Text>
      </DynamicIsland.Trigger>

      <DynamicIsland.Content>
        <Text>Hello There!</Text>
      </DynamicIsland.Content>
    </DynamicIsland.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
