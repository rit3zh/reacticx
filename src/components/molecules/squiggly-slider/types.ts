interface ISquigglySlider {
  value: number;
  onValueChange: <T extends number>(value: T) => void;
  onSlidingComplete?: () => void;
  width: number;
  readonly height?: number;
  readonly strokeWidth?: number;
  readonly wavelength?: number;
  readonly amplitude?: number;
  readonly activeColor?: string;
  readonly inactiveColor?: string;
  readonly thumbColor?: string;
  readonly speed?: number;
}

export type { ISquigglySlider };
