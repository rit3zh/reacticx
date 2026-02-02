import { SegmentedControlPresets } from "./presets";

type SegmentedControlPreset = keyof typeof SegmentedControlPresets;

interface ISegmentedControl {
  children: React.ReactNode;
  onChange: (index: number) => void;
  currentIndex: number;
  readonly preset?: SegmentedControlPreset;
  readonly segmentedControlBackgroundColor?: string;
  readonly activeSegmentBackgroundColor?: string;
  readonly paddingVertical?: number;
  readonly dividerColor?: string;
  readonly borderRadius?: number;
  readonly disableScaleEffect?: boolean;
}

export { ISegmentedControl, SegmentedControlPreset };
