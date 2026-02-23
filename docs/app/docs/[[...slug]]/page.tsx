import defaultMdxComponents, { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import {
  EditOnGitHub,
  PageLastUpdate,
} from "fumadocs-ui/layouts/notebook/page";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { notFound } from "next/navigation";
import { Preview } from "@/components/mdx/preview";
import { PreviewClient } from "@/components/mdx/preview-client";
import { PreviewComment } from "@/components/mdx/preview-comment";
import PreviewTemplate from "@/components/mdx/preview-template";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { ComponentSource } from "@/docs-components/components/components-source";
import { ExampleComponentSource } from "@/docs-components/components/example-usage-source";
import { AutoTypeTable } from "@/docs-components/components/AutoTypeTable";
import { source } from "@/lib/source";
import { CopyMarkdownButton } from "@/components/ui/copy-markdown-button";
import {
  AnchorProvider,
  ScrollProvider,
  TOCItem,
  type TOCItemType,
} from "fumadocs-core/toc";

import * as TabsComponents from "fumadocs-ui/components/tabs";
import type { MDXComponents } from "mdx/types";
// import { useRef } from "react";
// Force static generation for Cloudflare Pages compatibility
// This ensures pages are fully static and Node.js APIs are only used at build time
export const dynamic = "force-static";
export const dynamicParams = false;

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug) as any;
  const lastModifiedTime = page?.data.lastModified;

  console.log(lastModifiedTime, "page");
  if (!page) {
    return notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage
      footer={{ enabled: false }}
      tableOfContent={{
        enabled: true,
        style: "clerk",
        single: true,
      }}
      toc={page.data.toc as TOCItemType[]}
    >
      <DocsTitle className="ml-8 font-semibold text-4xl tracking-tighter mb-0">
        {page.data.title}
      </DocsTitle>
      <DocsDescription className="ml-8 text-xl tracking-tighter mb-0">
        {page.data.description}
      </DocsDescription>
      {lastModifiedTime && (
        <div className="ml-8">
          <PageLastUpdate date={lastModifiedTime} />
        </div>
      )}
      <div className="ml-8 flex items-center gap-4 mt-0">
        <EditOnGitHub
          className="border-0 text-black dark:text-white [&_svg]:text-black dark:[&_svg]:text-white"
          href={`https://github.com/rit3zh/reacticx/tree/main/docs/content/docs/${params.slug ? `${params.slug.join("/")}.mdx` : "index.mdx"}`}
        />
        <CopyMarkdownButton markdownUrl={`${page.url}.mdx`} />
      </div>
      <DocsBody className="ml-8">
        <MDX
          components={{
            ...defaultMdxComponents,
            a: createRelativeLink(source, page) as any,
            Preview,
            PreviewClient,
            PreviewComment,
            ...TabsComponents,
            PreviewTemplate,
            ComponentSource,
            img: (props: any) => <ImageZoom {...(props as any)} />,
            ExampleComponentSource,
            AutoTypeTable,
            Steps,
            Step,
          }}
        />
      </DocsBody>
    </DocsPage>
    // </AnchorProvider>
  );
}

export async function generateStaticParams() {
  return await source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    return notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
