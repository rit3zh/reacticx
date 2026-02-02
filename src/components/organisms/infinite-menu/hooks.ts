// @ts-check
import { useImage, type SkImage } from "@shopify/react-native-skia";
import { useMemo } from "react";

const useLoadImages = <T extends string[]>(urls: T): (SkImage | null)[] => {
  const i0 = useImage(urls[0] || undefined);
  const i1 = useImage(urls[1] || undefined);
  const i2 = useImage(urls[2] || undefined);
  const i3 = useImage(urls[3] || undefined);
  const i4 = useImage(urls[4] || undefined);
  const i5 = useImage(urls[5] || undefined);
  const i6 = useImage(urls[6] || undefined);
  const i7 = useImage(urls[7] || undefined);
  const i8 = useImage(urls[8] || undefined);
  const i9 = useImage(urls[9] || undefined);

  return useMemo<(SkImage | null)[]>(() => {
    return [i0, i1, i2, i3, i4, i5, i6, i7, i8, i9].slice(0, urls.length);
  }, [i0, i1, i2, i3, i4, i5, i6, i7, i8, i9, urls.length]);
};

export { useLoadImages };
