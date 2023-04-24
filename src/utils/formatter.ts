import { DocumentType } from '../backend';

export function priceFormatter(value: number) {
  return `${value.toFixed(2)} €`;
}

export function documentIdFormatter(value: number, type: DocumentType) {
  // TODO : Prévoir le changement d’année pour le documentId
  const numbers = `2023-${`00000${value}`.slice(-5)}`;

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
