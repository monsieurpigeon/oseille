import { useCallback, useEffect, useState } from 'react';
import { usePouch } from '../contexts/pouchDb';

interface Product {
  name: string;
  type: 'Product';
}

export function Products() {
  const { db } = usePouch();
  const [text, setText] = useState('');
  const [products, setProducts] = useState<any>([]);

  const loadProducts = useCallback(() => {
    db.find({
      selector: { type: 'Product' },
    }).then((result: any) => {
      setProducts(result.docs);
    });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div>
      <h1>Produits</h1>
      <input
        type="text"
        placeholder="Nouveau produit"
        className="bg-amber-200"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-amber-200"
        onClick={() => {
          db.put({ _id: 'product:' + text, name: text, type: 'Product' }).then(
            loadProducts,
          );
          setText('');
        }}
      >
        Ajouter
      </button>

      {products &&
        products.map((product: any) => (
          <div key={product._id}>{product.name}</div>
        ))}
    </div>
  );
}
