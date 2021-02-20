import low from 'lowdb';
import Memory from 'lowdb/adapters/Memory';

import { InternalDatabaseSchema } from '..';

const db = low(new Memory<InternalDatabaseSchema>(''));

db.defaults({
    config: {},
    nodes: [],
    routes: [],
    plugins: [],
    templateHandlers: [],
}).write();

export { db };
