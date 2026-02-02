import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  type LayoutChangeEvent,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  type ScaledSize,
  ViewStyle,
  Platform,
} from "react-native";
import type {
  TopTabsProps,
  Tab,
  ContentItemProps,
  AnimatedTabItemProps,
  TabItemProps,
} from "./types";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  useAnimatedProps,
  interpolateColor,
} from "react-native-reanimated";
import { BlurView } from "@sbaiahmed1/react-native-blur";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList as new () => FlatList<Tab>,
);

const TAB_PADDING: number = 20;
const MIN_UNDERLINE_WIDTH: number = 0.5;

const ContentItem: React.FC<ContentItemProps> = ({
  item,
  index,
  scrollX,
  screenWidth,
}) => {
  const animatedBlurViewProps = useAnimatedProps(() => {
    "worklet";
    const currentScreenPosition = index * screenWidth;
    const prevScreenPosition = (index - 1) * screenWidth;
    const nextScreenPosition = (index + 1) * screenWidth;

    const blurAmount = interpolate(
      scrollX.value,
      [prevScreenPosition, currentScreenPosition, nextScreenPosition],
      [50, 0, 50],
      Extrapolation.CLAMP,
    );

    return {
      blurAmount: Math.max(0, Math.min(100, blurAmount)),
    };
  });

  const animatedViewStylez = useAnimatedStyle(() => {
    "worklet";
    const currentScreenPosition = index * screenWidth;
    const prevScreenPosition = (index - 1) * screenWidth;
    const nextScreenPosition = (index + 1) * screenWidth;

    const opacity = interpolate(
      scrollX.value,
      [prevScreenPosition, currentScreenPosition, nextScreenPosition],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.contentWrapper,
        { width: screenWidth },
        animatedViewStylez,
        {
          padding: 20,
        },
      ]}
    >
      {item.contentComponent ? (
        item.contentComponent
      ) : (
        <Text style={styles.contentText}>{item.content}</Text>
      )}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {Platform.OS === "ios" && (
          <AnimatedBlurView
            animatedProps={animatedBlurViewProps}
            blurType="regular"
            style={StyleSheet.absoluteFill}
          />
        )}
      </View>
    </Animated.View>
  );
};

