import low from 'lowdb';
import Memory from 'lowdb/adapters/Memory';

import { InternalDatabaseSchema } from '..';

const db = low(new Memory<InternalDatabaseSchema>(''));

db.defaults({ nodes: [], config: {}, plugins: [], routes: [] }).write();

export { db };
