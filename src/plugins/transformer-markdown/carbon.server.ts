import matter from "gray-matter";
import marked from "marked";

export const transform = async ({ actions, node }) => {
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
