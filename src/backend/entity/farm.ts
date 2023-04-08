import { relDb } from '../service/database';
import { DocumentKey } from '../service/pdf';
import { store } from '../service/store';

export interface Farm {
  id: string;
  _rev: string;
  title: string;
  address1: string;
  address2: string;
  zip: string;
  city: string;
  footer: string;
  invoiceId: number;
  deliveryId: number;
  showTVA?: boolean;
}

export interface FarmInput {
  title?: string;
  address1?: string;
  address2?: string;
  zip?: string;
  city?: string;
  footer?: string;
  showTVA?: boolean;
}

export const FARM_KEY = 'myFarm';

export async function loadFarm() {
  const result = await relDb.rel.find('farm', FARM_KEY);
  store.farm = result.farms[0];
  return result.farms.length;
}

export async function addFarm() {
  await relDb.rel.save('farm', {
    id: FARM_KEY,
    footer: 'Tous nos produits sont certifies par FR-BIO-IT',
    invoiceId: 1,
    deliveryId: 1,
    showTVA: false,
  });
  loadFarm();
}

export const updateFarm = (farm: Farm) => {
  console.log({ farm });
  return relDb.rel.save('farm', farm);
};

export async function updateDocumentId(type: DocumentKey) {
  const result = await relDb.rel.find('farm', FARM_KEY);

  if (type === 'Invoice') {
    updateFarm({ ...result.farms[0], invoiceId: result.farms[0].invoiceId + 1 });
  } else if (type === 'Delivery') {
    updateFarm({ ...result.farms[0], deliveryId: result.farms[0].deliveryId + 1 });
  }
}
