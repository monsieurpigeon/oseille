import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProductInput, addProduct } from '../../../backend';
import { CreateModal } from '../../../component/modal/CreateModal';
import { ProductFields } from '../ProductFields';

export const productSchema = z.object({
  name: z.string().min(1),
  unit: z.string(),
  tva: z.string().optional(),
});

export function CreateProductAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();
  const { control, register, handleSubmit, reset } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      unit: 'kg',
      tva: '5.5',
    },
  });
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
    }, 100);
  };

  const onSubmit = (e: ProductInput) => addProduct(e).then(handleClose).catch(console.error);

  return (
    <>
      <Button
        colorScheme="twitter"
        onClick={onOpen}
      >
        Nouveau
      </Button>
      <CreateModal
        isOpen={isOpen}
        cancelRef={cancelRef}
        title="Nouveau produit"
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        body={
          <ProductFields
            control={control}
            register={register}
          />
        }
        footer={
          <>
            <Button
              ref={cancelRef}
              onClick={handleClose}
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
