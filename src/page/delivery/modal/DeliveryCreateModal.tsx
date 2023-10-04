import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { DeliveryInput, addDelivery } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { DeliveryFields } from './DeliveryFields';

export const deliverySchema = z.object({
  customerId: z.string().min(1),
  deliveredAt: z.string(),
  lines: z
    .object({
      productId: z.string().min(1),
      price: z.number().gt(0),
      quantity: z.number().gt(0),
    })
    .array()
    .nonempty(),
  notes: z.string(),
});

export function DeliveryCreateModal() {
  const posthog = usePostHog();
  const cancelRef = useRef<any>();
  const navigate = useNavigate();
  const location = useLocation();

  const isOrder = location.pathname.includes('order');

  const { say } = useSideKick();

  const { control, register, handleSubmit, reset, watch, setValue, getValues } = useForm<DeliveryInput>({
    resolver: zodResolver(deliverySchema),
    defaultValues: { customerId: '', deliveredAt: new Date().toISOString().split('T')[0], notes: '' },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lines',
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
        sentence: 'La livraison a bien été enregistrée',
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
      cancelRef={cancelRef}
      title={isOrder ? 'Nouvelle commande' : 'Nouveau bon de livraison'}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <DeliveryFields
        control={control}
        register={register}
        fields={fields}
        append={append}
        remove={remove}
        watch={watch}
        setValue={setValue}
        getValues={getValues}
      />
    </MyModal>
  );
}
