#!/usr/bin/env node

import { program } from "commander";

import { version } from "../package.json";

program.version(version);

program
    .command(`build`)
    .description(`Build carbon website for production`)
    .action(async () => {
        console.log("Build...");
    });

program.parse(process.argv);
