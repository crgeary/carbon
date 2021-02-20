const path = require("path");

const allContent = `* [collection == "content"] {
    file,
    internal {
        content
    }
}`;

exports.create = async ({ query, actions }) => {
    const content = await query(allContent);
    content.forEach((file) => {
        actions.createRoute({
            path: file.file.name,
            template: path.resolve("templates/main"),
            context: {
                content: file.internal.content,
            },
        });
    });
};
