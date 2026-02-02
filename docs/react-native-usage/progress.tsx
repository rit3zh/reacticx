import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackCards } from "@/components/molecules/stack-carousel";
import { AnimatedProgressBar } from "@/components";

const App = () => {
  return <AnimatedProgressBar progress={2} />;
};

export default App;

const styles = StyleSheet.create({});
