"use client";

import * as React from "react";

import { CHAR, DURATION, EASE_NUMERIC } from "./motion";

/**
 * numeric-text's content transition, driven by a value rather than a timer.
 *
 * The mechanic is numeric-text's (MIT, shizukushq — see THIRD-PARTY.md): the
 * outgoing string leaves
 * along the same axis the incoming one arrives on — glyphs rise, shrink to
 * 0.6, rotate 2deg and blur, staggered across a fixed share of the duration —
 * while the wrapper animates its own width so whatever sits beside it slides
 * instead of snapping. numeric-text gets that last part by FLIP-translating
 * its prefix and suffix around the changed middle; a width tween on the same
 * curve is indistinguishable for a label that swaps wholesale.
 */

export function SwapText({
  value,
  className,
  spread = 1,
}: {
  value: string;
  className?: string;
  /** Multiplier on the stagger budget; >1 spreads the string out further. */
  spread?: number;
}) {
  const [outgoing, setOutgoing] = React.useState<string | null>(null);
  const previous = React.useRef(value);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [width, setWidth] = React.useState<number | null>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (previous.current === value) return;
    setOutgoing(previous.current);
    previous.current = value;
  }, [value]);

  // The outgoing copy only needs to live as long as its exit animation.
  React.useEffect(() => {
    if (outgoing === null) return;
    const id = window.setTimeout(
      () => setOutgoing(null),
      DURATION * 1000 * (1 + CHAR.stagger * spread),
    );
    return () => window.clearTimeout(id);
  }, [outgoing, spread]);

  React.useLayoutEffect(() => {
    const node = measureRef.current;
    if (!node) return;

    const update = () => setWidth(node.getBoundingClientRect().width);
    update();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        verticalAlign: "top",
        whiteSpace: "nowrap",
        width: width ?? undefined,
        transition: reduced ? undefined : `width ${DURATION}s ${EASE_NUMERIC}`,
      }}
    >
      {/* Sizes the wrapper without taking part in layout. */}
      <span
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0"
        ref={measureRef}
      >
        {value}
      </span>

      {outgoing === null ? null : (
        <span aria-hidden className="absolute top-0 left-0">
          <Phrase key={`out-${outgoing}`} mode="out" spread={spread} text={outgoing} />
        </span>
      )}

      <span className="relative inline-block">
        <Phrase
          key={`in-${value}`}
          mode="in"
          reduced={reduced}
          spread={spread}
          text={value}
        />
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   phrase                                   */
/* -------------------------------------------------------------------------- */

/**
 * Every glyph is its own `inline-block` so it can be transformed, and a plain
 * space inside one collapses to zero width — "muscle memory" renders as
 * "musclememory". numeric-text solves it the same way, with its `SPACE` const.
 */
const NBSP = "\u00A0";

/** One copy of a string, either arriving or leaving. */
export function Phrase({
  text,
  mode,
  spread,
  reduced,
}: {
  text: string;
  mode: "in" | "out";
  spread: number;
  reduced?: boolean;
}) {
  // "in" starts displaced and settles; "out" starts at rest and leaves.
  const [atRest, setAtRest] = React.useState(mode === "out");

  /**
   * Two frames, not one. A single `requestAnimationFrame` can land before the
   * browser has resolved style for the displaced first render, in which case
   * the two states collapse into one and the glyph simply appears — which is
   * what the headline's occasional hard pop was. Waiting for the frame after
   * guarantees the start state has been through style and paint, so every
   * glyph has something to transition from.
   */
  React.useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAtRest(mode === "in"));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [mode]);

  const chars = [...text];
  const animating = text.replace(/\s/g, "").length;
  const step = (DURATION * CHAR.stagger * spread) / Math.max(animating, 1);

  /**
   * An arriving phrase stays mounted until the next swap, which on the hero is
   * seconds away — so the `will-change` below outlived the motion it was for
   * and held a compositor layer per glyph the whole time. A leaving phrase is
   * unmounted the moment it finishes, so it never needs standing down.
   */
  const [done, setDone] = React.useState(false);

  // Total time from the first glyph starting to the last one settling.
  const span = Math.max(animating - 1, 0) * step + DURATION;

  React.useEffect(() => {
    if (mode !== "in" || reduced) return;

    setDone(false);
    const timer = window.setTimeout(() => setDone(true), span * 1000 + 60);
    return () => window.clearTimeout(timer);
  }, [mode, reduced, span, text]);

  // Enter rises from below, exit continues upward — one direction of travel.
  const displaced =
    mode === "in"
      ? `translateY(${CHAR.y}em) scale(${CHAR.scale}) rotateZ(${CHAR.rotate}deg)`
      : `translateY(-${CHAR.y}em) scale(${CHAR.scale}) rotateZ(${CHAR.rotate}deg)`;

  /**
   * The blur is one filter on the phrase rather than one per glyph.
   *
   * `filter` is not a compositable property, so every animated glyph was a
   * separate per-frame CPU blur — and with an outgoing phrase overlapping an
   * incoming one, a four-word headline was running two dozen of them at once
   * while the wrapper's width tween relaid out the line each frame. Lifting it
   * to the wrapper leaves two, and because the glyphs underneath still carry
   * the stagger, the string still reads as resolving letter by letter.
   *
   * Opacity and transform stay per glyph: both are compositable, so the
   * stagger that carries the whole effect costs nothing.
   */
  return (
    <span
      aria-label={mode === "in" ? text : undefined}
      style={{
        display: "inline-block",
        filter: atRest ? "blur(0px)" : `blur(${CHAR.blur}em)`,
        transition: reduced ? "none" : `filter ${span}s ${EASE_NUMERIC}`,
        willChange: done || reduced ? undefined : "filter",
      }}
    >
      {chars.map((char, charIndex) => (
        <span
          aria-hidden
          className="inline-block"
          key={`${char}-${charIndex}`}
          style={{
            opacity: atRest ? 1 : 0,
            transform: atRest ? "none" : displaced,
            transition: reduced
              ? "none"
              : `opacity ${DURATION}s ${EASE_NUMERIC} ${charIndex * step}s,
                 transform ${DURATION}s ${EASE_NUMERIC} ${charIndex * step}s`,
            willChange: done || reduced ? undefined : "transform, opacity",
          }}
        >
          {char === " " ? NBSP : char}
        </span>
      ))}
    </span>
  );
}

export function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
