import { addDays } from 'date-fns';
import { DocumentType } from '../backend';
import { DEFAULT_TAX } from './defaults';

export function priceFormatter(value: number, currency: string = 'EUR') {
  if (value == null) return undefined;
  return value.toLocaleString('fr-FR', { style: 'currency', currency }).split(' ').join(' ');
}

export function documentIdFormatter(value: number, type: DocumentType, year: number) {
  const currentYear = year || 2023;
  const numbers = `${currentYear}-${`00000${value}`.slice(-5)}`;

  if (type === DocumentType.delivery) {
    return `BL-${numbers}`;
  } else if (type === DocumentType.invoice) {
    return `FA-${numbers}`;
  } else return '';
}

export function dateFormatter(value: string) {
  if (!value) {
    return 'Date erronée';
  }
  return new Date(value).toLocaleDateString();
}

export function dateFormatterDelay(value: string, days: number) {
  if (!value) {
    return 'Date erronée';
  }
  const date = new Date(value);
  const delayedDate = addDays(date, days);
  return dateFormatter(delayedDate.toISOString());
}

export function TVAFormatter(value: string) {
  if (!value) {
    return 'Erreur TVA';
  }
  return `${value || DEFAULT_TAX}%`;
}
