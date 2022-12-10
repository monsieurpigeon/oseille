import { useState } from 'react';
import { priceFormatter } from '../../utils/formatter';
import { updatePrice } from '../../backend';
import { MyNumberInput } from '../../component/form/input/MyNumberInput';
import { MyButton } from '../../component/form/button/MyButton';
import { AlertDialogBody, AlertDialogFooter, AlertDialogHeader } from '@chakra-ui/react';

export function ProductEditModal({ product, handleClose }: any) {
  const [price, setPrice] = useState(product.price.toFixed(2));
  return (
    <>
      <AlertDialogHeader
        fontSize="lg"
        fontWeight="bold"
      >
        Modifier le produit
      </AlertDialogHeader>
      <AlertDialogBody>
        <div>{product.name}</div>
        <div>
          Prix actuel : {priceFormatter(product.price)} / {product.unit}
        </div>
        <div>Saisir le nouveau prix</div>
        <MyNumberInput
          placeholder="prix"
          value={price}
          onChange={(value) => {
            setPrice(value);
          }}
        />
      </AlertDialogBody>
      <AlertDialogFooter>
        <MyButton
          onClick={() => {
            updatePrice(product, +price).then(() => {
              handleClose();
            });
          }}
          label="Enregistrer"
        />
      </AlertDialogFooter>
    </>
  );
}
