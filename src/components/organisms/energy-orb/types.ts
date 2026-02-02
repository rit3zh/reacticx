interface IEnergyOrb {
  readonly width?: number;
  readonly height?: number;
  readonly speed?: number;
  readonly intensity?: number;
  readonly colors?: string[];
  readonly glowRadius?: number;
}

type RGB = [number, number, number];

export type { IEnergyOrb, RGB };
