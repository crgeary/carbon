import path from "path";

import { Config as IConfig } from "./interfaces";

const load = (): IConfig => {
    const defaultConfig = {
        site: {},
        paths: {
            views: path.join(process.cwd(), "resources/views"),
            presenters: path.join(process.cwd(), "resources/presenters"),
        },
        plugins: [],
    };
    const configPath = path.join(process.cwd(), "carbon.config");
    console.log(configPath);
    const siteConfig: IConfig = require(configPath);
    return Object.assign({}, defaultConfig, siteConfig);
};

const config: IConfig = load();

export default config;
