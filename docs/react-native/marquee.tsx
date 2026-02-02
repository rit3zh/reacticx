import React, { memo, useState } from "react";
import { View, StyleSheet, Pressable, type ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useFrameCallback,
  type FrameInfo,
} from "react-native-reanimated";
import type { IMarquee } from "./types";

export const Marquee: React.FC<IMarquee> & React.FunctionComponent<IMarquee> =
  memo<IMarquee>(
    ({
      children,
      speed = 50,
      spacing = 20,
      reverse = false,
      pauseOnPress = false,
      holdToSpeedUp = false,
      speedUpMultiplier = 3,
    }: IMarquee): React.ReactNode & React.JSX.Element & React.ReactElement => {
      const offset = useSharedValue<number>(0);
      const [contentWidth, setContentWidth] = useState<number>(0);
      const [copies, _] = useState<number>(10);
      const isPaused = useSharedValue<boolean>(false);
      const speedMultiplier = useSharedValue<number>(1);

      useFrameCallback((frameInfo: FrameInfo) => {
        if (isPaused.value || contentWidth === 0) return;
        const deltaTime = frameInfo.timeSincePreviousFrame ?? 0;
        const distance = (speed * speedMultiplier.value * deltaTime) / 1000;

        if (reverse) {
          offset.value -= distance;
          if (offset.value < -(contentWidth + spacing)) {
            offset.value = 0;
          }
        } else {
          offset.value += distance;
          if (offset.value > contentWidth + spacing) {
            offset.value = 0;
          }
        }
      }, true);

      const containerStylez = useAnimatedStyle<ViewStyle>(() => ({
        transform: [{ translateX: -offset.value }],
      }));

      const handlePress = () => {
        if (holdToSpeedUp) return;
        if (pauseOnPress) {
          isPaused.value = !isPaused.value;
        }
      };

      const handlePressIn = () => {
        if (holdToSpeedUp) {
          speedMultiplier.value = speedUpMultiplier;
        }
      };

      const handlePressOut = () => {
        if (holdToSpeedUp) {
          speedMultiplier.value = 1;
        }
      };

      return (
        <View style={styles.wrapper}>
          <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.touchable}
          >
            <Animated.View style={[styles.scrollContainer, containerStylez]}>
              {Array.from({ length: copies }, (_, index) => (
                <View
                  key={index}
                  style={[
                    styles.itemWrapper,
                    index > 0 && { marginLeft: spacing },
                  ]}
                  onLayout={
                    index === 0
                      ? (e) => setContentWidth(e.nativeEvent.layout.width)
                      : undefined
                  }
                >
                  {children}
                </View>
              ))}
            </Animated.View>
          </Pressable>
        </View>
      );
    },
  );

export default memo<React.FC<IMarquee> & React.FunctionComponent<IMarquee>>(
  Marquee,
);

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
  },
  touchable: {
    width: "100%",
  },
  scrollContainer: {
    flexDirection: "row",
  },
  itemWrapper: {
    flexDirection: "row",
  },
});
