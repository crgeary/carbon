import path from 'path';
import fs from 'fs-extra';

import { loadConfig } from '../config';
import { run } from '../hooks';
import { normalizePath } from '../routes';

import { createNode, createNodeId, getNodes, createRoute, getRoutes } from '../actions';

import { Actions } from '../..';

export const handler = async ({ dir }: { dir: string }) => {
    loadConfig(dir);
    const actions: Actions = {
        createNode,
        createNodeId,
        getNodes,
        createRoute,
        getRoutes,
    };
    await run('source', { actions });
    await run('transform', { actions });
    await run('create', { actions });
    await run('build', { actions });

    await fs.copy(path.join(dir, 'static'), path.join(dir, 'dist'));

    const routes = getRoutes();
    for (let i = 0; i < routes.length; i++) {
        await fs.outputFile(path.join(dir, 'dist', normalizePath(routes[i].path)), JSON.stringify(routes[i]));
    }

    console.log('done');
};
