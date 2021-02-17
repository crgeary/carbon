import * as matter from 'gray-matter';
import * as marked from 'marked';

import { HookParams } from '@crgeary/carbon';

export const transform = async ({ actions, node, plugin }: HookParams) => {
    const { mediaType } = node.internal;
    if (!mediaType || mediaType !== `text/markdown`) {
        return node;
    }

    marked.setOptions(plugin.options.markedOptions || {});

    const content = await actions.getNodeContent(node);
    const doc = matter(content);
    actions.updateNode({
        ...node,
        internal: {
            ...node.internal,
            content: marked(doc.content),
        },
        frontmatter: doc.data,
    });
};
