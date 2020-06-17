const matter = require("gray-matter");
const marked = require("marked");

exports.transform = async ({ actions, node }) => {
    const { mediaType } = node.__carbon;
    if (!mediaType || mediaType !== `text/markdown`) {
        return node;
    }
    const doc = matter(node.content);
    actions.updateNode({
        ...node,
        content: marked(doc.content),
        frontmatter: doc.data,
    });
};
