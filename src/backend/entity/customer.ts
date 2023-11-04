import { sortAlpha } from '../../utils/sort';
import { relDb } from '../service/database';

export interface Customer {
  id: string;
  _rev: string;
  name: string;
  address1: string;
  address2: string;
  zip: string;
  city: string;
  notes: string;
  phone: string;
}

export interface CustomerInput {
  name: string;
  address1: string;
  address2: string;
  zip: string;
  city: string;
  notes: string;
  phone: string;
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

export const onCustomersChange = (listener: (value: PouchDB.Core.ChangesResponseChange<{}>) => any) =>
  relDb.changes({ since: 'now', live: true }).on('change', (e) => {
    if (e.id.split('_')[0] === 'customer') {
      listener(e);
    }
  });
