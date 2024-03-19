import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { addDelivery, DeliveryInput } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { DeliveryFields } from './DeliveryFields';

export const deliverySchema = z.object({
  customer: z.string().min(1),
  deliveredAt: z.string(),
  lines: z
    .object({
      productId: z.string().min(1),
      price: z
        .string()
        .transform((v) => Number(v))
        .or(z.number()),
      quantity: z
        .string()
        .transform((v) => Number(v))
        .or(z.number()),
    })
    .array()
    .nonempty(),
  notes: z.string(),
});

export function DeliveryCreateModal() {
  const posthog = usePostHog();
  const navigate = useNavigate();
  const location = useLocation();

  const isOrder = location.pathname.includes('order');

  const { say } = useSideKick();

  const methods = useForm<DeliveryInput>({
    resolver: zodResolver(deliverySchema),
    defaultValues: { customer: '', deliveredAt: new Date().toISOString().split('T')[0], notes: '' },
  });

  const handleClose = (value?: { id: string }) => {
    if (value?.id) navigate(`../${value?.id}`);
    else navigate(-1);
  };

  const onSubmit = async (e: DeliveryInput) => {
    posthog?.capture('delivery_add');
    try {
      const result = await addDelivery({ ...e, isOrder });
      handleClose(result);
      say({
        sentence: `La ${isOrder ? 'commande' : 'livraison'} a bien été enregistrée`,
        autoShutUp: true,
        feeling: SideKickFeeling.GOOD,
      });
    } catch (message) {
      return console.error(message);
    }
  };

  return (
    <MyModal
      isOpen={true}
      title={isOrder ? 'Nouvelle commande' : 'Nouveau bon de livraison'}
      onClose={handleClose}
      onSubmit={methods.handleSubmit(onSubmit)}
      width="600px"
    >
      <DeliveryFields methods={methods} />
    </MyModal>
  );
}
