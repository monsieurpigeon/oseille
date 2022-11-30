import { db } from './database';
import { store } from './store';

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
  db.get(id).then((result) => {
    console.log({ result });
  });
  return { loading: true };
};
