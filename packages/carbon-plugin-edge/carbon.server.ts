// @ts-ignore
import edge from 'edge.js';
import path from 'path';

import { HookParams } from '@crgeary/carbon';

const renderEdge = (templatePath: string, params: { [key: string]: unknown }) => {
    return edge.render(templatePath, params);
};
exports.bootstrap = async ({ actions, plugin }: HookParams) => {
    const { options } = plugin;
    edge.registerViews(options.viewPath);
    actions.setTemplateHandler(renderEdge, {
        match: options.match || ['**/*.edge'],
    });
};
