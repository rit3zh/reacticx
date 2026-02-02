interface IMarquee {
  children: React.ReactNode;
  readonly speed?: number;
  readonly spacing?: number;
  readonly reverse?: boolean;
  readonly pauseOnPress?: boolean;
  readonly holdToSpeedUp?: boolean;
  readonly speedUpMultiplier?: number;
}

export type { IMarquee };
