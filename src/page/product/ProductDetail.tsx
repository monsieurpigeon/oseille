import { Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Product, ProductInput, updateProduct } from '../../backend';
import { MyH1 } from '../../component/typography/MyFont';
import { ProductFields } from './ProductFields';
import { productSchema } from './Products';

export const ProductDetail = ({ selected }: { selected: Product }) => {
  const { control, register, handleSubmit, reset } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: selected,
  });

  useEffect(() => {
    reset(selected);
  }, [selected]);

  const onSubmit = (e: ProductInput) => {
    selected && updateProduct({ ...selected, ...e });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="catalog-header">
        <MyH1>Détail</MyH1>
        <Button
          colorScheme="twitter"
          type="submit"
          ml={3}
        >
          Enregistrer
        </Button>
      </div>

      <ProductFields
        register={register}
        control={control}
      />
    </form>
  );
};
