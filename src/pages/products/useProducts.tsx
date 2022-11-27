import { useCallback, useEffect, useState } from 'react';
import { usePouch } from '../../contexts/pouchDb';

interface Product {
  id: string;
  name: string;
  type: 'Product';
}

interface ProductInput {
  name: string;
}

export function useProducts() {
  const { db } = usePouch();
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(() => {
    db.find({
      selector: { type: 'Product' },
    }).then((result: any) => {
      setProducts(result.docs);
    });
  }, []);

  const addProduct = (product: ProductInput) => {
    db.put({
      _id: 'product:' + product.name,
      name: product.name,
      type: 'Product',
    }).then(loadProducts);
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, addProduct };
}
