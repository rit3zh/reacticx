# Building Performant Skia Shader Components in React Native

Guide for `@shopify/react-native-skia` + `react-native-reanimated` animated shader components.

---

## 1. Resolution Scaling

**Problem:** A full-screen Canvas on a modern phone renders 390×844 = ~330k fragments per frame. The shader runs *per fragment*. Halving both dimensions = 1/4 the GPU work; 0.3× = ~1/9th.

**Pattern:** Render the Canvas at reduced dimensions, CSS-scale it back up.

The Canvas must be physically smaller (fewer pixels in the Skia surface). Passing a smaller `resolution` uniform without shrinking the Canvas does nothing — Skia still rasterizes every pixel the Canvas occupies.

Expose the scale factor via a `performance` prop so consumers can tune it per use-case. The component author picks a safe default after visually verifying the shader.

```tsx
const scale = performance?.undersampling ?? DEFAULT_PERFORMANCE.undersampling;

const canvasWrapperStyle = useAnimatedStyle(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: Math.round(width.value * scale),
  height: Math.round(height.value * scale),
  transform: [{ scale: 1 / scale }],
  transformOrigin: 'left top',
  zIndex: -9999,
}));

return (
  <View style={[styles.container, style]} onLayout={onLayout}>
    {children}
    <Animated.View style={canvasWrapperStyle}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Fill><Shader source={shader} uniforms={uniforms} /></Fill>
      </Canvas>
    </Animated.View>
  </View>
);
```

**Rules:**
- `resolution` uniform = Canvas actual pixel size, not the visual (post-transform) size.
- `Math.round()` — sub-pixel Canvas dimensions cause blurry rasterization on some devices.
- Parent needs `overflow: 'hidden'` to clip rounding artifacts at edges.
- Children go outside the `Animated.View` so they render at full resolution.
- `zIndex: -9999` on the canvas wrapper ensures the shader renders behind children.

**Choosing SCALE:**
- 0.5 — safe for most soft shaders, minimal visual loss.
- 0.3 — good for organic/gradient/noise shaders that fill a rectangle.
- 0.25 — aggressive, only for very soft visuals (blurred backgrounds).
- 1 — required when the shader has `smoothstep` edges near boundaries, rounded contours, hard edges, thin lines, or text. Undersampling causes the edge transition to land on fewer pixels, producing visible jitter/aliasing — even at 0.8×. For these shaders, default `undersampling` to `1` and rely on FPS throttling as the primary optimization.

---

## 2. Animation Timing

**Problem:** `useFrameCallback` fires at the device's native refresh rate — 60, 90, or 120Hz. On a 120Hz iPad, the shader runs 120 times/sec. For ambient background animations, that's 2–4× more GPU work than necessary.

**Pattern:** Extract timing into a reusable `useFrameTime` hook. Accumulate real elapsed time; only update `time.value` when a full frame interval has passed. Use `-1` to mean uncapped.

```typescript
// useFrameTime.ts
import {
  SharedValue,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  fpsLock: number;
  animated: boolean;
  speed: number;
};

export const useFrameTime = ({
  fpsLock,
  animated,
  speed,
}: Props): SharedValue<number> => {
  const time = useSharedValue(0);
  const accumulated = useSharedValue(0);

  useFrameCallback(frameInfo => {
    if (animated && frameInfo.timeSincePreviousFrame !== null) {
      accumulated.value += frameInfo.timeSincePreviousFrame;

      if (fpsLock < 0) {
        time.value += (frameInfo.timeSincePreviousFrame / 1000) * speed;
        return;
      }

      const frameInterval = 1000 / fpsLock;

      if (accumulated.value >= frameInterval) {
        time.value += (accumulated.value / 1000) * speed;
        accumulated.value = 0;
      }
    }
  }, animated);

  return time;
};
```

Usage in the component:

```typescript
const time = useFrameTime({
  fpsLock: performance?.fpsLock ?? DEFAULT_PERFORMANCE.fpsLock,
  animated,
  speed,
});
```

**Why this works:** `useDerivedValue` only re-evaluates when a `.value` it reads actually changes. By gating `time.value` writes, the shader skips frames entirely — not just on the JS side, but in the Skia render pipeline.

**Choosing FPS:**
- 60 — standard. On 120Hz devices this already **halves GPU work** with zero visible difference. Safe default for most components.
- 30 — viable when `speed` is low (slow ambient animations). On 120Hz devices, this is **4× fewer GPU frames**. Makes a huge difference for idle/background screens.
- `-1` uncapped

FPS throttling never changes the visual output — it only changes how often the same shader runs. This makes it the safest and often most effective optimization, especially for shaders that can't tolerate resolution scaling.

---

## 3. Reactive Layout

**Problem:** Container size may not be known at mount (flex layout, dynamic sizing). The shader needs `width`/`height` for aspect ratio and resolution — but `useWindowDimensions` is wrong when the component doesn't fill the screen.

**Pattern:** Track container size via `onLayout` → shared values.

```typescript
const width = useSharedValue(paramsWidth ?? 1);
const height = useSharedValue(paramsHeight ?? 1);

const onLayout = useCallback((e: LayoutChangeEvent) => {
  const w = e.nativeEvent.layout.width;
  const h = e.nativeEvent.layout.height;
  width.value = w < 1 ? 1 : w;
  height.value = h < 1 ? 1 : h;
}, [width, height]);
```

