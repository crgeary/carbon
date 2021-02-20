import { parse, evaluate } from 'groq-js';
import { db } from './db';

import { QueryHandler } from '..';

export const query: QueryHandler = async (input, params, store) => {
    const tree = parse(input);
    const value = await evaluate(tree, { dataset: db.get(store || 'nodes').value(), params });
    return await value.get();
};
