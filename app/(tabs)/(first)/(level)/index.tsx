import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Level = () => {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        onPress={() => router.navigate("/(boss)")}
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        Navigate to third screen
      </Text>
    </SafeAreaView>
  );
};

export default Level;

const styles = StyleSheet.create({});
