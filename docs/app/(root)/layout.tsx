import type { Metadata } from "next";
import { Activity, Suspense } from "react";
import { Header } from "@/docs-components/components/header/header";
import { Footer } from "@/components/layout/footer";

// import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | Reactix - The Modern React Native Component Library",
    default: "Reactix - The Modern React Native Component Library",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <main className="relative w-full bg-white pt-0 md:pt-0 dark:bg-black">
        {children}
      </main>
    </>
  );
}
