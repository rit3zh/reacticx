import { Easing } from "react-native-reanimated";
import type {
  AnimationConfig,
  CharacterAnimationParams,
  CountdownSize,
} from "./types";

const CHARACTER_DELAY: number = 300;
const CHARACTER_ENTER_DURATION: number = 400;
const CHARACTER_EXIT_DURATION: number = 300;
const BUTTON_TRANSITION_DURATION: number = 180;

const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  characterDelay: CHARACTER_DELAY,
  characterEnterDuration: CHARACTER_ENTER_DURATION,
  characterExitDuration: CHARACTER_EXIT_DURATION,
  buttonTransitionDuration: BUTTON_TRANSITION_DURATION,
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 0.5,
  },
  timing: {
    duration: 500,
    easing: Easing.bezier(0.45, 0.5, 0.45, 1),
  },
};

const ENTER_INITIAL: CharacterAnimationParams = {
  opacity: 0,
  translateY: 100,
  scale: 0.8,
};

const ENTER_FINAL: CharacterAnimationParams = {
  opacity: 1,
  translateY: 0,
  scale: 1,
};

const EXIT_INITIAL: CharacterAnimationParams = {
  opacity: 1,
  translateY: 0,
  scale: 1,
};

const EXIT_FINAL: CharacterAnimationParams = {
  opacity: 0,
  translateY: -30,
  scale: 0.9,
};

const SIZE_PRESETS: Record<
  CountdownSize,
  {
    numberSize: number;
    labelSize: number;
    gap: number;
    separatorMargin: number;
  }
> = {
  small: {
    numberSize: 24,
    labelSize: 8,
    gap: 8,
    separatorMargin: 4,
  },
  medium: {
    numberSize: 40,
    labelSize: 10,
    gap: 12,
    separatorMargin: 6,
  },
  large: {
    numberSize: 56,
    labelSize: 12,
    gap: 16,
    separatorMargin: 8,
  },
  xlarge: {
    numberSize: 72,
    labelSize: 14,
    gap: 20,
    separatorMargin: 8,
  },
};

export {
  DEFAULT_ANIMATION_CONFIG,
  ENTER_INITIAL,
  ENTER_FINAL,
  EXIT_INITIAL,
  EXIT_FINAL,
  SIZE_PRESETS,
};
