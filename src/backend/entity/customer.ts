import { db } from '../service/database';
import { store } from '../service/store';

export interface Customer {
  _id: string;
  type: 'Customer';
  name: string;
}

export interface CustomerInput {
  name: string;
}

export const loadCustomers = (id?: string) => {
  db.find({
    selector: { type: 'Customer' },
  }).then((result) => {
    store.customers = result.docs as unknown as Customer[];
  });
  return id;
};
export const addCustomer = (customer: CustomerInput) => {
  return db
    .post({
      ...customer,
      type: 'Customer',
    })
    .then((data) => data.id)
    .catch(console.error);
};

export const getCustomer = (id: string) => {
  return db.get(id).then((result) => {
    store.customer = result as unknown as Customer;
  });
};
