/// <reference types="@webgpu/types" />

import type { RefObject } from "react";
import { PixelRatio, type View } from "react-native";
import { Skia, type SkImage } from "react-native-skia";
import { GPUTextureUsage, importDevice } from "react-native-webgpu";

export async function captureViewImage(
  ref: RefObject<View | null>,
): Promise<SkImage | null> {
  const view = ref.current;
  if (!view || !Skia.gpu.isAvailable || !Skia.gpu.foreground) return null;

  const { width, height } = await new Promise<{ width: number; height: number }>(
    (resolve) => view.measure((_x, _y, width, height) => resolve({ width, height })),
  );
  if (ref.current !== view || !(width > 0 && height > 0) || !Skia.gpu.foreground) {
    return null;
  }

  const device = importDevice(Skia.getNativeDevice());
  const size = {
    width: Math.max(1, PixelRatio.getPixelSizeForLayoutSize(width)),
    height: Math.max(1, PixelRatio.getPixelSizeForLayoutSize(height)),
  };
  const texture = device.createTexture({
    size,
    format: "rgba8unorm",
    usage:
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT |
      GPUTextureUsage.TEXTURE_BINDING,
  });

  try {
    await device.queue.drawElementImageToTexture(
      { source: view },
      { texture, size, premultipliedAlpha: true },
    );
    if (ref.current !== view) {
      texture.destroy();
      return null;
    }
    // Skia retains the texture for as long as the snapshot is in use.
    return Skia.Image.MakeFromGPUTexture(texture);
  } catch (error) {
    texture.destroy();
    throw error;
  }
}
