import getYear from 'date-fns/getYear';
import { CountryCode, DEFAULT_COUNTRY } from '../../utils/defaults';
import { relDb } from '../service/database';
import { DocumentType } from '../service/pdf/pdf';

export interface Farm {
  id: string;
  _rev: string;
  title: string;
  address1: string;
  address2: string;
  zip: string;
  city: string;
  phone: string;
  email: string;
  footer: string;
  invoiceId: number;
  deliveryId: number;
  year: number;
  isTVA?: string;
  bioLabel: string;
  rib: string;
  iban: string;
  bic: string;
  siret: string;
  naf: string;
  tva: string;
  invoiceDelay: number;
  threat: string;
  country: CountryCode;
  _attachements: {
    logo: {
      data: string;
    };
  };
}

export interface FarmInput {
  title?: string;
  address1?: string;
  address2?: string;
  zip?: string;
  city?: string;
  phone?: string;
  email?: string;
  footer?: string;
  invoiceId?: number;
  deliveryId?: number;
  year?: number;
  isTVA?: string;
  bioLabel?: string;
  rib?: string;
  iban?: string;
  bic?: string;
  siret?: string;
  naf?: string;
  tva?: string;
  invoiceDelay?: number;
  threat?: string;
  country?: string;
}

export interface LogoInput {
  data: string;
}

export const FARM_KEY = 'myFarm';

export async function addFarm() {
  await relDb.rel.save('farm', {
    id: FARM_KEY,
    footer: 'Tous nos produits sont certifies par FR-BIO-IT',
    invoiceId: 1,
    deliveryId: 1,
    year: getYear(new Date()),
    country: DEFAULT_COUNTRY,
  });
}

export const updateFarm = (farm: Farm) => {
  return relDb.rel.save('farm', farm);
};

export async function updateDocumentId(type: DocumentType, value: number = 1) {
  const result = await relDb.rel.find('farm', FARM_KEY);

  if (type === DocumentType.delivery) {
    updateFarm({ ...result.farms[0], deliveryId: result.farms[0].deliveryId + value });
  } else if (type === DocumentType.invoice) {
    updateFarm({ ...result.farms[0], invoiceId: result.farms[0].invoiceId + value });
  }
}

export const addLogo = async (logo: LogoInput) => {
  const result = await relDb.rel.find('farm', FARM_KEY);
  const myFarm = result.farms[0];

  return updateFarm({ ...myFarm, _attachements: { logo: { content_type: 'image/png', data: logo.data } } });
};

export const getFarm = () => relDb.rel.find('farm', FARM_KEY).then((doc) => doc.farms[0]);
