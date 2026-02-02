"use client";

import { ArrowUpRight, PartyPopper } from "lucide-react";
import Link from "next/link";

export default function HeaderProSmall() {
  return (
    <>
      <style jsx>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-percent {
          syntax: "<percentage>";
          initial-value: 5%;
          inherits: false;
        }

        @property --gradient-shine {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }

        .shiny-banner {
          --shiny-cta-bg: #ffffff;
          --shiny-cta-bg-subtle: #e5e5e5;
          --shiny-cta-fg: #000000;
          --shiny-cta-highlight: #404040;
          --shiny-cta-highlight-subtle: #525252;
          --animation: gradient-angle linear infinite;
          --duration: 3s;
          --shadow-size: 2px;
          --transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);

          isolation: isolate;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid transparent;
          border-radius: 0.375rem;
          color: var(--shiny-cta-fg);
          background:
            linear-gradient(var(--shiny-cta-bg), var(--shiny-cta-bg))
              padding-box,
            conic-gradient(
                from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
                transparent,
                var(--shiny-cta-highlight) var(--gradient-percent),
                var(--gradient-shine) calc(var(--gradient-percent) * 2),
                var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
                transparent calc(var(--gradient-percent) * 4)
              )
              border-box;
          box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle);
          transition: var(--transition);
          transition-property:
            --gradient-angle-offset, --gradient-percent, --gradient-shine;
        }

        :global(.dark) .shiny-banner {
          --shiny-cta-bg: #000000;
          --shiny-cta-bg-subtle: #1a1a1a;
          --shiny-cta-fg: #ffffff;
          --shiny-cta-highlight: #404040;
          --shiny-cta-highlight-subtle: #525252;
        }

        .shiny-banner::before,
        .shiny-banner::after {
          content: "";
          pointer-events: none;
          position: absolute;
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
          z-index: -1;
        }

        /* Dots pattern */
        .shiny-banner::before {
          --size: calc(100% - var(--shadow-size) * 3);
          --position: 2px;
          --space: calc(var(--position) * 2);
          width: var(--size);
          height: var(--size);
          background: radial-gradient(
              circle at var(--position) var(--position),
              white calc(var(--position) / 4),
              transparent 0
            )
            padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: 0.375rem;
          opacity: 0.4;
          z-index: -1;
        }

        /* Inner shimmer */
        .shiny-banner::after {
          --animation: shimmer linear infinite;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(
            -50deg,
            transparent,
            var(--shiny-cta-highlight),
            transparent
          );
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.6;
        }

        .shiny-banner .glow-effect {
          position: absolute;
          inset: 0;
          z-index: 0;
          box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight);
          opacity: 0;
          transition: opacity var(--transition);
          animation: calc(var(--duration) * 1.5) breathe linear infinite;
          border-radius: 0.375rem;
        }

        /* Animate */
        .shiny-banner,
        .shiny-banner::before,
        .shiny-banner::after {
          animation:
            var(--animation) var(--duration),
            var(--animation) calc(var(--duration) / 0.4) reverse paused;
          animation-composition: add;
        }

        .shiny-banner:is(:hover, :focus-visible) {
          --gradient-percent: 20%;
          --gradient-angle-offset: 95deg;
          --gradient-shine: var(--shiny-cta-highlight-subtle);
        }

        .shiny-banner:is(:hover, :focus-visible),
        .shiny-banner:is(:hover, :focus-visible)::before,
        .shiny-banner:is(:hover, :focus-visible)::after {
          animation-play-state: running;
        }

        .shiny-banner:is(:hover, :focus-visible) .glow-effect {
          opacity: 1;
        }

        @keyframes gradient-angle {
          to {
            --gradient-angle: 360deg;
          }
        }

        @keyframes shimmer {
          to {
            rotate: 360deg;
          }
        }

        @keyframes breathe {
          from,
          to {
            scale: 1;
          }
          50% {
            scale: 1.2;
          }
        }
      `}</style>

      <div className="w-full shiny-banner group">
        <div className="glow-effect" />
        <div className="w-full px-3 py-1.5 relative z-10">
          <Link
            href="/docs"
            className="flex items-center justify-center gap-2.5 md:gap-3 transition-all duration-300 tracking-tighter"
          >
            {/* Desktop View */}
            <span className="hidden md:flex items-center gap-3">
              <span className="text-black dark:text-white tracking-tighter text-sm">
                <span className="font-bold">Reactix</span> - 60+
                production-ready React Native components with smooth animations
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-black dark:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </span>

            {/* Mobile View */}
            <span className="flex md:hidden items-center gap-2.5">
              <PartyPopper className="w-5 h-5 text-black dark:text-white flex-shrink-0" />
              <span className="text-black dark:text-white font-medium tracking-tight text-xs leading-tight">
                Reactix - 60+ React Native components with animations
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black dark:text-white flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