const TabItem: React.FC<AnimatedTabItemProps> = ({
  tab,
  index,
  scrollX,
  screenWidth,
  onPress,
  onLayout,
  activeColor = "#007AFF",
  inactiveColor = "#666",
}) => {
  const animatedTextStylez = useAnimatedStyle(() => {
    "worklet";
    const currentScreenPosition = index * screenWidth;
    const prevScreenPosition = (index - 1) * screenWidth;
    const nextScreenPosition = (index + 1) * screenWidth;

    // Calculate how "active" this tab is (0 = inactive, 1 = fully active)
    const activeProgress = interpolate(
      scrollX.value,
      [prevScreenPosition, currentScreenPosition, nextScreenPosition],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    return {
      color: interpolateColor(
        activeProgress,
        [0, 1],
        [inactiveColor, activeColor],
      ),
    };
  });

  // Determine if active for non-animated parts (like custom titleComponent)
  const isActive = Math.round(scrollX.value / screenWidth) === index;

  return (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={onPress}
      onLayout={onLayout}
      activeOpacity={0.7}
    >
      {tab.titleComponent ? (
        typeof tab.titleComponent === "function" ? (
          tab.titleComponent(isActive, activeColor, inactiveColor)
        ) : (
          tab.titleComponent
        )
      ) : (
        <Animated.Text style={[styles.tabText, animatedTextStylez]}>
          {tab.title}
        </Animated.Text>
      )}
    </TouchableOpacity>
  );
};

export const TopTabs: React.FC<TopTabsProps> = ({
  tabs,
  activeColor = "#007AFF",
  inactiveColor = "#666",
  underlineColor = "#007AFF",
  underlineHeight = 3,
}) => {
  const { width: screenWidth }: ScaledSize = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLayoutReady, setIsLayoutReady] = useState<boolean>(false);
  const tabWidths = useRef<number[]>(tabs.map(() => 0));
  const tabPositions = useRef<number[]>(tabs.map(() => 0));
  const measuredCount = useRef<number>(0);
  const contentFlatListRef = useRef<FlatList<Tab>>(null);
  const tabBarFlatListRef = useRef<FlatList<Tab>>(null);
  const isTabPress = useRef<boolean>(false);

  const scrollX = useSharedValue<number>(0);
  const tabBarScrollX = useSharedValue<number>(0);
  const sharedTabWidths = useSharedValue<number[]>(tabs.map(() => 0));
  const sharedTabPositions = useSharedValue<number[]>(tabs.map(() => 0));

  const calculatePositions = () => {
    let position = 0;
    tabPositions.current = tabWidths.current.map((width) => {
      const currentPosition = position;
      position += width;
      return currentPosition;
    });
  };

  const scrollTabBarToIndex = useCallback(
    (index: number) => {
      if (!isLayoutReady) return;

      try {
        tabBarFlatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.2,
        });
      } catch (error) {
        const offset = tabPositions.current[index] || 0;
        tabBarFlatListRef.current?.scrollToOffset({
          offset,
          animated: true,
        });
      }
    },
    [isLayoutReady],
  );

  useEffect(() => {
    scrollTabBarToIndex(activeIndex);
  }, [activeIndex, scrollTabBarToIndex]);

  const handleTabLayout = <T extends LayoutChangeEvent, I extends number>(
    event: T,
    index: I,
  ) => {
    const { width } = event.nativeEvent.layout;

    if (tabWidths.current[index] === 0) {
      measuredCount.current += 1;
    }

    tabWidths.current[index] = width;
    calculatePositions();

    sharedTabWidths.value = [...tabWidths.current];
    sharedTabPositions.value = [...tabPositions.current];

    if (measuredCount.current === tabs.length && !isLayoutReady) {
      setIsLayoutReady(true);
    }
  };

  const handleTabPress: <I extends number>(number: I) => void = <
    I extends number,
  >(
    index: I,
  ) => {
    if (index === activeIndex) return;
    isTabPress.current = true;

    try {
      contentFlatListRef.current?.scrollToIndex({
        index,
        animated: true,
      });
      setActiveIndex(index);
    } catch (error) {
      contentFlatListRef.current?.scrollToOffset({
        offset: index * screenWidth,
        animated: true,
      });
    }
    setTimeout(() => {
      isTabPress.current = false;
    }, 100);
  };
  const contentScrollHandler = useAnimatedScrollHandler<
    Record<string, unknown>
  >({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });
  const tabBarScrollHandler = useAnimatedScrollHandler<Record<string, unknown>>(
    {
      onScroll: (event) => {
        tabBarScrollX.value = event.contentOffset.x;
      },
    },
  );
  const underlineAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    "worklet";
    const inputRange = tabs.map((_, index) => index * screenWidth);
    const positions = sharedTabPositions.value;
    const widths = sharedTabWidths.value;
    if (widths.length === 0 || widths[0] === 0 || positions.length === 0) {
      return { left: 0, width: 0, opacity: 0 };
    }
    const absoluteLeft = interpolate(
      scrollX.value,
      inputRange,
      positions,
      Extrapolation.CLAMP,
    );
    const tabWidth = interpolate(
      scrollX.value,
      inputRange,
      widths,
      Extrapolation.CLAMP,
    );
    const tabLeft = absoluteLeft - tabBarScrollX.value;
    const tabCenterX = tabLeft + tabWidth / 2;
    const shrinkAmount = 20;
    const underlineWidth = Math.max(
      tabWidth - shrinkAmount,
      MIN_UNDERLINE_WIDTH,
    );
    const underlineLeft = tabCenterX - underlineWidth / 2;
    return {
      left: underlineLeft,
      width: underlineWidth,
      opacity: 1,
    };
  });

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    if (!isTabPress.current) {
      const newIndex = Math.round(
        event.nativeEvent.contentOffset.x / screenWidth,
      );
      setActiveIndex(newIndex);
    }
  };

  const renderTabItem = ({ item, index }: { item: Tab; index: number }) => (
    <TabItem
      tab={item}
      index={index}
      scrollX={scrollX}
      screenWidth={screenWidth}
      onPress={() => handleTabPress(index)}
      onLayout={(event) => handleTabLayout(event, index)}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
    />
  );

  const renderContentItem = ({ item, index }: { item: Tab; index: number }) => {
    return (
      <ContentItem
        item={item}
        index={index}
        scrollX={scrollX}
        screenWidth={screenWidth}
      />
    );
  };

  const getItemLayout = (_: any, index: number) => {
    const offset = tabWidths.current
      .slice(0, index)
      .reduce((sum, w) => sum + w, 0);

    return {
      length: tabWidths.current[index] || 0,
      offset,
      index,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBarContainer}>
        <AnimatedFlatList
          ref={tabBarFlatListRef}
          data={tabs}
          renderItem={renderTabItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={tabBarScrollHandler}
          scrollEventThrottle={16}
          getItemLayout={getItemLayout}
        />
        <Animated.View
          style={[
            styles.underline,
            { backgroundColor: underlineColor, height: underlineHeight },
            underlineAnimatedStyle,
          ]}
        />
      </View>

      <AnimatedFlatList
        ref={contentFlatListRef}
        data={tabs}
        renderItem={renderContentItem}
        keyExtractor={(item) => `content-${item.id}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={contentScrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={styles.contentFlatList}
        getItemLayout={(_, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {},
  tabItem: {
    paddingHorizontal: TAB_PADDING,
    paddingVertical: 16,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: "600",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    borderRadius: 1.5,
  },
  contentFlatList: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    position: "relative",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 18,
    color: "#333",
  },
});
