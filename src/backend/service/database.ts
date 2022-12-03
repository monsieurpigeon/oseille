import PouchDb from 'pouchdb';
import find from 'pouchdb-find';
import { addProduct } from '../entity/product';
import { addCustomer } from '../entity/customer';
import { addDelivery } from '../entity/delivery';

PouchDb.plugin(find);

export const db = new PouchDb('hello_world');

export const initDatabase = () => {
  db.get('init').catch(async (error) => {
    if (error.status === 404) {
      const p1 = await addProduct({ name: 'Tomate', price: 42 });
      const p2 = await addProduct({ name: 'Aubergine', price: 42 });
      const p3 = await addProduct({ name: 'Pasteque', price: 42 });
      const c1 = await addCustomer({ name: 'Pfizer' });
      addDelivery({
        customerId: c1 || '',
        products: [
          { productId: p1 || '', quantity: 17 },
          { productId: p2 || '', quantity: 18 },
          { productId: p3 || '', quantity: 19 },
        ],
      }).catch(console.error);

      db.bulkDocs([{ _id: 'init' }]).catch(console.error);
    }
  });
};
