import { relDb } from '../service/database';
import { PouchObject } from './common';
import { Customer } from './customer';
import { Product } from './product';

export interface Price extends PouchObject {
  value: number;
  customer: string;
  product: string;
}

export interface PriceInput {
  value: number;
  customer: Customer | string | 'DEFAULT';
  product: Product | string;
}

export const addPrice = (price: PriceInput) => {
  return relDb.rel.save('price', price);
};

export const updatePrice = (price: Price) => {
  return relDb.rel.save('price', price);
};

export const deletePrice = (price: Price) => {
  return relDb.rel.del('price', price);
};

export const getPrices = () =>
  relDb.rel.find('price').then((doc) => {
    return doc.prices;
  });

export const onPricesChange = (listener: (value: PouchDB.Core.ChangesResponseChange<object>) => unknown) =>
  relDb.changes({ since: 'now', live: true }).on('change', (e) => {
    if (e.id.split('_')[0] === 'price') {
      listener(e);
    }
  });
