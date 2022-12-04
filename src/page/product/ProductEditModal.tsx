import { useState } from 'react';
import { priceFormatter } from '../../utils/formatter';
import { Button } from '@chakra-ui/react';
import { updatePrice } from '../../backend';
import { MyNumberInput } from '../../component/form/input/MyNumberInput';

export function ProductEditModal({ product, handleClose }: any) {
  const [price, setPrice] = useState(product.price.toFixed(2));
  return (
    <div>
      <div>Modifier le produit</div>
      <div>{product.name}</div>
      <div>Prix actuel : {priceFormatter(product.price)}</div>
      <div>Saisir le nouveau prix</div>
      <MyNumberInput
        placeholder="prix"
        value={price}
        onChange={(value) => {
          setPrice(value);
        }}
      />
      <Button
        colorScheme="blue"
        onClick={() => {
          console.log('hello');
          updatePrice(product, +price).then(() => {
            handleClose();
          });
        }}
      >
        Enregistrer
      </Button>
    </div>
  );
}
