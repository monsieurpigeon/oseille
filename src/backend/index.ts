import { db, initDatabase } from './service/database';

db.allDocs({ include_docs: true })
  .then((result) => Promise.all(result.rows.map((doc) => db.remove(doc.doc as any).catch(console.error))))
  .then(initDatabase);

export * from './service/database';
export * from './service/store';
export * from './service/pdf';
export * from './entity/customer';
export * from './entity/product';
export * from './entity/delivery';
export * from './entity/invoice';
export * from './entity/farm';
