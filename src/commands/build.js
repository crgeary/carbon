const fs = require("fs-extra");
const path = require("path");
const { query } = require("../utils/query");
const actions = require("../utils/actions");
const chalk = require("chalk");
const { runHook } = require("../utils/plugins");
const edge = require("edge.js");
const Page = require("../Page");
const config = require("../config");

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

module.exports = async () => {
    await init();
    await source();
    await transform();
    await create();
    await build();
    await finish();
};
