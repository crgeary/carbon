import { program } from 'commander';
import updateNotifier from 'update-notifier';

import { runLocalCommand } from '../local';

// @ts-ignore
import pkg from '../../package.json';

updateNotifier({ pkg }).notify({ isGlobal: true });

program.version(pkg.version);

program
    .command(`build`)
    .description(`Build carbon website for production`)
    .action(async () => {
        await runLocalCommand('build', { dir: process.cwd() });
    });

program.parse(process.argv);
