import { promises as fs } from "fs";
import { glob } from "glob";
import path from "path";
import type { z } from "zod";
import type { registryItemFileSchema } from "@/registry/schema";
import { registry } from "../registry/index";

const REGISTRY_BASE_PATH = process.cwd();
const PUBLIC_FOLDER_BASE_PATH = "public/r";

// Console colors and symbols
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
} as const;

const symbols = {
  success: "✓",
  arrow: "→",
  error: "✗",
  dot: "•",
} as const;

function printDivider() {
  console.log(`${colors.dim}${"─".repeat(80)}${colors.reset}\n`);
}

// const REGISTRY_TYPE_FOLDERS: Record<string, string> = {
//     "registry:component": "components",
//     "registry:hook": "hooks",
//     "registry:lib": "lib",
//     "registry:block": "blocks",
// };

/**
 * bun run ./scripts/build-registry.ts
 *
 */
type File = z.infer<typeof registryItemFileSchema>;

async function writeFileRecursive(filePath: string, data: string) {
  const dir = path.dirname(filePath);

  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, data, "utf-8");
    console.log(
      `  ${colors.green}${symbols.success}${colors.reset} Output written to ${colors.cyan}${filePath}${colors.reset}`
    );
  } catch (error) {
    console.log();
    console.error(
      `  ${colors.red}${symbols.error} Error writing file ${filePath}${colors.reset}`
    );
    console.error(error);
    console.log();
  }
}

interface ComponentInfo {
  name: string;
  title: string;
  description: string;
}

const extractFrontmatter = (
  content: string
): { title?: string; description?: string } => {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};

  const frontmatter = frontmatterMatch[1];
  const titleMatch = frontmatter.match(/title:\s*(.+)/);
  const descriptionMatch = frontmatter.match(/description:\s*(.+)/);

  return {
    title: titleMatch?.[1]?.trim(),
    description: descriptionMatch?.[1]?.trim(),
  };
};

const getComponentsInfo = async (): Promise<ComponentInfo[]> => {
  try {
    const mdxFiles = await glob("content/docs/components/*.mdx", {
      cwd: REGISTRY_BASE_PATH,
    });
    const components: ComponentInfo[] = [];

    for (const mdxFile of mdxFiles) {
      try {
        const content = await fs.readFile(
          path.join(REGISTRY_BASE_PATH, mdxFile),
          "utf-8"
        );
        const frontmatter = extractFrontmatter(content);

        if (frontmatter.title && frontmatter.description) {
          const name = path.basename(mdxFile, ".mdx");
          components.push({
            name,
            title: frontmatter.title,
            description: frontmatter.description,
          });
        }
      } catch (error) {
        console.error(
          `    ${colors.red}${symbols.error} Error reading MDX file ${mdxFile}${colors.reset}`
        );
      }
    }

    return components.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error(
      `  ${colors.red}${symbols.error} Error getting component info${colors.reset}`
    );
    return [];
  }
};

const generateLLMsFile = async (components: ComponentInfo[]): Promise<void> => {
  const llmsContent = `# KokonutUI - UI Component Library

Collection of 100+ stunning UI components free and open source built with Next.js, React, Tailwind CSS, and Motion.

## Components

${components
  .map(
    (component) =>
      `**${component.title}** - ${component.description}\nhttps://kokonutui.com/docs/components/${component.name}`
  )
  .join("\n\n")}

## Templates and Premium Components (Kokonut UI Pro)

Templates and premium components are available on the premium version of Kokonut UI.
https://kokonutui.pro/templates

## Premium Components (Kokonut UI Pro)

Premium components are available on the premium version of Kokonut UI.
https://kokonutui.pro/components

## Links

- Website: https://kokonutui.com
- Github: https://github.com/kokonut-labs/kokonutui
- Sitemap: https://kokonutui.com/sitemap.xml

