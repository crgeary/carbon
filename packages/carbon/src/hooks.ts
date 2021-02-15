import { db } from './db';
import { loadPlugin } from './plugins';

import { HooksList, HookParamsWithoutPlugin } from '..';

export const run = async (name: HooksList, args: HookParamsWithoutPlugin) => {
    const plugins = db.get('plugins').value();
    for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        const instance = loadPlugin(plugin.resolve);
        if (name in instance) {
            await instance[name]({ ...args, plugin });
        }
    }
};
