import { db } from "./db";
import { loadPlugin } from "./plugins";

import { NodeHooksList, NodeHookParams } from "./types";

export const run = async (name: NodeHooksList, args: NodeHookParams) => {
    const plugins = db.get("plugins").value();
    for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        const instance = loadPlugin(plugin.resolve);
        if (name in instance) {
            await instance[name]({ ...args, plugin });
        }
    }
};
