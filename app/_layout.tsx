import "../global.css";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Stack } from "expo-router";
import { Appearance } from "react-native";
import { DarkTheme } from "@react-navigation/native";
import { PressableProvider } from "@/components/atoms/pressable/index";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { ThemeMode, ThemeProvider } from "@/components/organisms/theme-switch";

import { ThemeProvider as NativeThemeProvider } from "@react-navigation/native";
import { DynamicIsland } from "@/components/molecules/dynamic-island";

Appearance.setColorScheme("dark");

export default function RootLayout() {
  return (
    <DynamicIsland.Provider>
      <ThemeProvider defaultTheme={ThemeMode.Dark}>
        <PressableProvider
          initialOnPress={() => impactAsync(ImpactFeedbackStyle.Heavy)}
          defaultFeedback={{
            haptic: false,
          }}
        >
          <React.Fragment>
            <NativeThemeProvider value={DarkTheme}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  title: "Glow UI",
                  headerTransparent: true,
                  headerLargeTitleEnabled: true,
                  headerSearchBarOptions: {
                    allowToolbarIntegration: Boolean(false),
                    placeholder: "Welcome to Expo Router",

                    placement: "integratedButton",
                    shouldShowHintSearchIcon: true,
                  },
                }}
              >
                {/* <Stack.Screen name="(tabs)/_layout" /> */}
                <Stack.Screen name="index" />
              </Stack>
            </NativeThemeProvider>
          </React.Fragment>
        </PressableProvider>
      </ThemeProvider>
    </DynamicIsland.Provider>
  );
}
