const path = require("path");
const config = require(path.join(process.cwd(), `carbon.config`));

const carbonFile = `carbon.server`;

const isCarbonPlugin = (name) => {
    return name.startsWith(`carbon:`);
};

const getPluginRequirePath = (name) => {
    if (isCarbonPlugin(name)) {
        return path.join(`../plugins`, name.slice(7), carbonFile);
    }
    return name;
};

const runHook = async (hook, data) => {
    const { plugins } = config;
    for (let i = 0; i < plugins.length; i++) {
        const carbonServer = require(getPluginRequirePath(plugins[i].resolve));
        if (hook in carbonServer) {
            await carbonServer[hook]({
                ...data,
                plugin: {
                    options: plugins[i].options,
                },
            });
        }
    }
    const siteCarbonServer = require(path.join(process.cwd(), carbonFile));
    if (hook in siteCarbonServer) {
        await siteCarbonServer[hook](data);
    }
};

exports.runHook = runHook;
