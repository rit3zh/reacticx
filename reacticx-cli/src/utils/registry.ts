import type { Registry } from "../typings/index.js";

const REGISTRY_URL = "https://reacticx-ui-components.pages.dev";

export async function getRegistry(): Promise<Registry> {
  const response = await fetch(`${REGISTRY_URL}/registry.json`);

  if (!response.ok) {
    throw new Error("Failed to fetch registry");
  }

  return response.json();
}

export async function getComponentCode(
  componentPath: string,
  fileName: string,
): Promise<string> {
  const cleanPath = componentPath.replace(/^src\/components\//, "");
  const url = `${REGISTRY_URL}/${cleanPath}/${fileName}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${fileName}`);
  }

  return response.text();
}
