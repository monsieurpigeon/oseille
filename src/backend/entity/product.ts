import { sortAlpha } from '../../utils/sort';
import { relDb } from '../service/database';

export interface Product {
  id: string;
  _rev: string;
  name: string;
  unit: Unit;
  tva: string;
}

export interface ProductWithPrice extends Product {
  price: number;
}

export interface ProductInput {
  name: string;
  unit: Unit;
  tva: string;
}

export type Unit = 'kg' | 'piece';

export const addProduct = (product: ProductInput) => {
  return relDb.rel.save('product', product);
};

export const updateProduct = (product: Product) => {
  return relDb.rel.save('product', product);
};

export const getProducts = () =>
  relDb.rel.find('product').then((doc) => {
    return doc.products.sort(sortAlpha<Product>('name'));
  });

export const getProductById = (id: string) => relDb.rel.find('product', id).then((doc) => doc.products[0]);

export const onProductsChange = (listener: (value: PouchDB.Core.ChangesResponseChange<{}>) => any) =>
  relDb.changes({ since: 'now', live: true }).on('change', (e) => {
    if (e.id.split('_')[0] === 'product') {
      listener(e);
    }
  });
