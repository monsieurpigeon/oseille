import { relDb } from '../service/database';
import { store } from '../service/store';
import { Customer } from './customer';
import { Product } from './product';

export interface Price {
  id: string;
  _rev: string;
  value: number;
  customer: string;
  product: string;
}

export interface PriceInput {
  value: number;
  customer: Customer | 'DEFAULT';
  product: Product;
}

export async function loadPrices() {
  const result = await relDb.rel.find('price');
  store.prices = result.prices;
}

export const addPrice = (price: PriceInput) => {
  return relDb.rel.save('price', price);
};

export const updatePrice = (price: Price) => {
  return relDb.rel.save('price', price);
};

export const getPrice = ({ customer, product }: { customer: string; product: string }) => {
  return store.prices.find((price) => price.customer === customer && price.product === product);
};

export const deletePrice = (price: Price) => {
  return relDb.rel.del('price', price);
};
