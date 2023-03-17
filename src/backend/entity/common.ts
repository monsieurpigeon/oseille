import { db, relDb } from '../service/database';

export const getObject = (id: string) => db.get(id);

export const getRelObject = (type: string, id: string) => relDb.rel.find(type, id);
