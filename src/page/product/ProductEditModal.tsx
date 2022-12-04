import { useState } from 'react';
import { priceFormatter } from '../../utils/formatter';
import { Button, NumberInput, NumberInputField } from '@chakra-ui/react';
import { updatePrice } from '../../backend';

export function ProductEditModal({ product, handleClose }: any) {
  const [price, setPrice] = useState(product.price.toFixed(2));
  console.log(price);
  return (
    <div>
      <div>Modifier le produit</div>
      <div>{product.name}</div>
      <div>Prix actuel : {priceFormatter(product.price)}</div>
      <div>Saisir le nouveau prix</div>
      <NumberInput
        size="lg"
        value={price}
        onChange={(value) => {
          setPrice(value);
        }}
      >
        <NumberInputField />
      </NumberInput>
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
