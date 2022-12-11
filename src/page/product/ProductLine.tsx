import { useState } from 'react';
import { MyButton } from '../../component/form/button/MyButton';
import { Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { MySaveModal } from '../../component/modal/MySaveModal';
import { priceFormatter } from '../../utils/formatter';
import { MyNumberInput } from '../../component/form/input/MyNumberInput';
import { updatePrice } from '../../backend';

export function ProductLine({ product }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [price, setPrice] = useState(product.price.toFixed(2));

  return (
    <Flex>
      <Flex
        key={product._id}
        alignItems="center"
      >
        <Text>{product.name}</Text>
        <Spacer />
        <Text>
          € / {product.unit} : {product.price.toFixed(2)}
        </Text>
      </Flex>
      <MyButton
        onClick={onOpen}
        label="✏️"
      />

      <MySaveModal
        isOpen={isOpen}
        title="Modifier le produit"
        onClose={onClose}
        onSubmit={() => updatePrice(product, +price)}
      >
        <div>{product.name}</div>
        <div>
          Prix actuel : {priceFormatter(product.price)} / {product.unit}
        </div>
        <div>Saisir le nouveau prix</div>
        <MyNumberInput
          placeholder="prix"
          value={price}
          onChange={setPrice}
        />
      </MySaveModal>
    </Flex>
  );
}
