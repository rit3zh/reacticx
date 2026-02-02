import React, { memo } from "react";
import Animated, { LinearTransition } from "react-native-reanimated";
import type { IRow } from "./Row.types";

export const Row: React.FC<IRow> & React.FunctionComponent<IRow> = memo<IRow>(
  ({
    children,
    spacing = 5,
    style,
  }: IRow): React.JSX.Element & React.ReactNode & React.ReactElement => {
    return (
      <Animated.View
        className="flex-row"
        style={[{ gap: spacing }, style]}
        layout={LinearTransition}
      >
        {children}
      </Animated.View>
    );
  },
);
