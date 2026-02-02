import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-black/10 border-t dark:border-white/10">
      {/* Big Background Text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="select-none whitespace-nowrap font-black text-[25vw] text-black/4 leading-none tracking-tighter md:text-[20vw] lg:text-[18vw] xl:text-[15vw] dark:text-white/4">
          Kokonut UI
        </span>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:justify-between">
          {/* Brand Section */}
          <div className="flex w-full flex-col gap-4 lg:w-auto">
            <Link href="/" target="_blank">
              <div className="flex items-center">
                <span className="inline-flex items-center font-bold tracking-tight">
                  <Image alt="logo" height={28} src="/logo.svg" width={28} />

                  <span className="ml-1 sm:ml-0">Kokonut UI</span>
                </span>
              </div>
            </Link>
            <div className="flex flex-col gap-1">
              <Link
                className="flex max-w-xs items-center justify-center gap-1 text-black/80 text-xs tracking-tight hover:text-primary sm:text-sm dark:text-white/60 dark:hover:text-primary"
                href="https://dorianbaffier.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Built by <span className="font-semibold">Dorian Baffier</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-white" />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <nav className="flex flex-col gap-3">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              <li>
                <Link
                  className="text-black/70 text-sm transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
                  href="/components"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  className="text-black/70 text-sm transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
                  href="https://kokonutui.pro/templates"
                  target="_blank"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  className="text-black/70 text-sm transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
                  href="https://kokonutui.pro?utm_source=kokonutui.com&utm_medium=footer"
                  target="_blank"
                >
                  Kokonut UI - Pro
                </Link>
              </li>
              <li>
                <Link
                  className="text-black/70 text-sm transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
                  href={siteConfig.links.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Github Open Source
                </Link>
              </li>
              <li>
                <Link
                  className="text-black/70 text-sm transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
                  href="https://vercel.com/blog/spring25-oss-program#kokonutui"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Vercel OSS 2025
                </Link>
              </li>
              <li>
                <Link
                  className="text-black/70 text-sm transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
                  href="https://aris.studio"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Aris Studio
                </Link>
              </li>
              <li>
                <Link
                  className="text-black/70 text-sm transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
                  href={siteConfig.links.twitter}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  X (Twitter)
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
