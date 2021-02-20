import path from 'path';

import { db } from './db';

import { Config } from '..';

export const loadConfig = (dir: string): Config => {
    const config = require(path.join(dir, 'carbon.config'));
    db.set('config', config).value();
    let plugins = Array.from(config.plugins);
    plugins.push({ resolve: path.join(dir) });
    db.set('plugins', plugins).value();
    return config;
};
