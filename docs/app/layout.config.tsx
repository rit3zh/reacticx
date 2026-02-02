import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import HeaderProSmall from "@/components/landing/header-pro-small";
import { GithubInfo } from "fumadocs-ui/components/github-info";

export const baseOptions = <T extends Partial<BaseLayoutProps>>(
  option?: T,
): BaseLayoutProps => ({
  nav: {
    title: (
      <div className="flex items-center">
        <Image
          alt="Reactix Logo"
          className="ml-3 dark:hidden mr-3"
          height={20}
          src="/static/deps/dark_logo.png"
          width={20}
        />
        <Image
          alt="Reactix Logo"
          className="mr-0 hidden dark:block"
          height={60}
          src="/static/deps/white_glow.png"
          width={50}
        />
        <span className="hidden items-center font-bold text-black text-lg tracking-tight md:inline-flex dark:text-white pb-0 dark:pb-0">
          Reactix
        </span>
      </div>
    ),
  },
  links: [
    {
      type: "custom",
      children: <HeaderProSmall />,
    },
    {
      type: "custom",
      children: (
        <GithubInfo owner="rit3zh" repo="reacticx" className="lg:-mx-2" />
      ),
    },
  ],
});
