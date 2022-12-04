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

export const FARM_KEY = 'myFarm';

export const loadFarm = () => {
  db.get(FARM_KEY)
    .then((data) => {
      store.farm = data as unknown as Farm;
    })
};

export const addFarm = () => {
  db.post({ _id: FARM_KEY, invoiceId: 1, deliveryId: 1 }).then(() => {
    loadFarm();
  });
}

export const updateFarmName = ({ title }: FarmInput) => {
  db.get(FARM_KEY)
    .then((doc) => {
      db.put({
        ...doc,
        _id: FARM_KEY,
        _rev: doc._rev,
        title,
      }).catch(console.error);
    })
    .then(() => loadFarm());
};

export const updateDocumentId = (type: DocumentKey) => {
  db.get(FARM_KEY)
    .then((doc) => {
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