import path from "path";
import fs from "fs-extra";

import { loadConfig } from "../config";
import { run } from "../hooks";
import { db } from "../db";
import {
    createNode,
    createNodeId,
    getNodes,
    createRoute,
    getRoutes,
} from "../actions";

import { NodeActions } from "../types";

export default async ({ dir }: { dir: string }) => {
    loadConfig(dir);
    const actions: NodeActions = {
        createNode,
        createNodeId,
        getNodes,
        createRoute,
        getRoutes,
    };
    await run("source", { actions });
    await run("transform", { actions });
    await run("create", { actions });
    await run("build", { actions });

    await fs.copy(path.join(dir, "static"), path.join(dir, "dist"));

    const routes = getRoutes();
    for (let i = 0; i < routes.length; i++) {
        await fs.outputFile(
            path.join(dir, "dist", routes[i].path),
            JSON.stringify(routes[i])
        );
    }

    console.log("done");
};
