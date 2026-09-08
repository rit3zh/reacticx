import type { Metadata } from "next";

import { ForceDarkTheme } from "@/components/force-dark-theme";
import { BottomEdgeBlur } from "@/components/landing/bottom-edge-blur";
import { Footer } from "@/components/landing/footer";
import {
  MobileNavDrawer,
  MobileNavProvider,
  MobileNavShell,
} from "@/components/landing/mobile-nav";
import { Navbar } from "@/components/landing/navbar";
import { Sponsors } from "@/components/sponsors/sponsors";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sponsor",
  description:
    "Reacticx is free, open source and built by one person. Sponsor the membership, or buy a coffee.",
};

/**
 * The sponsors page.
 *
 * The landing shell rather than the docs one: this is a page about the project,
 * not a page of it, and it is reached from the bar on every surface.
 */
export default function SponsorsPage() {
  return (
    <>
      <ForceDarkTheme />
      <MobileNavProvider>
        <div className="min-h-screen bg-surface font-brand tracking-[-0.011em] text-ink">
          <div aria-hidden className="fixed inset-0 -z-10 bg-black" />

          <Navbar />
          <MobileNavDrawer />

          <MobileNavShell>
            <div aria-hidden className="fixed inset-0 -z-10 bg-surface" />

            <Sponsors />
            <Footer />

            <BottomEdgeBlur position="bottom" />
          </MobileNavShell>
        </div>
      </MobileNavProvider>
    </>
  );
}
