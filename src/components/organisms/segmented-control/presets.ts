import type { ViewStyle } from "react-native";

const SHADOW: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
} as const;
const SegmentedControlPresets = {
  ios: {
    segmentedControlBackgroundColor: "#E5E5EA",
    activeSegmentBackgroundColor: "#FFFFFF",
    dividerColor: "#00000020",
  },
  light: {
    segmentedControlBackgroundColor: "#F4F4F5",
    activeSegmentBackgroundColor: "#FFFFFF",
    dividerColor: "#E4E4E7",
  },
  dark: {
    segmentedControlBackgroundColor: "#27272A",
    activeSegmentBackgroundColor: "#3F3F46",
    dividerColor: "#52525B",
  },
  ocean: {
    segmentedControlBackgroundColor: "#0C4A6E",
    activeSegmentBackgroundColor: "#0369A1",
    dividerColor: "#0284C7",
  },
  sunset: {
    segmentedControlBackgroundColor: "#7C2D12",
    activeSegmentBackgroundColor: "#9A3412",
    dividerColor: "#C2410C",
  },
  forest: {
    segmentedControlBackgroundColor: "#14532D",
    activeSegmentBackgroundColor: "#166534",
    dividerColor: "#15803D",
  },
  purple: {
    segmentedControlBackgroundColor: "#581C87",
    activeSegmentBackgroundColor: "#6B21A8",
    dividerColor: "#7E22CE",
  },
  rose: {
    segmentedControlBackgroundColor: "#881337",
    activeSegmentBackgroundColor: "#9F1239",
    dividerColor: "#BE123C",
  },
} as const;

export { SegmentedControlPresets, SHADOW };
