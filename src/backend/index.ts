import { db } from './service/database';

db.allDocs({ include_docs: true }).then(console.log);

export * from './service/database';
export * from './service/store';
export * from './service/pdf';
export * from './entity/customer';
export * from './entity/product';
export * from './entity/delivery';
export * from './entity/invoice';
