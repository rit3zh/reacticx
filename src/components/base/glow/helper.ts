import { isValidElement } from "react";
import { StyleSheet, type ViewStyle } from "react-native";

const getBorderRadius = <T extends React.ReactNode>(
  children: T,
): number | undefined => {
  if (!isValidElement(children)) return undefined;

  const child = children as React.ReactElement<{ style?: ViewStyle }>;
  const style = child.props?.style;

  if (!style) return undefined;

  if (Array.isArray(style)) {
    for (const s of style) {
      const flattened = StyleSheet.flatten(s);
      if (flattened?.borderRadius !== undefined) {
        return flattened.borderRadius as number;
      }
    }
  } else {
    const flattened = StyleSheet.flatten(style);
    if (flattened?.borderRadius !== undefined) {
      return flattened.borderRadius as number;
    }
  }

  return undefined;
};

export { getBorderRadius };
