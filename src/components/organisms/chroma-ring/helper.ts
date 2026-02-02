const hexToRgb = <T extends string>(hex: T): [number, number, number] => {
  const cleaned = hex.replace("#", "");
  const fullHex =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;

  const r = parseInt(fullHex.substring(0, 2), 16) / 255;
  const g = parseInt(fullHex.substring(2, 4), 16) / 255;
  const b = parseInt(fullHex.substring(4, 6), 16) / 255;

  return [r, g, b];
};

export { hexToRgb };
