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
import { useRef } from 'react';
import { Product } from '../../backend';
import { UpdateProduct } from './UpdateProduct';

type FocusProductProps = { product: Product; isOpen: boolean; onOpen: () => void; onClose: () => void };

export function FocusProduct({ product, isOpen, onOpen, onClose }: FocusProductProps) {
  const btnRef = useRef<any>();

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
        <DrawerHeader>
          Focus produit
          <UpdateProduct />
        </DrawerHeader>
        <DrawerBody>
          <Text>{product.name}</Text>
          <Spacer />
          <Text>
            € / {product.unit} : {product.price.toFixed(2)}
          </Text>
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
