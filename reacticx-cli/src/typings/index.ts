interface ComponentConfig {
  outDir: string;
}

interface ComponentInfo {
  name: string;
  category: string;
  path: string;
  files: string[];
}

interface Registry {
  version: string;
  totalComponents: number;
  categories: string[];
  components: Record<string, ComponentInfo>;
}

interface AddOptions {
  overwrite?: boolean;
  dir?: string;
}

export type { ComponentConfig, ComponentInfo, Registry, AddOptions };
