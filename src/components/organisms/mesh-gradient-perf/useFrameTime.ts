import {
  SharedValue,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

type Props = {
  fpsLock: number;
  animated: boolean;
  speed: number;
};

export const useFrameTime = ({
  fpsLock,
  animated,
  speed,
}: Props): SharedValue<number> => {
  const time = useSharedValue(0);
  const accumulated = useSharedValue(0);

  useFrameCallback((frameInfo) => {
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
