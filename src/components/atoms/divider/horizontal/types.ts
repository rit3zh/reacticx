import * as React from "react";
interface IHorizontalDivider extends React.PropsWithChildren {
  readonly height?: number;
  readonly width?: number;
  readonly color?: string;
}

export type { IHorizontalDivider };
