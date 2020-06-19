const fs = require("fs-extra");
const path = require("path");
const { query } = require("../utils/query");
const actions = require("../utils/actions");
const chalk = require("chalk");
const { runHook } = require("../utils/plugins");
const edge = require("edge.js");

const init = async () => {
    console.log(chalk.cyan`build start`);
    edge.registerViews(path.join(process.cwd(), "resources/views"));
    edge.registerPresenters(path.join(process.cwd(), "resources/presenters"));
};

const source = async () => {
    console.log(chalk.cyan`sourcing content`);
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

    await Promise.all(
        actions.getPages().map(async (page) => {
            return fs.outputFile(
                path.resolve(
                    process.cwd(),
                    "public",
                    page.path === "/" ? `` : page.path,
                    "index.html"
                ),
                edge.render(page.template, page.context)
            );
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