`;

  try {
    await fs.writeFile(
      path.join(REGISTRY_BASE_PATH, "public/llms.txt"),
      llmsContent,
      "utf-8"
    );
    console.log(
      `  ${colors.green}${symbols.success}${colors.reset} LLMs.txt file updated with ${components.length} components`
    );
  } catch (error) {
    console.error(
      `  ${colors.red}${symbols.error} Error writing LLMs.txt file${colors.reset}`
    );
    console.error(error);
  }
};

const getComponentFiles = async (files: File[], registryType: string) => {
  const filesArrayPromises = (files ?? []).map(async (file) => {
    try {
      if (typeof file === "string") {
        const normalizedPath = file.startsWith("/") ? file : `/${file}`;
        const filePath = path.join(REGISTRY_BASE_PATH, normalizedPath);
        const fileContent = await fs.readFile(filePath, "utf-8");

        const fileName = normalizedPath.split("/").pop() || "";
        console.log(
          `    ${colors.yellow}${symbols.dot}${colors.reset} Processing ${colors.cyan}${fileName}${colors.reset}`
        );

        return {
          type: registryType,
          content: fileContent,
          path: normalizedPath,
          target: `components/kokonutui/${fileName}`,
        };
      }
      const normalizedPath = file.path.startsWith("/")
        ? file.path
        : `/${file.path}`;
      const filePath = path.join(REGISTRY_BASE_PATH, normalizedPath);
      const fileContent = await fs.readFile(filePath, "utf-8");

      const fileName = normalizedPath.split("/").pop() || "";
      console.log(
        `    ${colors.yellow}${symbols.dot}${colors.reset} Processing ${colors.cyan}${fileName}${colors.reset}`
      );

      const getTargetPath = (type: string) => {
        switch (type) {
          case "registry:hook":
            return `hooks/${fileName}`;
          case "registry:lib":
            return `lib/${fileName}`;
          case "registry:block":
            return `blocks/${fileName}`;
          default:
            return `components/kokonutui/${fileName}`;
        }
      };

      const fileType =
        typeof file === "string" ? registryType : file.type || registryType;

      return {
        type: fileType,
        content: fileContent,
        path: normalizedPath,
        target:
          typeof file === "string"
            ? getTargetPath(registryType)
            : file.target || getTargetPath(fileType),
      };
    } catch (error) {
      console.error(
        `    ${colors.red}${symbols.error} Error processing file: ${typeof file === "string" ? file : file.path}${colors.reset}`
      );
      throw error;
    }
  });

  const filesArray = await Promise.all(filesArrayPromises);
  return filesArray;
};

const main = async () => {
  console.log(`\n${colors.cyan}Registry Build Process${colors.reset}`);
  printDivider();

  const totalComponents = registry.length;

  for (let i = 0; i < registry.length; i++) {
    const component = registry[i];
    const files = component.files;
    if (!files) throw new Error("No files found for component");

    console.log(
      `${colors.yellow}${symbols.arrow} Component ${i + 1}/${totalComponents}: ${colors.reset}${component.name}`
    );

    const filesArray = await getComponentFiles(files, component.type);
    const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${component.name}.json`;

    await writeFileRecursive(
      jsonPath,
      JSON.stringify({ ...component, files: filesArray }, null, 2)
    );

    if (i < registry.length - 1) {
      console.log(); // Add space between components
    }
  }

  printDivider();

  // Generate LLMs.txt file
  console.log(
    `${colors.yellow}${symbols.arrow} Generating LLMs.txt file${colors.reset}`
  );
  const componentsInfo = await getComponentsInfo();
  await generateLLMsFile(componentsInfo);

  printDivider();
};

main()
  .then(() => {
    console.log(
      `${colors.green}${symbols.success} Registry build completed successfully!${colors.reset}\n`
    );
  })
  .catch((err) => {
    console.log();
    console.error(
      `${colors.red}${symbols.error} Registry build failed:${colors.reset}`
    );
    console.error(err);
    console.log();
    process.exit(1);
  });
