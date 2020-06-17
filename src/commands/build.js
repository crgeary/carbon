const fs = require("fs-extra");
const path = require("path");
const { db } = require("../db");
const { query } = require("../utils/query");
const actions = require("../utils/actions");
const chalk = require("chalk");
const { runHook } = require("../utils/plugins");

const init = async () => {
    console.log(chalk.cyan`build start`);
    // @todo setup config, check for files etc
};

const source = async () => {
    console.log(chalk.cyan`sourcing content`);
    await runHook(`source`, { actions });
};

const transform = async () => {
    console.log(chalk.cyan`transforming content`);
    for (let i = 0; i < db.nodes.length; i++) {
        await runHook(`transform`, {
            node: db.nodes[i],
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
        db.pages.map(async (page) => {
            return fs.outputFile(
                path.resolve(
                    process.cwd(),
                    "public",
                    page.path === "/" ? `` : page.path,
                    "index.html"
                ),
                await require(page.template)({ props: page.context })
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
