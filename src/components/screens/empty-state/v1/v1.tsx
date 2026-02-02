import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

const TITLE: string = "No Transactions Yet";
const SUBTITLE: string =
  "Your transaction history will appear here once you start making transactions.";
const SPACING: number = 16;
const WIDTH: number = Dimensions.get("window").width;
const HEIGHT: number = Dimensions.get("window").height;

const EmptyStateV1 = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Transactions",
          headerLargeTitleEnabled: false,
          headerTransparent: true,
          headerSearchBarOptions: undefined,
        }}
      />
      <SafeAreaView style={styles.container}>
        <Image
          source={require("./wallet.png")}
          style={styles.emptyStateImage}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{TITLE}</Text>
          <Text style={styles.subtitle}>{SUBTITLE}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default EmptyStateV1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: HEIGHT * 0.11,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: SPACING,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  contentContainer: {},
  title: {
    marginTop: SPACING,
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    marginTop: SPACING,
    fontSize: 14,
    fontWeight: "400",
    color: "#AAAAAA",
    textAlign: "center",
    paddingHorizontal: SPACING * 2,
    maxWidth: WIDTH / 1,
  },
});
