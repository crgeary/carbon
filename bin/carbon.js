#!/usr/bin/env node

const { program } = require("commander");

const { version } = require("../package.json");

program.version(version);

program
    .command(`build`)
    .description(`Build carbon website`)
    .action(async () => {
        await require("../src/commands/build")();
    });

program
    .command(`develop`)
    .description(`Start a carbon development`)
    .action(async () => {
        await require("../src/commands/develop")();
    });

program.parse(process.argv);
