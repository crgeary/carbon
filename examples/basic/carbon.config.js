const path = require("path");

module.exports = {
    plugins: [
        {
            resolve: `@crgeary/carbon-source-filesystem`,
            options: {
                path: path.resolve("content"),
                collection: "content",
            },
        },
    ],
};
