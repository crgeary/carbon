import { program } from "commander";
import updateNotifier from "update-notifier";

import { hasLocalCarbon, runLocalCommand } from "../local";

import pkg from "../../package.json";

updateNotifier({ pkg }).notify({ isGlobal: true });

program.version(pkg.version);

program
    .command(`build`)
    .description(`Build carbon website for production`)
    .action(async () => {
        if (!hasLocalCarbon()) {
            throw new Error("Command must be run within a Carbon project.");
        }
        await runLocalCommand("build", { dir: process.cwd() });
    });

program.parse(process.argv);
