import path from "path";
import detect from "detect-port";
import chalk from "chalk";
import * as actions from "../utils/actions";
import Page from "../Page";
import { runHook } from "../utils/plugins";
import { query } from "../utils/query";

import express from "express";
const app = express();

import edge from "edge.js";
import config from "../config";

// --

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

// --

export default async () => {
    app.use(express.static(path.join(process.cwd(), "static")));

    await init();
    await source();
    await transform();
    await create();

    app.get("*", function (req, res) {
        const slug = req.path.replace(/^\/|\/$/g, "");
        const page = actions.getPages().find((p) => p.path === slug);
        if (page) {
            const pageObject = new Page(page);

            res.setHeader("content-type", pageObject.contentType());
            return res.send(pageObject.render());
        }
        return res.send("<h1>404</h1>");
    });

    let port = 3000;

    try {
        const _port = await detect(port);
        if (port !== _port) {
            port = _port;
        }
    } catch (err) {
        console.error(err);
    }

    app.listen(port, () => {
        console.log(chalk.cyan`Listening on http://localhost:${port}`);
    });
};
