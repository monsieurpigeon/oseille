import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { addProduct, store, Unit } from '../../backend';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { MyNumberInput } from '../../component/form/input/MyNumberInput';
import { MyH1 } from '../../component/typography/MyFont';
import { ProductLine } from './ProductLine';
import { MySelect } from '../../component/form/select/MySelect';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { MyCreateModal } from '../../component/modal/MyCreateModal';

export function Products() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('0.00');
  const [unit, setUnit] = useState<Unit>('kg');
  const { products } = useSnapshot(store);

  return (
    <MyScreenLayout>
      <Flex
        gap={4}
        alignItems="center"
      >
        <MyH1>Produits</MyH1>
        <MyCreateModal
          title={'Nouveau produit'}
          onSubmit={() => {
            addProduct({ name, price: +price, unit }).catch(console.error);
            setName('');
            setPrice('0.00');
          }}
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
        </MyCreateModal>
      </Flex>

      <Flex direction="column">
        {products.map((product: any) => (
          <ProductLine
            key={product._id}
            product={product}
          />
        ))}
      </Flex>
    </MyScreenLayout>
  );
}
