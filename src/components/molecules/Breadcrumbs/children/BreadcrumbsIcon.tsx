import React from "react";
import { View, StyleSheet } from "react-native";
import type { BreadcrumbsProps } from "../types";

export const BreadcrumbsIcon: React.FC<BreadcrumbsProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginRight: 4,
  },
});
