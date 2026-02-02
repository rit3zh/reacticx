import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import type { IHorizontalDivider } from "./types";
import { BORDER_RADIUS, HEIGHT, MARGIN, WIDTH } from "./const";

export const HorizontalDivider: React.FC<IHorizontalDivider> &
  React.FunctionComponent<IHorizontalDivider> = memo<IHorizontalDivider>(
  ({
    children,
    color,
    height,
    width,
  }: IHorizontalDivider):
    | (React.JSX.Element & React.ReactNode & React.ReactElement)
    | null => {
    const validChildren = React.Children.toArray(children);

    if (validChildren.length < 2) {
      console.warn('"HorizontalDivider" requires at least 2 children.');
      return <>{children}</>;
    }

    return (
      <View style={styles.container}>
        {validChildren.map<React.ReactNode>(
          (child, index): React.ReactNode => (
            <React.Fragment key={index}>
              {index > 0 && (
                <View
                  style={{
                    width: width ?? WIDTH,
                    height: height ?? HEIGHT,
                    borderRadius: BORDER_RADIUS,
                    backgroundColor: color ?? "#7d7d7d",
                    margin: MARGIN,
                  }}
                />
              )}
              {child}
            </React.Fragment>
          ),
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
