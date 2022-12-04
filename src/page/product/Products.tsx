import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { addProduct, store } from '../../backend';
import { MyButton } from '../../component/form/button/MyButton';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { MyNumberInput } from '../../component/form/input/MyNumberInput';
import { StyledH1 } from '../../component/typography/MyFont';
import styled from 'styled-components';
import { ProductLine } from './ProductLine';

const StyledProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

export function Products() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0.00');
  const { products } = useSnapshot(store);

  return (
    <MyScreenLayout>
      <StyledH1>Produits</StyledH1>
      <MyTextInput
        placeholder="Nouveau produit"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <MyNumberInput
        placeholder="prix"
        value={price}
        onChange={(value) => setPrice(value)}
      />
      <MyButton
        label="Ajouter"
        onClick={() => {
          addProduct({ name, price: +price });
          setName('');
        }}
      />
      <StyledProducts>
        {products.map((product: any) => (
          <ProductLine
            key={product._id}
            product={product}
          />
        ))}
      </StyledProducts>
    </MyScreenLayout>
  );
}
