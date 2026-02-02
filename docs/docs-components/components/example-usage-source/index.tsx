import fs from "node:fs";
import path from "node:path";
import type * as React from "react";
import { ComponentSourceClient } from "@/docs-components/components/components-source/client";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string;
  code?: string;
  lang?: string;
}

/**
 * Strips template literal backticks from code string
 * Handles: `code here` or `code here`;
 */
function stripTemplateLiteral(code: string): string {
  const trimmed = code.trim();

  // Check if wrapped in template literal backticks
  if (
    trimmed.startsWith("`") &&
    (trimmed.endsWith("`") || trimmed.endsWith("`;"))
  ) {
    // Remove starting backtick
    let result = trimmed.slice(1);

    // Remove ending backtick (and optional semicolon)
    if (result.endsWith("`;")) {
      result = result.slice(0, -2);
    } else if (result.endsWith("`")) {
      result = result.slice(0, -1);
    }

    return result.trim();
  }

  return trimmed;
}

export function ExampleComponentSource({
  name,
  src,
  code,
  lang = "tsx",
  children,
  className,
  ...props
}: ComponentSourceProps) {
  let sourceCode: string | null = null;

  // Priority 1: Use inline code prop if provided
  if (code) {
    sourceCode = stripTemplateLiteral(code);
  }
  // Priority 2: Check if children is a string
  else if (typeof children === "string") {
    sourceCode = stripTemplateLiteral(children);
  }
  // Priority 3: Try to read source from file
  else if (name || src) {
    try {
      let filePath: string;

      if (src) {
        filePath = path.join(process.cwd(), src);
      } else if (name) {
        filePath = path.join(
          process.cwd(),
          "react-native-usage",
          `${name}.tsx`,
        );
      } else {
        filePath = "";
      }

      if (filePath && fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        sourceCode = stripTemplateLiteral(fileContent);
      }
    } catch (error) {
      console.error("Error reading component source:", error);
    }
  }

  return (
    <ComponentSourceClient className={className} {...props}>
      {sourceCode ? (
        <DynamicCodeBlock lang={lang} code={sourceCode} />
      ) : (
        children
      )}
    </ComponentSourceClient>
  );
}
