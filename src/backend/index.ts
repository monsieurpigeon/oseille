import { initDatabase } from './service/database';
import { loadCustomers } from './entity/customer';
import { loadProducts } from './entity/product';
import { loadDeliveries } from './entity/delivery';
import { loadInvoices } from './entity/invoice';
import { loadFarm } from './entity/farm';

initDatabase().then(() => {
  loadCustomers();
  loadProducts();
  loadDeliveries();
  loadInvoices();
  loadFarm();
});

export * from './service/database';
export * from './service/store';
export * from './service/pdf';
export * from './entity/customer';
export * from './entity/product';
export * from './entity/delivery';
export * from './entity/invoice';
export * from './entity/farm';
