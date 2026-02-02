import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Third = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Third</Text>
    </View>
  );
};

export default Third;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
