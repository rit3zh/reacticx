import { createContext, memo, useCallback, useRef, useState } from "react";
import {
  ThemeMode,
  type ThemeColors,
  type ThemeConfig,
  type ThemeContextType,
  type ThemeProviderProps,
  type ThemeSwitcherRef,
  type IThemeOptions,
  type IThemeAnimation,
} from "./types";
import {
  darkColors,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_TYPE,
  DEFAULT_EASING,
  lightColors,
} from "./conf";
import { ThemeSwitcher } from "./theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> =
  memo<ThemeProviderProps>(
    ({
      children,
      defaultTheme = ThemeMode.Dark,
      onThemeChange,
      onAnimationStart,
      onAnimationComplete,
      customLightColors,
      customDarkColors,
    }: ThemeProviderProps): React.ReactNode & React.JSX.Element => {
      const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
      const switcherRef = useRef<ThemeSwitcherRef>(null);
      const [currentAnimation, setCurrentAnimation] = useState<IThemeAnimation>(
        {
          type: DEFAULT_ANIMATION_TYPE,
          duration: DEFAULT_ANIMATION_DURATION,
          easing: DEFAULT_EASING,
        },
      );

      const mergedLightColors: ThemeColors = {
        ...lightColors,
        ...customLightColors,
      };

      const mergedDarkColors: ThemeColors = {
        ...darkColors,
        ...customDarkColors,
      };

      const colors: ThemeColors =
        theme === ThemeMode.Dark ? mergedDarkColors : mergedLightColors;

      const config: ThemeConfig = {
        mode: theme,
        colors,
        animationType: currentAnimation.type,
        animationDuration: currentAnimation.duration,
        easing: currentAnimation.easing,
      };

      const setTheme = useCallback(
        (newTheme: ThemeMode) => {
          setThemeState(newTheme);
          onThemeChange?.(newTheme);
        },
        [onThemeChange],
      );

      const toggleTheme = useCallback(
        async <T extends IThemeOptions>(options?: T): Promise<void> => {
          if (
            options?.animationType ||
            options?.animationDuration ||
            options?.easing
          ) {
            setCurrentAnimation({
              type: options.animationType ?? currentAnimation.type,
              duration: options.animationDuration ?? currentAnimation.duration,
              easing: options.easing ?? currentAnimation.easing,
            });
          }
          await new Promise((resolve) => setTimeout(resolve, 0));
          if (switcherRef.current) {
            await switcherRef.current.animate(options?.touchX, options?.touchY);
          }
        },
        [currentAnimation],
      );

      const handleThemeChange = useCallback(
        <T extends ThemeMode>(newTheme: T) => {
          setThemeState(newTheme);
          onThemeChange?.(newTheme);
        },
        [onThemeChange],
      );

      const value: ThemeContextType = {
        theme,
        colors,
        config,
        toggleTheme,
        setTheme,
        isDark: theme === ThemeMode.Dark,
        isLight: theme === ThemeMode.Light,
      };

      return (
        <ThemeContext.Provider value={value}>
          <ThemeSwitcher
            ref={switcherRef}
            theme={theme}
            onThemeChange={handleThemeChange}
            animationType={currentAnimation.type}
            animationDuration={currentAnimation.duration}
            easing={currentAnimation.easing}
            onAnimationStart={onAnimationStart}
            onAnimationComplete={onAnimationComplete}
          >
            {children}
          </ThemeSwitcher>
        </ThemeContext.Provider>
      );
    },
  );

export { ThemeContext, ThemeMode };
