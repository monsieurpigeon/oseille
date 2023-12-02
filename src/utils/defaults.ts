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
  email: 'contact@oseille.app',
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
  tvaRef: '',
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

const TVA_RATES_FR = [
  { value: '0', label: '0%', code: 0 },
  { value: '5.5', label: '5.5%', code: 1 },
  { value: '10', label: '10%', code: 2 },
  { value: '20', label: '20%', code: 3 },
];
const TVA_RATES_BE = [
  { value: '0', label: '0%', code: 0 },
  { value: '6', label: '6%', code: 1 },
  { value: '12', label: '12%', code: 2 },
  { value: '21', label: '21%', code: 3 },
];
const TVA_RATES_CH = [
  { value: '0', label: '0%', code: 0 },
  { value: '2.5', label: '2.5%', code: 1 },
  { value: '3.7', label: '3.7%', code: 2 },
  { value: '7.7', label: '7.7%', code: 3 },
];

export const TVA_RATES_MAP = {
  FR: TVA_RATES_FR,
  BE: TVA_RATES_BE,
  CH: TVA_RATES_CH,
  CA: TVA_RATES_FR,
};

export const DEFAULT_TVA_MAP = {
  FR: '5.5',
  BE: '6',
  CH: '2.5',
  CA: '5',
};

export enum CountryCode {
  FR = 'FR',
  BE = 'BE',
  CH = 'CH',
  CA = 'CA',
}

export interface Country {
  value: CountryCode;
  flag: string;
  label: string;
  symbol: string;
  taxes: string;
  currency: string;
}

export const COUNTRIES: Country[] = [
  { value: CountryCode.FR, flag: '🇫🇷', label: 'France', symbol: '€', taxes: '0%, D:5.5%, 10%, 20%', currency: 'EUR' },
  { value: CountryCode.BE, flag: '🇧🇪', label: 'Belgique', symbol: '€', taxes: '0%, D:6%, 12%, 21%', currency: 'EUR' },
  {
    value: CountryCode.CH,
    flag: '🇨🇭',
    label: 'Suisse',
    symbol: 'CHF',
    taxes: '0%, D:2.5%, 3.7%, 7.7%',
    currency: 'CHF',
  },
  { value: CountryCode.CA, flag: '🇨🇦', label: 'Canada', symbol: '$', taxes: 'TPS: 5%, TVQ: 9.975%', currency: 'CAD' },
];

export const DEFAULT_COUNTRY = 'FR';
