import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
  memo,
} from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { BottomSheetMethods } from "../bottom-sheet/types";
import { SCALE_FACTOR, STACK_SPRING_CONFIG, TRANSLATE_Y_FACTOR } from "./conf";
import type {
  IBottomSheetOptions,
  IBottomSheetStackContextValue,
  IBottomSheetStackProvider,
  IStackedSheet,
  IStackedSheetWrapper,
} from "./types";

const BottomSheetStackContext = createContext<
  IBottomSheetStackContextValue | undefined
>(undefined);

export const useBottomSheetStack = (): IBottomSheetStackContextValue => {
  const context = useContext(BottomSheetStackContext);
  if (!context) {
    throw new Error(
      "useBottomSheetStack must be used within BottomSheetStackProvider",
    );
  }
  return context;
};

const StackedSheetWrapper = memo<IStackedSheetWrapper>(
  ({
    sheet,
    stackIndex,
    totalSheets,
    onClose,
  }: IStackedSheetWrapper): React.ReactElement & React.JSX.Element => {
    const isTopSheet = stackIndex === totalSheets - 1;
    const depth = totalSheets - 1 - stackIndex;

    const scale = useSharedValue<number>(1);
    const translateY = useSharedValue<number>(0);

    useEffect(() => {
      if (isTopSheet) {
        scale.value = withSpring<number>(1, STACK_SPRING_CONFIG);
        translateY.value = withSpring<number>(0, STACK_SPRING_CONFIG);
      } else {
        scale.value = withSpring<number>(
          Math.pow(SCALE_FACTOR, depth),
          STACK_SPRING_CONFIG,
        );
        translateY.value = withSpring<number>(
          depth * TRANSLATE_Y_FACTOR,
          STACK_SPRING_CONFIG,
        );
      }
    }, [isTopSheet, depth]);

    const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
      transform: [{ scale: scale.value }, { translateY: -translateY.value }],
    }));

    const element = React.cloneElement(sheet.component, {
      ref: sheet.ref,
      onClose: () => {
        sheet.onDismiss?.();
        onClose();
      },
      dismissOnBackdropPress: true,
    });

    return (
      <Animated.View
        style={[styles.stackLayer, animatedStyle]}
        pointerEvents={isTopSheet ? "auto" : "none"}
      >
        {element}
      </Animated.View>
    );
  },
);

StackedSheetWrapper.displayName = "StackedSheetWrapper";

export const BottomSheetStackProvider: React.FC<IBottomSheetStackProvider> =
  memo<IBottomSheetStackProvider>(
    ({
      children,
    }: IBottomSheetStackProvider): React.ReactElement & React.JSX.Element => {
      const [sheets, setSheets] = useState<IStackedSheet[]>([]);
      const idCounter = useRef(0);

      const pushSheet = useCallback<IBottomSheetStackContextValue["pushSheet"]>(
        (sheet) => {
          const id = `sheet-${idCounter.current++}`;
          const ref = React.createRef<BottomSheetMethods>();

          setSheets((prev) => [
            ...prev,
            {
              id,
              ref,
              component: sheet.component,
              onDismiss: sheet.onDismiss,
            },
          ]);

          requestAnimationFrame(() => {
            ref.current?.snapToIndex(0);
          });

          return id;
        },
        [],
      );

      const popSheet = useCallback<IBottomSheetStackContextValue["popSheet"]>(
        (id) => {
          setSheets((prev) => {
            if (!prev.length) return prev;

            if (id) {
              const target = prev.find((s) => s.id === id);
              target?.ref.current?.close();
              return prev.filter((s) => s.id !== id);
            }

            const top = prev[prev.length - 1];
            top.ref.current?.close();
            return prev.slice(0, -1);
          });
        },
        [],
      );

      const popToRoot = useCallback<
        IBottomSheetStackContextValue["popToRoot"]
      >(() => {
        setSheets((prev) => {
          prev.forEach((s) => s.ref.current?.close());
          return [];
        });
      }, []);

      const getStackDepth = useCallback(() => sheets.length, [sheets]);

      return (
        <BottomSheetStackContext.Provider
          value={{
            pushSheet,
            popSheet,
            popToRoot,
            getStackDepth,
          }}
        >
          {children}
          {sheets.map((sheet, index) => (
            <StackedSheetWrapper
              key={sheet.id}
              sheet={sheet}
              stackIndex={index}
              totalSheets={sheets.length}
              onClose={() => popSheet(sheet.id)}
            />
          ))}
        </BottomSheetStackContext.Provider>
      );
    },
  );

export const useBottomSheet = <
  T extends IBottomSheetOptions = IBottomSheetOptions,
>(
  options?: T,
) => {
  const { pushSheet, popSheet } = useBottomSheetStack();
  const activeId = useRef<string | null>(null);

  const present = useCallback(
    (component: React.ReactElement) => {
      const id = pushSheet({
        component,
        onDismiss: options?.onDismiss,
      });
      activeId.current = id;
      return id;
    },
    [pushSheet, options?.onDismiss],
  );

  const dismiss = useCallback(() => {
    if (activeId.current) {
      popSheet(activeId.current);
      activeId.current = null;
    }
  }, [popSheet]);

  return { present, dismiss };
};
const styles = StyleSheet.create({
  stackLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
});
