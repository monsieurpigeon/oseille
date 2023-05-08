export const DEFAULT_FARM = {
  title: 'La ferme sans nom',
  address1: '42 rue du petit pois',
  address2: '',
  zip: '33000',
  city: 'Bordeaux',
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
  notes: '',
  phone: '',
};

export const PRODUCT_UNITS = [
  { value: 'kg', label: 'kg' },
  { value: 'piece', label: 'piece' },
  { value: 'botte', label: 'botte' },
];

export const DEFAULT_TAX = '5.5';

export const TVA_RATES = [
  { value: '0', label: '0%' },
  { value: '5.5', label: '5.5%' },
  { value: '10', label: '10%' },
  { value: '20', label: '20%' },
];

export const DEFAULT_FOOTER = 'Tous nos produits sont certifies par FR-BIO-IT';
