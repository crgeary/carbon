import * as matter from 'gray-matter';
import * as marked from 'marked';

export const transform = async ({ actions: { updateNode }, node }) => {
    const { mediaType } = node.__carbon;
    if (!mediaType || mediaType !== `text/markdown`) {
        return node;
    }

    const doc = matter(node.__carbon.content);
    updateNode({
        ...node,
        __carbon: {
            ...node.__carbon,
            content: marked(doc.content),
        },
        frontmatter: doc.data,
    });
};
