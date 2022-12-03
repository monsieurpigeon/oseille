import { db } from './service/database';

export const initDatabase = () => {
  db.get('init').catch((error) => {
    if (error.status === 404) {
      db.bulkDocs([
        { type: 'Product', _id: '1', name: 'Tomate' },
        { type: 'Product', _id: '2', name: 'Carotte' },
        { type: 'Product', _id: '3', name: 'Courgette' },
        { type: 'Customer', _id: '4', name: 'Biocoop' },
        {
          type: 'Delivery',
          customerId: '4',
          products: [
            { productId: '1', quantity: '17' },
            { productId: '2', quantity: '24' },
            { productId: '3', quantity: '33' },
          ],
        },
        { _id: 'init' },
      ]).catch(console.error);
    }
  });
};

export * from './service/store';
export * from './entity/customer';
export * from './entity/product';
export * from './entity/delivery';
