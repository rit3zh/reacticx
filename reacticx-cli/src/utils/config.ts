import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import type { ComponentConfig } from "../typings/index.js";

const CONFIG_FILE = "component.config.json";

export async function getConfig(): Promise<ComponentConfig | null> {
  const configPath = path.join(process.cwd(), CONFIG_FILE);

  if (!(await fs.pathExists(configPath))) {
    return null;
  }

  const config = await fs.readJson(configPath);

  if (!config.outDir) {
    console.log(
      chalk.red(`\n❌ Invalid ${CONFIG_FILE}: missing "outDir" field`),
    );
    console.log(chalk.dim("\nExample config:"));
    console.log(
      chalk.dim(JSON.stringify({ outDir: "src/shared/ui" }, null, 2)),
    );
    process.exit(1);
  }

  return config;
}

export async function validateOrCreateOutDir(outDir: string): Promise<void> {
  const fullPath = path.join(process.cwd(), outDir);

  if (!(await fs.pathExists(fullPath))) {
    await fs.ensureDir(fullPath);
  }
}

export async function createDefaultConfig(
  outDir: string = "src/shared/ui",
): Promise<void> {
  const configPath = path.join(process.cwd(), CONFIG_FILE);

  const config: ComponentConfig = {
    outDir,
  };

  await fs.writeJson(configPath, config, { spaces: 2 });
}
