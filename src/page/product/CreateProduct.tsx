import { useState } from 'react';
import { addProduct, Unit } from '../../backend';
import { MyNumberInput } from '../../component/form/input/MyNumberInput';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { MySelect } from '../../component/form/select/MySelect';
import { CreateModal } from '../../component/modal/CreateModal';
import { PRODUCT_UNITS } from '../../utils/defaults';

export function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0.00');
  const [unit, setUnit] = useState<Unit>('kg');
  return (
    <CreateModal
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
        options={PRODUCT_UNITS}
        value={unit}
        onChange={(e) => {
          setUnit(e.target.value as Unit);
        }}
        placeholder={'unite ...'}
      />
    </CreateModal>
  );
}
