import * as matter from 'gray-matter';
import * as marked from 'marked';

export const transform = async ({ actions: { updateNode, getNodeContent }, node }) => {
    const { mediaType } = node.__carbon;
    if (!mediaType || mediaType !== `text/markdown`) {
        return node;
    }

    const content = await getNodeContent(node);
    const doc = matter(content);
    updateNode({
        ...node,
        __carbon: {
            ...node.__carbon,
            content: marked(doc.content),
        },
        frontmatter: doc.data,
    });
};
