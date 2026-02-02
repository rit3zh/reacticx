import { useToast } from "./context/ToastContext";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "./Toast";

export const ToastViewport: React.FC = () => {
  const { toasts } = useToast();
  const insets = useSafeAreaInsets();

  const topToasts = toasts.filter((toast) => toast.options.position === "top");
  const bottomToasts = toasts.filter(
    (toast) => toast.options.position === "bottom",
  );

  return (
    <>
      <View
        style={[
          styles.viewport,
          styles.topViewport,
          {
            paddingTop: insets.top + 10,
            height: 200,
          },
        ]}
      >
        {topToasts.map((toast, arrayIndex) => {
          const displayIndex = topToasts.length - 1 - arrayIndex;
          return <Toast key={toast.id} toast={toast} index={displayIndex} />;
        })}
      </View>
      <View
        style={[
          styles.viewport,
          styles.bottomViewport,
          {
            marginBottom: insets.bottom,
            height: 200,
          },
        ]}
      >
        {bottomToasts.map((toast, arrayIndex) => {
          const displayIndex = bottomToasts.length - 1 - arrayIndex;
          return <Toast key={toast.id} toast={toast} index={displayIndex} />;
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  viewport: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 16,
    pointerEvents: "box-none",
  },
  topViewport: {
    top: 0,
    justifyContent: "flex-start",
  },
  bottomViewport: {
    bottom: 0,
    justifyContent: "flex-end",
  },
});
