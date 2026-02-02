import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SymbolView } from "expo-symbols";
import { TopTabs } from "@/components/base/tabs";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import { useEffect as useReactEffect } from "react";

const TabTitle = ({
  icon,
  label,
  isActive,
  fontLoaded,
  showTitle = true,
}: {
  icon: string;
  label: string;
  isActive: boolean;
  fontLoaded: boolean;
  showTitle?: boolean;
}) => {
  const progress = useSharedValue(isActive ? 1 : 0);

  useReactEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: 250 });
  }, [isActive]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.4, 1]),
    transform: [
      { scale: interpolate(progress.value, [0, 1], [0.92, 1]) },
      { translateY: interpolate(progress.value, [0, 1], [2, 0]) },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ["#8b8b8b", "#fff"]),
  }));

  return (
    <Animated.View style={[styles.tabTitle, containerStyle]}>
      <SymbolView
        name={icon as any}
        size={15}
        tintColor={isActive ? "#fff" : "#8b8b8b"}
      />
      {showTitle && (
        <Animated.Text
          style={[
            styles.tabLabel,
            textStyle,
            fontLoaded && { fontFamily: "SfProRounded" },
          ]}
        >
          {label}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const TABS = [
    {
      id: "1",
      title: "For You",
      titleComponent: (isActive: boolean) => (
        <TabTitle
          icon="sparkles"
          label="For You"
          isActive={isActive}
          fontLoaded={fontLoaded}
        />
      ),
      contentComponent: (
        <View style={styles.tabContent}>
          {["Discover", "Saved", "History"].map((item, i) => (
            <View key={i} style={styles.item}>
              <SymbolView
                name={["sparkles", "heart.fill", "clock.fill"][i] as any}
                size={18}
                tintColor="#a78bfa"
              />
              <Text
                style={[
                  styles.itemText,
                  fontLoaded && { fontFamily: "SfProRounded" },
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
      ),
    },
    {
      id: "2",
      title: "Trending",
      titleComponent: (isActive: boolean) => (
        <TabTitle
          icon="chart.line.uptrend.xyaxis"
          label="Trending"
          isActive={isActive}
          fontLoaded={fontLoaded}
        />
      ),
      contentComponent: (
        <View style={styles.tabContent}>
          {["Design", "Code", "Music"].map((item, i) => (
            <View key={i} style={styles.item}>
              <Text
                style={[
                  styles.rank,
                  fontLoaded && { fontFamily: "HelveticaNowDisplay" },
                ]}
              >
                {i + 1}
              </Text>
              <Text
                style={[
                  styles.itemText,
                  fontLoaded && { fontFamily: "SfProRounded" },
                ]}
              >
                {item}
              </Text>
              <SymbolView name="arrow.up.right" size={14} tintColor="#34d399" />
            </View>
          ))}
        </View>
      ),
    },
    {
      id: "3",
      title: "New",
      titleComponent: (isActive: boolean) => (
        <TabTitle
          label=""
          icon="clock.fill"
          showTitle={false}
          isActive={isActive}
          fontLoaded={fontLoaded}
        />
      ),
      contentComponent: (
        <View style={styles.tabContent}>
          {["Today", "This Week", "This Month"].map((item, i) => (
            <View key={i} style={styles.item}>
              <View style={[styles.dot, { opacity: 1 - i * 0.3 }]} />
              <Text
                style={[
                  styles.itemText,
                  fontLoaded && { fontFamily: "SfProRounded" },
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
      ),
    },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <Text
        style={[
          styles.header,
          fontLoaded && { fontFamily: "HelveticaNowDisplay" },
        ]}
      >
        Explore
      </Text>

      <TopTabs
        tabs={TABS}
        activeColor="#fff"
        inactiveColor="#555"
        underlineColor="#fff"
        underlineHeight={2}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  tabTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  tabContent: {
    flex: 1,
    paddingTop: 8,
    gap: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 14,
    gap: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  rank: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    width: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fbbf24",
  },
});
