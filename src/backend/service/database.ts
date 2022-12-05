import PouchDb from 'pouchdb';
import find from 'pouchdb-find';
import { addProduct, loadProducts } from '../entity/product';
import { addCustomer, loadCustomers } from '../entity/customer';
import { addDelivery, loadDeliveries } from '../entity/delivery';
import { loadInvoices } from '../entity/invoice';
import { addFarm, loadFarm } from '../entity/farm';

PouchDb.plugin(find);

const DB_NAME = 'hello_world';

export let db = new PouchDb(DB_NAME);

db.allDocs({ include_docs: true }).then(console.log);

export const initDatabase = () => {
  return db.destroy().then(async () => {
    db = new PouchDb(DB_NAME);

    await addFarm();

    const p1 = await addProduct({ name: 'Tomate', price: 0.42, unit: 'kg' });
    const p2 = await addProduct({ name: 'Aubergine', price: 4, unit: 'kg' });
    const p3 = await addProduct({ name: 'Pasteque', price: 42, unit: 'piece' });
    const c1 = await addCustomer({ name: 'Biocoop' });
    const c2 = await addCustomer({ name: 'Restaurant super chic' });
    const c3 = await addCustomer({ name: 'Epicerie de parisiens' });
    addDelivery({
      customerId: c1 || '',
      products: [
        { productId: p1 || '', quantity: 17 },
        { productId: p2 || '', quantity: 18.5 },
        { productId: p3 || '', quantity: 19 },
      ],
    }).catch(console.error);

    db.bulkDocs([{ _id: 'init' }]).catch(console.error);
  });
};

export const loadDatabase = () => {
  loadCustomers();
  loadProducts();
  loadDeliveries();
  loadInvoices();
  loadFarm();
};

export const destroyDatabase = () => {
  return db.destroy().then(() => {
    db = new PouchDb(DB_NAME);
    loadDatabase();
  });
};
