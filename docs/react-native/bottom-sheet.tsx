// @ts-check
import React, {
  memo,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useState,
  ReactElement,
  cloneElement,
  Children,
} from "react";
import {
  GestureDetector,
  Gesture,
  type PanGesture,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  useAnimatedRef,
  scrollTo,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import {
  StyleSheet,
  Dimensions,
  View,
  Pressable,
  ScrollViewProps,
  ViewStyle,
} from "react-native";
import { scheduleOnRN } from "react-native-worklets";

// @ts-ignore
import type { BottomSheetProps, BottomSheetMethods } from "./types";

import {
  DEFAULT_SPRING_CONFIG,
  DEFAULT_TIMING_CONFIG,
  HANDLE_HEIGHT,
  SCROLL_TOP_THRESHOLD,
} from "./conf";
import { parseSnapPoint, triggerHaptic, isScrollableList } from "./utils";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomSheetComponent = forwardRef<BottomSheetMethods, BottomSheetProps>(
  (
    {
      children,
      snapPoints,
      enableBackdrop = true,
      backdropOpacity = 0.5,
      dismissOnBackdropPress = true,
      dismissOnSwipeDown = true,
      onSnapPointChange,
      onClose,
      springConfig = DEFAULT_SPRING_CONFIG,
      sheetStyle,
      backdropStyle,
      handleStyle,
      showHandle = true,
      enableOverDrag = true,
      enableHapticFeedback = true,
      snapVelocityThreshold = 500,
      backgroundColor = "#FFFFFF",
      borderRadius = 24,
      contentContainerStyle,
      enableDynamicSizing = false,
    },
    ref,
  ) => {
    const parsedSnapPoints = useMemo<number[]>(
      () => snapPoints.map(parseSnapPoint),
      [snapPoints],
    );

    const maxSnapPoint = useMemo<number>(
      () => Math.max(...parsedSnapPoints),
      [parsedSnapPoints],
    );

    const minSnapPoint = useMemo<number>(
      () => Math.min(...parsedSnapPoints),
      [parsedSnapPoints],
    );

    const maxSnapIndex = useMemo<number>(
      () => parsedSnapPoints.length - 1,
      [parsedSnapPoints],
    );

    const translateY = useSharedValue<number>(SCREEN_HEIGHT);
    const currentSnapIndex = useSharedValue<number>(-1);
    const context = useSharedValue<number>(0);
    const scrollY = useSharedValue<number>(0);
    const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

    const isDraggingSheet = useSharedValue<boolean>(false);
    const isScrollLocked = useSharedValue<boolean>(false);
    const gestureStartScrollY = useSharedValue<number>(0);

    const [enableScroll, setEnableScroll] = useState<boolean>(false);

    const handleSnapPointChangeJS = useCallback(
      (index: number) => {
        if (enableHapticFeedback) {
          triggerHaptic();
        }
        onSnapPointChange?.(index);
      },
      [onSnapPointChange, enableHapticFeedback],
    );

    const handleCloseJS = useCallback(() => {
      if (enableHapticFeedback) {
        triggerHaptic();
      }
      onClose?.();
    }, [onClose, enableHapticFeedback]);

    const updateScrollEnabled = useCallback((enabled: boolean) => {
      setEnableScroll(enabled);
    }, []);

    const findClosestSnapPoint = useCallback(
      (currentY: number, velocity: number): number => {
        "worklet";

        const height = SCREEN_HEIGHT - currentY;

        if (Math.abs(velocity) > snapVelocityThreshold) {
          const direction = velocity > 0 ? -1 : 1;
          const currentIndex = currentSnapIndex.value;
          const nextIndex = currentIndex + direction;

          if (nextIndex >= 0 && nextIndex < parsedSnapPoints.length) {
            return nextIndex;
          }
        }

        let closestIndex = 0;
        let minDistance = Math.abs(height - parsedSnapPoints[0]);

        for (let i = 1; i < parsedSnapPoints.length; i++) {
          const distance = Math.abs(height - parsedSnapPoints[i]);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        }

        return closestIndex;
      },
      [parsedSnapPoints, snapVelocityThreshold],
    );

    const snapToPoint = useCallback(
      (index: number, animated: boolean = true) => {
        "worklet";

        if (index < 0 || index >= parsedSnapPoints.length) {
          return;
        }

        const targetY = SCREEN_HEIGHT - parsedSnapPoints[index];

        if (animated) {
          translateY.value = withSpring(targetY, springConfig);
        } else {
          translateY.value = targetY;
        }

        currentSnapIndex.value = index;

        const shouldEnableScroll = index === maxSnapIndex;
        isScrollLocked.value = !shouldEnableScroll;
        scheduleOnRN<[boolean], void>(updateScrollEnabled, shouldEnableScroll);

        if (onSnapPointChange) {
          scheduleOnRN<[number], void>(handleSnapPointChangeJS, index);
        }
      },
      [
        parsedSnapPoints,
        springConfig,
        translateY,
        currentSnapIndex,
        maxSnapIndex,
        isScrollLocked,
        handleSnapPointChangeJS,
        updateScrollEnabled,
      ],
    );

    const closeSheet = useCallback(() => {
      "worklet";
      isScrollLocked.value = true;
      scheduleOnRN<[boolean], void>(updateScrollEnabled, false);

      translateY.value = withTiming<number>(
        SCREEN_HEIGHT,
        DEFAULT_TIMING_CONFIG,
        (finished) => {
          if (finished) {
            currentSnapIndex.value = -1;
            scrollTo<Animated.ScrollView>(scrollViewRef, 0, 0, false);
            scrollY.value = 0;
            if (onClose) {
              scheduleOnRN<[], void>(handleCloseJS);
            }
          }
        },
      );
    }, [
      translateY,
      handleCloseJS,
      scrollViewRef,
      scrollY,
      isScrollLocked,
      updateScrollEnabled,
    ]);

    const onScroll = useAnimatedScrollHandler({
      onScroll: (event) => {
        "worklet";
        scrollY.value = event.contentOffset.y;
      },
    });

    const handlePanGesture = useMemo<PanGesture>(
      () =>
        Gesture.Pan()
          .onBegin(() => {
            "worklet";
            context.value = translateY.value;
            isDraggingSheet.value = true;
          })
          .onUpdate((event) => {
            "worklet";
            const newY = context.value + event.translationY;
            const minY = SCREEN_HEIGHT - maxSnapPoint;
            const maxY = SCREEN_HEIGHT;

            if (enableOverDrag) {
              if (newY < minY) {
                const overDrag = minY - newY;
                translateY.value = minY - Math.log(overDrag + 1) * 10;
              } else if (newY > maxY) {
                const overDrag = newY - maxY;
                translateY.value = maxY + Math.log(overDrag + 1) * 10;
              } else {
                translateY.value = newY;
              }
            } else {
              translateY.value = Math.max(minY, Math.min(maxY, newY));
            }
          })
          .onEnd((event) => {
            "worklet";
            isDraggingSheet.value = false;
            const currentY = translateY.value;
            const velocity = event.velocityY;

            if (
              dismissOnSwipeDown &&
              currentY > SCREEN_HEIGHT - minSnapPoint &&
              velocity > 500
            ) {
              closeSheet();
              return;
            }

            const closestIndex = findClosestSnapPoint(currentY, velocity);
            snapToPoint(closestIndex, true);
          }),
      [
        translateY,
        context,
        isDraggingSheet,
        enableOverDrag,
        maxSnapPoint,
        minSnapPoint,
        dismissOnSwipeDown,
        closeSheet,
        findClosestSnapPoint,
        snapToPoint,
      ],
    );
    const contentPanGesture = useMemo(
      () =>
        Gesture.Pan()
          .activeOffsetY([-10, 10])
          .onStart(() => {
            "worklet";
            context.value = translateY.value;
            gestureStartScrollY.value = scrollY.value;
            isDraggingSheet.value = false;
          })
          .onUpdate((event) => {
            "worklet";
            const isFullyExpanded = currentSnapIndex.value === maxSnapIndex;

            if (!isFullyExpanded) {
              isDraggingSheet.value = true;
              const newY = context.value + event.translationY;
              const minY = SCREEN_HEIGHT - maxSnapPoint;
              const maxY = SCREEN_HEIGHT;

              if (newY < minY) {
                translateY.value = enableOverDrag
                  ? minY - Math.log(minY - newY + 1) * 10
                  : minY;
              } else if (newY > maxY) {
                translateY.value = enableOverDrag
                  ? maxY + Math.log(newY - maxY + 1) * 10
                  : maxY;
              } else {
                translateY.value = newY;
              }
              return;
            }

            const isAtTop = scrollY.value <= SCROLL_TOP_THRESHOLD;
            const isDraggingDown = event.translationY > 0;
            const wasAtTopAtStart =
              gestureStartScrollY.value <= SCROLL_TOP_THRESHOLD;

            const shouldDragSheet =
              isDraggingSheet.value ||
              (isAtTop && isDraggingDown && wasAtTopAtStart);

            if (!shouldDragSheet) {
              return;
            }

            isDraggingSheet.value = true;

            const effectiveTranslation = event.translationY;
            const newY = context.value + effectiveTranslation;
            const minY = SCREEN_HEIGHT - maxSnapPoint;
            const maxY = SCREEN_HEIGHT;

            if (newY < minY) {
              translateY.value = enableOverDrag
                ? minY - Math.log(minY - newY + 1) * 10
                : minY;
            } else if (newY > maxY) {
              translateY.value = enableOverDrag
                ? maxY + Math.log(newY - maxY + 1) * 10
                : maxY;
            } else {
              translateY.value = newY;
            }
          })
          .onEnd((event) => {
            "worklet";

            if (isDraggingSheet.value) {
              const currentY = translateY.value;
              const velocity = event.velocityY;

              if (
                dismissOnSwipeDown &&
                currentY > SCREEN_HEIGHT - minSnapPoint &&
                velocity > 500
              ) {
                closeSheet();
              } else {
                const closestIndex = findClosestSnapPoint(currentY, velocity);
                snapToPoint(closestIndex, true);
              }
            }

            isDraggingSheet.value = false;
          })
          .onFinalize(() => {
            "worklet";
            isDraggingSheet.value = false;
          }),
      [
        translateY,
        context,
        scrollY,
        gestureStartScrollY,
        isDraggingSheet,
        currentSnapIndex,
        maxSnapIndex,
        enableOverDrag,
        maxSnapPoint,
        minSnapPoint,
        dismissOnSwipeDown,
        closeSheet,
        findClosestSnapPoint,
        snapToPoint,
      ],
    );

    const scrollViewGesture = useMemo(() => Gesture.Native(), []);

    const simultaneousGesture = useMemo(
      () => Gesture.Simultaneous(scrollViewGesture, contentPanGesture),
      [scrollViewGesture, contentPanGesture],
    );

    useImperativeHandle(
      ref,
      () => ({
        snapToIndex: (index: number) => {
          snapToPoint(index, true);
        },
        snapToPosition: (position: number) => {
          "worklet";
          const targetY = SCREEN_HEIGHT - position;
          translateY.value = withSpring(targetY, springConfig);
        },
        expand: () => {
          snapToPoint(maxSnapIndex, true);
        },
        collapse: () => {
          snapToPoint(0, true);
        },
        close: () => {
          closeSheet();
        },
        getCurrentIndex: () => {
          return currentSnapIndex.value;
        },
      }),
      [
        snapToPoint,
        closeSheet,
        maxSnapIndex,
        springConfig,
        translateY,
        currentSnapIndex,
      ],
    );

    const sheetAnimatedStyle = useAnimatedStyle<Pick<ViewStyle, "transform">>(
      () => ({
        transform: [{ translateY: translateY.value }],
      }),
    );

    const contentAnimatedStyle = useAnimatedStyle<Pick<ViewStyle, "height">>(
      () => {
        const visibleHeight = SCREEN_HEIGHT - translateY.value;
        const contentHeight = Math.max(
          0,
          visibleHeight - (showHandle ? HANDLE_HEIGHT : 0),
        );

        return {
          height: contentHeight,
        };
      },
    );

    const backdropAnimatedStyle = useAnimatedStyle<
      Pick<ViewStyle, "opacity" | "pointerEvents">
    >(() => {
      const opacity = interpolate(
        translateY.value,
        [SCREEN_HEIGHT - maxSnapPoint, SCREEN_HEIGHT],
        [backdropOpacity, 0],
        Extrapolation.CLAMP,
      );

      return {
        opacity,
        pointerEvents: opacity > 0 ? ("auto" as const) : ("none" as const),
      };
    });

    const handleBackdropPress = useCallback(() => {
      if (dismissOnBackdropPress) {
        closeSheet();
      }
    }, [dismissOnBackdropPress, closeSheet]);

    const sheetBaseStyle = useMemo<
      Pick<
        ViewStyle,
        "backgroundColor" | "borderTopLeftRadius" | "borderTopRightRadius"
      >
    >(
      () => ({
        backgroundColor,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      }),
      [backgroundColor, borderRadius],
    );

    const scrollProps: Partial<ScrollViewProps> = useMemo(
      () => ({
        scrollEnabled: enableScroll,
        onScroll: onScroll as ScrollViewProps["onScroll"],
        scrollEventThrottle: 16,
        bounces: false,
        overScrollMode: "never" as const,
        showsVerticalScrollIndicator: true,
        nestedScrollEnabled: true,
      }),
      [enableScroll, onScroll],
    );

    const renderContent = useCallback(() => {
      const childArray = Children.toArray(children);

      if (childArray.length === 1 && isScrollableList(childArray[0])) {
        const listElement = childArray[0] as ReactElement;

        const enhancedList = cloneElement(listElement, {
          ...scrollProps,
          onScroll: (event: any) => {
            (scrollProps.onScroll as any)?.(event);
            (listElement.props as any).onScroll?.(event);
          },
        });

        return (
          <GestureDetector gesture={simultaneousGesture}>
            <Animated.View style={styles.scrollableWrapper}>
              {enhancedList}
            </Animated.View>
          </GestureDetector>
        );
      }

      const hasScrollableChild = childArray.some(isScrollableList);

      if (hasScrollableChild) {
        const enhancedChildren = childArray.map((child, index) => {
          if (isScrollableList(child)) {
            const listElement = child as ReactElement;
            return cloneElement(listElement, {
              key: (listElement.key as string) || index,
              ...scrollProps,
              onScroll: (event: any) => {
                (scrollProps.onScroll as any)?.(event);
                (listElement.props as any).onScroll?.(event);
              },
            });
          }
          return child;
        });

        return (
          <GestureDetector gesture={simultaneousGesture}>
            <Animated.View style={styles.scrollableWrapper}>
              {enhancedChildren}
            </Animated.View>
          </GestureDetector>
        );
      }
      return (
        <GestureDetector gesture={simultaneousGesture}>
          <Animated.ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={contentContainerStyle}
            scrollEnabled={enableScroll}
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={true}
            bounces={false}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            overScrollMode="never"
          >
            {children}
          </Animated.ScrollView>
        </GestureDetector>
      );
    }, [
      children,
      scrollProps,
      simultaneousGesture,
      scrollViewRef,
      contentContainerStyle,
      enableScroll,
      onScroll,
    ]);

    return (
      <View style={styles.container} pointerEvents="box-none">
        {enableBackdrop && (
          <Animated.View
            style={[styles.backdrop, backdropAnimatedStyle, backdropStyle]}
          >
            <Pressable
              style={StyleSheet.absoluteFillObject}
              onPress={handleBackdropPress}
            />
          </Animated.View>
        )}

        <Animated.View
          style={[styles.sheet, sheetBaseStyle, sheetAnimatedStyle, sheetStyle]}
        >
          {showHandle && (
            <GestureDetector gesture={handlePanGesture}>
              <View style={styles.handleContainer}>
                <View style={[styles.handle, handleStyle]} />
              </View>
            </GestureDetector>
          )}

          <Animated.View style={[styles.contentWrapper, contentAnimatedStyle]}>
            {renderContent()}
          </Animated.View>
        </Animated.View>
      </View>
    );
  },
);

export const BottomSheet =
  memo<
    React.ForwardRefExoticComponent<
      BottomSheetProps & React.RefAttributes<BottomSheetMethods>
    >
  >(BottomSheetComponent);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: SCREEN_HEIGHT,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  contentWrapper: {
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  scrollableWrapper: {
    flex: 1,
  },
});

export default BottomSheet;
