import { useState } from 'react';
import { Button } from '../../components/form/button/Button';
import { TextInput } from '../../components/form/input/TextInput';
import { useProducts } from './useProducts';

export function Products() {
  const [text, setText] = useState('');
  const { products, addProduct } = useProducts();

  return (
    <div>
      <h1>Produits</h1>
      <TextInput
        placeholder="Nouveau produit"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        label="Ajouter"
        onClick={() => {
          addProduct({ name: text });
          setText('');
        }}
      />

      {products.map((product: any) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}
