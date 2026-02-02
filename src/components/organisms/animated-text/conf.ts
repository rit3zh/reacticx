import type { AnimationConfig, CharacterAnimationParams } from "./types";
const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  characterDelay: 40,
  characterEnterDuration: 350,
  characterExitDuration: 250,
  layoutTransitionDuration: 200,
  spring: {
    damping: 14,
    stiffness: 120,
    mass: 0.6,
  },
  maxBlurIntensity: 12,
};

const DEFAULT_ENTER_FROM: CharacterAnimationParams = {
  opacity: 0,
  translateY: 25,
  scale: 0.5,
  rotate: 0,
};

const DEFAULT_ENTER_TO: CharacterAnimationParams = {
  opacity: 1,
  translateY: 0,
  scale: 1,
  rotate: 0,
};

const DEFAULT_EXIT_FROM: CharacterAnimationParams = {
  opacity: 1,
  translateY: 0,
  scale: 1,
  rotate: 0,
};

const DEFAULT_EXIT_TO: CharacterAnimationParams = {
  opacity: 0,
  translateY: -20,
  scale: 0.8,
  rotate: -15,
};

export {
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_ENTER_FROM,
  DEFAULT_ENTER_TO,
  DEFAULT_EXIT_FROM,
  DEFAULT_EXIT_TO,
};
