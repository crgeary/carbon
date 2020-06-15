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

program.parse(process.argv);
