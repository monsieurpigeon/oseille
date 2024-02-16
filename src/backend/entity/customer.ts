import { sortAlpha } from '../../utils/sort';
import { relDb } from '../service/database';
import { Address, PouchObject } from './common';

export interface Customer extends PouchObject, Address {
  name: string;
  notes: string;
  phone: string;
  tvaRef: string;
}

export interface CustomerInput extends Address {
  name: string;
  notes: string;
  phone: string;
  tvaRef?: string;
}

export const addCustomer = (customer: CustomerInput) => {
  return relDb.rel.save('customer', customer);
};

export const updateCustomer = (customer: Customer) => {
  return relDb.rel.save('customer', customer);
};

export const getCustomers = () =>
  relDb.rel.find('customer').then((doc) => doc.customers.sort(sortAlpha<Customer>('name')));

export const getCustomerById = (id: string): Promise<Customer> =>
  relDb.rel.find('Icustomer', id).then((doc) => doc.Icustomers[0]);

export const onCustomersChange = (listener: (value: PouchDB.Core.ChangesResponseChange<object>) => unknown) =>
  relDb.changes({ since: 'now', live: true }).on('change', (e) => {
    if (e.id.split('_')[0] === 'customer') {
      listener(e);
    }
  });
