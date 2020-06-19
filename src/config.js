const path = require("path");

const load = () => {
    const defaultConfig = {
        site: {},
        paths: {
            views: path.join(process.cwd(), "resources/views"),
            presenters: path.join(process.cwd(), "resources/presenters"),
        },
        plugins: [],
    };
    const configPath = path.join(process.cwd(), "carbon.config");
    const siteConfig = require(configPath);
    return Object.assign({}, defaultConfig, siteConfig);
};

const config = load();

module.exports = config;
