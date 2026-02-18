import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      lastModified: z
        .string()
        .or(z.date())
        .transform((val) => (val ? new Date(val) : undefined))
        .optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    remarkNpmOptions: {
      persist: {
        id: "package-manager",
      },
    },
  },
});
