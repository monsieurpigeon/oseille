import { useEffect, useState } from 'react';
import { Price, getPrices, onPricesChange } from '../backend';

export function usePrices() {
  const [prices, setPrices] = useState<Price[]>([]);
  const refreshPrices = () => {
    console.log('REFRESH PRICE');
    getPrices().then(setPrices);
  };

  useEffect(() => {
    refreshPrices();
    const observer = onPricesChange(refreshPrices);
    return () => {
      observer.cancel();
    };
  }, []);

  // TODO get prices per customer
  const getPrice = (id: string) => {
    if (!id) return;
    return prices.find((price) => price.id === id);
  };

  return { prices, getPrice };
}
