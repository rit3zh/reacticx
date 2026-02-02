import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const baseUrl = "https://reacticx.com";

  const baseUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.9,
    },
  ];

  const docsUrls: MetadataRoute.Sitemap = source
    .generateParams()
    .map(({ slug }) => ({
      url: `${baseUrl}/docs/${slug?.join("/") || ""}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...baseUrls, ...docsUrls];
}
