import { View, StyleSheet } from "react-native";
import React, { memo } from "react";
import type { ICenter } from "./Center.types";

export const Center: React.FC<ICenter> & React.FunctionComponent<ICenter> =
  memo<ICenter>(
    ({
      children,
      ...props
    }: ICenter): React.ReactNode & React.JSX.Element & React.ReactElement => {
      return (
        <View
          {...props}
          className={props.className}
          style={[styles.container, props.style]}
        >
          {children}
        </View>
      );
    },
  );

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
