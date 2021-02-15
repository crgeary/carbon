import * as matter from 'gray-matter';
import * as marked from 'marked';

import { HookParams } from '@crgeary/carbon';

export const transform = async ({ actions, node, plugin }: HookParams) => {
    const { mediaType } = node.__carbon;
    if (!mediaType || mediaType !== `text/markdown`) {
        return node;
    }

    marked.setOptions(plugin.options.markedOptions || {});

    const content = await actions.getNodeContent(node);
    const doc = matter(content);
    actions.updateNode({
        ...node,
        __carbon: {
            ...node.__carbon,
            content: marked(doc.content),
        },
        frontmatter: doc.data,
    });
};
