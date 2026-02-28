import type { DeviceType } from "expo-device";

type TBreakpoint = "compact" | "medium" | "expanded";

interface IResponsiveInfo {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
  deviceType: DeviceType;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  breakpoint: TBreakpoint;
  isCompact: boolean;
  isMedium: boolean;
  isExpanded: boolean;
  rf: (size: number) => number;
  rv: <T>(values: { compact: T; medium?: T; expanded?: T }) => T;
}

export type { IResponsiveInfo, TBreakpoint };
