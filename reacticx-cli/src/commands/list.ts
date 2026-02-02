import chalk from "chalk";
import ora from "ora";
import { getRegistry } from "../utils/registry.js";

export async function list(options: { category?: string }) {
  const spinner = ora("Fetching components...").start();

  try {
    const registry = await getRegistry();
    spinner.stop();

    console.log(
      chalk.bold(`\n📦 Reacticx UI Components (v${registry.version})\n`),
    );
    console.log(chalk.dim(`Total: ${registry.totalComponents} components\n`));

    const byCategory: Record<string, string[]> = {};

    for (const [name, info] of Object.entries(registry.components)) {
      if (options.category && info.category !== options.category) {
        continue;
      }

      if (!byCategory[info.category]) {
        byCategory[info.category] = [];
      }
      byCategory[info.category].push(name);
    }
    for (const [category, components] of Object.entries(byCategory).sort()) {
      console.log(chalk.cyan.bold(`${category}/`));
      components.sort().forEach((name) => {
        console.log(chalk.white(`  ${name}`));
      });
      console.log();
    }
    console.log(
      chalk.dim("Run `npx reacticx add <component>` to add a component\n"),
    );
  } catch (error) {
    spinner.fail(chalk.red("Failed to fetch components"));
    console.error(error);
    process.exit(1);
  }
}
