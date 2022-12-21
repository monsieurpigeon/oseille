import { db } from '../service/database';

export const getObject = (id: string) => db.get(id);
