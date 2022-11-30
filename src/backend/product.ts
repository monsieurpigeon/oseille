import { db } from './database';
import { store } from './store';

export interface Product {
  _id: string;
  type: 'Product';
  name: string;
}

export interface ProductInput {
  name: string;
}

export const loadProducts = () => {
  db.find({
    selector: { type: 'Product' },
  }).then((result) => {
    store.products = result.docs as unknown as Product[];
  });
};

export const addProduct = (product: ProductInput) => {
  db.post({
    ...product,
    type: 'Product',
  })
    .then(loadProducts)
    .catch(console.error);
};
