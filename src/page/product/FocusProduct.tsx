import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Product, Unit, loadProduct, updateProduct } from '../../backend';
import { MyNumberInput } from '../../component/form/input/MyNumberInput';
import { MySelect } from '../../component/form/select/MySelect';

type FocusProductProps = {
  product: Product;
  isOpen: boolean;
  onOpen: () => void;
  onUpdate: (product: Product) => void;
  onClose: () => void;
};

export function FocusProduct({ product, isOpen, onOpen, onUpdate, onClose }: FocusProductProps) {
  const btnRef = useRef<any>();
  const [editMode, setEditMode] = useState(false);
  const [newPrice, setNewPrice] = useState(`${product.price}`);
  const [newUnit, setNewUnit] = useState(product.unit);

  useEffect(() => {
    setNewPrice(`${product.price}`);
    setNewUnit(product.unit);
  }, [product]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Focus produit</DrawerHeader>
        <DrawerBody>
          <Text>{product.name}</Text>
          <Spacer />

          {!editMode && (
            <>
              <Text>
                € / {product.unit} : {product.price.toFixed(2)}
              </Text>
              <button
                type="button"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Éditer
              </button>
            </>
          )}
          {editMode && (
            <>
              <MySelect
                options={[
                  { value: 'kg', label: 'kg' },
                  { value: 'piece', label: 'piece' },
                ]}
                value={newUnit}
                onChange={(e) => {
                  setNewUnit(e.target.value as Unit);
                }}
                placeholder={'unite ...'}
              />
              <MyNumberInput
                value={`${newPrice}`}
                placeholder="price"
                onChange={setNewPrice}
              />
              <button
                type="button"
                onClick={() => {
                  updateProduct({ ...product, price: +newPrice, unit: newUnit }).then(async (data) => {
                    const newProduct = await loadProduct(data.id);
                    onUpdate(newProduct);
                  });
                  setEditMode(false);
                }}
              >
                Enregistrer
              </button>
            </>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={onClose}
          >
            Retour
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
