import { db, relDb } from '../service/database';
import { store } from '../service/store';

export interface Customer {
  id: string;
  name: string;
  address1: string;
  address2: string;
  zip: string;
  city: string;
}

export interface CustomerInput {
  name: string;
  address1: string;
  address2: string;
  zip: string;
  city: string;
}

export async function loadCustomers() {
  const result = await relDb.rel.find('customer');
  store.customers = result.customers.sort((a: Customer, b: Customer) => {
    return a.name.localeCompare(b.name);
  });
}

export async function loadCustomer(id: string) {
  return await relDb.rel.find('customer', id);
}

export const addCustomer = (customer: CustomerInput) => {
  return relDb.rel.save('customer', customer);
};
