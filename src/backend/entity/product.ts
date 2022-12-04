import { db } from '../service/database';
import { store } from '../service/store';

export interface Product {
  _id: string;
  _rev: string;
  type: 'Product';
  name: string;
  price: number;
}

export interface ProductInput {
  name: string;
  price: number;
}

export const loadProducts = (id?: string) => {
  db.find({
    selector: { type: 'Product' },
  }).then((result) => {
    store.products = result.docs as unknown as Product[];
  });
  return id;
};

export const addProduct = (product: ProductInput) => {
  return db
    .post({
      ...product,
      type: 'Product',
    })
    .then((data) => data.id)
    .then(loadProducts)
    .catch(console.error);
};

export const updatePrice = (product: Product, price: number) => {
  return db
    .put({
      ...product,
      price,
    })
    .then(() => {
      loadProducts();
    })
    .catch(console.error);
};
