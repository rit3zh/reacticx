interface IMatchedGeometry {
  id: string;
  children: React.ReactNode;
  onPress?: () => void;
}

interface LayoutMeasurement {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export type { IMatchedGeometry, LayoutMeasurement };
