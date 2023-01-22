import { db } from '../service/database';
import { DocumentKey } from '../service/pdf';
import { store } from '../service/store';

export interface Farm {
  _id: string;
  _rev: string;
  title: string;
  address1: string;
  address2: string;
  zip: string;
  city: string;
  invoiceId: number;
  footer: string;
  deliveryId: number;
}

export interface FarmInput {
  title?: string;
  address1?: string;
  address2?: string;
  zip?: string;
  city?: string;
  footer?: string;
}

export const FARM_KEY = 'myFarm';

export const loadFarm = () => {
  db.get(FARM_KEY).then((data) => {
    store.farm = data as unknown as Farm;
  });
};

export const addFarm = () => {
  db.post({
    _id: FARM_KEY,
    footer: 'Tous nos produits sont certifies par FR-BIO-IT\ngenere gratuitement grace a Oseille - www.oseille.app',
    invoiceId: 1,
    deliveryId: 1,
  }).then(() => {
    loadFarm();
  });
};

export const updateFarmName = (farm: FarmInput) => {
  db.get(FARM_KEY).then((doc) => {
    db.put({
      ...doc,
      _id: FARM_KEY,
      _rev: doc._rev,
      ...farm,
    }).catch(console.error);
  });
};

export const updateFarmFooter = ({ footer }: FarmInput) => {
  db.get(FARM_KEY).then((doc) => {
    db.put({
      ...doc,
      _id: FARM_KEY,
      _rev: doc._rev,
      footer,
    }).catch(console.error);
  });
};

export const updateDocumentId = (type: DocumentKey) => {
  db.get(FARM_KEY)
    .then((doc: any) => {
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
    .catch(console.error);
};
