import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Product, ProductInput, updateProduct } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { Country, DEFAULT_TVA_MAP } from '../../../utils/defaults';
import { productSchema } from './ProductCreateModal';
import { ProductFields } from './ProductFields';

export function ProductEditModal() {
  const product = useRouteLoaderData('product') as Product;
  const { country } = useRouteLoaderData('farm') as { country: Country };

  const cancelRef = useRef<any>();
  const navigate = useNavigate();

  const { say } = useSideKick();

  const handleClose = () => navigate('..');

  const onSubmit = (e: ProductInput) => {
    product &&
      updateProduct({ ...product, ...e })
        .then(handleClose)
        .then(() =>
          say({
            sentence: `Le produit ${e.name} a bien été enregistré`,
            autoShutUp: true,
            feeling: SideKickFeeling.GOOD,
          }),
        )
        .catch(console.error);
  };

  const { register, handleSubmit, formState } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: { ...product, tva: product?.tva || DEFAULT_TVA_MAP[country.value], tvq: product?.tvq || false },
  });

  if (!product) return null;
  return (
    <MyModal
      isOpen={true}
      cancelRef={cancelRef}
      title="Modifier le produit"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={!formState.isDirty}
    >
      <ProductFields register={register} />
    </MyModal>
  );
}
