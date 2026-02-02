import chalk from "chalk";
import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import { createDefaultConfig } from "../utils/config.js";

export async function init() {
  console.log(chalk.bold("\n🚀 Initialize Reacticx\n"));

  const configPath = path.join(process.cwd(), "component.config.json");
  if (await fs.pathExists(configPath)) {
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "component.config.json already exists. Overwrite?",
      initial: false,
    });

    if (!overwrite) {
      console.log(chalk.yellow("Cancelled"));
      process.exit(0);
    }
  }

  const response = await prompts([
    {
      type: "text",
      name: "outDir",
      message: "Where do you want to install components?",
      initial: "src/shared/ui",
    },
  ]);

  if (!response.outDir) {
    console.log(chalk.yellow("Cancelled"));
    process.exit(0);
  }

  await createDefaultConfig(response.outDir);

  console.log(chalk.green("\n✅ Created component.config.json"));
  console.log(chalk.dim("\nYou can now run:"));
  console.log(chalk.cyan("  npx reacticx add button"));
  console.log();
}
