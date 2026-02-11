import { type Page } from "@/lib/source";

export async function getLLMText(page: Page): Promise<string> {
  const section = page.slugs[0];
  const category =
    {
      components: "Reacticx Components",
    }[section] ?? "Reacticx Documentation";

  const processed = await page.data.getText("processed");

  return `# ${category}: ${page.data.title}
URL: https://www.reacticx.com${page.url}
Source: https://raw.githubusercontent.com/rit3zh/reacticx/main/docs/content/docs/${page.path}

${page.data.description ?? ""}

${processed}`;
}
