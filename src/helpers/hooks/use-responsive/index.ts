import { useMemo, useCallback } from "react";
import { useWindowDimensions } from "react-native";
import * as Device from "expo-device";
import { IResponsiveInfo, TBreakpoint } from "./types";

const useResponsive = (): IResponsiveInfo => {
  const { width, height, scale, fontScale } = useWindowDimensions();
  const deviceType = Device.deviceType ?? Device.DeviceType.UNKNOWN;

  const isPhone = deviceType === Device.DeviceType.PHONE;
  const isTablet = deviceType === Device.DeviceType.TABLET;
  const isDesktop = deviceType === Device.DeviceType.DESKTOP;

  const isLandscape = width > height;
  const isPortrait = !isLandscape;

  const breakpoint: TBreakpoint =
    width < 480 ? "compact" : width < 830 ? "medium" : "expanded";

  const isCompact = breakpoint === "compact";
  const isMedium = breakpoint === "medium";
  const isExpanded = breakpoint === "expanded";

  const rf = useCallback(
    (size: number): number => {
      if (isExpanded) return size * 1.25;
      if (isMedium) return size * 1.1;
      return size;
    },
    [isExpanded, isMedium],
  );

  const rv = useCallback(
    <T>(values: { compact: T; medium?: T; expanded?: T }): T => {
      if (isExpanded && values.expanded !== undefined) return values.expanded;

      if (isMedium && values.medium !== undefined) return values.medium;

      return values.compact;
    },
    [isExpanded, isMedium],
  );

  return useMemo(
    () => ({
      width,
      height,
      scale,
      fontScale,

      deviceType,
      isPhone,
      isTablet,
      isDesktop,

      isLandscape,
      isPortrait,

      breakpoint,
      isCompact,
      isMedium,
      isExpanded,

      rf,
      rv,
    }),
    [
      width,
      height,
      scale,
      fontScale,
      deviceType,
      isPhone,
      isTablet,
      isDesktop,
      isLandscape,
      isPortrait,
      breakpoint,
      isCompact,
      isMedium,
      isExpanded,
      rf,
      rv,
    ],
  );
};

export { useResponsive };
