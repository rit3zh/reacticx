import {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import type {
  AnimationConfig,
  AnimationDirection,
  AnimationPreset,
  DynamicTextItem,
} from "./types";

const getAnimationPreset = <
  P extends AnimationPreset,
  D extends AnimationDirection,
  T extends number,
>(
  preset: P,
  direction: D,
  duration: T,
): AnimationConfig => {
  const presets: Record<
    AnimationPreset,
    Record<AnimationDirection, AnimationConfig>
  > = {
    fade: {
      up: {
        entering: FadeInDown.duration(duration).springify().damping(25),
        exiting: FadeOutUp.duration(duration),
      },
      down: {
        entering: FadeInUp.duration(duration).springify().damping(25),
        exiting: FadeOutDown.duration(duration),
      },
    },
    zoom: {
      up: {
        entering: ZoomIn.duration(duration).springify().damping(20),
        exiting: ZoomOut.duration(duration),
      },
      down: {
        entering: ZoomIn.duration(duration).springify().damping(20),
        exiting: ZoomOut.duration(duration),
      },
    },
    custom: {
      up: {
        entering: FadeInDown.duration(duration),
        exiting: FadeOutUp.duration(duration),
      },
      down: {
        entering: FadeInUp.duration(duration),
        exiting: FadeOutDown.duration(duration),
      },
    },
  };

  return presets[preset][direction];
};

const normalizeItems = <
  T extends readonly DynamicTextItem[] | readonly string[],
>(
  items: T,
): DynamicTextItem[] => {
  return items.map((item: string | DynamicTextItem, index: number) => {
    if (typeof item === "string") {
      return { text: item, id: `item-${index}` };
    }
    return { ...item, id: item.id ?? `item-${index}` };
  });
};

export { getAnimationPreset, normalizeItems };
