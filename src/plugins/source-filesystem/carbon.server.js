const path = require("path");
const fs = require("fs-extra");
const recursive = require("recursive-readdir");
const mime = require("mime-types");

exports.source = async ({ actions, plugin }) => {
    const { options } = plugin;

    let files = await recursive(options.path, [`.md`, `.markdown`]);

    await Promise.all(
        files.map(async (file) => {
            const _path = path.parse(file);
            actions.createNode({
                id: actions.createNodeId(file, `carbon:source-filesystem`),
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
                    mediaType: mime.lookup(_path.ext),
                },
            });
        })
    );
};
