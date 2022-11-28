import { db, store } from '../index';

export interface Product {
  _id: string;
  type: 'Product';
  name: string;
}

export interface ProductInput {
  name: string;
}

export const loadProducts = () => {
  db.changes({
    include_docs: true,
    filter: function (doc) {
      return doc.type === 'Product';
    },
  }).on('complete', (result) => {
    store.products = [...(result.results.map((el) => el.doc) as unknown as Product[])];
  });
};

export const addProduct = (product: ProductInput) => {
  db.post({
    ...product,
    type: 'Product',
  }).catch(console.error);
};
