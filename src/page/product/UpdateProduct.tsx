import { useDisclosure } from '@chakra-ui/react';

export function UpdateProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button>Editer</button> {/*<MySaveModal*/}
      {/*  isOpen={isOpen}*/}
      {/*  title="Modifier le produit"*/}
      {/*  onClose={onClose}*/}
      {/*  onSubmit={() => updatePrice(product, +price)}*/}
      {/*>*/}
      {/*  <div>{product.name}</div>*/}
      {/*  <div>*/}
      {/*    Prix actuel : {priceFormatter(product.price)} / {product.unit}*/}
      {/*  </div>*/}
      {/*  <div>Saisir le nouveau prix</div>*/}
      {/*  <MyNumberInput*/}
      {/*    placeholder="prix"*/}
      {/*    value={price}*/}
      {/*    onChange={setPrice}*/}
      {/*  />*/}
      {/*</MySaveModal>*/}
    </>
  );
}
