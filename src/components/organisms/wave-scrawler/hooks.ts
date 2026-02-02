import { useEffect, useState, useMemo, useCallback } from "react";
import { Image } from "react-native";
import { SkImage, Skia } from "@shopify/react-native-skia";
import type { ImageSource } from "./types";

const useLoadedImages = (sources: ImageSource[]): (SkImage | null)[] => {
  const sourceUris = useMemo<string[]>(
    () =>
      sources.map((src) =>
        typeof src === "number" ? Image.resolveAssetSource(src).uri : src.uri,
      ),
    [sources],
  );

  const sourcesKey = useMemo<string>(() => sourceUris.join("|"), [sourceUris]);

  const initialState = useMemo<(SkImage | null)[]>(
    () => sources.map(() => null),
    [sources.length],
  );

  const [images, setImages] = useState<(SkImage | null)[]>(initialState);

  const loadSingleImage = useCallback(
    async (uri: string): Promise<SkImage | null> => {
      try {
        const data = await Skia.Data.fromURI(uri);
        return Skia.Image.MakeImageFromEncoded(data);
      } catch (error) {
        console.warn("Failed to load image:", uri, error);
        return null;
      }
    },
    [],
  );

  const loadAllImages = useCallback(async (): Promise<(SkImage | null)[]> => {
    return Promise.all(sourceUris.map(loadSingleImage));
  }, [sourceUris, loadSingleImage]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const loadedImages = await loadAllImages();

      if (isMounted) {
        setImages(loadedImages);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [sourcesKey, loadAllImages]);

  return useMemo<(SkImage | null)[]>(() => images, [images]);
};

export { useLoadedImages };
