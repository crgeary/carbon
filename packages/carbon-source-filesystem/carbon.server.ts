import path from "path";
import fs from "fs-extra";
import recursive from "recursive-readdir";
import mime from "mime-types";

import { HookParams } from "@crgeary/carbon";

export const source = async ({ actions, plugin }: HookParams) => {
    const { options } = plugin;

    let files = await recursive(options.path, [`.md`, `.markdown`, `.html`]);

    await Promise.all(
        files.map(async (file) => {
            const _path = path.parse(file);
            actions.createNode({
                id: actions.createNodeId(
                    file,
                    `@crgeary/carbon-source-filesystem`
                ),
                content: await fs.readFile(file, `utf8`),
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
                },
            });
        })
    );
};
