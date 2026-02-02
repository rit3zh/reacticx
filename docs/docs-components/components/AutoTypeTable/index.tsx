import { Suspense } from "react";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable as FumadocsAutoTypeTable } from "fumadocs-typescript/ui";

var cachedGenerator: ReturnType<typeof createGenerator> | null = null;

function getGenerator(old?: boolean) {
  if (!cachedGenerator) {
    cachedGenerator = createGenerator();
  }
  return cachedGenerator;
}

function AutoTypeTableContent<T extends Record<string, unknown>>(props: T) {
  return (
    <div className="auto-type-table">
      <FumadocsAutoTypeTable {...props} generator={getGenerator()} />
    </div>
  );
}

export function AutoTypeTable<T extends Record<string, unknown>>(props: T) {
  return (
    <Suspense
      fallback={
        <div className="auto-type-table animate-pulse h-20 bg-fd-muted rounded-lg" />
      }
    >
      <AutoTypeTableContent {...props} />
    </Suspense>
  );
}
