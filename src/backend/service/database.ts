import PouchDb from 'pouchdb';
import find from 'pouchdb-find';
import rel from 'relational-pouch';
import { loadCustomers } from '../entity/customer';
import { loadDeliveries } from '../entity/delivery';
import { addFarm, loadFarm } from '../entity/farm';
import { loadInvoices } from '../entity/invoice';
import { loadPrices } from '../entity/price';
import { loadProducts } from '../entity/product';

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
    singular: 'price',
    plural: 'prices',
    relations: {
      product: { belongsTo: 'product' },
      customer: { belongsTo: 'customer' },
    },
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
    }, 100);
  })
  .on('error', function (err) {
    console.log('ERROR', err);
  });

let debounce: NodeJS.Timeout;

export const initDatabase = async () => {
  await addFarm();
  loadFarm();

  db.bulkDocs([{ _id: 'init' }]).catch(console.error);
};

export const loadDatabase = () => {
  loadCustomers();
  loadProducts();
  loadDeliveries();
  loadInvoices();
  loadFarm();
  loadPrices();
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
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = ({ target: { result } }: any) => {
        db.bulkDocs(
          JSON.parse(result),
          { new_edits: false }, // not change revision
          (...args) => console.log('DONE', args),
        );
      };
      reader.onloadend = () => resolve(reader.result);
      reader.readAsText(file);
    }
  });
}
