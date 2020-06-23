import path from "path";

import { Config as IConfig } from "../interfaces";

const config: IConfig = require(path.join(process.cwd(), `carbon.config`));

const carbonFile = `carbon.server`;

const isCarbonPlugin = (name: string): boolean => {
    return name.startsWith(`carbon:`);
};

const getPluginRequirePath = (name: string): string => {
    if (isCarbonPlugin(name)) {
        return path.join(`../plugins`, name.slice(7), carbonFile);
    }
    return name;
};

const runHook = async (hook: string, data?: object) => {
    const { plugins } = config;
    for (let i = 0; i < plugins.length; i++) {
        const carbonServer: object = require(getPluginRequirePath(
            plugins[i].resolve
        ));
        if (hook in carbonServer) {
            await carbonServer[hook]({
                ...data,
                plugin: {
                    options: plugins[i].options,
                },
            });
        }
    }
    const siteCarbonServer: object = require(path.join(
        process.cwd(),
        carbonFile
    ));
    if (hook in siteCarbonServer) {
        await siteCarbonServer[hook](data);
    }
};

export { runHook };
