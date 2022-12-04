import { db } from '../service/database';
import { store } from '../service/store';
import { DocumentKey } from '../service/pdf';

export interface Farm {
  _id: string;
  _rev: string;
  title: string;
  invoiceId: number;
  deliveryId: number;
}

export interface FarmInput {
  title: string;
}

const FARM_KEY = 'myFarm';

export const loadFarm = () => {
  console.log('LOAD FARM');
  db.get(FARM_KEY)
    .then((data) => {
      console.log('FARM FOUND', data);
      store.farm = data as unknown as Farm;
    })
    .catch((error) => {
      if (error.status === 404) {
        console.log('FARM NOT FOUND');
        db.post({ _id: FARM_KEY, invoiceId: 1, deliveryId: 1 }).then(() => {
          loadFarm();
        });
      }
    });
};

export const updateFarmName = ({ title }: FarmInput) => {
  db.get(FARM_KEY)
    .then((doc) => {
      db.put({
        _id: FARM_KEY,
        _rev: doc._rev,
        title,
      }).catch(console.error);
    })
    .then(() => loadFarm());
};

export const updateDocumentId = (type: DocumentKey) => {
  db.allDocs().then(console.log).catch(console.error);
  console.log(type);
  db.get(FARM_KEY)
    .then((doc) => {
      console.log(doc);
      if (type === 'Invoice') {
        db.put({
          ...doc,
          _rev: doc._rev,
          invoiceId: doc.invoiceId + 1,
        }).catch(console.error);
      } else if (type === 'Delivery') {
        db.put({
          ...doc,
          _rev: doc._rev,
          deliveryId: doc.deliveryId + 1,
        }).catch(console.error);
      }
    })
    .then(() => loadFarm())
    .catch(console.error);
};