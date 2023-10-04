import { FarmInput } from '../backend';

export const DEFAULT_TAX = '5.5';
export const DEFAULT_INVOICE_DELAY = 30;
export const DEFAULT_FOOTER = 'Tous nos produits sont certifies par FR-BIO-IT';
export const DEFAULT_THREAT = 'En cas de retard de paiement, montant forfaitaire de 40€ pour frais de recouvrement';

export const EMPTY_FARM: FarmInput = {
  title: '',
  address1: '',
  address2: '',
  zip: '',
  city: '',
  phone: '',
  email: '',
  footer: '',
  rib: '',
  iban: '',
  bic: '',
  siret: '',
  naf: '',
  tva: '',
  isTVA: 'non',
  bioLabel: 'non',
  invoiceDelay: DEFAULT_INVOICE_DELAY,
  threat: DEFAULT_THREAT,
};

export const DEFAULT_FARM = {
  title: 'La ferme sans nom',
  address1: '42 rue du petit pois',
  address2: '',
  zip: '33000',
  city: 'Bordeaux',
  phone: '06 45 66 56 55',
  email: 'maxpige@gmail.com',
};

export const EMPTY_CUSTOMER = {
  name: '',
  address1: '',
  address2: '',
  zip: '',
  city: '',
  notes: '',
  phone: '',
};

export const DEFAULT_CUSTOMER = {
  name: 'Biocoop',
  address1: '42 rue du chèque en bois',
  address2: '',
  zip: '33000',
  city: 'Bordeaux',
  notes: 'Livraison le Jeudi',
  phone: '06 45 66 56 55',
};

export const PRODUCT_UNITS = [
  { value: 'kg', label: 'kg' },
  { value: 'piece', label: 'piece' },
  { value: 'botte', label: 'botte' },
];

export const TVA_RATES = [
  { value: '0', label: '0%', code: 0 },
  { value: '5.5', label: '5.5%', code: 1 },
  { value: '10', label: '10%', code: 2 },
  { value: '20', label: '20%', code: 3 },
];
