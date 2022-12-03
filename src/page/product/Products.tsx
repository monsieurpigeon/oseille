import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { addProduct, store } from '../../backend';
import { Button } from '../../component/form/button/Button';
import { TextInput } from '../../component/form/input/TextInput';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { NumberInput } from '../../component/form/input/NumberInput';

export function Products() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const { products } = useSnapshot(store);

  return (
    <ScreenLayout>
      <h1>Produits</h1>
      <TextInput
        placeholder="Nouveau produit"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <NumberInput
        placeholder="prix"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
      />
      <Button
        label="Ajouter"
        onClick={() => {
          addProduct({ name, price });
          setName('');
        }}
      />

      {products.map((product: any) => (
        <div key={product._id}>
          {product.name} {product.price}
        </div>
      ))}
    </ScreenLayout>
  );
}
