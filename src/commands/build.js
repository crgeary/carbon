const fs = require("fs-extra");
const path = require("path");
const matter = require("gray-matter");
const marked = require("marked");
const recursive = require("recursive-readdir");
const { db } = require("../db");
const { query } = require("../utils/query");
const actions = require("../utils/actions");
const chalk = require("chalk");
const mime = require("mime-types");

const sourceMarkdown = async (contentPath) => {
    let files = await recursive(contentPath, [`.md`]);
    await Promise.all(
        files.map(async (file) => {
            const parsedFile = path.parse(file);
            actions.createNode({
                id: actions.createNodeId(file, `markdown`),
                content: await fs.readFile(file, "utf8"),
                file: {
                    extension: parsedFile.ext.slice(1),
                    name: parsedFile.name,
                    base: parsedFile.base,
                    path: file,
                },
                __carbon: {
                    type: `Markdown`,
                    mediaType: mime.lookup(parsedFile.ext),
                },
            });
        })
    );
};

const transformMarkdown = async () => {
    for (let i = 0; i < db.nodes.length; i++) {
        const doc = matter(db.nodes[i].content);
        db.nodes[i] = {
            ...db.nodes[i],
            frontmatter: doc.data,
            content: marked(doc.content),
        };
    }
};

const runHook = async (hook, data) => {
    const js = require(path.join(process.cwd(), "/carbon.js"));
    if (hook in js) {
        await js.onCreate(data);
    }
};

module.exports = async () => {
    console.log(chalk.cyan`build start`);

    await sourceMarkdown(path.join(process.cwd(), "/content"));
    await transformMarkdown();

    await runHook(`onCreate`, { actions, query });

    await Promise.all(
        db.pages.map((page) => {
            return fs.outputFile(
                path.resolve(
                    process.cwd(),
                    "public",
                    page.path === "/" ? `` : page.path,
                    "index.html"
                ),
                require(page.template)({ props: page.context })
            );
        })
    );

    console.log(chalk.cyan`build finish`);
};
