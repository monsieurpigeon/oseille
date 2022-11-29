import PouchDb from 'pouchdb';
import PouchDB from 'pouchdb';
import find from 'pouchdb-find';
import { proxy } from 'valtio';

PouchDb.plugin(find);
export const db = new PouchDB('hello_world');

interface Store {
  products: Product[];
  customers: Customer[];
}

export const store = proxy<Store>({
  products: [],
  customers: [],
});

export const initDatabase = () => {
  db.get('init').catch((error) => {
    if (error.status === 404) {
      console.log('MAKE INIT');
      db.bulkDocs([
        { type: 'Product', _id: '1', name: 'Tomate' },
        { type: 'Product', _id: '2', name: 'Carotte' },
        { type: 'Product', _id: '3', name: 'Courgette' },
        { type: 'Customer', _id: '4', name: 'Biocoop' },
        {
          type: 'Contract',
          customerId: '4',
          products: [
            { productId: '1', quantity: '17' },
            { productId: '2', quantity: '24' },
            { productId: '3', quantity: '33' },
          ],
        },
        { _id: 'init' },
      ])
        .then((result) => {
          console.log({ result });
        })
        .catch(console.error);
    }
  });
};

export interface Product {
  _id: string;
  type: 'Product';
  name: string;
}

export interface ProductInput {
  name: string;
}

export const loadProducts = () => {
  db.changes({
    include_docs: true,
    filter: function (doc) {
      return doc.type === 'Product';
    },
  }).on('complete', (result) => {
    store.products = [...(result.results.map((el) => el.doc) as unknown as Product[])];
  });
};

export const addProduct = (product: ProductInput) => {
  db.post({
    ...product,
    type: 'Product',
  }).catch(console.error);
};

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
