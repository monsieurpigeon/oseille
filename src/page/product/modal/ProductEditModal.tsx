import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductInput, updateProduct } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { useData } from '../../../utils/DataContext';
import { productSchema } from './ProductCreateModal';
import { ProductFields } from './ProductFields';

export function ProductEditModal() {
  const { id } = useParams();
  const { getProduct } = useData();
  const product = useMemo(() => (id ? getProduct(id) : undefined), [id]);

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
      <ProductFields
        control={control}
        register={register}
      />
    </MyModal>
  );
}
