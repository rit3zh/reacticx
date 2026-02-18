import { NextRequest, NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";
import { getLLMText } from "@/lib/get-llm-text";

interface RouteContext {
  params: Promise<{ slug?: string[] }>;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const slug = (await params).slug;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  return new NextResponse(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}

export async function generateStaticParams() {
  return source.generateParams();
}
