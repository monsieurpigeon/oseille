import { EMPTY_CUSTOMER } from '../../utils/defaults';
import { relDb } from '../service/database';
import { store } from '../service/store';

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

export async function loadCustomers() {
  const result = await relDb.rel.find('customer');
  store.customers = result.customers
    .map((c: Customer) => ({ ...EMPTY_CUSTOMER, ...c }))
    .sort((a: Customer, b: Customer) => {
      return a.name.localeCompare(b.name);
    });
}

export async function loadCustomer(id: string) {
  const result = await relDb.rel.find('customer', id);
  return result.customers[0];
}

export const addCustomer = (customer: CustomerInput) => {
  return relDb.rel.save('customer', customer);
};

export const updateCustomer = (customer: Customer) => {
  return relDb.rel.save('customer', customer);
};
