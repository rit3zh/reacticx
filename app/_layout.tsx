import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { Appearance } from "react-native";
import { DarkTheme } from "@react-navigation/native";
import { PressableProvider } from "@/components/atoms/pressable/index";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { ThemeMode, ThemeProvider } from "@/components/organisms/theme-switch";
import { ThemeProvider as NativeThemeProvider } from "@react-navigation/native";
import { AuraLiftGlobalContextProvider } from "@/components/organisms/aura-lift";
import { SiriProvider } from "@/components/organisms/apple-intelligence";

Appearance.setColorScheme("dark");

export default function RootLayout() {
  return (
    // <DynamicIsland.Provider>
    <SiriProvider>
      <AuraLiftGlobalContextProvider duration={2500}>
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
                  }}
                >
                  {/* <Stack.Screen name="(tabs)/_layout" /> */}
                  <Stack.Screen name="index" />
                </Stack>
              </NativeThemeProvider>
            </React.Fragment>
          </PressableProvider>
        </ThemeProvider>
      </AuraLiftGlobalContextProvider>
    </SiriProvider>
  );
}
