import { useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Product, ProductInput, updateProduct } from '../../../backend';
import { EditButton } from '../../../component/buttons';
import { MyModal } from '../../../component/modal/MyModal';
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

  const { control, register, handleSubmit, reset, formState } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });

  useEffect(() => {
    reset({ ...product, tva: product.tva || '5.5' });
  }, [product]);

  return (
    <>
      <EditButton onClick={onOpen} />
      <MyModal
        isOpen={isOpen}
        cancelRef={cancelRef}
        title="Modifier le produit"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        disabled={!formState.isDirty}
      >
        <ProductFields
          control={control}
          register={register}
        />
      </MyModal>
    </>
  );
}
