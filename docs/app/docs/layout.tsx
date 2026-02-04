import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { source } from "@/lib/source";
import { baseOptions } from "../layout.config";
import { AnnouncementDialog } from "@/components/announcement-dialog";

export const metadata: Metadata = {
  title: {
    template: "%s | Reactix",
    default: "Reactix - Open Source UI Components to build beautiful websites",
  },
};

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <>
      <DocsLayout tree={source.pageTree} {...baseOptions()}>
        {children}
      </DocsLayout>
      <AnnouncementDialog />
    </>
  );
}
