#!/usr/bin/env node

import { program } from "commander";

import build from "../src/commands/build";

import { version } from "../package.json";

program.version(version);

program
    .command(`build`)
    .description(`Build carbon website for production`)
    .action(async () => {
        await build({ dir: process.cwd() });
    });

program.parse(process.argv);
