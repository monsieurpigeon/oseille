import { initDatabase, loadDatabase } from './service/database';

initDatabase().then(() => {
  loadDatabase();
});

export * from './service/database';
export * from './service/store';
export * from './service/pdf';
export * from './entity/customer';
export * from './entity/product';
export * from './entity/delivery';
export * from './entity/invoice';
export * from './entity/farm';
