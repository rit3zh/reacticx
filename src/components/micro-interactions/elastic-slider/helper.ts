const decay = <T extends number, SF extends number>(
  value: T,
  scaleFactor?: SF,
): number => {
  "worklet";
  if (value <= 0) return 0;
  return (scaleFactor ?? 80) * Math.log(1 + value / (scaleFactor ?? 80));
};
export { decay };
