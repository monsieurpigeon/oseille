import PouchDb from 'pouchdb';
import find from 'pouchdb-find';
import rel from 'relational-pouch';
import { addCustomer, loadCustomers } from '../entity/customer';
import { addDelivery, loadDeliveries } from '../entity/delivery';
import { addFarm, loadFarm } from '../entity/farm';
import { loadInvoices } from '../entity/invoice';
import { addProduct, loadProducts } from '../entity/product';

PouchDb.plugin(find).plugin(rel);

const DB_NAME = 'hello_world';

export let db = new PouchDb(DB_NAME);
export const relDb = db.setSchema([
  {
    singular: 'farm',
    plural: 'farms',
  },
  {
    singular: 'product',
    plural: 'products',
  },
  {
    singular: 'customer',
    plural: 'customers',
  },
  {
    singular: 'delivery',
    plural: 'deliveries',
    relations: {
      invoice: { belongsTo: 'invoice' },
    },
  },
  {
    singular: 'invoice',
    plural: 'invoices',
    relations: {
      deliveries: { hasMany: 'delivery' },
    },
  },
]);

db.allDocs({ include_docs: true }).then(console.log);
db.changes({
  since: 'now',
  live: true,
})
  .on('change', function (change) {
    console.log('CHANGE', change);
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      loadDatabase();
    }, 300);
  })
  .on('error', function (err) {
    console.log('ERROR', err);
  });

let debounce: NodeJS.Timeout;

export const initDatabase = async () => {
  await addFarm();
  loadFarm();

  // const p1 = await addProduct({ name: 'Tomate', price: 4.2, unit: 'kg' });
  // const p2 = await addProduct({ name: 'Aubergine', price: 4, unit: 'kg' });
  // const p3 = await addProduct({ name: 'Pastèque', price: 4.2, unit: 'piece' });
  // const c1 = await addCustomer({
  //   name: 'Biocoop',
  //   address1: '1 rue du potiron',
  //   address2: '',
  //   zip: '33000',
  //   city: 'Bordeaux',
  // });
  // const c2 = await addCustomer({
  //   name: 'Restaurant super chic',
  //   address1: "1 rue de l'endive",
  //   address2: '',
  //   zip: '33000',
  //   city: 'Bordeaux',
  // });
  // const c3 = await addCustomer({
  //   name: 'Épicerie de parisiens',
  //   address1: '1 rue du topinambour',
  //   address2: '',
  //   zip: '33000',
  //   city: 'Bordeaux',
  // });
  // addDelivery({
  //   customerId: c1.id || '',
  //   deliveredAt: '2023-07-14',
  //   products: [
  //     { productId: p1.id || '', quantity: 17 },
  //     { productId: p2.id || '', quantity: 18.5 },
  //     { productId: p3.id || '', quantity: 19 },
  //   ],
  // }).catch(console.error);

  db.bulkDocs([{ _id: 'init' }]).catch(console.error);
};

export const loadDatabase = () => {
  loadCustomers();
  loadProducts();
  loadDeliveries();
  loadInvoices();
  loadFarm();
};

export const destroyDatabase = () => {
  return db.destroy().then(() => {
    db = new PouchDb(DB_NAME);
    loadDatabase();
  });
};

export function exportData(data: any) {
  const fileData = JSON.stringify(data);
  const blob = new Blob([fileData], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'database.json';
  link.href = url;
  link.click();
}

export function handleImport({ file }: any) {
  if (file) {
    const reader = new FileReader();
    reader.onload = ({ target: { result } }: any) => {
      db.bulkDocs(
        JSON.parse(result),
        { new_edits: false }, // not change revision
        (...args) => console.log('DONE', args),
      );
    };
    reader.readAsText(file);
  }
}
