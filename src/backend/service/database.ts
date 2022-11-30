import PouchDb from 'pouchdb';
import find from 'pouchdb-find';

PouchDb.plugin(find);

export const db = new PouchDb('hello_world');
