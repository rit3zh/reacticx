import React from "react";
import { Text, StyleSheet, View } from "react-native";
import type { BreadcrumbsSeparatorProps } from "../types";

export const BreadcrumbsSeparator: React.FC<BreadcrumbsSeparatorProps> = ({
  children = "/",
}) => {
  const content = React.isValidElement(children) ? (
    children
  ) : (
    <Text style={styles.text}>{children}</Text>
  );

  return <View style={styles.separator}>{content}</View>;
};

const styles = StyleSheet.create({
  separator: {
    marginHorizontal: 4,
  },
  text: {
    color: "#888",
  },
});
