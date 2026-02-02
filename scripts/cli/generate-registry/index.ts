import fs from "fs";
import path from "path";

const COMPONENTS_DIR = "./src/components";
const OUTPUT_FILE = "./registry.json";

const CATEGORY_FOLDERS = [
  "ai",
  "atoms",
  "base",
  "micro-interactions",
  "molecules",
  "organisms",
  "screens",
  "templates",
];

const IGNORE_FILES = ["index.ts"];

interface ComponentEntry {
  name: string;
  category: string;
  files: string[];
  path: string;
}

function isComponentFolder(dirPath: string): boolean {
  const files = fs.readdirSync(dirPath);
  return files.some((f) => f === "index.tsx" || f.endsWith(".tsx"));
}

function scanDirectory(
  dir: string,
  category: string = "",
  depth: number = 0,
): ComponentEntry[] {
  const entries: ComponentEntry[] = [];

  let items: fs.Dirent[];
  try {
    items = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return entries;
  }

  for (const item of items) {
    if (!item.isDirectory()) continue;

    const fullPath = path.join(dir, item.name);
    const folderName = item.name;

    let currentCategory = category;
    if (CATEGORY_FOLDERS.includes(folderName) && depth === 0) {
      currentCategory = folderName;
    }

    if (isComponentFolder(fullPath)) {
      const files = fs
        .readdirSync(fullPath)
        .filter(
          (f) =>
            (f.endsWith(".tsx") || f.endsWith(".ts")) &&
            !IGNORE_FILES.includes(f),
        );

      if (files.length > 0) {
        entries.push({
          name: folderName,
          category: currentCategory || "base",
          files: files,
          path: fullPath.replace(/^\.\//, ""),
        });
      }
    }

    entries.push(...scanDirectory(fullPath, currentCategory, depth + 1));
  }

  return entries;
}

function generateRegistry() {
  const components = scanDirectory(COMPONENTS_DIR);

  const uniqueComponents = components.filter(
    (c, index, self) =>
      c.files.some((f) => f.endsWith(".tsx")) &&
      index === self.findIndex((t) => t.name === c.name),
  );

  const registry = {
    version: "1.0.0",
    totalComponents: uniqueComponents.length,
    categories: [...new Set(uniqueComponents.map((c) => c.category))].sort(),
    components: Object.fromEntries(
      uniqueComponents
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((c) => [
          c.name,
          {
            name: c.name,
            category: c.category,
            path: c.path,
            files: c.files.sort(),
          },
        ]),
    ),
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2));

  console.log(`\n✅ Generated registry.json`);
  console.log(`📦 Total components: ${uniqueComponents.length}`);
  console.log(`📁 Categories: ${registry.categories.join(", ")}\n`);

  for (const cat of registry.categories) {
    const count = uniqueComponents.filter((c) => c.category === cat).length;
    console.log(`   ${cat}: ${count} components`);
  }
}

generateRegistry();
