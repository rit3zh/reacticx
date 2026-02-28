import * as React from "react";
import { StyleSheet, View } from "react-native";

export default function App() {
  return <View style={stylez.container}></View>;
}

const stylez = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
