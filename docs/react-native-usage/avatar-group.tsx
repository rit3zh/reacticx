import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AvatarGroup } from "@/components/base/avatar-group";

const App = () => {
  return (
    <AvatarGroup
      avatars={[
        {
          id: "1",
          name: "Name",
          uri: "example-uri",
        },
      ]}
    />
  );
};

export default App;

const styles = StyleSheet.create({});
