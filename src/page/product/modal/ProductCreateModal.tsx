import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { addProduct, ProductInput } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { Country, DEFAULT_TVA_MAP } from '../../../utils/defaults';
import { ProductFields } from './ProductFields';

export const productSchema = z.object({
  name: z.string().min(1),
  unit: z.string(),
  tva: z.string().optional(),
  tvq: z.boolean().optional(),
});

export function ProductCreateModal() {
  const posthog = usePostHog();
  const navigate = useNavigate();
  const { country } = useRouteLoaderData('farm') as { country: Country };

  const { say } = useSideKick();

  const { register, handleSubmit } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      unit: 'kg',
      tva: DEFAULT_TVA_MAP[country.value],
      tvq: false,
    },
  });

  const handleClose = (value?: { id: string }) => {
    if (value?.id) {
      navigate(`../${value?.id}`);
    } else {
      navigate(-1);
    }
  };

  const onSubmit = (e: ProductInput) => {
    posthog?.capture('product_add');
    return addProduct(e)
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

  return (
    <MyModal
      isOpen={true}
      title="Nouveau produit"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ProductFields register={register} />
    </MyModal>
  );
}
