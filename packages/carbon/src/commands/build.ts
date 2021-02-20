import path from 'path';
import fs from 'fs-extra';
import { chunk } from 'lodash';

import { loadConfig } from '../config';
import { run } from '../hooks';
import { normalizePath } from '../routes';
import { getTemplateHandler } from '../templates';
import * as reporter from '../reporter';

import { db } from '../db';
import { query } from '../query';

import { createNode, createNodeId, updateNode, createRoute, getNodeContent, setTemplateHandler } from '../actions';

import { Actions } from '../..';

export const handler = async ({ dir }: { dir: string }) => {
    loadConfig(dir);
    const actions: Actions = {
        createNode,
        createNodeId,
        updateNode,
        createRoute,
        getNodeContent,
        setTemplateHandler,
    };
    await run('bootstrap', { actions, query });
    await run('source', { actions, query });

    const nodes = db.get('nodes').value();
    const nodePromises = nodes.map((node) => run('transform', { actions, query, node }));
    const chunks = chunk(nodePromises, 250);

    for (let i = 0; i < chunks.length; i++) {
        await Promise.all(chunks[i]);
    }

    await run('create', { actions, query });
    await run('build', { actions, query });

    await fs.emptyDir(path.join(dir, 'dist'));
    await fs.copy(path.join(dir, 'static'), path.join(dir, 'dist'));

    const routes = db.get('routes').value();

    for (let i = 0; i < routes.length; i++) {
        const handler = getTemplateHandler(routes[i].template || '');
        await fs.outputFile(
            path.join(dir, 'dist', normalizePath(routes[i].path)),
            await handler(routes[i].template || '', routes[i].context)
        );
    }

    reporter.info('done');
};
