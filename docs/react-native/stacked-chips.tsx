import { BlurView, type BlurViewProps } from "expo-blur";
import React, { createContext, useContext, useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  Platform,
  type LayoutChangeEvent,
  type ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import {
  impactAsync,
  performAndroidHapticsAsync,
  AndroidHaptics,
  ImpactFeedbackStyle,
} from "expo-haptics";
import type { ChipContextType, StackedChipsProps, TriggerProps } from "./types";

const AnimatedBlurView =
  Animated.createAnimatedComponent<BlurViewProps>(BlurView);
const ChipContext = createContext<ChipContextType | null>(null);

export const StackedChips = ({ children }: StackedChipsProps) => {
  const parentContext = useContext<ChipContextType | null>(ChipContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);
  const toggle = () => setIsOpen((prev) => !prev);
  const depth = parentContext ? parentContext.depth + 1 : 0;
  const parentIsOpen = parentContext ? parentContext.isOpen : false;

  return (
    <ChipContext.Provider
      value={{
        isOpen,
        toggle,
        triggerWidth,
        depth,
        parentIsOpen,
        setTriggerWidth,
      }}
    >
      <View style={[styles.container, { zIndex: 100 - depth }]}>
        {children}
      </View>
    </ChipContext.Provider>
  );
};

StackedChips.Trigger = ({ children, onPress }: TriggerProps) => {
  const context = useContext<ChipContextType | null>(ChipContext);

  if (!context) {
    throw new Error("StackedChips.Trigger must be used within StackedChips");
  }

  const { toggle, setTriggerWidth, depth, parentIsOpen } = context;

  const progress = useDerivedValue<number>(
    () => withSpring(parentIsOpen ? 1 : 0),
    [parentIsOpen],
  );

  const animatedBlurProps = useAnimatedProps<Required<Partial<BlurViewProps>>>(
    () => ({
      intensity: interpolate(
        progress.value,
        [0, 0.2, 0.4, 0.8, 1],
        [0, 2.5, 3.5, 4.5, 0],
      ),
    }),
  );

  const handleLayout = <T extends LayoutChangeEvent>(e: T) => {
    setTriggerWidth(e.nativeEvent.layout.width);
  };

  const handleOnPress = () => {
    toggle();
    onPress?.();
    if (Platform.OS === "ios") {
      impactAsync(ImpactFeedbackStyle.Rigid);
    } else {
      performAndroidHapticsAsync(AndroidHaptics.Confirm);
    }
  };

  return (
    <Pressable
      onPress={handleOnPress}
      onLayout={handleLayout}
      style={{ zIndex: 100 - depth }}
    >
      <View>
        {children}
        {depth > 0 && (
          <AnimatedBlurView
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              {
                overflow: "hidden",
                borderRadius: 30,
              },
            ]}
            animatedProps={animatedBlurProps}
          />
        )}
      </View>
    </Pressable>
  );
};

StackedChips.Content = ({ children }: StackedChipsProps) => {
  const context = useContext<ChipContextType | null>(ChipContext);

  if (!context) {
    throw new Error("StackedChips.Content must be used within StackedChips");
  }

  const { isOpen, triggerWidth, depth } = context;
  const [contentWidth, setContentWidth] = useState(0);

  const progress = useDerivedValue<number>(
    () => withSpring(isOpen ? 1 : 0),
    [isOpen],
  );

  const animatedStyle = useAnimatedStyle<Partial<ViewStyle>>(() => ({
    transform: [{ translateX: withSpring(isOpen ? 0 : -contentWidth + 60) }],
    opacity: withSpring(isOpen ? 1 : 0),
    marginLeft: withSpring(isOpen ? -50 : 0),
  }));

  const animatedBlurProps = useAnimatedProps<Required<Partial<BlurViewProps>>>(
    () => ({
      intensity: interpolate(
        progress.value,
        [0, 0.2, 0.4, 0.8, 1],
        [0, 2.5, 3.5, 4.5, 0],
      ),
    }),
  );

  const handleLayout = <T extends LayoutChangeEvent>(e: T) => {
    setContentWidth(e.nativeEvent.layout.width);
  };

  return (
    <Animated.View
      onLayout={handleLayout}
      style={[
        styles.content,
        {
          left: triggerWidth,
          zIndex: 99 - depth,
        },
        animatedStyle,
      ]}
      pointerEvents={isOpen ? "auto" : "none"}
    >
      {children}
      <AnimatedBlurView
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            overflow: "hidden",
            borderRadius: 30,
          },
        ]}
        animatedProps={animatedBlurProps}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  content: { position: "absolute" },
});
