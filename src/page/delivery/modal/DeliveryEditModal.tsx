import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Delivery, DeliveryInput, store, updateDelivery } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { deliverySchema } from './DeliveryCreateModal';
import { DeliveryFields } from './DeliveryFields';

interface DeliveryEditModalProps {
  delivery: Delivery;
}

export function DeliveryEditModal() {
  const { id } = useParams();
  const delivery = useMemo(() => (id ? store.deliveries.find((el) => el.id === id) : undefined), [id]);
  if (!delivery) return null;

  const isOrder = location.pathname.includes('order');

  const cancelRef = useRef<any>();
  const navigate = useNavigate();
  const { say } = useSideKick();

  const updatedValues = {
    customerId: delivery.customerId,
    deliveredAt: delivery.deliveredAt,
    lines: delivery.lines.map((line) => ({
      productId: line.product.id,
      price: line.price || line.product.price,
      quantity: line.quantity,
    })),
    notes: delivery.notes,
  };

  const { control, register, handleSubmit, watch, setValue, getValues, formState } = useForm<DeliveryInput>({
    resolver: zodResolver(deliverySchema),
    defaultValues: updatedValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lines',
  });

  const handleClose = () => navigate('..');

  const onSubmit = (e: DeliveryInput) =>
    updateDelivery(delivery, e)
      .then(handleClose)
      .then(() =>
        say({
          sentence: `La ${isOrder ? 'commande' : 'livraison'} ${delivery.documentId} a bien été enregistrée`,
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      )
      .catch(console.error);

  return (
    <MyModal
      isOpen={true}
      cancelRef={cancelRef}
      title={`Modifier la ${isOrder ? 'commande' : 'livraison'}`}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={!formState.isDirty}
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
