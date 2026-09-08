"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight, CircleOff, Globe, Hammer, Heart } from "lucide-react";

import {
  BMC_MEMBERSHIP,
  BUY_ME_A_COFFEE,
  COMPONENT_COUNT,
  REPO,
} from "@/components/landing/data";
import { Chars, Reveal } from "@/components/landing/primitives";

// Client-only: the shader needs a WebGL context, which does not exist in the
// server render. Until it arrives the rim is a plain hairline, so the card
// always has an edge — the metal only replaces it.
const LiquidMetal = dynamic(
  () => import("@/components/ui/liquid-metal").then((mod) => mod.LiquidMetal),
  { ssr: false },
);

/**
 * The one tier, as it stands on Buy Me a Coffee.
 *
 * Held here rather than fetched: the BMC page is the source of truth for what
 * is charged, and this page only has to agree with it. If the tier changes
 * there, these lines change here.
 */
const TIER = {
  name: "Reacticx Guardian",
  monthly: "$99",
  yearly: "$990",
};

/** A coffee, at Buy Me a Coffee's own unit price for this page. */
const COFFEE_PRICE = "$5";

/**
 * What the money does — not what the sponsor gets.
 *
 * A sponsorship page that lists perks is selling a product; this one is asking
 * for the library to stay alive, so every row is a thing the money keeps
 * happening. The first is the tier's own benefit as BMC states it; the last is
 * there because the honest objection to a recurring charge is being stuck
 * with it.
 */
const WHAT_IT_DOES = [
  { icon: Heart, label: "Supports me on a monthly basis" },
  { icon: Hammer, label: "Funds new components, fixes and docs" },
  { icon: Globe, label: "Keeps every component free and open source" },
  { icon: CircleOff, label: "No perks, no obligations, cancel any time" },
];

export function Sponsors() {
  return (
    <main className="mx-auto flex w-full max-w-[52rem] flex-col items-center px-5 pt-36 pb-32 text-center md:pt-44">
      <h1 className="font-serif text-[2.6rem] text-ink leading-[1.05] tracking-[-0.02em] md:text-[3.5rem]">
        <Chars immediate>Keep Reacticx alive.</Chars>
      </h1>

      <Reveal
        as="p"
        className="mt-6 max-w-[32rem] text-[1.02rem] text-ink-muted leading-[1.65] md:text-[1.08rem]"
        delay={0.08}
        immediate
      >
        Reacticx is free, open source, and built by one person. Sponsoring it
        buys the only thing it actually runs on — time.
      </Reveal>

      <Reveal
        as="p"
        className="mt-8 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[0.82rem] text-ink-faint"
        delay={0.12}
        immediate
      >
        <span>{COMPONENT_COUNT} components</span>
        <Dot />
        <span>Open source</span>
        <Dot />
        <span>Built by one person</span>
      </Reveal>

      <Reveal
        className="mt-14 w-full max-w-[25.5rem] text-left"
        delay={0.16}
        immediate
      >
        {/*
          The rim is the shader, not a border: the metal fills the whole card
          and the body is laid back over it, leaving the 5px the padding holds
          open. `overflow-hidden` is what rounds the canvas to the card, and
          the hairline underneath is what the rim looks like until the shader
          has loaded — the card is never edgeless.
        */}
        <div className="relative isolate overflow-hidden rounded-[30px] bg-white/[0.09] p-[4px]">
          <LiquidMetal
            className="rounded-[28px]"
            colorTint="#79fdcf"
            colorBack="#8cf93f"
            distortion={2.5}
            repetition={2}
            scale={1.9}
            speed={0.5}
          />

          <div className="relative z-10 flex flex-col rounded-[23px] bg-[#0a0a0a] p-7 md:p-8">
            <span className="text-[0.9rem] text-ink-muted tracking-[-0.01em]">
              {TIER.name}
            </span>

            <div className="mt-5 flex items-end gap-2">
              <span className="font-brand font-bold text-[3.4rem] text-ink leading-[0.85] tracking-[-0.045em]">
                {TIER.monthly}
              </span>
              <span className="pb-1 text-[0.95rem] text-ink-faint">
                /mo, or {TIER.yearly} a year
              </span>
            </div>

            <ul className="mt-9 flex flex-col gap-3.5 border-white/[0.07] border-t pt-8">
              {WHAT_IT_DOES.map(({ icon: Icon, label }) => (
                <li
                  className="flex items-center gap-3 text-[0.9rem] text-ink-muted leading-[1.4]"
                  key={label}
                >
                  <Icon
                    className="size-[1.05rem] shrink-0 text-ink-faint"
                    strokeWidth={1.5}
                  />
                  {label}
                </li>
              ))}
            </ul>

            <a
              className="group mt-9 inline-flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-ink px-5 font-semibold text-[0.95rem] text-surface tracking-[-0.01em] transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.98]"
              href={BMC_MEMBERSHIP}
              rel="noopener noreferrer"
              target="_blank"
            >
              Become a sponsor
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <p className="mt-4 text-center text-[0.74rem] text-ink-faint">
              Handled by Buy Me a Coffee
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal
        className="mt-10 flex flex-col gap-1.5 text-[0.9rem] text-ink-muted"
        delay={0.2}
      >
        <p>
          Not ready for that?{" "}
          <SponsorLink href={BUY_ME_A_COFFEE}>
            Buy me a coffee for {COFFEE_PRICE}.
          </SponsorLink>
        </p>
        <p>
          Nothing to spend?{" "}
          <SponsorLink href={REPO}>Star the repo.</SponsorLink>
        </p>
      </Reveal>
    </main>
  );
}

function Dot() {
  return <span aria-hidden className="size-1 rounded-full bg-ink-faint/50" />;
}

function SponsorLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      className="text-brand underline decoration-brand/30 underline-offset-4 transition-[opacity,text-decoration-color] duration-200 hover:decoration-brand hover:opacity-80"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
