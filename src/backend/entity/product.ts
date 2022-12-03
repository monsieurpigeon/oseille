import { db } from '../service/database';
import { store } from '../service/store';

export interface Product {
  _id: string;
  type: 'Product';
  name: string;
  price: number;
}

export interface ProductInput {
  name: string;
  price: number;
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
