import { useState } from 'react';
import { Product } from '../backend';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProduct = (id: string) => {
    if (!id) return;
    return products.find((product) => product.id === id);
  };

  return { products, getProduct };
}
