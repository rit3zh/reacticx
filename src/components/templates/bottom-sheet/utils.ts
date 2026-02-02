import { Platform, SectionList, VirtualizedList } from "react-native";
import { SCREEN_HEIGHT } from "./conf";
import type { SnapPoint } from "./types";
import {
  impactAsync,
  AndroidHaptics,
  performAndroidHapticsAsync,
  ImpactFeedbackStyle,
} from "expo-haptics";
import { isValidElement, ReactElement } from "react";
import { FlatList } from "react-native-gesture-handler";

const parseSnapPoint = <S extends SnapPoint>(snapPoint: S): number => {
  if (typeof snapPoint === "number") {
    return snapPoint;
  }
  const percentage = parseFloat(snapPoint);
  return (SCREEN_HEIGHT * percentage) / 100;
};

const triggerHaptic = () => {
  if (Platform.OS === "ios") {
    try {
      impactAsync(ImpactFeedbackStyle.Medium).catch(() => {});
    } catch {}
  } else {
    try {
      performAndroidHapticsAsync(AndroidHaptics.Toggle_On).catch(() => {});
    } catch {}
  }
};

const isScrollableList = (
  element: React.ReactNode,
): element is ReactElement => {
  if (!isValidElement(element)) return false;

  const type = element.type;

  if (type === FlatList || type === SectionList || type === VirtualizedList) {
    return true;
  }

  const typeName = (type as any)?.displayName || (type as any)?.name || "";

  return (
    typeName.includes("FlatList") ||
    typeName.includes("SectionList") ||
    typeName.includes("VirtualizedList") ||
    typeName.includes("FlashList")
  );
};

export { parseSnapPoint, triggerHaptic, isScrollableList };