**Rules:**
- Default to `1`, not `0` — prevents division-by-zero in aspect ratio (`width / height`).
- If `width`/`height` props are provided, use them as initial values: `useSharedValue(propsWidth ?? 1)`.
- Don't use `useWindowDimensions` — it's the screen size, not the container size.
- `onLayout` fires once after mount and on every resize. Shared value writes from `onLayout` (JS thread) trigger `useDerivedValue` re-evaluation on the UI thread.

---

## 4. Pitfalls

### Shared value writes from background worklet runtimes

Writing to a `useSharedValue` from a `react-native-worklets` background runtime (`createWorkletRuntime` + `scheduleOnRuntime`) does **not** trigger Reanimated's `useDerivedValue` to re-evaluate. The value updates silently, but the reactive graph doesn't know about it. Result: uniforms freeze, animation appears static.

**Rule:** Per-frame uniform computation must run inside `useDerivedValue` (UI thread). Background runtimes are only useful for one-shot batch work (e.g., pre-computing a lookup table), not for continuous reactive updates.

### Resolution uniform ≠ visual size

If the Canvas is scaled via CSS `transform`, the `resolution` uniform must reflect the *actual* (pre-transform) pixel dimensions. Passing the visual (post-transform) size causes the shader's `fragCoord / resolution` to produce wrong UV coordinates.

### Shader compilation inside component

`Skia.RuntimeEffect.Make()` parses and compiles GLSL. Inside a component (even memoized), it runs on every mount. Move it to module scope — the shader string is static.

### `accumulated -= FRAME_INTERVAL` drift

When gating FPS, don't subtract `FRAME_INTERVAL` from accumulated time — on variable-rate displays (ProMotion), small remainders accumulate and cause irregular frame spacing. Reset to `0`.

### `pow()` "optimization"

`pow(x, n)` is a single hardware ALU instruction on mobile GPUs. Replacing it with `exp2(n * log2(x))` or manual multiplication doesn't save cycles and hurts readability.

### `fbm` octave reduction as first resort

Reducing noise octaves changes the visual output (less detail, flatter gradients). Prefer FPS throttling and resolution scaling first — they reduce GPU work without altering the shader's appearance. Lower octaves only as a last resort or when the visual difference is acceptable.

---

## 5. Quick Reference

### Performance props

Different shaders tolerate different optimizations. Expose knobs via a `performance` prop with safe defaults chosen by the component author after visual testing.

```typescript
interface IPerformance {
  /**
   * Undersampling factor (0.1 - 1).
   * Reasonable values: (0.25, 0.3, 0.5, 1), 1: no undersampling.
   *
   * Less value -> More upscaling -> Less GPU usage
   *
   * Default: 0.3
   */
  undersampling?: number;
  /**
   * Reasonable values: (20, 30, 60), -1: no FPS lock.
   *
   * Less FPS -> Less GPU usage
   *
   * Less than 60 FPS more noticeable with high-speed animation
   *
   * Default: 60
   */
  fpsLock?: number;
}

interface MyShaderProps {
  performance?: IPerformance;
  // ... visual props
}
```

Module-scope default:

```typescript
const DEFAULT_PERFORMANCE: Required<IPerformance> = {
  undersampling: 0.3,
  fpsLock: 60,
};
```

### Optimization priority

Apply in this order. Each step is independent — skip any that don't fit the shader.

| Priority | Technique | GPU reduction | Visual impact | Always safe? |
|---|---|---|---|---|
| 1 | **FPS lock** (60fps on 120Hz) | 2× | None | Yes |
| 2 | **FPS lock** (30fps, low speed) | 4× | None if speed is low | Depends on speed |
| 3 | **Resolution scaling** (0.5×) | 4× | Mild softening | Only for soft shaders |
| 4 | **Resolution scaling** (0.3×) | ~11× | Noticeable softening | Only for gradients/blurs |
| 5 | **fbm octave reduction** | Proportional to octaves removed | Changes noise detail | No — alters appearance |

### Cost model

| Factor | Impact | Mitigation |
|---|---|---|
| Fragment count | `width × height` pixels, each runs full shader | Resolution scaling (if shader tolerates) |
| Refresh rate | 60–120 shader executions/sec | FPS throttle (always safe) |
| Shader compilation | One-time cost, ~1-5ms | Module scope |

### Recommended component file structure

```
my-shader-component/
├── index.tsx          — Component, layout, uniforms, Canvas
├── conf.ts            — GLSL string export (uniforms declared at top)
├── useFrameTime.ts    — Reusable FPS-gated timing hook
├── const.ts           — Default prop values, palettes, DEFAULT_PERFORMANCE
└── types.ts           — TypeScript interfaces (including IPerformance)
```

### Minimal dependency set

```
@shopify/react-native-skia  — Canvas, Shader, Fill, vec, Skia
react-native-reanimated     — useSharedValue, useDerivedValue, useFrameCallback,
                               useAnimatedStyle, Animated
react-native                — View, StyleSheet, LayoutChangeEvent
```

---

## Note: CPU offloading per-frame constants

Moving per-frame-constant expressions (positions, palette `mix()`, edge thresholds) from the shader to JS worklets and passing them as uniforms does not produce a measurable reduction in GPU usage. GPU cost is dominated by per-pixel operations (fbm, warping, distance fields) — the redundant per-frame-constant ops are negligible in comparison. This technique is a code clarity improvement (cleaner shader, dead code removal, explicit separation of per-frame vs per-pixel logic), not a GPU performance optimization.
