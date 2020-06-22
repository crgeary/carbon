#!/usr/bin/env node

import { program } from "commander";

import build from "../src/commands/build";
import develop from "../src/commands/develop";

import { version } from "../package.json";

program.version(version);

program
    .command(`build`)
    .description(`Build carbon website`)
    .action(async () => {
        await build();
    });

program
    .command(`develop`)
    .description(`Start a carbon development`)
    .action(async () => {
        await develop();
    });

program.parse(process.argv);
