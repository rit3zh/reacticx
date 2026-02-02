import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { getRegistry, getComponentCode } from "../utils/registry.js";
import { getConfig, validateOrCreateOutDir } from "../utils/config.js";
import type { AddOptions } from "../typings/index.js";

export async function add<T extends string>(
  componentName: T,
  options: AddOptions,
) {
  const config = await getConfig();

  if (!config && !options.dir) {
    console.log(chalk.red("\n❌ No component.config.json found"));
    console.log(chalk.dim("\nCreate one in your project root:"));
    console.log(
      chalk.cyan(JSON.stringify({ outDir: "src/shared/ui" }, null, 2)),
    );
    console.log(chalk.dim("\nOr use --dir flag:"));
    console.log(
      chalk.cyan(`  npx reacticx add ${componentName} --dir src/components`),
    );
    process.exit(1);
  }

  const outDir = options.dir || config!.outDir;

  const spinner = ora(`Fetching ${componentName}...`).start();

  try {
    const registry = await getRegistry();

    const component = registry.components[componentName];

    if (!component) {
      spinner.fail(chalk.red(`Component "${componentName}" not found`));
      console.log(chalk.yellow("\nAvailable components:"));

      const names = Object.keys(registry.components).sort();
      const suggestions = names.filter((n) =>
        n.toLowerCase().includes(componentName.toLowerCase()),
      );

      if (suggestions.length > 0) {
        console.log(chalk.dim("Did you mean:"));
        suggestions.slice(0, 5).forEach((s) => console.log(`  - ${s}`));
      } else {
        console.log(chalk.dim(`Run "npx reacticx list" to see all components`));
      }

      process.exit(1);
    }

    spinner.text = `Adding ${componentName}...`;

    await validateOrCreateOutDir(outDir);

    const componentDir = path.join(
      process.cwd(),
      outDir,
      component.category,
      componentName,
    );

    if ((await fs.pathExists(componentDir)) && !options.overwrite) {
      spinner.warn(
        chalk.yellow(
          `${componentName} already exists. Use --overwrite to replace.`,
        ),
      );
      process.exit(1);
    }

    await fs.ensureDir(componentDir);

    const writtenFiles: string[] = [];

    for (const fileName of component.files) {
      const code = await getComponentCode(component.path, fileName);
      const filePath = path.join(componentDir, fileName);
      await fs.writeFile(filePath, code, "utf-8");
      writtenFiles.push(filePath);
    }

    spinner.succeed(chalk.green(`Added ${componentName}!`));

    console.log(chalk.dim("\nFiles created:"));
    writtenFiles.forEach((file) => {
      const relative = path.relative(process.cwd(), file);
      console.log(chalk.dim(`  ${relative}`));
    });

    console.log();
  } catch (error) {
    spinner.fail(chalk.red(`Failed to add ${componentName}`));
    console.error(error);
    process.exit(1);
  }
}
