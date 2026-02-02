import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ViewTransitions } from "next-view-transitions";
import { META_THEME_COLORS, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/docs-components/components/tooltip";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.description}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  keywords: [
    "GlowUI",
    "React Native",
    "UI Components",
    "Open Source",
    "Expo",
    "Reanimated",
    "Gesture Handler",
    "Skia",
    "Mobile Development",
    "Cross-Platform",
    "Design System",
    "Frontend",
  ],
  robots: "index, follow",
  authors: [{ name: "rit3zh", url: "https://x.com/rit3zh" }],
  creator: "rit3zh",
  icons: {
    icon: [{ url: "/logo.png?v=2", type: "image/png", sizes: "1245x1249" }],
    shortcut: "/logo.png?v=2",
    apple: { url: "/logo.png?v=2", sizes: "1245x1249", type: "image/png" },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/static/deps/reacticx-cover-without-trademark.png",
        width: 1200,
        height: 630,
        alt: "Reacticx - React Native UI Components Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rit3zh",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/static/deps/reacticx-cover-without-trademark.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: META_THEME_COLORS.light,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: META_THEME_COLORS.dark,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(geist.variable, geist.className, "antialiased")}>
          <RootProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              disableTransitionOnChange
              enableSystem
            >
              <TooltipProvider>{children}</TooltipProvider>
            </ThemeProvider>
          </RootProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
