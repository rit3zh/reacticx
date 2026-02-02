import { Button, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  const sheet = useRef<TrueSheet>(null);
  return (
    <>
      <View style={styles.container}>
        <Button
          onPress={() => {
            // sheet.current?.present();
            router.push("/(level)");
          }}
          color={"#fff"}
          title="Navigate"
        />
      </View>
      <View
        style={{
          bottom: 200,
          backgroundColor: "red",
        }}
      >
        <TrueSheet
          ref={sheet}
          onDetentChange={(event) => {
            console.log(event.nativeEvent);
          }}
          detents={[0.0_6, 1]}
          cornerRadius={24}
          initialDetentAnimated={true}
          initialDetentIndex={-1}
        >
          <Button onPress={() => {}} title="Dismiss" />
        </TrueSheet>
      </View>
    </>
  );
};

export default Index;

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
