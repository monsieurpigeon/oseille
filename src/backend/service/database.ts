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
    relations: {
      prices: { hasMany: 'price' },
      deliveries: { hasMany: { type: 'delivery', options: { queryInverse: 'customer' } } },
      invoices: { hasMany: { type: 'invoice', options: { queryInverse: 'customer' } } },
    },
  },
  { singular: 'Icustomer', plural: 'Icustomers', documentType: 'customer' },
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
      customer: { belongsTo: 'Icustomer' },
      invoice: { belongsTo: 'Iinvoice' },
    },
  },
  { singular: 'Idelivery', plural: 'Ideliveries', documentType: 'delivery' },
  {
    singular: 'invoice',
    plural: 'invoices',
    relations: {
      customer: { belongsTo: 'Icustomer' },
      deliveries: { hasMany: 'Idelivery' },
    },
  },
  { singular: 'Iinvoice', plural: 'Iinvoices', documentType: 'invoice' },
]);

relDb.rel.find('delivery').then((result) => {
  result.deliveries.forEach(async (delivery: any) => {
    let isUpdated = false;
    const newDelivery = { ...delivery };
    if (delivery.customerId) {
      newDelivery.customer = delivery.customerId;
      delete newDelivery.customerId;
      isUpdated = true;
    }
    if (delivery.invoiceId) {
      newDelivery.invoice = delivery.invoiceId;
      delete newDelivery.invoiceId;
      isUpdated = true;
    }
    isUpdated && (await relDb.rel.save('delivery', newDelivery).catch(console.error));
  });
});

relDb.rel.find('invoice').then((result) => {
  result.invoices.forEach(async (invoice: any) => {
    if (invoice.customerId) {
      const newInvoice = { ...invoice, customer: invoice.customerId };
      delete newInvoice.customerId;
      delete newInvoice.deliveryIds;
      await relDb.rel.save('invoice', newInvoice).catch(console.error);
    }
  });
});

db.allDocs({ include_docs: true }).then((result) => {
  console.log(result);
});

export const initDatabase = async () => {
  await addFarm();
  db.bulkDocs([{ _id: 'init' }]).catch(console.error);
};

db.get('_init').catch((err) => {
  if (err.status === 404) {
    initDatabase();
  }
});

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
