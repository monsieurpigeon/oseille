import { db, store } from '../index';
import { ProductInput } from './Product';

export interface Customer {
  _id: string;
  type: 'Customer';
  name: string;
}

export interface CustomerInput {
  name: string;
}

export const loadCustomers = () => {
  db.changes({
    include_docs: true,
    filter: function (doc) {
      return doc.type === 'Customer';
    },
  }).on('complete', (result) => {
    store.customers = [...(result.results.map((el) => el.doc) as unknown as Customer[])];
  });
};

export const getCustomer = (id: string) => {
  db.get(id).then((result) => {
    console.log({ result });
  });
  return { loading: true };
};

export const addCustomer = (customer: ProductInput) => {
  db.post({
    ...customer,
    type: 'Customer',
  }).catch(console.error);
};
