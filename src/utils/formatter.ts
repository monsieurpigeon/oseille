import { DocumentKey } from '../backend';

export function priceFormatter(value: number) {
  return `${value.toFixed(2)} €`;
}

export function documentIdFormatter(value: number, type: DocumentKey) {
  // TODO : Prevoir le changement d'annee pour le documentId
  const numbers = `2023-${('00000' + value).slice(-5)}`;

  if (type === 'Delivery') {
    return `BL-${numbers}`;
  } else if (type === 'Invoice') {
    return `FA-${numbers}`;
  }
}
