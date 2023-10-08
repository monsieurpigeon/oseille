import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductInput, store, updateProduct } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { productSchema } from './ProductCreateModal';
import { ProductFields } from './ProductFields';

export function ProductEditModal() {
  const { id } = useParams();
  const product = useMemo(() => (id ? store.products.find((el) => el.id === id) : undefined), [id, store.products]);
  if (!product) return null;

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

  const { control, register, handleSubmit, formState } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: { ...product, tva: product?.tva || '5.5' },
  });

  return (
    <MyModal
      isOpen={true}
      cancelRef={cancelRef}
      title="Modifier le produit"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={!formState.isDirty}
    >
      <ProductFields
        control={control}
        register={register}
      />
    </MyModal>
  );
}
