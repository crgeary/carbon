import micromatch from 'micromatch';

import { db } from './db';
import { TemplateHandlerMatch } from '..';

export const getTemplateHandler = (templatePath: string) => {
    const handlers = db.get('templateHandlers').value();
    for (let i = 0; i < handlers.length; i++) {
        if (micromatch.isMatch(templatePath, handlers[i].match)) {
            return handlers[i].handler;
        }
    }
    return () => {};
};
