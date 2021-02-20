import path from 'path';
import fs from 'fs-extra';
import recursive from 'recursive-readdir';
import mime from 'mime-types';
import { createHash } from 'crypto';
import { chunk } from 'lodash';

import { HookParams } from '@crgeary/carbon';

export const source = async ({ actions, plugin }: HookParams) => {
    const { options } = plugin;

    const createNodeFromPath = async (file: string) => {
        const _path = path.parse(file);
        const content = await fs.readFile(file, `utf8`);
        actions.createNode({
            id: actions.createNodeId(file, `@crgeary/carbon-source-filesystem`),
            collection: options.collection || `default`,
            file: {
                extension: _path.ext.slice(1),
                name: _path.name,
                base: _path.base,
                path: file,
            },
            internal: {
                type: `FILE`,
                mediaType: mime.lookup(_path.ext) || null,
                content: content,
                contentDigest: createHash('md5').update(content).digest('hex'),
            },
        });
    };

    const files = await recursive(options.path, options.ignore || []);
    const chunks = chunk(files, 250);

    for (let i = 0; i < chunks.length; i++) {
        await Promise.all(chunks[i].map(createNodeFromPath));
    }
};
