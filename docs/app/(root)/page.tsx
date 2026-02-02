"use client";

import { useEffect, useState } from "react";
import LightRays from "@/docs-components/components/light-rays";
import TriplePhoneHero from "@/docs-components/components/triple-phones";
import { AnimatedBadge } from "@/docs-components/components/animated-badge";
import { AnimatedShinyButton } from "@/docs-components/components/shiny-button";
import localFont from "next/font/local";
import { Header } from "@/docs-components/components/header/header";
import MadeWith from "@/docs-components/components/made-with";
import { Footer } from "@/docs-components/components/footer";
import FAQsFour from "@/components/faqs-4";
import Team1 from "@/components/team-v1";
import BentoGrid from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

// Bethany-Elingston font for hero title
const bethanyFont = localFont({
  src: "../../fonts/Bethany-Elingston.otf",
  variable: "--font-bethany",
});

const drukwide = localFont({
  src: "../../fonts/DrukWideBold.ttf",
  variable: "--font-drukwide",
});

const satoshi = localFont({
  src: [
    {
      path: "../../fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  fallback: ["system-ui", "sans-serif"],
});

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`${satoshi.variable} ${bethanyFont.variable} ${drukwide.variable} relative min-h-screen w-full bg-black`}
    >
      {/* Enhanced LightRays Background */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.6}
          lightSpread={1.2}
          rayLength={2.5}
          pulsating={true}
          fadeDistance={1.5}
          saturation={1.0}
          followMouse={false}
          mouseInfluence={0.2}
          noiseAmount={0.22}
          distortion={0.4}
          className="opacity-100 w-full h-full"
        />
      </div>

      {/* Header - Sticky */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen overflow-x-hidden">
        {/* Hero Section - Premium Design */}
        <section className="flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-12 md:pt-36 md:pb-20">
          <div className="relative flex flex-col items-center max-w-5xl mx-auto text-center">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <AnimatedBadge
                text="✨ Introducing Reactix"
                color="#ffffff"
                href="/docs"
              />
            </motion.div>

            {/* Main Headline - Mixed Fonts */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-white text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.1]"
            >
              <span className="font-satoshi font-semibold">Build Your </span>
              <span className="font-bethany italic text-white/90">
                Beautiful
              </span>
              <br />
              <span className="font-satoshi font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                React Native
              </span>
              <span className="font-satoshi font-semibold text-white/80">
                {" "}
                Apps
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="font-satoshi text-base sm:text-lg md:text-xl text-neutral-400 font-normal max-w-lg leading-relaxed mt-6"
            >
              Copy and paste production-ready components with smooth animations.
              No signup required.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 w-full sm:w-auto"
            >
              <AnimatedShinyButton url="/docs">
                View Components
              </AnimatedShinyButton>
              <Link
                href="/docs/about"
                className="font-satoshi inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white/80 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-sm font-medium"
              >
                Why Reactix?
              </Link>
            </motion.div>

            {/* Feature Checkmarks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-neutral-500"
            >
              {["60+ Components", "Expo Compatible", "Copy & Paste"].map(
                (feature) => (
                  <span key={feature} className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-neutral-400" />
                    <span className="font-satoshi">{feature}</span>
                  </span>
                ),
              )}
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="font-satoshi text-2xl md:text-3xl font-bold text-white mb-3">
                Everything you need
              </h2>
              <p className="font-satoshi text-neutral-400 max-w-md mx-auto text-sm">
                Production-ready components built with modern tools
              </p>
            </motion.div>

            <BentoGrid />
          </div>
        </section>
        {/* Phone Mockups Section with Scroll Animation */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 overflow-visible">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="font-satoshi text-2xl md:text-3xl font-bold text-white mb-3">
                See it in action
              </h2>
              <p className="font-satoshi text-neutral-400 max-w-md mx-auto text-sm">
                Beautiful components that work seamlessly across iOS and
                Android.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-5xl mx-auto pointer-events-none pb-20"
            >
              <TriplePhoneHero
                imageLeftSrc="/static/mockup/animated-scroll-mockup.png"
                imageCenterSrc="/static/mockup/parallax-header-dua-lipa.png"
                imageRightSrc="/static/mockup/filling-stack-mockup.png"
              />
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQsFour />

        {/* Team Section */}
        <Team1 />

        <MadeWith />
        <Footer />
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-60px) translateX(30px);
            opacity: 0.7;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(
            circle at 50% 0%,
            var(--tw-gradient-stops)
          );
        }

        :global(.font-satoshi) {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            sans-serif;
        }

        :global(.font-bethany) {
          font-family: var(--font-bethany), Georgia, serif;
        }
        :global(.font-drukwide) {
          font-family: var(--font-drukwide), Arial, sans-serif;
        }
      `}</style>

      {/* AnimatedShinyButton: Black background with white border animation */}
      <style jsx global>{`
        .shiny-cta,
        .shiny-cta-link {
          --shiny-cta-bg: #000000 !important;
          --shiny-cta-bg-subtle: #171717 !important;
          --shiny-cta-fg: #ffffff !important;
          --shiny-cta-highlight: #ffffff !important;
          --shiny-cta-highlight-subtle: #d4d4d4 !important;
        }
      `}</style>
    </div>
  );
}
