import path from 'path';
import fs from 'fs-extra';
import recursive from 'recursive-readdir';
import mime from 'mime-types';
import { createHash } from 'crypto';

import { HookParams } from '@crgeary/carbon';

export const source = async ({ actions, plugin }: HookParams) => {
    const { options } = plugin;

    let files = await recursive(options.path, options.ignore || []);

    await Promise.all(
        files.map(async (file) => {
            const _path = path.parse(file);
            const content = await fs.readFile(file, `utf8`);
            actions.createNode({
                id: actions.createNodeId(file, `@crgeary/carbon-source-filesystem`),

                collection: options.collection,
                file: {
                    extension: _path.ext.slice(1),
                    name: _path.name,
                    base: _path.base,
                    path: file,
                },
                __carbon: {
                    type: `FILE`,
                    mediaType: mime.lookup(_path.ext) || null,
                    content: content,
                    contentDigest: createHash('md5').update(content).digest('hex'),
                },
            });
        })
    );
};
