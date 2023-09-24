import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DeliveryInput, addDelivery } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { DeliveryFields } from '../DeliveryFields';

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

export function CreateDeliveryAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { say } = useSideKick();
  const cancelRef = useRef<any>();
  const { control, register, handleSubmit, reset, watch, setValue, getValues } = useForm<DeliveryInput>({
    resolver: zodResolver(deliverySchema),
    defaultValues: { customerId: '', deliveredAt: new Date().toISOString().split('T')[0], notes: '' },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lines',
  });

  const onSubmit = (e: DeliveryInput) =>
    addDelivery(e)
      .then(() =>
        say({
          sentence: 'La livraison a bien été enregistrée',
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      )
      .then(handleClose)
      .catch(console.error);
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
      remove();
    }, 100);
  };
  return (
    <>
      <Button
        colorScheme="twitter"
        onClick={onOpen}
      >
        Nouveau
      </Button>
      <MyModal
        isOpen={isOpen}
        cancelRef={cancelRef}
        title="Nouveau bon de livraison"
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
    </>
  );
}
