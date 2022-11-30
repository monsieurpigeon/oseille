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

export const loadCustomers = () => {
  db.find({
    selector: { type: 'Customer' },
  }).then((result) => {
    store.customers = result.docs as unknown as Customer[];
  });
};
export const addCustomer = (customer: CustomerInput) => {
  db.post({
    ...customer,
    type: 'Customer',
  })
    .then(loadCustomers)
    .catch(console.error);
};

export const getCustomer = (id: string) => {
  return db.get(id).then((result) => {
    store.customer = result as unknown as Customer;
  });
};
