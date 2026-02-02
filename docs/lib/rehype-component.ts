/**
 * @see https://github.com/shadcn-ui/ui/blob/main/apps/www/lib/rehype-component.ts
 */

import fs from "node:fs";
import path from "node:path";
import type { UnistNode, UnistTree } from "@/types/unist";

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    const visit = (node: UnistNode) => {
      if (node.children) {
        for (const child of node.children) {
          visit(child);
        }
      }

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as
          | string
          | undefined;
        const srcPath = getNodeAttributeByName(node, "src")?.value as
          | string
          | undefined;

        if (!name && !srcPath) {
          return;
        }

        try {
          let src: string;
          let filePath: string;

          if (srcPath) {
            // Use the provided src path directly
            filePath = path.join(process.cwd(), srcPath);
            src = srcPath;
          } else if (name) {
            // Look up in react-native folder by component name
            filePath = path.join(process.cwd(), "react-native", `${name}.tsx`);
            src = `react-native/${name}.tsx`;
          } else {
            return;
          }

          // Read the source file
          if (!fs.existsSync(filePath)) {
            console.warn(`Component source file not found: ${filePath}`);
            return;
          }

          const source = fs.readFileSync(filePath, "utf8");

          // Add code as children so that rehype can take over at build time
          if (!node.children) {
            node.children = [];
          }

          node.children.push({
            type: "element",
            tagName: "pre",
            properties: {
              __src__: src,
            },
            children: [
              {
                type: "element",
                tagName: "code",
                properties: {
                  className: ["language-tsx"],
                },
                children: [
                  {
                    type: "text",
                    value: source,
                  },
                ],
              },
            ],
          });
        } catch (error) {
          console.error("Error processing ComponentSource:", error);
        }
      }
    };

    visit(tree as UnistNode);
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}

export function getComponentSourceFileContent(node: UnistNode) {
  const src = getNodeAttributeByName(node, "src")?.value as string;

  if (!src) {
    return null;
  }

  // Read the source file
  const filePath = path.join(process.cwd(), src);
  const source = fs.readFileSync(filePath, "utf8");

  return source;
}
