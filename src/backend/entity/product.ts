import { db, relDb } from '../service/database';
import { store } from '../service/store';

export interface Product {
  id: string;
  _rev: string;
  name: string;
  unit: Unit;
  price: number;
}

export interface ProductInput {
  name: string;
  unit: Unit;
  price: number;
}

export type Unit = 'kg' | 'piece';

export async function loadProducts() {
  const result = await relDb.rel.find('product');
  store.products = result.products.sort((a: Product, b: Product) => {
    return a.name.localeCompare(b.name);
  });
}

export async function loadProduct(id: string) {
  const result = await relDb.rel.find('product', id);
  return result.products[0];
}

export const addProduct = (product: ProductInput) => {
  return relDb.rel.save('product', product);
};

export const updatePrice = (product: Product, price: number) => {
  return relDb.rel.save('product', { ...product, price });
};
