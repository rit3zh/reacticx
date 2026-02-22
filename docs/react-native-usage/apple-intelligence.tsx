import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import Animated, {
  FadeIn,
  FadeOut,
  FadeInUp,
  ZoomIn,
  ZoomOut,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  interpolate,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { useSiri } from "@/components/organisms/apple-intelligence/context";

const { width } = Dimensions.get("window");

const PulseDot = ({ delay = 0, color }: { delay?: number; color: string }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.8, { duration: 600, easing: Easing.out(Easing.quad) }),
          withTiming(1, { duration: 600, easing: Easing.in(Easing.quad) }),
        ),
        -1,
        true,
      ),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: interpolate(scale.value, [1, 1.8], [0.3, 1]),
  }));

  return (
    <Animated.View
      style={[
        { width: 6, height: 6, borderRadius: 3, backgroundColor: color },
        style,
      ]}
    />
  );
};

const ListeningOverlay = ({ onDismiss }: { onDismiss: () => void }) => (
  <Animated.View
    style={styles.overlay}
    entering={FadeIn.duration(200)}
    exiting={FadeOut.duration(180)}
  >
    <Pressable style={StyleSheet.absoluteFillObject} onPress={onDismiss} />

    <Animated.View
      style={styles.panel}
      entering={ZoomIn.duration(350).easing(Easing.out(Easing.exp))}
      exiting={ZoomOut.duration(200)}
    >
      <Animated.View
        style={styles.dotsRow}
        entering={FadeIn.delay(120).duration(300)}
      >
        <PulseDot delay={0} color="#C44AFF" />
        <PulseDot delay={100} color="#FF6B9D" />
        <PulseDot delay={200} color="#00C9FF" />
      </Animated.View>

      <Animated.Text
        style={styles.listeningLabel}
        entering={FadeInUp.delay(80).duration(320)}
      >
        Listening…
      </Animated.Text>

      <Animated.Text
        style={styles.listeningSubtitle}
        entering={FadeInUp.delay(160).duration(320)}
      >
        What can I help you with?
      </Animated.Text>

      <Animated.View
        style={styles.waveRow}
        entering={FadeIn.delay(240).duration(300)}
      >
        {[0.3, 0.7, 1, 0.7, 0.5, 0.9, 0.4, 0.8, 0.6, 1, 0.5, 0.3].map(
          (h, i) => (
            <View
              key={i}
              style={[
                styles.waveBar,
                {
                  height: 4 + h * 28,
                  opacity: 0.4 + h * 0.5,
                },
              ]}
            />
          ),
        )}
      </Animated.View>

      <Animated.View entering={FadeIn.delay(300).duration(300)}>
        <Pressable style={styles.dismissBtn} onPress={onDismiss}>
          <Text style={styles.dismissText}>Done</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  </Animated.View>
);

export default function Index() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const { toggle, isActive, setOverlay } = useSiri();

  const handleDismiss = useCallback(() => {
    setOverlay(null);
    toggle();
  }, [setOverlay, toggle]);

  useEffect(() => {
    if (isActive) {
      setOverlay(<ListeningOverlay onDismiss={handleDismiss} />);
    } else {
      setOverlay(null);
    }
  }, [isActive]);

  const handleActivate = useCallback(() => {
    toggle({
      glow: {
        colors: ["#C44AFF", "#FF6B9D", "#00C9FF", "#5856D6", "#C44AFF"],
        speed: 0.18,
        saturation: 1,
        lightness: 0.65,
      },
      border: { radius: 50, spread: 22, margin: 5 },
      wave: { strength: 1, speed: 2.5, origin: [0.5, 0.8] },
    });
  }, [toggle]);

  if (!fontLoaded) return <View style={styles.root} />;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.center}>
        <Text style={[styles.headline, { fontFamily: "HelveticaNowDisplay" }]}>
          Hey, what's{"\n"}on your mind?
        </Text>

        <Text style={[styles.subtitle, { fontFamily: "SfProRounded" }]}>
          Tap below and watch the magic happen.
        </Text>
      </View>

      <View style={styles.bottomArea}>
        <Pressable style={styles.siriBtn} onPress={handleActivate}>
          <View style={styles.siriBtnInner}>
            <Text style={[styles.siriBtnText, { fontFamily: "SfProRounded" }]}>
              Ask Siri
            </Text>
          </View>
        </Pressable>

        <Text style={[styles.hint, { fontFamily: "SfProRounded" }]}>
          Tap anywhere on overlay to dismiss
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
    paddingBottom: 48,
    paddingHorizontal: 28,
  },

  topBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  topBadgeText: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  glowOrb: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "purple",
    borderWidth: 1,
    borderColor: "rgba(196,74,255,0.15)",
    shadowColor: "#C44AFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 60,
    marginBottom: 40,
  },
  headline: {
    fontSize: 38,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -1.2,
    lineHeight: 46,
    textAlign: "center",
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    letterSpacing: 0.1,
  },

  bottomArea: {
    alignItems: "center",
    gap: 14,
  },
  siriBtn: {
    width: width - 56,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  siriBtnInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  siriBtnText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  hint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.2)",
    letterSpacing: 0.2,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10000,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  panel: {
    width: width - 48,
    backgroundColor: "rgba(16,16,16,0.97)",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: "center",
    gap: 0,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 7,
    marginBottom: 22,
  },
  listeningLabel: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.8,
    marginBottom: 8,
    fontFamily: "HelveticaNowDisplay",
  },
  listeningSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 32,
    fontFamily: "SfProRounded",
    letterSpacing: 0.1,
  },
  waveRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 32,
    height: 36,
  },
  waveBar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: "#C44AFF",
  },
  dismissBtn: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  dismissText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "SfProRounded",
    letterSpacing: 0.2,
  },
});
