import micromatch from 'micromatch';

import { db } from './db';

export const fallbackHandler = async (templatePath: string, params: { [key: string]: unknown }): Promise<string> => {
    const template = require(templatePath);
    return await template.render({ context: params });
};

export const getTemplateHandler = (templatePath: string) => {
    const handlers = db.get('templateHandlers').value();
    for (let i = 0; i < handlers.length; i++) {
        if (micromatch.isMatch(templatePath, handlers[i].match)) {
            return handlers[i].handler;
        }
    }
    return fallbackHandler;
};
