import { DEFAULT_TAX } from './defaults';

export function computeTaxes(price: number, quantity: number, taxes: string | undefined) {
  return price * quantity * (Number(taxes || DEFAULT_TAX) / 100);
}

export function round(value: number) {
  return Math.round(value * 100) / 100;
}
