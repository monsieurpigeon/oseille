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
import { MyTextInput } from '../../component/form/input/MyTextInput';

type FocusProductProps = {
  product: Product;
  isOpen: boolean;
  onOpen: () => void;
  onUpdate: (product: Product) => void;
  onClose: () => void;
};

export function FocusProduct({ product, isOpen, onOpen, onUpdate, onClose }: FocusProductProps) {
  const btnRef = useRef<any>();
  const [newProduct, setNewProduct] = useState({ price: product.price, unit: product.unit, name: product.name });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setNewProduct({ price: product.price, unit: product.unit, name: product.name });
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
          {!editMode && (
            <>
              <Text>{product.name}</Text>
              <Spacer />
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
              <MyTextInput
                placeholder={'Nom'}
                value={newProduct.name}
                onChange={(e) => {
                  setNewProduct((p) => ({ ...p, name: e.target.value }));
                }}
              />
              <MySelect
                options={[
                  { value: 'kg', label: 'kg' },
                  { value: 'piece', label: 'piece' },
                ]}
                value={newProduct.unit}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, unit: e.target.value as Unit });
                }}
                placeholder={'unite ...'}
              />
              <MyNumberInput
                value={`${newProduct.price}`}
                placeholder="price"
                onChange={(price) => setNewProduct((p) => ({ ...p, price: +price }))}
              />
              <button
                type="button"
                onClick={() => {
                  updateProduct({
                    ...product,
                    price: +newProduct.price,
                    unit: newProduct.unit,
                    name: newProduct.name,
                  }).then(async (data) => {
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
