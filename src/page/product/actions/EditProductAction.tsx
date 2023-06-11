import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Product, ProductInput, updateProduct } from '../../../backend';
import { EditButton } from '../../../component/buttons';
import { EditDialog } from '../../../component/modal/edit-dialog/EditDialog';
import { ProductFields } from '../ProductFields';
import { productSchema } from './CreateProductAction';

interface EditProductActionProps {
  product: Product;
}

export function EditProductAction({ product }: EditProductActionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const onSubmit = (e: ProductInput) => {
    product && updateProduct({ ...product, ...e }).then(onClose);
  };

  const { control, register, handleSubmit, reset } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });

  useEffect(() => {
    reset({ ...product, tva: product.tva || '5.5' });
  }, [product]);

  return (
    <>
      <EditButton onClick={onOpen} />
      <EditDialog
        isOpen={isOpen}
        cancelRef={cancelRef}
        title="Modifier le produit"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        fields={
          <ProductFields
            control={control}
            register={register}
          />
        }
        footer={
          <>
            <Button
              ref={cancelRef}
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              colorScheme="twitter"
              type="submit"
              ml={3}
            >
              Enregistrer
            </Button>
          </>
        }
      />
    </>
  );
}
