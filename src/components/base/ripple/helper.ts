import { isValidElement } from "react";
import { StyleSheet } from "react-native";

const getBorderRadiusFromChildren = <T extends React.ReactNode>(
  children: T,
): any => {
  if (!isValidElement(children)) return {};

  const child = children as React.ReactElement<{
    style?: any;
    children?: React.ReactNode;
  }>;
  const style = child.props?.style;

  if (style) {
    let flatStyle: any = {};

    if (Array.isArray(style)) {
      for (const s of style) {
        const flattened = StyleSheet.flatten(s);
        if (flattened) {
          flatStyle = { ...flatStyle, ...flattened };
        }
      }
    } else {
      flatStyle = StyleSheet.flatten(style) || {};
    }

    const radiusProps = {
      borderRadius: flatStyle.borderRadius,
      borderTopLeftRadius: flatStyle.borderTopLeftRadius,
      borderTopRightRadius: flatStyle.borderTopRightRadius,
      borderBottomLeftRadius: flatStyle.borderBottomLeftRadius,
      borderBottomRightRadius: flatStyle.borderBottomRightRadius,
    };

    const filtered = Object.fromEntries(
      Object.entries(radiusProps).filter(([_, v]) => v !== undefined),
    );

    if (Object.keys(filtered).length > 0) {
      return filtered;
    }
  }

  if (child.props?.children) {
    const childChildren = child.props.children;

    if (Array.isArray(childChildren)) {
      for (const nestedChild of childChildren) {
        const result = getBorderRadiusFromChildren(nestedChild);
        if (Object.keys(result).length > 0) {
          return result;
        }
      }
    } else {
      return getBorderRadiusFromChildren(childChildren);
    }
  }
  return {};
};

export { getBorderRadiusFromChildren };
