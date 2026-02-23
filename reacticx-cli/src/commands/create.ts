import chalk from "chalk";
import prompts from "prompts";
import fs from "fs-extra";
import path from "path";
import { execSync, spawn } from "child_process";

const EXPO_TEMPLATES = [
  {
    title: "Blank — TypeScript",
    value: "blank-typescript",
    description: "Minimal Expo app with TypeScript (recommended)",
  },
  {
    title: "Blank",
    value: "blank",
    description: "Minimal Expo app with JavaScript",
  },
  {
    title: "Tabs — Expo Router",
    value: "tabs",
    description: "Expo Router with file-based routing and tab navigation",
  },
];

type PM = "bun" | "pnpm" | "yarn" | "npm";

const PM_LABELS: Record<PM, string> = {
  bun: "bun",
  pnpm: "pnpm",
  yarn: "yarn",
  npm: "npm",
};

const PM_CREATE_PREFIX: Record<PM, string> = {
  bun: "bunx create-expo-app",
  pnpm: "pnpm create expo-app",
  yarn: "yarn create expo-app",
  npm: "npx create-expo-app",
};

const PM_EXEC: Record<PM, string> = {
  bun: "bunx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  npm: "npx",
};

function detectPackageManager(): PM {
  for (const pm of ["bun", "pnpm", "yarn"] as PM[]) {
    try {
      execSync(`${pm} --version`, { stdio: "ignore" });
      return pm;
    } catch {}
  }
  return "npm";
}

function runCommand(cmd: string, cwd?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, {
      cwd,
      stdio: "inherit",
      shell: true,
    });
    proc.on("close", (code) => {
      code === 0
        ? resolve()
        : reject(new Error(`Process exited with code ${code}`));
    });
    proc.on("error", reject);
  });
}

function toSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function defaultBundleId(appName: string) {
  const safe = appName.replace(/[^a-z0-9]/gi, "").toLowerCase();
  return `com.${safe}`;
}

export async function create() {
  console.log(chalk.bold("\n✨  Create a new Expo app with Reacticx\n"));

  const detectedPM = detectPackageManager();
  const pmOrder: PM[] = ["bun", "pnpm", "yarn", "npm"];

  const response = await prompts(
    [
      {
        type: "text",
        name: "appName",
        message: "App name",
        initial: "my-expo-app",
        validate: (v: string) =>
          v.trim().length > 0 ? true : "App name cannot be empty",
        format: (v: string) => toSlug(v) || v.trim(),
      },
      {
        type: "text",
        name: "bundleId",
        message: "Bundle / package ID  (leave blank to skip)",
        initial: "",
      },
      {
        type: "select",
        name: "template",
        message: "Template",
        choices: EXPO_TEMPLATES.map((t) => ({
          title: t.title,
          value: t.value,
          description: t.description,
        })),
        initial: 0,
      },
      {
        type: "select",
        name: "packageManager",
        message: "Package manager",
        choices: pmOrder.map((pm) => ({
          title:
            pm === detectedPM
              ? `${PM_LABELS[pm]}  ${chalk.green("← detected")}`
              : PM_LABELS[pm],
          value: pm,
        })),
        initial: pmOrder.indexOf(detectedPM),
      },
      {
        type: "confirm",
        name: "runInit",
        message: (_, values) =>
          `Run  ${PM_EXEC[values.packageManager as PM]} reacticx init  inside the new project?`,
        initial: true,
      },
    ],
    {
      onCancel() {
        console.log(chalk.yellow("\nCancelled.\n"));
        process.exit(0);
      },
    },
  );

  const { appName, bundleId, template, packageManager, runInit } = response;
  if (!appName) {
    console.log(chalk.yellow("\nCancelled.\n"));
    process.exit(0);
  }

  const createCmd = [
    PM_CREATE_PREFIX[packageManager as PM],
    appName,
    "--template",
    template,
  ].join(" ");

  console.log(chalk.bold("\n┌ Creating Expo app\n│"));
  console.log(chalk.dim(`│  ${createCmd}\n│`));

  try {
    await runCommand(createCmd);
  } catch {
    console.error(
      chalk.red(
        "\n✗  Failed to create the Expo app. Check the output above for details.\n",
      ),
    );
    process.exit(1);
  }

  const appDir = path.join(process.cwd(), appName);

  const resolvedBundleId =
    bundleId && bundleId.trim() ? bundleId.trim() : defaultBundleId(appName);

  if (bundleId && bundleId.trim()) {
    const appJsonPath = path.join(appDir, "app.json");
    if (await fs.pathExists(appJsonPath)) {
      try {
        const appJson = await fs.readJson(appJsonPath);
        if (!appJson.expo) appJson.expo = {};
        if (!appJson.expo.ios) appJson.expo.ios = {};
        if (!appJson.expo.android) appJson.expo.android = {};
        appJson.expo.ios.bundleIdentifier = resolvedBundleId;
        appJson.expo.android.package = resolvedBundleId;
        await fs.writeJson(appJsonPath, appJson, { spaces: 2 });
        console.log(
          chalk.dim(
            `\n│  Updated app.json → bundle ID: ${chalk.white(resolvedBundleId)}`,
          ),
        );
      } catch {
        console.log(
          chalk.yellow(
            "\n│  Could not patch app.json — set the bundle ID manually.",
          ),
        );
      }
    }
  }

  const exec = PM_EXEC[packageManager as PM];

  if (runInit) {
    console.log(chalk.bold("\n├ Initializing Reacticx\n│"));
    try {
      await runCommand(`${exec} reacticx init`, appDir);
    } catch {
      console.log(
        chalk.yellow("\n│  reacticx init failed — run it manually:") +
          chalk.cyan(`\n│    cd ${appName} && ${exec} reacticx init`),
      );
    }
  }

  console.log(chalk.bold.green("\n└ All done! 🎉\n"));
  console.log(chalk.dim("  Next steps:\n"));
  console.log(chalk.cyan(`    cd ${appName}`));
  if (!runInit) {
    console.log(chalk.cyan(`    ${exec} reacticx init`));
  }
  console.log(chalk.cyan(`    ${exec} reacticx add button`));
  console.log();
}
