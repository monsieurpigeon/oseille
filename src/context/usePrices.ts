import { useState } from 'react';
import { Price } from '../backend';

export function usePrices() {
  const [prices, setPrices] = useState<Price[]>([]);

  // TODO get prices per customer
  const getPrice = (id: string) => {
    if (!id) return;
    return prices.find((price) => price.id === id);
  };

  return { prices, getPrice };
}
