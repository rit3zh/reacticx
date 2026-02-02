import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { AnimationType, useTheme } from "@/components/organisms/theme-switch";

export default function HomeScreen() {
  const { colors, toggleTheme, isDark } = useTheme();

  return (
    <>
      <StatusBar animated style={isDark ? "light" : "dark"} />
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        {/* Center Content */}
        <View style={styles.center}>
          <SymbolView
            name="circle.lefthalf.filled"
            size={28}
            tintColor={colors.text}
          />

          <Text style={[styles.title, { color: colors.text }]}>
            Theme Switch
          </Text>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Tap to toggle appearance
          </Text>
        </View>

        {/* Floating Toggle */}
        <Pressable
          style={[
            styles.fab,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={(e) =>
            toggleTheme({
              animationType: isDark
                ? AnimationType.CircularInverted
                : AnimationType.Circular,
              touchX: e.nativeEvent.pageX,
              touchY: e.nativeEvent.pageY,
            })
          }
        >
          <SymbolView
            name={isDark ? "sun.max.fill" : "moon.fill"}
            tintColor={colors.text}
            size={20}
          />
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  center: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    top: 180,
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    letterSpacing: -0.3,
  },

  subtitle: {
    fontSize: 14,
  },

  fab: {
    position: "absolute",
    top: 62,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
});
