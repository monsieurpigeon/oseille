import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Product, ProductInput, updateProduct } from '../../backend';
import { MyH1 } from '../../component/typography/MyFont';
import { ProductFields } from './ProductFields';
import { productSchema } from './Products';
import { EditDialog } from '../../component/modal/edit-dialog/EditDialog';
import { ProductDisplay } from './ProductDisplay';

export const ProductDetail = ({ selected }: { selected: Product }) => {
  const { control, register, handleSubmit, reset } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: selected,
  });

  useEffect(() => {
    reset({ ...selected, tva: selected.tva || '5.5' });
  }, [selected]);

  const onSubmit = (e: ProductInput) => {
    selected && updateProduct({ ...selected, ...e }).then(onClose);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="catalog-header">
        <MyH1>Détail</MyH1>
        <Button
          colorScheme="red"
          onClick={onOpen}
        >
          Modifier
        </Button>
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
      </div>

      <ProductDisplay product={selected} />
    </form>
  );
};
