import type { RefObject } from "react";
import type { View } from "react-native";
import type { SkImage } from "react-native-skia";
import { captureViewImage } from "@/helpers/capture-view-image";
import type { ShockwaveValue } from "./types";

async function snapshotPair(
  fromRef: RefObject<View | null>,
  toRef: RefObject<View | null>,
  prev: ShockwaveValue,
  next: ShockwaveValue,
): Promise<{ from: SkImage; to: SkImage } | null> {
  const [fromImg, toImg] = await Promise.all([
    captureViewImage(fromRef),
    captureViewImage(toRef),
  ]);
  if (!fromImg || !toImg) return null;
  const fromSnapshot = prev === "from" ? fromImg : toImg;
  const toSnapshot = next === "from" ? fromImg : toImg;
  return { from: fromSnapshot, to: toSnapshot };
}

export { snapshotPair };
