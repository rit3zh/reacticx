import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "@/components";

const App = () => {
  return (
    <Avatar
      image={{
        uri: "https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?auto=compress&cs=tinysrgb&w=1200",
        name: "Avatar Example",
      }}
    />
  );
};

export default App;

const styles = StyleSheet.create({});
