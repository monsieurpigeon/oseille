import { useRef } from 'react';
import { ProductEditModal } from './ProductEditModal';
import { MyButton } from '../../component/form/button/MyButton';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

export function ProductLine({ product }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO fix this type
  const cancelRef = useRef<any>();

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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <ProductEditModal
              product={product}
              handleClose={onClose}
            />
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}
