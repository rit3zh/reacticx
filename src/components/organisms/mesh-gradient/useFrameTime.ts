import {
  SharedValue,
  useFrameCallback,
  useSharedValue,
  type FrameInfo,
} from "react-native-reanimated";
import type { IFrameBack } from "./types";

const useFrameTime = <T extends IFrameBack>({
  fpsLock,
  animated,
  speed,
}: T): SharedValue<number> => {
  const time = useSharedValue<number>(0);
  const accumulated = useSharedValue<number>(0);

  useFrameCallback((frameInfo: FrameInfo) => {
    if (animated && frameInfo.timeSincePreviousFrame !== null) {
      accumulated.value += frameInfo.timeSincePreviousFrame;

      if (fpsLock < 0) {
        time.value += (frameInfo.timeSincePreviousFrame / 1000) * speed;
        return;
      }

      const frameInterval = 1000 / fpsLock;

      if (accumulated.value >= frameInterval) {
        time.value += (accumulated.value / 1000) * speed;
        accumulated.value = 0;
      }
    }
  }, animated);

  return time;
};

export { useFrameTime };
