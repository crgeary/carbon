import path from 'path';
import fs from 'fs-extra';
import { chunk } from 'lodash';

import { loadConfig } from '../config';
import { run } from '../hooks';
import { normalizePath } from '../routes';

import { createNode, createNodeId, updateNode, getNodes, createRoute, getRoutes, getNodeContent } from '../actions';

import { Actions } from '../..';

export const handler = async ({ dir }: { dir: string }) => {
    loadConfig(dir);
    const actions: Actions = {
        createNode,
        createNodeId,
        updateNode,
        getNodes,
        createRoute,
        getRoutes,
        getNodeContent,
    };
    await run('source', { actions });

    const nodes = getNodes().map((node) => run('transform', { actions, node }));
    const chunks = chunk(nodes, 250);

    for (let i = 0; i < chunks.length; i++) {
        await Promise.all(chunks[i]);
    }

    await run('create', { actions });
    await run('build', { actions });

    await fs.emptyDir(path.join(dir, 'dist'));
    await fs.copy(path.join(dir, 'static'), path.join(dir, 'dist'));

    const routes = getRoutes();
    for (let i = 0; i < routes.length; i++) {
        await fs.outputFile(path.join(dir, 'dist', normalizePath(routes[i].path)), JSON.stringify(routes[i]));
    }

    console.log('done');
};
