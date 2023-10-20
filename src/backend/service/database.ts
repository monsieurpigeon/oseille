import PouchDb from 'pouchdb';
import find from 'pouchdb-find';
import rel from 'relational-pouch';
import { addFarm } from '../entity/farm';

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

export const initDatabase = async () => {
  await addFarm();

  db.bulkDocs([{ _id: 'init' }]).catch(console.error);
};

export const destroyDatabase = async () => {
  await db.destroy();
  db = new PouchDb(DB_NAME);
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
