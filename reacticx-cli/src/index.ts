#!/usr/bin/env node

import { Command } from "commander";
import { add } from "./commands/add.js";
import { list } from "./commands/list.js";
import { init } from "./commands/init.js";

const program = new Command();

program
  .name("reacticx")
  .description("Add beautiful React Native components to your project")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize reacticx in your project")
  .action(init);

program
  .command("list")
  .description("List all available components")
  .option("-c, --category <category>", "Filter by category")
  .action(list);

program
  .command("add")
  .description("Add a component to your project")
  .argument("<component>", "Component name to add")
  .option("-o, --overwrite", "Overwrite existing files", false)
  .option("-d, --dir <directory>", "Target directory")
  .action(add);

program.parse();
