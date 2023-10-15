import { useEffect, useState } from 'react';
import { Product, getProducts, onProductsChange } from '../backend';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const refreshProducts = () => getProducts().then(setProducts);

  useEffect(() => {
    console.log('REFRESH PRODUCT');
    refreshProducts();
    const observer = onProductsChange(refreshProducts);
    return () => {
      observer.cancel();
    };
  }, []);

  const getProduct = (id: string) => {
    if (!id) return;
    return products.find((product) => product.id === id);
  };

  return { products, getProduct };
}
