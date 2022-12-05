import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { addProduct, store, Unit } from '../../backend';
import { MyButton } from '../../component/form/button/MyButton';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { MyNumberInput } from '../../component/form/input/MyNumberInput';
import { StyledH1 } from '../../component/typography/MyFont';
import styled from 'styled-components';
import { ProductLine } from './ProductLine';
import { MyModal } from '../../component/modal/MyModal';
import { MySelect } from '../../component/form/select/MySelect';

const StyledProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const StyledTitle = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0.00');
  const [unit, setUnit] = useState<Unit>('kg');
  const { products } = useSnapshot(store);

  return (
    <MyScreenLayout>
      <StyledTitle>
        <StyledH1>Produits</StyledH1>
        <MyButton
          label={'Nouveau'}
          onClick={() => setIsOpen(true)}
        />
      </StyledTitle>
      {isOpen && (
        <MyModal
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
        >
          <MyTextInput
            placeholder="nom du produit"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <MyNumberInput
            placeholder="prix"
            value={price}
            onChange={(value) => setPrice(value)}
          />
          <MySelect
            options={[
              { value: 'kg', label: 'kg' },
              { value: 'piece', label: 'piece' },
            ]}
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value as Unit);
            }}
            placeholder={'unite ...'}
          />
          <MyButton
            label="Ajouter"
            onClick={() => {
              addProduct({ name, price: +price, unit }).catch(console.error);
              setName('');
              setIsOpen(false);
            }}
          />
        </MyModal>
      )}

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
