import { loadFarm } from './entity/farm';
import { initDatabase, loadDatabase } from './service/database';

loadFarm().then((data) => {
  console.log({ data });
  if (!data) {
    initDatabase().then(() => {
      loadDatabase();
    });
  }
});

loadDatabase();

export * from './service/database';
export * from './service/store';
export * from './service/pdf';
export * from './entity/customer';
export * from './entity/product';
export * from './entity/delivery';
export * from './entity/invoice';
export * from './entity/farm';
