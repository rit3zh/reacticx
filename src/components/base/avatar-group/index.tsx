import React, { memo, useCallback } from "react";
import { View, Image, Text, StyleSheet, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import type { AvatarGroupProps, IAnimatedAvatar } from "./types";
import { scheduleOnRN } from "react-native-worklets";
import { getColorFromString } from "./helper";
import { LIFT_DISTANCE, SCALE_UP } from "./const";

const AnimatedAvatar: React.FC<IAnimatedAvatar> &
  React.FunctionComponent<IAnimatedAvatar> = memo<IAnimatedAvatar>(
  ({
    avatar,
    size,
    overlap,
    index,
    activeIndex,
  }: IAnimatedAvatar):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const animatedStylez = useAnimatedStyle<
      Pick<ViewStyle, "transform" | "zIndex">
    >(() => {
      const isActive = activeIndex.value === index;

      return {
        transform: [
          {
            translateY: withTiming<number>(isActive ? LIFT_DISTANCE : 0, {
              duration: 200,
            }),
          },
          {
            scale: withTiming<number>(isActive ? SCALE_UP : 1, {
              duration: 200,
            }),
          },
        ],
        zIndex: isActive ? 1000 : index,
      };
    });

    const contentOpacity = useAnimatedStyle<Pick<ViewStyle, "opacity">>(() => {
      const isActive = activeIndex.value === index;
      return {
        opacity: withTiming(isActive ? 0 : 1, {
          duration: 150,
        }),
      };
    });

    const nameOpacity = useAnimatedStyle<Pick<ViewStyle, "opacity">>(() => {
      const isActive = activeIndex.value === index;
      return {
        opacity: withTiming(isActive ? 1 : 0, {
          duration: 150,
        }),
      };
    });

    return (
      <Animated.View
        style={[
          {
            marginLeft: index === 0 ? 0 : -overlap,
            width: size,
            height: size,
          },
          animatedStylez,
        ]}
      >
        <Animated.View style={contentOpacity}>
          {avatar.uri ? (
            <Image
              source={{ uri: avatar.uri }}
              style={[
                styles.avatar,
                { width: size, height: size, borderRadius: size / 2 },
              ]}
            />
          ) : (
            <View
              style={[
                styles.fallback,
                { width: size, height: size, borderRadius: size / 2 },
              ]}
            >
              <Text style={[styles.fallbackText, { fontSize: size / 2 }]}>
                {avatar.name?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </Animated.View>

        <Animated.View
          style={[
            styles.nameContainer,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: getColorFromString(avatar.name || avatar.id),
            },
            nameOpacity,
          ]}
        >
          <Text
            style={[styles.nameText, { fontSize: size / 4 }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {avatar.name || avatar.id}
          </Text>
        </Animated.View>
      </Animated.View>
    );
  },
);

export const AvatarGroup: React.FC<AvatarGroupProps> &
  React.FunctionComponent<AvatarGroupProps> = memo<AvatarGroupProps>(
  ({
    avatars,
    size = 40,
    max = 5,
    overlap = 10,
    onPress,
  }: AvatarGroupProps):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const displayed = avatars.slice(0, max);
    const extraCount = avatars.length - max;
    const activeIndex = useSharedValue<number>(-1);
    const lastHapticIndex = useSharedValue<number>(-1);

    const triggerHaptic = useCallback(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }, []);

    const calculateActiveIndex = useCallback(
      <T extends number>(x: T) => {
        "worklet";
        for (let i = 0; i < displayed.length; i++) {
          const avatarStart = i * (size - overlap);
          const avatarEnd = avatarStart + size;

          if (x >= avatarStart && x <= avatarEnd) {
            return i;
          }
        }

        if (x > displayed.length * (size - overlap)) {
          return displayed.length - 1;
        }

        return 0;
      },
      [size, overlap, displayed.length],
    );

    const panGesture = Gesture.Pan()
      .minDistance(0)
      .onBegin((event) => {
        "worklet";
        const index = calculateActiveIndex<number>(event.x);
        activeIndex.value = index;
        lastHapticIndex.value = index;
        scheduleOnRN(triggerHaptic);
      })
      .onUpdate((event) => {
        "worklet";
        const index = calculateActiveIndex<number>(event.x);
        if (index !== activeIndex.value) {
          activeIndex.value = index;
          if (index !== lastHapticIndex.value) {
            lastHapticIndex.value = index;
            scheduleOnRN<[], void>(triggerHaptic);
          }
        }
      })
      .onEnd(() => {
        "worklet";
        activeIndex.value = -1;
        lastHapticIndex.value = -1;
      })
      .onFinalize(() => {
        "worklet";
        activeIndex.value = -1;
        lastHapticIndex.value = -1;
      })
      .onTouchesUp(() => {
        "worklet";
        activeIndex.value = -1;
        lastHapticIndex.value = -1;
      });

    const tapGesture = Gesture.Tap()
      .maxDuration(200)
      .onEnd((event) => {
        if (onPress) {
          const index = calculateActiveIndex<number>(event.x);
          if (index >= 0 && index < displayed.length) {
            scheduleOnRN(onPress, displayed[index].id);
          }
        }
      });

    const composedGesture = Gesture.Exclusive(panGesture, tapGesture);

    return (
      <GestureDetector gesture={composedGesture}>
        <View style={styles.container}>
          {displayed.map<React.ReactNode>((avatar, idx: number) => (
            <AnimatedAvatar
              key={avatar.id}
              avatar={avatar}
              size={size}
              overlap={overlap}
              index={idx}
              activeIndex={activeIndex}
            />
          ))}
          {extraCount > 0 && (
            <View
              style={[
                styles.extra,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  marginLeft: -overlap,
                },
              ]}
            >
              <Text style={[styles.extraText, { fontSize: size / 2 }]}>
                +{extraCount}
              </Text>
            </View>
          )}
        </View>
      </GestureDetector>
    );
  },
);

export default memo<
  React.FC<AvatarGroupProps> & React.FunctionComponent<AvatarGroupProps>
>(AvatarGroup);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  fallback: {
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  fallbackText: {
    color: "#fff",
    fontWeight: "600",
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    top: 0,
    left: 0,
    paddingHorizontal: 4,
  },
  nameText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  extra: {
    backgroundColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  extraText: {
    color: "#fff",
    fontWeight: "600",
  },
});
