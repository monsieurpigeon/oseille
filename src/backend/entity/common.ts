import { db, relDb } from '../service/database';

export const getObject = (id: string) => db.get(id);

export const getRelObject = (type: string, id: string) => relDb.rel.find(type, id);

export interface Address {
  address1: string;
  address2: string;
  zip: string;
  city: string;
}

export interface PouchObject {
  id: string;
  _rev: string;
}
