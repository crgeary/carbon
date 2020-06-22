import fs from "fs-extra";
import path from "path";
import { query } from "../utils/query";
import * as actions from "../utils/actions";
import chalk from "chalk";
import { runHook } from "../utils/plugins";
import edge from "edge.js";
import Page from "../Page";
import config from "../config";

const init = async () => {
    console.log(chalk.cyan`build start`);
    edge.registerViews(config.paths.views);
    edge.registerPresenters(config.paths.presenters);
};

const source = async () => {
    console.log(chalk.cyan`sourcing content`);
    actions.createNode({
        ...config.site,
        id: actions.createNodeId(process.cwd(), `carbon:config`),
        __carbon: {
            type: `CONFIG`,
        },
    });
    await runHook(`source`, { actions });
};

const transform = async () => {
    console.log(chalk.cyan`transforming content`);
    const nodes = actions.getNodes();
    for (let i = 0; i < nodes.length; i++) {
        await runHook(`transform`, {
            node: nodes[i],
            actions,
            query,
        });
    }
};

const create = async () => {
    console.log(chalk.cyan`creating pages`);
    await runHook(`create`, { actions, query });
};

const build = async () => {
    console.log(chalk.cyan`building site`);
    await runHook(`build`);

    await fs.copy(
        path.join(process.cwd(), "static"),
        path.join(process.cwd(), "public")
    );

    await Promise.all(
        actions.getPages().map(async (p) => {
            const page = new Page(p);
            return fs.outputFile(page.absolutePath(), page.render());
        })
    );
};

const finish = async () => {
    console.log(chalk.cyan`build finish`);
};

export default async () => {
    await init();
    await source();
    await transform();
    await create();
    await build();
    await finish();
};
